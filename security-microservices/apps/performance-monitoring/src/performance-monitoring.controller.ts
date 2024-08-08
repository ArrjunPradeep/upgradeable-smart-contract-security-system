import { Controller, Get } from '@nestjs/common';
import { PerformanceMonitoringService } from './performance-monitoring.service';

@Controller()
export class PerformanceMonitoringController {
  constructor(private readonly performanceMonitoringService: PerformanceMonitoringService) {}

  @Get()
  getHello(): string {
    return this.performanceMonitoringService.getHello();
  }
}
