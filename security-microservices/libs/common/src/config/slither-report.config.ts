import { registerAs } from '@nestjs/config';

export const SLITHER_REPORT_CONFIG = registerAs('SLITHER_REPORT', () => {

  return {
    HOST: process.env['SLITHER_REPORT_HOST'],
    PORT: parseInt(process.env['SLITHER_REPORT_PORT'], 10),
    API_SECRET_KEY: process.env['SLITHER_REPORT_API_SECRET_KEY'],
  }

});
