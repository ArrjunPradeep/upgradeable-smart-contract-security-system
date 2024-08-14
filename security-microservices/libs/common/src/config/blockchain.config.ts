import { registerAs } from '@nestjs/config';

// Register a configuration namespace for blockchain-related settings
export const BLOCKCHAIN_CONFIG = registerAs('BLOCKCHAIN', () => {

  return {
    // URL for the WebSocket provider used to connect to the blockchain
    WEBSOCKET_URL: process.env['BLOCKCHAIN_WEBSOCKET_URL'],
    
    // Address of the vulnerable contract to monitor for potential front-running attacks
    VULNERABLE_CONTRACT_ADDRESS: process.env['BLOCKCHAIN_VULNERABLE_CONTRACT_ADDRESS'],
    
    // Address of the proxy contract, often used for upgrading or managing contract interactions
    PROXY_ADDRESS: process.env['BLOCKCHAIN_PROXY_ADDRESS'],
    
    // Private key for signing transactions and interacting with the blockchain
    PRIVATE_KEY: process.env['BLOCKCHAIN_PRIVATE_KEY'],
    
    // API key for accessing blockchain explorers, such as Etherscan, for querying transaction data
    EXPLORER_API_KEY: process.env['BLOCKCHAIN_EXPLORER_API_KEY']
  }

});