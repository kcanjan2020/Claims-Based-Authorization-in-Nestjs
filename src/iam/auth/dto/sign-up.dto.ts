import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from '../decorator/match.decorator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20, { message: 'First name must be between 2 and 20 characters' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20, { message: 'Last name must be between 2 and 20 characters' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+977-9\d{9}$/, {
    message: 'Invalid Nepali phone number format. Use +977-9XXXXXXXXX',
  })
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  profilePicture?: any;

  @IsOptional()
  @IsArray({ message: 'Roles must be an array of strings' })
  @IsString({ each: true, message: 'Each role must be a string' })
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
  roles?: string[];

  @IsOptional()
  @IsArray({ message: 'Member types must be an array of strings' })
  @IsString({ each: true, message: 'Each member type must be a string' })
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
  memberTypes?: string[];
}
