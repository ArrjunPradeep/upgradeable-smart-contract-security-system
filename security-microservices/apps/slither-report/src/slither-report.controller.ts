import { Controller, Post, Body } from '@nestjs/common';
import { SlitherReportService } from './slither-report.service';

@Controller('slither')
export class SlitherReportController {
  constructor(private readonly slitherService: SlitherReportService) {}

  @Post('run')
  async runSlither(@Body() body: { filepath: string; outputFilename: string }): Promise<string> {
    const { filepath, outputFilename } = body;
    try {
      await this.slitherService.runSlither(filepath, outputFilename);
      return 'Slither report generated successfully';
    } catch (error) {
      return `Error generating Slither report: ${error.message}`;
    }
  }
}
