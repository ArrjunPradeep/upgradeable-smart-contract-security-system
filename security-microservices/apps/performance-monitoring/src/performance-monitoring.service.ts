import { Injectable } from '@nestjs/common';

@Injectable()
export class PerformanceMonitoringService {
  getHello(): string {
    return 'Hello World!';
  }
}
