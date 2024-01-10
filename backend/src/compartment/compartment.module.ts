import { Module } from '@nestjs/common';
import { CompartmentService } from './compartment.service';
import { CompartmentController } from './compartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compartment } from './entities/compartment.entity';

@Module({
  controllers: [CompartmentController],
  imports: [TypeOrmModule.forFeature([Compartment])],
  providers: [CompartmentService],
})
export class CompartmentModule {}
