import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Auth } from 'src/iam/auth/decorator/auth.decorator';
import { AuthType } from 'src/iam/auth/enums/auth-type.enum';

export const PERMISSIONS_KEY = 'permissions';

export const RequirePermissions = (...permissions: string[]) => {
  return applyDecorators(
    Auth(permissions.length !== 0 ? AuthType.Bearer : AuthType.None),
    SetMetadata(PERMISSIONS_KEY, permissions),
  );
};
