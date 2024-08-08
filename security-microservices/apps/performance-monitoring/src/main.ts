import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PerformanceMonitoringModule } from './performance-monitoring.module';

async function bootstrap() {
  const app = await NestFactory.create(PerformanceMonitoringModule);

  const configService = app.get(ConfigService);

  const host = configService.get<string>('PERFORMANCE_MONITORING.HOST');
  const port = configService.get<number>('PERFORMANCE_MONITORING.PORT');

  await app.listen(port, host, () => {
    console.log(`PERFORMANCE_MONITORING is running on http://${host}:${port}`);
  });
}

bootstrap();


