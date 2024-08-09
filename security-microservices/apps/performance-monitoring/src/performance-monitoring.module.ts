import { Module } from '@nestjs/common';
import { PerformanceMonitoringService } from './performance-monitoring.service';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [PerformanceMonitoringService],
})
export class PerformanceMonitoringModule {}
