import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserPermissions } from 'src/iam/authorization/enum/user.permission';
import { Permission } from 'src/permission/entities/permission.entity';

@Injectable()
export class PermissionSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const permissionRepository = dataSource.getRepository(Permission);
    await dataSource.query(
      `TRUNCATE TABLE "permission" RESTART IDENTITY CASCADE`,
    );

    const permissions = Object.values(UserPermissions).map((permission) => ({
      name: permission,
    }));

    await permissionRepository.save(permissions);
    console.log('Seeding Permissions......');
  }
}
