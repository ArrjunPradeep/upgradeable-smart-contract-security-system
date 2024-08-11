import { Module } from '@nestjs/common';
import { FrontRunDefenseService } from './front-run-defense.service';
import { CommonModule } from '@app/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FrontRunDefenseLog, FrontRunDefenseLogSchema } from './front-run-defense.schema';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: FrontRunDefenseLog.name, schema: FrontRunDefenseLogSchema }]),
  ],
  controllers: [],
  providers: [FrontRunDefenseService],
})
export class FrontRunDefenseModule {}