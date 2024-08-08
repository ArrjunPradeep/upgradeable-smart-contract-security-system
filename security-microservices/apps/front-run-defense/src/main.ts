import { NestFactory } from '@nestjs/core';
import { FrontRunDefenseModule } from './front-run-defense.module';

async function bootstrap() {
  const app = await NestFactory.create(FrontRunDefenseModule);
  await app.listen(3000);
}
bootstrap();
