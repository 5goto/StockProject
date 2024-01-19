import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Product } from 'src/product/entities/product.entity';
import { Compartment } from 'src/compartment/entities/compartment.entity';
import { Condition } from 'src/conditions/entities/condition.entity';

@Module({
  controllers: [UnitController],
  imports: [TypeOrmModule.forFeature([Unit, Product, Compartment, Condition])],
  providers: [UnitService],
})
export class UnitModule {}
