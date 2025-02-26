export interface ActiveUserData {
    sub: number;
    email: string;
    roles: string[];
    tokenType?: 'access';
}
