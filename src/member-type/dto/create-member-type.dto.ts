import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMemberTypeDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 25, { message: 'Member type must be between 2 and 20 characters' })
  memberType: string;
}
