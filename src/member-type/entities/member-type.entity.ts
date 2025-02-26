import { CommonEntity } from 'src/entities/common.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class MemberType extends CommonEntity {
  @Column({ name: 'member_type', type: 'varchar', unique: true })
  memberType: string;

  @ManyToMany(() => User, (user) => user.memberTypes, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'user_member_type',
    joinColumn: { name: 'member_type_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];
}
