import { CommonEntity } from 'src/entities/common.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Permission extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
