import { registerAs } from '@nestjs/config';

// Define and export the Slither Report configuration
export const SLITHER_REPORT_CONFIG = registerAs('SLITHER_REPORT', () => {

  return {
    // The host URL for the Slither Report service
    HOST: process.env['SLITHER_REPORT_HOST'],

    // The port number on which the Slither Report service will listen
    PORT: parseInt(process.env['SLITHER_REPORT_PORT'], 10),

    // The API secret key for authenticating with the Slither Report service
    API_SECRET_KEY: process.env['SLITHER_REPORT_API_SECRET_KEY'],
  }

});