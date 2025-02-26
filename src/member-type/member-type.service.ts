import { Injectable } from '@nestjs/common';
import { CreateMemberTypeDto } from './dto/create-member-type.dto';
import { UpdateMemberTypeDto } from './dto/update-member-type.dto';

@Injectable()
export class MemberTypeService {
  create(createMemberTypeDto: CreateMemberTypeDto) {
    return 'This action adds a new memberType';
  }

  findAll() {
    return `This action returns all memberType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberType`;
  }

  update(id: number, updateMemberTypeDto: UpdateMemberTypeDto) {
    return `This action updates a #${id} memberType`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberType`;
  }
}
