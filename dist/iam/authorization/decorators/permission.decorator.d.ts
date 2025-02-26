export declare const PERMISSIONS_KEY = "permissions";
export declare const RequirePermissions: (...permissions: string[]) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
