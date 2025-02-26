import { CommonEntity } from 'src/entities/common.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Role extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
  users: User[];
}
