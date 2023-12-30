import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/Base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, comment: '用户名' })
  name: string;
  @Column({ comment: '真实姓名', nullable: true })
  realname: string;
  @Column({ comment: '密码' })
  password: string;
  @Column({ comment: '手机号码', nullable: true })
  phone: string;
  @Column({ comment: 'ip', nullable: true, select: false })
  ip: string;
}
