import { NestFactory } from '@nestjs/core';
import { SlitherReportModule } from './slither-report.module';

async function bootstrap() {
  const app = await NestFactory.create(SlitherReportModule);
  await app.listen(3000);
}
bootstrap();
