import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access-token.guard';
export declare class AuthenticationGuard implements CanActivate {
    private readonly reflector;
    private readonly accessTokenGuard;
    constructor(reflector: Reflector, accessTokenGuard: AccessTokenGuard);
    private static readonly defaultAuthType;
    private readonly authTypeGuardMap;
    canActivate(context: ExecutionContext): Promise<boolean>;
    private runGuards;
}
