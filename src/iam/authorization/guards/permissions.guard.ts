import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { ActiveUserData } from 'src/iam/interface/active-user-data.interface';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user: ActiveUserData = request[REQUEST_USER_KEY];

    const userRoles = user?.roles ?? [];

    if (userRoles.length === 0) {
      return false;
    }

    const roles = await this.roleRepository.find({
      where: { name: In(userRoles) },
      relations: ['permissions'],
    });

    const userPermissions = [
      ...new Set(
        roles.flatMap((role) =>
          role.permissions.map((permission) => permission.name),
        ),
      ),
    ];
    return requiredPermission.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}
