import { Module } from '@nestjs/common';
import { FrontRunDefenseController } from './front-run-defense.controller';
import { FrontRunDefenseService } from './front-run-defense.service';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [FrontRunDefenseController],
  providers: [FrontRunDefenseService],
})
export class FrontRunDefenseModule {}
