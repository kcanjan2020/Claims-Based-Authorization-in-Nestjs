import { Repository } from 'typeorm';
import { CreateMemberTypeDto } from './dto/create-member-type.dto';
import { UpdateMemberTypeDto } from './dto/update-member-type.dto';
import { MemberType } from './entities/member-type.entity';
export declare class MemberTypeService {
    private readonly memberTypeRepository;
    constructor(memberTypeRepository: Repository<MemberType>);
    create(createMemberTypeDto: CreateMemberTypeDto): Promise<MemberType>;
    findAll(): Promise<MemberType[]>;
    findOne(id: number): Promise<MemberType>;
    update(id: number, updateMemberTypeDto: UpdateMemberTypeDto): Promise<MemberType>;
    remove(id: number): Promise<string>;
}
