import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { FrontRunDefenseLog } from './front-run-defense.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FrontRunDefenseService {
  private readonly logger = new Logger(FrontRunDefenseService.name); // Logger instance for the service
  private provider: ethers.WebSocketProvider; // Ethereum WebSocket provider for real-time updates
  private contractAddress: string; // Address of the smart contract
  private contract: ethers.Contract; // Contract instance to interact with the smart contract
  private wallet; // Wallet instance for signing transactions
  private privateKey: string; // Private key for wallet authentication
  private etherScanApiKey: string; // Etherscan API key for fetching gas prices

  // ABI (Application Binary Interface) of the smart contract functions
  private contractABI = [
    'function pause() public',
    'function withdraw() external',
    'function deposit() external'
  ];

  constructor(
    @InjectModel(FrontRunDefenseLog.name) private readonly frontRunDefenseLogModel: Model<FrontRunDefenseLog>, // Inject Mongoose model for FrontRunDefenseLog
    private readonly configService: ConfigService, // Inject NestJS ConfigService to access configuration variables
  ) {
    // Initialize provider, contract address, and wallet using configuration variables
    this.provider = new ethers.WebSocketProvider(this.configService.get<string>('BLOCKCHAIN.WEBSOCKET_URL'));
    this.contractAddress = this.configService.get<string>('BLOCKCHAIN.PROXY_ADDRESS');
    this.privateKey = this.configService.get<string>('BLOCKCHAIN.PRIVATE_KEY');
    this.etherScanApiKey = this.configService.get<string>('BLOCKCHAIN.EXPLORER_API_KEY');
    this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.wallet);
  }

  // Method to monitor pending transactions in the mempool
  async monitorMempool() {
    // Listen to 'pending' events for new transactions
    this.provider.on('pending', async (txHash) => {
      try {
        // Fetch transaction details using its hash
        const tx = await this.provider.getTransaction(txHash);
        if (tx && this.isSuspiciousTransaction(tx)) {

          const reason = this.isSuspiciousTransaction(tx) ? 'Suspicious transaction' : 'Normal transaction';

          // Store detected suspicious transaction in the database
          const newFrontRunDefenseLog = new this.frontRunDefenseLogModel({
            from: tx.from,
            reason: reason,
            amount: ethers.formatEther(tx.value),
            contractAddress: this.contractAddress,
            hash: tx.hash,
            data: tx.data
          });

          await newFrontRunDefenseLog.save();

          this.logger.warn(`Suspicious transaction detected: ${txHash}. Triggering pause.`);
          await this.triggerPauseContract(tx);
        } 
      } catch (error) {
        console.log("Error handling transaction", error);
      }
    });

    // Handle WebSocket errors and attempt reconnection
    this.provider.on('error', (error) => {
      this.logger.error('WebSocket provider error', error);
      this.reconnect();
    });
  }

  // Method to check if a transaction is suspicious
  private isSuspiciousTransaction(tx: ethers.TransactionResponse): boolean {
    const interactsWithVulnerableFunction = (
      tx.to === this.contractAddress &&
      (tx.data.includes(this.contract.interface.getFunction('withdraw').selector) ||
        tx.data.includes(this.contract.interface.getFunction('deposit').selector))
    );

    let gasPriceGwei;

    // Check for high maxFeePerGas price (front-running detection)
    if (interactsWithVulnerableFunction) {
      this.logger.log(`Interacts with vulnerable function`, interactsWithVulnerableFunction);
      this.logger.log(`Transaction hash`, tx.hash);
      this.logger.log(`Transaction data`, tx.data);
      gasPriceGwei = Number(ethers.formatUnits(tx.maxFeePerGas, 'gwei'));
      this.logger.log(`Current gas price detected: ${gasPriceGwei} gwei`);
    }

    const isAbnormallyHighGasPrice = gasPriceGwei > 4.5;

    if (interactsWithVulnerableFunction && isAbnormallyHighGasPrice) {
      this.logger.warn(`Suspicious transaction with high gas price detected: ${gasPriceGwei} gwei`);
    }

    return interactsWithVulnerableFunction && isAbnormallyHighGasPrice;
  }

  // Method to trigger a pause on the smart contract
  private async triggerPauseContract(txn) {
    try {
      // Calculate gas parameters for the pause transaction
      const maxFee = Math.floor(Number(ethers.formatUnits(txn.maxFeePerGas, 'gwei')) * 4);
      const priorityFee = Math.floor(Number(ethers.formatUnits(txn.maxPriorityFeePerGas, 'gwei')) * 4);
      const gasLimit = Math.floor(Number(txn.gasLimit) * 4);

      // Send a pause transaction to the smart contract
      const tx = await this.contract.pause({
        maxPriorityFeePerGas: ethers.parseUnits(priorityFee.toString(), 'gwei'),
        maxFeePerGas: ethers.parseUnits(maxFee.toString(), 'gwei'),
        gasLimit: gasLimit.toString(),
      });

      this.logger.log(`Pause transaction sent: ${tx.hash}`);
      await tx.wait();

      // Store the pause transaction in the database
      const newFrontRunDefenseLog = new this.frontRunDefenseLogModel({
        from: tx.from,
        reason: "contract paused",
        amount: ethers.formatEther(tx.value),
        contractAddress: this.contractAddress,
        hash: tx.hash,
        data: tx.data
      });

      await newFrontRunDefenseLog.save();

      this.logger.log('Contract paused successfully.');
    } catch (error) {
      this.logger.error('Error triggering contract pause', error);
    }
  }

  // Method to estimate dynamic gas price
  private async getDynamicGasPrice(): Promise<ethers.BigNumberish> {
    const gasData = await this.gasEstimator();
    const fastMaxFeePerGas = Number(gasData.aggressiveMaxFeePerGas) * 2;
    this.logger.log(`Dynamic gas price: ${fastMaxFeePerGas}`);
    return fastMaxFeePerGas;
  }

  // Method to fetch gas price data from Etherscan
  public async gasEstimator(): Promise<any> {
    type GasEstimatorRequest = {
      module: string,
      action: string,
      apikey: string
    }

    type GasEstimatorData = {
      lowMaxFeePerGas: string,
      marketMaxFeePerGas: string,
      aggressiveMaxFeePerGas: string,
      baseFee: string
    }

    const url: string = 'https://api.etherscan.io/api';
    const params: GasEstimatorRequest = {
      module: 'gastracker',
      action: 'gasoracle',
      apikey: this.etherScanApiKey
    };

    try {
      const response: AxiosResponse<any, any> = await axios.get(url, { params });
      const gasResult = response.data.result;

      const gasData: GasEstimatorData = {
        lowMaxFeePerGas: gasResult.SafeGasPrice,
        marketMaxFeePerGas: gasResult.ProposeGasPrice,
        aggressiveMaxFeePerGas: gasResult.FastGasPrice,
        baseFee: gasResult.suggestBaseFee
      }

      console.log("Gas Price Data:", gasData);
      return gasData;
    } catch (error) {
      console.error("Error fetching gas price data:", error);
      throw error; // Re-throw the error for handling upstream
    }
  }

  // Method to reconnect to the WebSocket provider in case of failure
  private async reconnect() {
    try {
      this.provider = new ethers.WebSocketProvider(this.configService.get<string>('BLOCKCHAIN.WEBSOCKET_URL'));
      await this.monitorMempool();
      this.logger.log('Reconnected to WebSocket provider');
    } catch (error) {
      this.logger.error('Reconnection failed', error);
    }
  }
}
