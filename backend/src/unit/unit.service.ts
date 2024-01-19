import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusType, Unit } from './entities/unit.entity';
import { Product } from 'src/product/entities/product.entity';
import { Compartment } from 'src/compartment/entities/compartment.entity';
import {
  Condition,
  ConditionsType,
} from 'src/conditions/entities/condition.entity';
import { log } from 'console';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepo: Repository<Unit>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Compartment)
    private compartmentRepo: Repository<Compartment>,
    @InjectRepository(Condition)
    private conditionRepo: Repository<Condition>,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    const {
      init_capacity,
      receipt_date,
      date_of_write_off,
      compartment,
      product,
    } = createUnitDto;

    let existingProduct = await this.productRepository.findOne({
      where: { product_name: product.product_name },
    });

    const existingCondition = await this.conditionRepo.findOne({
      where: { conditions_type: product.conditions.conditions_type },
    });
    product.conditions = existingCondition;

    console.log('product:', product);

    if (!existingProduct) {
      // Если продукт с указанным именем не существует, создаем новый продукт
      existingProduct = this.productRepository.create(product);
      existingProduct = await this.productRepository.save(existingProduct);
    }

    const existingCompart = await this.compartmentRepo.findOne({
      where: { id: compartment.id },
    });

    const unit = this.unitRepo.create({
      init_capacity,
      receipt_date,
      date_of_write_off,
      compartment: existingCompart,
      product: existingProduct,
    });

    console.log(unit);

    return await this.unitRepo.save(unit);
  }

  async findAllNotPlacedProducts() {
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
      .where('unit.status = :status', { status: StatusType.NotPlaced })
      .getRawMany();
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
