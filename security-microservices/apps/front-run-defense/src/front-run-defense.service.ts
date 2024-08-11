import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { FrontRunDefenseLog } from './front-run-defense.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FrontRunDefenseService {
  private readonly logger = new Logger(FrontRunDefenseService.name);
  private provider: ethers.WebSocketProvider;
  private contractAddress: string;
  private contract: ethers.Contract;
  private wallet;
  private privateKey: string;
  private etherScanApiKey: string;

  private contractABI = [
    'function pause() public',
    'function withdraw() external',
    'function deposit() external'
  ];

  constructor(
    @InjectModel(FrontRunDefenseLog.name) private readonly frontRunDefenseLogModel: Model<FrontRunDefenseLog>,
    private readonly configService: ConfigService,
  ) {
    this.provider = new ethers.WebSocketProvider(this.configService.get<string>('BLOCKCHAIN.WEBSOCKET_URL'));
    this.contractAddress = this.configService.get<string>('BLOCKCHAIN.PROXY_ADDRESS');
    this.privateKey = this.configService.get<string>('BLOCKCHAIN.PRIVATE_KEY');
    this.etherScanApiKey = this.configService.get<string>('BLOCKCHAIN.EXPLORER_API_KEY')
    this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.wallet);
  }

  async monitorMempool() {
    this.provider.on('pending', async (txHash) => {
      // this.logger.log("TXN HASH", txHash);
      try {
        const tx = await this.provider.getTransaction(txHash);
        if (tx && this.isSuspiciousTransaction(tx)) {

          const reason = tx && this.isSuspiciousTransaction(tx) ? 'Suspicious transaction' : 'Normal transaction';

          // Store the detected suspicious txn in the database
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
        this.logger.error('Error processing transaction', error);
      }
    });

    this.provider.on('error', (error) => {
      this.logger.error('WebSocket provider error', error);
      this.reconnect();
    });
  }

  private isSuspiciousTransaction(tx: ethers.TransactionResponse): boolean {
    const interactsWithVulnerableFunction = (
      tx.to === this.contractAddress &&
      (tx.data.includes(this.contract.interface.getFunction('withdraw').selector) ||
        tx.data.includes(this.contract.interface.getFunction('deposit').selector))
    );

    let gasPriceGwei;

    // check for high maxFeePerGas price (front-running detection)
    if (interactsWithVulnerableFunction) {
      this.logger.log(`interactsWithVulnerableFunction`, interactsWithVulnerableFunction);
      this.logger.log(`transaction hash`, tx.hash);
      this.logger.log(`transaction hash`, tx.data);
      gasPriceGwei = Number(ethers.formatUnits(tx.maxFeePerGas, 'gwei'));
      this.logger.log(`Current transaction with gas price detected: ${gasPriceGwei} gwei`);
    }

    const isAbnormallyHighGasPrice = gasPriceGwei > 4.5;

    if (interactsWithVulnerableFunction && isAbnormallyHighGasPrice) {
      this.logger.warn(`Suspicious transaction with high gas price detected: ${gasPriceGwei} gwei`);
    }

    return interactsWithVulnerableFunction && isAbnormallyHighGasPrice;
  }

  private async triggerPauseContract(txn) {
    try {

      const maxFee = Math.floor(Number(ethers.formatUnits(txn.maxFeePerGas, 'gwei')) * 3);
      const priorityFee = Math.floor(Number(ethers.formatUnits(txn.maxPriorityFeePerGas, 'gwei')) * 3);
      const gasLimit = Math.floor(Number(txn.gasLimit) * 3);

      const tx = await this.contract.pause({
        maxPriorityFeePerGas: ethers.parseUnits(priorityFee.toString(), 'gwei'),
        maxFeePerGas: ethers.parseUnits(maxFee.toString(), 'gwei'),
        gasLimit: gasLimit.toString(),
      });

      this.logger.log(`Pause transaction sent: ${tx}`);

      this.logger.log(`Pause transaction sent: ${tx.hash}`);
      await tx.wait();
      this.logger.log('Contract paused successfully.');
    } catch (error) {
      this.logger.error('Error triggering contract pause', error);
    }
  }

  private async getDynamicGasPrice(): Promise<ethers.BigNumberish> {
    const gasData = await this.gasEstimator();
    const fastMaxFeePerGas = Number(gasData.aggressiveMaxFeePerGas) * 2;
    this.logger.log(`dynamic gas sent: ${fastMaxFeePerGas}`);
    return fastMaxFeePerGas;
  }

  public async gasEstimator(): Promise<any> {

    type gasEstimatorRequest = {
      module: string,
      action: string,
      apikey: string
    }

    type gasEstimatorData = {
      lowMaxFeePerGas: string,
      marketMaxFeePerGas: string,
      aggressiveMaxFeePerGas: string,
      baseFee: string
    }

    // Define the API request parameters
    const url: string = 'https://api.etherscan.io/api';
    const params: gasEstimatorRequest = {
      module: 'gastracker',
      action: 'gasoracle',
      apikey: this.etherScanApiKey
    };

    try {
      // Make a GET request to the Etherscan API
      const response: AxiosResponse<any, any> = await axios.get(url, { params });

      // Extract gas price data from the API response
      const gasResult = response.data.result;

      const gasData: gasEstimatorData = {
        lowMaxFeePerGas: gasResult.SafeGasPrice,
        marketMaxFeePerGas: gasResult.ProposeGasPrice,
        aggressiveMaxFeePerGas: gasResult.FastGasPrice,
        baseFee: gasResult.suggestBaseFee
      }

      console.log("Gas Price Data:", gasData);
      return gasData
    } catch (error) {
      console.error("Error fetching gas price data:", error);
      throw error;// Re-throw the error for handling upstream
    }

  }

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
