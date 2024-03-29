import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Condition } from './entities/condition.entity';

@Injectable()
export class ConditionsService {
  constructor(
    @InjectRepository(Condition)
    private conditionRepo: Repository<Condition>,
  ) {}

  async create(createConditionDto: CreateConditionDto) {
    try {
      const result = this.conditionRepo.create(createConditionDto);
      return await this.conditionRepo.save(result);
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    return this.conditionRepo.find();
  }

  async findOne(conditions_id: number) {
    const condition = await this.conditionRepo.findOne({
      where: { conditions_id },
    });
    if (!condition) {
      throw new NotFoundException(`Condition #${conditions_id} not found`);
    }
    return condition;
  }

  async update(id: number, updateConditionDto: UpdateConditionDto) {
    const condition = await this.conditionRepo.preload({
      id,
      ...updateConditionDto,
    });
    if (!condition) {
      throw new NotFoundException(`Condition #${id} not found`);
    }
    return await this.conditionRepo.save(condition);
  }

  async remove(conditions_id: number) {
    const condition = await this.conditionRepo.findOne({
      where: { conditions_id },
    });
    return this.conditionRepo.remove(condition);
  }
}
