import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import * as cros from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupLogger } from './log';
import * as path from 'path';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { EnvEnum } from './shared/enums/env.enum';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: setupLogger(),
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 静态资源
  app.useStaticAssets(path.resolve(__dirname, '../files'), {
    prefix: '/api/v1/static/',
  });

  // 版本
  app.setGlobalPrefix('/api/v1');

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(helmet());
  app.use(cros());

  const configService = app.get(ConfigService);
  await app.listen(configService.get(EnvEnum.APP_PORT));
}
bootstrap();
