import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 15, { message: 'Role name must be between 3 and 15 characters' })
  name: string;

  @IsOptional()
  @IsArray({ message: 'Permission must be an array of strings' })
  @IsString({ each: true, message: 'Each Permission must be a string' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value.split(',').map((role) => role.trim());
      }
    }
    return value;
  })
  permissions?: string[];
}
