import { Controller, Post, Body } from '@nestjs/common';
import { SlitherReportService } from './slither-report.service';

@Controller('slither')
export class SlitherReportController {
  constructor(private readonly slitherService: SlitherReportService) {}

  // Endpoint to trigger the Slither analysis
  @Post('run')
  async runSlither(
    @Body() body: { filepath: string; outputFilename: string }
  ): Promise<string> {
    const { filepath, outputFilename } = body;
    try {
      // Call the service to run Slither analysis
      await this.slitherService.runSlither(filepath, outputFilename);
      // Return a success message if the analysis is successful
      return 'Slither report generated successfully';
    } catch (error) {
      // Return an error message if something goes wrong
      return `Error generating Slither report: ${error.message}`;
    }
  }
}
