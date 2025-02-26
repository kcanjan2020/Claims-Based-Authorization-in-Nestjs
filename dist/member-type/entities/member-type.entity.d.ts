import { CommonEntity } from 'src/entities/common.entity';
import { User } from 'src/user/entities/user.entity';
export declare class MemberType extends CommonEntity {
    memberType: string;
    users: User[];
}
