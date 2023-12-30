import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './modules/upload/upload.module';
import { LoginModule } from './modules/login/login.module';
import { SpiderModule } from './modules/spider/spider.module';
import { GuardModule } from './modules/guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ path: '/xz' }),
    UploadModule,
    LoginModule,
    SpiderModule,
    GuardModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
