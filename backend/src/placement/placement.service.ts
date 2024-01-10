import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Placement } from './entities/placement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlacementService {
  constructor(
    @InjectRepository(Placement)
    private placementRepo: Repository<Placement>,
  ) {}

  async create(dto: CreatePlacementDto) {
    try {
      const result = this.placementRepo.create(dto);
      return await this.placementRepo.save(result);
    } catch (e) {
      console.log(e);
    }
  }

  findAll() {
    return this.placementRepo.find();
  }

  async findOne(id: number) {
    const placement = await this.placementRepo.findOne({ where: { id } });
    if (!placement) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return placement;
  }

  async update(id: number, updatePlacementDto: UpdatePlacementDto) {
    const placement = await this.placementRepo.preload({
      id,
      ...updatePlacementDto,
    });
    if (!placement) {
      throw new NotFoundException(`Placement #${id} not found`);
    }
    return await this.placementRepo.save(placement);
  }

  async remove(id: number) {
    const placement = await this.placementRepo.findOne({ where: { id } });
    return this.placementRepo.remove(placement);
  }
}
