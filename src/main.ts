import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as cros from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { Response as CResponse } from './common/response';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
// import { RoleGuard } from './modules/guard/role/role.guard';

// const whiteList = ['/list', '/user', '/upload/*'];
// function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
//   if (whiteList.includes(req.originalUrl)) {
//     next();
//   } else {
//     res.send({
//       message: '小黑子露出鸡脚了吧',
//     });
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'XZ',
      rolling: true,
      name: 'xz.sid',
      cookie: {
        maxAge: 99999,
      },
    }),
  );
  app.useStaticAssets(join(__dirname + '/modules', 'images'), {
    prefix: '/xz',
  });
  // app.use(MiddleWareAll);
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new CResponse());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RoleGuard());
  app.use(cros());
  await app.listen(3000);
}
bootstrap();
