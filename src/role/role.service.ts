import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { safeError } from 'src/helper/safe-error.helper';
import { Permission } from 'src/permission/entities/permission.entity';
import { runInTransaction } from 'src/helper/transaction.helper';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = new Role();

    if (createRoleDto.permissions) {
      const [assignedPermissions, err] = await safeError(
        this.permissionRepository.find({
          where: { name: In(createRoleDto.permissions) },
        }),
      );
      if (assignedPermissions.length === 0) {
        throw new BadRequestException('Invalid permissions');
      }
      if (err) {
        throw new InternalServerErrorException(
          'Error while fetching permissions',
        );
      }
      newRole.permissions = assignedPermissions;
    }
    newRole.name = createRoleDto.name;
    try {
      const role = await this.roleRepository.save(newRole);
      return role;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          ` ${createRoleDto.name} Role already exists`,
        );
      }
      throw new InternalServerErrorException('Error while creating role');
    }
  }
  async findAll(): Promise<Role[]> {
    const [roles, error] = await safeError(this.roleRepository.find());
    if (roles.length === 0) {
      throw new NotFoundException('No roles found');
    }
    if (error) {
      throw new InternalServerErrorException('Error while fetching roles');
    }
    return roles;
  }

  async findOne(id: number): Promise<Role> {
    const [res, error] = await safeError(
      this.roleRepository.findOneByOrFail({ id }),
    );
    if (!res) {
      throw new NotFoundException('Role not found');
    }
    if (error) {
      throw new InternalServerErrorException('Error while fetching role');
    }
    return res;
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role | UpdateResult> {
    const role = await this.findOne(id);
    if (updateRoleDto.name !== role.name) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: updateRoleDto.name },
      });
      if (existingRole) {
        throw new BadRequestException(
          `Role ${updateRoleDto.name} already exists`,
        );
      }
      role.name = updateRoleDto.name;
    }
    if (updateRoleDto.permissions) {
      const [assignedPermissions, err] = await safeError(
        this.permissionRepository.find({
          where: { name: In(updateRoleDto.permissions) },
        }),
      );
      if (assignedPermissions.length === 0) {
        throw new BadRequestException('Invalid permissions');
      }
      if (err) {
        throw new InternalServerErrorException(
          'Error while fetching permissions',
        );
      }
      role.permissions = assignedPermissions;
    }

    return runInTransaction(async (queryRunner) =>
      queryRunner.manager.save(Role, role),
    );
  }

  async remove(id: number): Promise<string> {
    const role = await this.findOne(id);
    const [res, error] = await safeError(this.roleRepository.remove(role));
    if (error) {
      console.log('fsdfsa', error);

      throw new InternalServerErrorException('Error while deleting role');
    }
    return `${role.name} Role deleted successfully`;
  }
}
