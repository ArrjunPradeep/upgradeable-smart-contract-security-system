import { Module } from '@nestjs/common';
import { FrontRunDefenseService } from './front-run-defense.service';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [FrontRunDefenseService],
})
export class FrontRunDefenseModule {}