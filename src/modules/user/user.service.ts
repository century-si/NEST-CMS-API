import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/shared/entities/user.entity';
import { Repository, Like, Between, QueryFailedError } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { filterEmpty } from '@/shared/utils/filer-empty';
import { plainToInstance } from 'class-transformer';
import { ExportUserListDto } from './dto/export-user-list.dto';
import { AppLoggerSevice } from '@/shared/logger/logger.service';
import * as md5 from 'md5';
import { ExportUserDto } from './dto/export-user.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLoggerSevice,
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  /**
   * @method 新增用户
   * @param createUserDto
   * @returns
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const { name, password, phone, realname } = createUserDto;
      const encryptedPassword = md5(password);
      await this.user.save({
        name,
        password: encryptedPassword,
        realname,
        phone,
      });
      return '创建用户成功~';
    } catch (error) {
      this.logger.error(error);
      if (
        error instanceof QueryFailedError &&
        error.driverError.errno == 1062
      ) {
        throw new BadRequestException('该用户名已存在');
      }
      if (error.message) throw new BadRequestException(error.message);
      throw new BadRequestException('创建用户失败');
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log(`${this.updateUser.name} was called`);
    this.judgeCanDo(id);
    try {
      //判断用户是否存在
      const findUser = await this.findUserById(id);
      const { password, phone } = updateUserDto;
      const user = this.user.create({
        ...updateUserDto,
        id,
        phone,
      });
      if (password) {
        const encryptedPassword = md5(password);
        user.password = encryptedPassword;
      }

      await this.user.save({
        ...user,
        id,
        isDelete: false,
      });
      // if(user.enable == false) {
      //   // 禁用用户
      //   await t
      // }
      return '更新用户成功';
    } catch (error) {
      this.logger.error(error);
      if (
        error instanceof QueryFailedError &&
        error.driverError.errno == 1062
      ) {
        throw new BadRequestException('该用户名已存在');
      }
      if (error.message) throw new BadRequestException(error.message);
      throw new BadRequestException('更新用户失败');
    }
  }

  /**
   * @method 根据id查找用户
   * @param id 用户id
   */
  async findUserById(id: number) {
    this.logger.log(`${this.findUserById.name} was called`);
    try {
      if (!id) throw new BadRequestException('该用户不存在');
      const user = await this.user.findOne({
        where: { id, isDelete: false },
      });
      if (!user) throw new BadRequestException('该用户不存在');
      return plainToInstance(ExportUserDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.logger.error(error);
      if (error.message) throw new BadRequestException(error.message);
      throw new BadRequestException('查找用户失败');
    }
  }

  /**
   * @method 获取用户列表
   * @param queryUserDto 查询条件
   * @returns
   */
  async findAll(queryUserDto: QueryUserDto) {
    const {
      phone,
      createAt,
      enable,
      id,
      name,
      offset,
      realname,
      size,
      updateAt,
    } = queryUserDto;
    try {
      const [list, totalCount] = await this.user.findAndCount({
        where: {
          id,
          phone: phone && Like(`%${phone}%`),
          createAt: createAt && Between(createAt[0], createAt[1]),
          name: name && Like(`%${name}%`),
          realname: realname && Like(`%${realname}%`),
          updateAt: updateAt && Between(updateAt[0], updateAt[1]),
          enable: enable && !!enable,
          isDelete: false,
        },
        take: size,
        skip: offset,
        order: {
          id: 'DESC',
        },
      });
      const userList = plainToInstance(
        ExportUserListDto,
        { list, totalCount },
        {
          excludeExtraneousValues: true,
        },
      );
      return userList;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('查找用户列表失败');
    }
  }

  /**
   * @method 删除用户
   * @param id 用户id
   */
  async remove(id: number) {
    this.judgeCanDo(id);
    try {
      //
    } catch (error) {
      //
    }
  }

  /**
   * 判断是否可以操作
   * @param id
   * @returns
   */
  judgeCanDo(id: number) {
    if (id <= 1) {
      throw new ForbiddenException('系统用户不能操作');
    }
  }
}
