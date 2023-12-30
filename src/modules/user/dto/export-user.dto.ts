import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';

export class ExportUserDto {
  @ApiProperty({
    description: '用户ID',
    example: 1,
    type: Number,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: '用户名',
    example: 'John Doe',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: '真实姓名',
    example: 'John Smith',
    type: String,
  })
  @Expose()
  realname: string;

  @ApiProperty({
    description: '手机号码',
    example: '1234567890',
    type: Number,
  })
  @Expose()
  @Transform(({ value }) => value / 1)
  phone: number;

  @ApiProperty({
    description: '用户是否启用',
    example: 1,
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  enable: number;

  @ApiProperty({
    description: '用户创建时间',
    example: '2022-01-01 00:00:00',
    type: Date,
  })
  @Expose()
  createAt: Date;

  @ApiProperty({
    description: '用户最后更新时间',
    example: '2022-01-01T00:00:00',
    type: Date,
  })
  @Expose()
  updateAt: Date;
}
