import { Controller, Get, Post, Body, Req, Res, Session } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('code')
  createCOde(@Req() req, @Res() res, @Session() session) {
    const captcha = this.loginService.createCode();
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
}
