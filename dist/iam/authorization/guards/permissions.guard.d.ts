import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
export declare class PermissionGuard implements CanActivate {
    private reflector;
    private readonly roleRepository;
    constructor(reflector: Reflector, roleRepository: Repository<Role>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
