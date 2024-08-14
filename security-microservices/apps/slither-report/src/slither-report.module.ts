import { Module } from '@nestjs/common';
import { SlitherReportService } from './slither-report.service';
import { SlitherReportController } from './slither-report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SlitherResult, SlitherResultSchema } from './slither-report.schema';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [
    // Import CommonModule to use shared services or modules
    CommonModule,

    // Import MongooseModule to enable MongoDB schema integration
    // Here we are defining the SlitherResult schema to be used with MongoDB
    MongooseModule.forFeature([
      { name: SlitherResult.name, schema: SlitherResultSchema },
    ]),
  ],
  controllers: [
    // Register the SlitherReportController to handle incoming HTTP requests
    SlitherReportController,
  ],
  providers: [
    // Register the SlitherReportService to handle the business logic
    SlitherReportService,
  ],
})
export class SlitherReportModule {}