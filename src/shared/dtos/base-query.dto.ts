import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { BasePaginationDto } from './base-pagination.dto';
import { ValidateStringNumber } from '../decorators/validate-string-number.decorator';
import { ValidateDate } from '../decorators/validate-date.decorator';

export class BaseQueryDto extends BasePaginationDto {
  @ApiProperty({ name: 'id', example: 1, type: Number })
  @ValidateStringNumber({ message: 'id必须是字符串或者数字' })
  @Type(() => Number)
  @IsOptional()
  id: number;

  @ApiProperty({
    name: '是否启用',
    example: 0,
    type: Boolean,
    description: '0:禁用 1:启用',
  })
  @ValidateStringNumber({ message: '是否启用必须是数字或字符串' })
  @Type(() => Number)
  @IsOptional()
  enable: number;

  @ApiProperty({ name: '创建时间', example: '2021-10-10', type: [Date, Date] })
  @IsOptional()
  @ValidateDate()
  createAt: Array<Date>;

  @ApiProperty({ name: '更新时间', example: '2021-10-10', type: [Date, Date] })
  @ValidateDate()
  @IsOptional()
  updateAt: Array<Date>;
}
