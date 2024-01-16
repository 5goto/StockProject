import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepo: Repository<Unit>,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    try {
      const result = this.unitRepo.create(createUnitDto);
      return await this.unitRepo.save(result);
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    return this.unitRepo.find();
  }

  async findOne(unit_id: number) {
    const unit = await this.unitRepo.findOne({ where: { unit_id } });
    if (!unit) {
      throw new NotFoundException(`Product #${unit_id} not found`);
    }
    return unit;
  }

  async update(unit_id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.unitRepo.preload({
      unit_id,
      ...updateUnitDto,
    });
    if (!unit) {
      throw new NotFoundException(`Product #${unit_id} not found`);
    }
    return await this.unitRepo.save(unit);
  }

  async remove(unit_id: number) {
    const product = await this.unitRepo.findOne({ where: { unit_id } });
    return this.unitRepo.remove(product);
  }
}
