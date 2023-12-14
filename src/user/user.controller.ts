import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Headers,
  Query,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query) {
    return {
      code: 200,
      message: query,
    };
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
