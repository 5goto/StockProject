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

  async findAllProductInfoByCompartmentId(compartment_id: number) {
    return this.unitRepo
      .createQueryBuilder('unit')
      .select([
        'unit.unit_id',
        'unit.init_capacity',
        'unit.receipt_date',
        'unit.date_of_write_off',
        'unit.status',
        'unit.compartment_id',
        'product.product_name',
        'condition.conditions_type',
      ])
      .leftJoin('unit.product', 'product')
      .leftJoin('product.conditions', 'condition')
      .where(`unit.compartment_id = ${compartment_id}`)
      .getRawMany();
  }

  async findAll() {
    return this.unitRepo
      .createQueryBuilder('unit')
      .select([
        'unit.unit_id',
        'unit.init_capacity',
        'unit.receipt_date',
        'unit.date_of_write_off',
        'unit.status',
        'unit.compartment_id',
        'product.product_name',
        'condition.conditions_type',
      ])
      .leftJoin('unit.product', 'product')
      .leftJoin('product.conditions', 'condition')
      .getRawMany();
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
