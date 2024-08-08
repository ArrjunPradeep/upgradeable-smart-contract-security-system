import { Module } from '@nestjs/common';
import { FrontRunDefenseController } from './front-run-defense.controller';
import { FrontRunDefenseService } from './front-run-defense.service';

@Module({
  imports: [],
  controllers: [FrontRunDefenseController],
  providers: [FrontRunDefenseService],
})
export class FrontRunDefenseModule {}
