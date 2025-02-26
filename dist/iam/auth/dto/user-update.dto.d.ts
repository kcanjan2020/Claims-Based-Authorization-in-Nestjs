import { SignUpDto } from './sign-up.dto';
declare const UserUpdateDto_base: import("@nestjs/common").Type<Partial<SignUpDto>>;
export declare class UserUpdateDto extends UserUpdateDto_base {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    profilePicture?: any;
}
export {};
