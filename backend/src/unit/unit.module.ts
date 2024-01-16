import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';

@Module({
  controllers: [UnitController],
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [UnitService],
})
export class UnitModule {}
