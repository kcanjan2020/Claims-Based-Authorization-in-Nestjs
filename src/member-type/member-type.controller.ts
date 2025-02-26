import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberTypeService } from './member-type.service';
import { CreateMemberTypeDto } from './dto/create-member-type.dto';
import { UpdateMemberTypeDto } from './dto/update-member-type.dto';

@Controller('member-type')
export class MemberTypeController {
  constructor(private readonly memberTypeService: MemberTypeService) {}

  @Post()
  create(@Body() createMemberTypeDto: CreateMemberTypeDto) {
    return this.memberTypeService.create(createMemberTypeDto);
  }

  @Get()
  findAll() {
    return this.memberTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberTypeDto: UpdateMemberTypeDto) {
    return this.memberTypeService.update(+id, updateMemberTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberTypeService.remove(+id);
  }
}
