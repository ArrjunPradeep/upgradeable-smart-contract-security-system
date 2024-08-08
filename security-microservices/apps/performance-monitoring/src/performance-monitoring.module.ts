import { Module } from '@nestjs/common';
import { PerformanceMonitoringController } from './performance-monitoring.controller';
import { PerformanceMonitoringService } from './performance-monitoring.service';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [PerformanceMonitoringController],
  providers: [PerformanceMonitoringService],
})
export class PerformanceMonitoringModule {}
