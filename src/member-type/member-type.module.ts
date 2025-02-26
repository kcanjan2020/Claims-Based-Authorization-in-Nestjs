import { Module } from '@nestjs/common';
import { MemberTypeService } from './member-type.service';
import { MemberTypeController } from './member-type.controller';

@Module({
  controllers: [MemberTypeController],
  providers: [MemberTypeService],
})
export class MemberTypeModule {}
