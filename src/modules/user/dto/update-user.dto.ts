import { CreateUserDto } from './create-user.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    name: '是否启用 ',
    example: 0,
    type: Number,
    description: '0:禁用 1:启用',
  })
  @Type(() => Boolean)
  @IsOptional()
  enable: boolean;
}
