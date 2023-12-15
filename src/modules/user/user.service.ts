import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
@Injectable()
export class UserService {
  createCode() {
    return svgCaptcha.create({
      size: 4, // 生成几个验证码
      fontSize: 50, // 文字大小
      width: 100, // 宽度
      height: 34, // 高度
      background: '#cc9966', // 背景颜色
    });
  }
}
