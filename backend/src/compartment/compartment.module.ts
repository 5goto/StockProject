import { Module } from '@nestjs/common';
import { CompartmentService } from './compartment.service';
import { CompartmentController } from './compartment.controller';

@Module({
  controllers: [CompartmentController],
  providers: [CompartmentService],
})
export class CompartmentModule {}
