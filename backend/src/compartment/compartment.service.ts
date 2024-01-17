import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompartmentDto } from './dto/create-compartment.dto';
import { UpdateCompartmentDto } from './dto/update-compartment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compartment } from './entities/compartment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompartmentService {
  constructor(
    @InjectRepository(Compartment)
    private compartmentRepo: Repository<Compartment>,
  ) {}

  async create(createCompartmentDto: CreateCompartmentDto) {
    try {
      const result = this.compartmentRepo.create(createCompartmentDto);
      return await this.compartmentRepo.save(result);
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    return this.compartmentRepo.find();
  }

  async findAllByPlacement(placement_id): Promise<Compartment[]> {
    const result = this.compartmentRepo
      .createQueryBuilder('compartment')
      .select([
        'compartment.id',
        'compartment.capacity',
        'condition.conditions_type',
      ])
      .leftJoin('compartment.conditions', 'condition')
      .where(`compartment.placement_id = ${placement_id}`)
      .getRawMany();
    return result;
  }

  async findOne(id: number) {
    const compartment = await this.compartmentRepo.findOne({ where: { id } });
    if (!compartment) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return compartment;
  }

  async update(id: number, updateCompartmentDto: UpdateCompartmentDto) {
    const compartment = await this.compartmentRepo.preload({
      id,
      ...updateCompartmentDto,
    });
    if (!compartment) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return await this.compartmentRepo.save(compartment);
  }

  async remove(id: number) {
    const compartment = await this.compartmentRepo.findOne({ where: { id } });
    return this.compartmentRepo.remove(compartment);
  }
}
