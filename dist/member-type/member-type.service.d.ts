import { CreateMemberTypeDto } from './dto/create-member-type.dto';
import { UpdateMemberTypeDto } from './dto/update-member-type.dto';
export declare class MemberTypeService {
    create(createMemberTypeDto: CreateMemberTypeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMemberTypeDto: UpdateMemberTypeDto): string;
    remove(id: number): string;
}
