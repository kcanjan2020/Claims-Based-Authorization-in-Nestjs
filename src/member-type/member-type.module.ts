import { Module } from '@nestjs/common';
import { MemberTypeService } from './member-type.service';
import { MemberTypeController } from './member-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberType } from './entities/member-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberType])],
  controllers: [MemberTypeController],
  providers: [MemberTypeService],
})
export class MemberTypeModule {}
