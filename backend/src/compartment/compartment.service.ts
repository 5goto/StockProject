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
    const compartmentCapacities = await this.compartmentRepo
      .createQueryBuilder('compartment')
      .leftJoin('compartment.unit', 'unit')
      .addSelect('compartment.id', 'id')
      .addSelect('compartment.capacity', 'capacity')
      .addSelect('SUM(unit.init_capacity)', 'totalCapacity')
      .groupBy('compartment.id')
      .getRawMany();

    const compartmentConditions = await this.compartmentRepo
      .createQueryBuilder('compartment')
      .innerJoin('compartment.conditions', 'conditions')
      .addSelect('compartment.id', 'id')
      .addSelect('conditions.conditions_type', 'conditionType')
      .getRawMany();

    const compartments = compartmentCapacities.map((capacityItem) => {
      const conditionItem = compartmentConditions.find(
        (item) => item.id === capacityItem.id,
      );
      return {
        id: capacityItem.id,
        capacity: capacityItem.capacity,
        totalCapacity:
          capacityItem.totalCapacity !== null
            ? capacityItem.totalCapacity
            : '0',
        conditionType: conditionItem ? conditionItem.conditionType : null,
      };
    });

    return compartments;
  }

  async findAllByPlacement(placement_id) {
    const compartmentCapacities = await this.compartmentRepo
      .createQueryBuilder('compartment')
      .leftJoin('compartment.unit', 'unit')
      .addSelect('compartment.id', 'id')
      .addSelect('compartment.capacity', 'capacity')
      .addSelect('SUM(unit.init_capacity)', 'totalCapacity')
      .groupBy('compartment.id')
      .where('compartment.placement_id = :placementId', {
        placementId: placement_id,
      })
      .getRawMany();

    const compartmentConditions = await this.compartmentRepo
      .createQueryBuilder('compartment')
      .innerJoin('compartment.conditions', 'conditions')
      .addSelect('compartment.id', 'id')
      .addSelect('conditions.conditions_type', 'conditionType')
      .where('compartment.placement_id = :placementId', {
        placementId: placement_id,
      })
      .getRawMany();

    const compartments = compartmentCapacities.map((capacityItem) => {
      const conditionItem = compartmentConditions.find(
        (item) => item.id === capacityItem.id,
      );
      return {
        id: capacityItem.id,
        capacity: capacityItem.capacity,
        totalCapacity:
          capacityItem.totalCapacity !== null
            ? capacityItem.totalCapacity
            : '0',
        conditionType: conditionItem ? conditionItem.conditionType : null,
      };
    });

    return compartments;
  }

  async findOne(id: number) {
    const compartment = await this.compartmentRepo.findOne({ where: { id } });
    if (!compartment) {
      throw new NotFoundException(`Compartment #${id} not found`);
    }
    return compartment;
  }

  async update(id: number, updateCompartmentDto: UpdateCompartmentDto) {
    const compartment = await this.compartmentRepo.preload({
      id,
      ...updateCompartmentDto,
    });
    if (!compartment) {
      throw new NotFoundException(`Compartment #${id} not found`);
    }
    return await this.compartmentRepo.save(compartment);
  }

  async remove(id: number) {
    const compartment = await this.compartmentRepo.findOne({ where: { id } });
    return this.compartmentRepo.remove(compartment);
  }
}
