import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/entities/common.entity';
import { MemberType } from 'src/member-type/entities/member-type.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';

@Entity('user')
export class User extends CommonEntity {
  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  @Index()
  email: string;

  @Exclude()
  @Column({ name: 'password', type: 'varchar', select: false })
  password: string;

  @Column({ name: 'profile_picture', type: 'varchar', nullable: true })
  profilePicture: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @ManyToMany(() => MemberType, (memberType) => memberType.users)
  memberTypes: MemberType;
}
