"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const safe_error_helper_1 = require("../helper/safe-error.helper");
const transaction_helper_1 = require("../helper/transaction.helper");
const typeorm_2 = require("typeorm");
const member_type_entity_1 = require("./entities/member-type.entity");
let MemberTypeService = class MemberTypeService {
    constructor(memberTypeRepository) {
        this.memberTypeRepository = memberTypeRepository;
    }
    async create(createMemberTypeDto) {
        const [memberTypeExists] = await (0, safe_error_helper_1.safeError)(this.memberTypeRepository.exists({
            where: { memberType: createMemberTypeDto.memberType },
        }));
        if (memberTypeExists)
            throw new common_1.ConflictException(`Member type ${createMemberTypeDto.memberType} already exists`);
        const memberType = new member_type_entity_1.MemberType();
        memberType.memberType = createMemberTypeDto.memberType;
        return (0, transaction_helper_1.runInTransaction)(async (queryRunner) => queryRunner.manager.save(member_type_entity_1.MemberType, memberType));
    }
    async findAll() {
        const [memberTypes, error] = await (0, safe_error_helper_1.safeError)(this.memberTypeRepository.find());
        if (memberTypes.length === 0)
            throw new common_1.NotFoundException('No member types found');
        if (error)
            throw new common_1.InternalServerErrorException('Error While fetching member types');
        return memberTypes;
    }
    async findOne(id) {
        const [memberType, error] = await (0, safe_error_helper_1.safeError)(this.memberTypeRepository.findOneByOrFail({ id }));
        if (!memberType) {
            throw new common_1.NotFoundException('Member type not found');
        }
        if (error) {
            throw new common_1.InternalServerErrorException('Error while fetching member type');
        }
        return memberType;
    }
    async update(id, updateMemberTypeDto) {
        const memberType = await this.findOne(id);
        if (updateMemberTypeDto.memberType !== memberType.memberType) {
            const [memberTypeExists] = await (0, safe_error_helper_1.safeError)(this.memberTypeRepository.findOne({
                where: { memberType: updateMemberTypeDto.memberType },
            }));
            if (memberTypeExists) {
                throw new common_1.ConflictException(`Member type ${updateMemberTypeDto.memberType} already exists`);
            }
            memberType.memberType = updateMemberTypeDto.memberType;
        }
        return (0, transaction_helper_1.runInTransaction)(async (queryRunner) => queryRunner.manager.save(member_type_entity_1.MemberType, memberType));
    }
    async remove(id) {
        const memberType = await this.findOne(id);
        (0, transaction_helper_1.runInTransaction)(async (queryRunner) => {
            await queryRunner.manager.softRemove(member_type_entity_1.MemberType, memberType);
        });
        return `${memberType.memberType} member type deleted successfully`;
    }
};
exports.MemberTypeService = MemberTypeService;
exports.MemberTypeService = MemberTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_type_entity_1.MemberType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MemberTypeService);
//# sourceMappingURL=member-type.service.js.map