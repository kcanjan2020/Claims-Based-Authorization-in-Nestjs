import { MemberTypeService } from './member-type.service';
import { CreateMemberTypeDto } from './dto/create-member-type.dto';
import { UpdateMemberTypeDto } from './dto/update-member-type.dto';
export declare class MemberTypeController {
    private readonly memberTypeService;
    constructor(memberTypeService: MemberTypeService);
    create(createMemberTypeDto: CreateMemberTypeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMemberTypeDto: UpdateMemberTypeDto): string;
    remove(id: string): string;
}
