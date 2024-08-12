import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { SlitherReportModule } from './slither-report.module';

async function bootstrap() {
  const app = await NestFactory.create(SlitherReportModule);

  const configService = app.get(ConfigService);

  // Fetch configuration for the HTTP server
  const host = configService.get<string>('SLITHER_REPORT.HOST');
  const port = configService.get<number>('SLITHER_REPORT.PORT');

  // Start the HTTP server (if needed)
  await app.listen(port, host, () => {
    console.log(`SLITHER_REPORT is running on http://${host}:${port}`);
  });
}

bootstrap();