import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 新增用户
   * @param createUserDto
   * @returns
   */
  @Post('add')
  @HttpCode(HttpStatus.OK)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * @method 查询用户列表
   * @param queryUserDto
   * @returns
   */
  @Post('list')
  @HttpCode(HttpStatus.OK)
  findAll(@Body() queryUserDto: QueryUserDto) {
    return this.userService.findAll(queryUserDto);
  }

  /**
   * 更新用户
   * @param id 用户id
   * @param updateUserDto 更新信息
   * @returns
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  /**
   * @method 查询用户
   * @param id 用户id
   * @returns
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
