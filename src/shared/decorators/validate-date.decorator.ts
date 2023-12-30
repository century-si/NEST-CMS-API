import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';

/**
 * @method 验证日期
 * @returns
 */
export function ValidateDate() {
  return Transform(({ value, key }) => {
    if (!value) return undefined;
    // 判断是否是数组
    if (!Array.isArray(value)) {
      throw new BadRequestException(`${key} 必须是数组`);
    }

    // 判断数组长度是否为2
    if (value.length === 0) return undefined;
    if (value.length != 2) {
      throw new BadRequestException(`${key} 数组长度必须为二`);
    }
    //3.判断数组元素是否为日期
    if (
      value.some((item) => {
        return new Date(item).toString() === 'Invalid Date';
      })
    ) {
      throw new BadRequestException(`${key} 数组元素必须为日期`);
    }
    return value;
  });
}
