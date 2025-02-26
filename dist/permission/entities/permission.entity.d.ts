import { CommonEntity } from 'src/entities/common.entity';
import { Role } from 'src/role/entities/role.entity';
export declare class Permission extends CommonEntity {
    name: string;
    roles: Role[];
}
