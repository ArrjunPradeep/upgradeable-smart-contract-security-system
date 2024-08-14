import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { FrontRunDefenseModule } from './front-run-defense.module';
import { FrontRunDefenseService } from './front-run-defense.service';
import { instance } from '@app/common/logging/winston.logger';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  // Create the NestJS application with custom logging using Winston
  const app = await NestFactory.create(FrontRunDefenseModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  // Get the configuration service to access application settings
  const configService = app.get(ConfigService);

  // Fetch configuration values for the HTTP server
  const host = configService.get<string>('FRONT_RUN_DEFENSE.HOST');
  const port = configService.get<number>('FRONT_RUN_DEFENSE.PORT');

  // Get the FrontRunDefenseService instance to start monitoring
  const frontRunDefenseService = app.get(FrontRunDefenseService);

  // Start monitoring the Ethereum mempool for suspicious transactions
  await frontRunDefenseService.monitorMempool();

}

bootstrap();
