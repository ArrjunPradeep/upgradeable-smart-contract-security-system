import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/app.env', 'env/database.env', 'env/blockchain.env', 'env/email.env'], // Add paths to your environment files
      load: config,
      cache: true,
      expandVariables: true,
      isGlobal: true,
    }),
  ],
  exports: [ConfigModule],
})

export class CommonModule {}
