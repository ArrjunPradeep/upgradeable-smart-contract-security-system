import { Controller, Get } from '@nestjs/common';
import { FrontRunDefenseService } from './front-run-defense.service';

@Controller()
export class FrontRunDefenseController {
  constructor(private readonly frontRunDefenseService: FrontRunDefenseService) {}

  @Get()
  getHello(): string {
    return this.frontRunDefenseService.getHello();
  }
}
