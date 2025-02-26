import { MemberTypeService } from './member-type.service';
import { CreateMemberTypeDto } from './dto/create-member-type.dto';
import { UpdateMemberTypeDto } from './dto/update-member-type.dto';
export declare class MemberTypeController {
    private readonly memberTypeService;
    constructor(memberTypeService: MemberTypeService);
    create(createMemberTypeDto: CreateMemberTypeDto): Promise<import("./entities/member-type.entity").MemberType>;
    findAll(): Promise<import("./entities/member-type.entity").MemberType[]>;
    findOne(id: string): Promise<import("./entities/member-type.entity").MemberType>;
    update(id: string, updateMemberTypeDto: UpdateMemberTypeDto): Promise<import("./entities/member-type.entity").MemberType>;
    remove(id: string): Promise<string>;
}
