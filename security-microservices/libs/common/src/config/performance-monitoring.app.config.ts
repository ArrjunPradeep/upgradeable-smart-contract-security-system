import { registerAs } from '@nestjs/config';

export const PERFORMANCE_MONITORING_CONFIG = registerAs('PERFORMANCE_MONITORING', () => {
  
    return {
        HOST: process.env['PERFORMANCE_MONITORING_HOST'],
        PORT: parseInt(process.env['PERFORMANCE_MONITORING_PORT'], 10),
        API_SECRET_KEY: process.env['PERFORMANCE_MONITORING_API_SECRET_KEY'],
    }

});