import { Module } from '@nestjs/common';
import { SlitherReportService } from './slither-report.service';
import { SlitherReportController } from './slither-report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SlitherResult, SlitherResultSchema } from './slither-report.schema';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: SlitherResult.name, schema: SlitherResultSchema }]),
  ],
  controllers: [SlitherReportController],
  providers: [SlitherReportService],
})
export class SlitherReportModule {}
