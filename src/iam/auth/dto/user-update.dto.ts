import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { SignUpDto } from './sign-up.dto';
import { Match } from '../decorator/match.decorator';

export class UserUpdateDto extends PartialType(SignUpDto) {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @IsString()
  @IsOptional()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  profilePicture?: any;
}
