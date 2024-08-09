import { registerAs } from '@nestjs/config';

export const EMAIL_CONFIG = registerAs('EMAIL', () => {

  return {
    HOST: process.env['EMAIL_HOST'],
    PORT: process.env['EMAIL_PORT'],
    USERNAME: process.env['EMAIL_USERNAME'],
    PASSWORD: process.env['EMAIL_PASSWORD'],
  }

});
