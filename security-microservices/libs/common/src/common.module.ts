import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env/app.env', 'env/database.env', 'env/blockchain.env', 'env/email.env'],
      load: config,
      cache: true,
      expandVariables: true,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('DATABASE.MONGO_URL')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [],
  exports: [ConfigModule],
})

export class CommonModule {}
