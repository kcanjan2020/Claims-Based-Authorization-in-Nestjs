import { CommonEntity } from 'src/entities/common.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Role extends CommonEntity {
    name: string;
    permissions: Permission[];
    users: User[];
}
