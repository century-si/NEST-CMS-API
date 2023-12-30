import { ValidateStringNumber } from '@/shared/decorators/validate-string-number.decorator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: '用户名', type: String })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MaxLength(32, { message: '用户名长度不能超过32个字符' })
  name: string;

  @ApiProperty({ description: '密码', type: String })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  password: string;

  @ApiProperty({ name: '真实姓名', example: '管理员' })
  @IsString({ message: '真实姓名必须是字符串' })
  @IsNotEmpty({ message: '真实姓名不能为空' })
  realname: string;

  @ApiProperty({ name: '手机号码', example: 12345678901 })
  @ValidateStringNumber({ message: '手机号码必须是字符串或者数字' })
  @IsOptional()
  phone: string;
}
