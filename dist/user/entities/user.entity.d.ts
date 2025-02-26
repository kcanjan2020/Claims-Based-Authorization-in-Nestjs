import { CommonEntity } from 'src/entities/common.entity';
import { Role } from 'src/role/entities/role.entity';
export declare class User extends CommonEntity {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    profilePicture: string;
    roles: Role[];
}
