import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { safeError } from 'src/helper/safe-error.helper';
import { runInTransaction } from 'src/helper/transaction.helper';
import { Repository } from 'typeorm';
import { CreateMemberTypeDto } from './dto/create-member-type.dto';
import { UpdateMemberTypeDto } from './dto/update-member-type.dto';
import { MemberType } from './entities/member-type.entity';

@Injectable()
export class MemberTypeService {
  constructor(
    @InjectRepository(MemberType)
    private readonly memberTypeRepository: Repository<MemberType>,
  ) {}
  async create(createMemberTypeDto: CreateMemberTypeDto): Promise<MemberType> {
    const [memberTypeExists] = await safeError(
      this.memberTypeRepository.exists({
        where: { memberType: createMemberTypeDto.memberType },
      }),
    );
    if (memberTypeExists)
      throw new ConflictException(
        `Member type ${createMemberTypeDto.memberType} already exists`,
      );

    const memberType = new MemberType();
    memberType.memberType = createMemberTypeDto.memberType;
    return runInTransaction(async (queryRunner) =>
      queryRunner.manager.save(MemberType, memberType),
    );
  }

  async findAll(): Promise<MemberType[]> {
    const [memberTypes, error] = await safeError(
      this.memberTypeRepository.find(),
    );
    if (memberTypes.length === 0)
      throw new NotFoundException('No member types found');
    if (error)
      throw new InternalServerErrorException(
        'Error While fetching member types',
      );
    return memberTypes;
  }

  async findOne(id: number): Promise<MemberType> {
    const [memberType, error] = await safeError(
      this.memberTypeRepository.findOneByOrFail({ id }),
    );
    if (!memberType) {
      throw new NotFoundException('Member type not found');
    }
    if (error) {
      throw new InternalServerErrorException(
        'Error while fetching member type',
      );
    }
    return memberType;
  }

  async update(id: number, updateMemberTypeDto: UpdateMemberTypeDto) {
    const memberType = await this.findOne(id);
    if (updateMemberTypeDto.memberType !== memberType.memberType) {
      const [memberTypeExists] = await safeError(
        this.memberTypeRepository.findOne({
          where: { memberType: updateMemberTypeDto.memberType },
        }),
      );
      if (memberTypeExists) {
        throw new ConflictException(
          `Member type ${updateMemberTypeDto.memberType} already exists`,
        );
      }
      memberType.memberType = updateMemberTypeDto.memberType;
    }
    return runInTransaction(async (queryRunner) =>
      queryRunner.manager.save(MemberType, memberType),
    );
  }

  async remove(id: number) {
    const memberType = await this.findOne(id);
    runInTransaction(async (queryRunner) => {
      await queryRunner.manager.softRemove(MemberType, memberType);
    });
    return `${memberType.memberType} member type deleted successfully`;
  }
}
