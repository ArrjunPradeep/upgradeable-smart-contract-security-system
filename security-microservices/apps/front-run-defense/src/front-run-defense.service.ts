import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FrontRunDefenseService {
  private readonly logger = new Logger(FrontRunDefenseService.name);
  private provider: ethers.WebSocketProvider;
  private contractAddress: string;
  private contract: ethers.Contract;
  private contractABI = [
    'function pause() public',
    'function withdraw(uint256 amount) public',
  ];

  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.provider = new ethers.WebSocketProvider(this.configService.get<string>('BLOCKCHAIN.WEBSOCKET_URL'));
    this.contractAddress = this.configService.get<string>('BLOCKCHAIN.VULNERABLE_CONTRACT_ADDRESS');
    this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
  }

  async monitorMempool() {
    this.provider.on('pending', async (txHash) => {
      this.logger.log("TXN HASH", txHash);
      try {
        const tx = await this.provider.getTransaction(txHash);
        if (tx && this.isSuspiciousTransaction(tx)) {
          this.logger.warn(`Suspicious transaction detected: ${txHash}. Triggering pause.`);
          await this.triggerPauseContract();
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
      tx.data.includes(this.contract.interface.getFunction('withdraw').selector)
    );

    console.log("2414124124", interactsWithVulnerableFunction);
    
    // check for high gas price (front-running detection)
    const gasPriceGwei = Number(ethers.formatUnits(tx.gasPrice, 'gwei'));
    const isAbnormallyHighGasPrice = gasPriceGwei > 100;

    if (interactsWithVulnerableFunction && isAbnormallyHighGasPrice) {
      this.logger.warn(`Suspicious transaction with high gas price detected: ${gasPriceGwei} gwei`);
    }

    return interactsWithVulnerableFunction && isAbnormallyHighGasPrice;
  }

  private async triggerPauseContract() {
    try {
      const signer = this.provider.getSigner();
      const tx = await this.contract.pause({
        maxPriorityFeePerGas: await this.getDynamicGasPrice(),
      });

      this.logger.log(`Pause transaction sent: ${tx.hash}`);
      await tx.wait();
      this.logger.log('Contract paused successfully.');
    } catch (error) {
      this.logger.error('Error triggering contract pause', error);
    }
  }

  private async getDynamicGasPrice(): Promise<ethers.BigNumberish> {
    const gasData = await this.provider.getFeeData();
    const priorityFee = gasData.maxPriorityFeePerGas * BigInt(2);
    return priorityFee;
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
