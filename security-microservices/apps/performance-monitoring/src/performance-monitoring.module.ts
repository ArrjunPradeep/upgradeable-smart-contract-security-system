import { Module } from '@nestjs/common';
import { PerformanceMonitoringController } from './performance-monitoring.controller';
import { PerformanceMonitoringService } from './performance-monitoring.service';

@Module({
  imports: [],
  controllers: [PerformanceMonitoringController],
  providers: [PerformanceMonitoringService],
})
export class PerformanceMonitoringModule {}
