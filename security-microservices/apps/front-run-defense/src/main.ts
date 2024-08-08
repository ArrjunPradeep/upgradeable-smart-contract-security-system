import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { FrontRunDefenseModule } from './front-run-defense.module';

async function bootstrap() {
  const app = await NestFactory.create(FrontRunDefenseModule);

  const configService = app.get(ConfigService);

  const host = configService.get<string>('FRONT_RUN_DEFENSE.HOST');
  const port = configService.get<number>('FRONT_RUN_DEFENSE.PORT');

  await app.listen(port, host, () => {
    console.log(`FRONT_RUN_DEFENSE is running on http://${host}:${port}`);
  });
}

bootstrap();

