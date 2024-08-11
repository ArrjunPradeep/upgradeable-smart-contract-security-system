import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { FrontRunDefenseModule } from './front-run-defense.module';
import { FrontRunDefenseService } from './front-run-defense.service';
import { instance } from '@app/common/logging/winston.logger';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(FrontRunDefenseModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  const configService = app.get(ConfigService);

  // Fetch configuration for the HTTP server
  const host = configService.get<string>('FRONT_RUN_DEFENSE.HOST');
  const port = configService.get<number>('FRONT_RUN_DEFENSE.PORT');

  // Get the FrontRunDefenseService instance
  const frontRunDefenseService = app.get(FrontRunDefenseService);

  // Start monitoring for suspicous transactions and frontrun
  await frontRunDefenseService.monitorMempool();

  // Start the HTTP server (if needed)
  // await app.listen(port, host, () => {
  //   console.log(`FRONT_RUN_DEFENSE is running on http://${host}:${port}`);
  // });
}

bootstrap();