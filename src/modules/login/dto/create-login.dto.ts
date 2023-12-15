import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty({
    message: '名字不能为空',
  })
  @IsString({
    message: '名字必须是字符串',
  })
  @Length(5, 10, {
    message: '不能超过十个字符',
  })
  name: string;
  @IsNumber()
  age: number;
}
