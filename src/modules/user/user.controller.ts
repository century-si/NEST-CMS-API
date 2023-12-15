import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  Query,
  HttpCode,
  Req,
  Res,
  Session,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigModule } from '@/config/config.module';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('Config') private readonly base: ConfigModule,
  ) {}

  @Get('code')
  createCOde(@Req() req, @Res() res, @Session() session) {
    const captcha = this.userService.createCode();
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Body() Body, @Session() session) {
    if (session.code.toLocaleLowerCase() === Body?.code?.toLocaleLowerCase()) {
      return {
        status: 200,
        message: '验证码正确',
      };
    } else {
      return {
        status: 999,
        message: '验证码错误',
      };
    }
  }

  @Get()
  findAll(@Query() query) {
    return this.base;
  }

  @Post('add')
  create(@Body('age') body) {
    console.log(body);
    return {
      status: 200,
      message: body,
    };
  }

  @Get(':id')
  @HttpCode(500)
  findId(@Param() param, @Headers() headers) {
    console.log(param, headers);
    return {
      status: 200,
      message: { param, headers },
    };
  }
}
