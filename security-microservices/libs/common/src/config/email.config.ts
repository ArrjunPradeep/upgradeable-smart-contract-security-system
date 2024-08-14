import { registerAs } from '@nestjs/config';

// Register a configuration namespace for email-related settings
export const EMAIL_CONFIG = registerAs('EMAIL', () => {

  return {
    // SMTP server host for sending emails
    HOST: process.env['EMAIL_HOST'],

    // Port for the SMTP server
    PORT: process.env['EMAIL_PORT'],

    // Username for authenticating with the SMTP server
    USERNAME: process.env['EMAIL_USERNAME'],

    // Password for authenticating with the SMTP server
    PASSWORD: process.env['EMAIL_PASSWORD'],
  }

});