import { NestFactory } from '@nestjs/core';
import { PerformanceMonitoringModule } from './performance-monitoring.module';

async function bootstrap() {
  const app = await NestFactory.create(PerformanceMonitoringModule);
  await app.listen(3000);
}
bootstrap();
