import { Injectable } from '@nestjs/common';

@Injectable()
export class FrontRunDefenseService {
  getHello(): string {
    return 'Hello World!';
  }
}
