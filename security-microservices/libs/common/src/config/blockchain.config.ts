import { registerAs } from '@nestjs/config';

export const BLOCKCHAIN_CONFIG = registerAs('BLOCKCHAIN', () => {

  return {
    WEBSOCKET_URL: process.env['BLOCKCHAIN_WEBSOCKET_URL'],
    VULNERABLE_CONTRACT_ADDRESS: process.env['BLOCKCHAIN_VULNERABLE_CONTRACT_ADDRESS'],
    PROXY_ADDRESS: process.env['BLOCKCHAIN_PROXY_ADDRESS'],
    PRIVATE_KEY: process.env['BLOCKCHAIN_PRIVATE_KEY']
  }

});
