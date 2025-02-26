import { PartialType } from '@nestjs/swagger';
import { CreateMemberTypeDto } from './create-member-type.dto';

export class UpdateMemberTypeDto extends PartialType(CreateMemberTypeDto) {}
