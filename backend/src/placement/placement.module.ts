import { Module } from '@nestjs/common';
import { PlacementService } from './placement.service';
import { PlacementController } from './placement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Placement } from './entities/placement.entity';

@Module({
  controllers: [PlacementController],
  imports: [TypeOrmModule.forFeature([Placement])],
  providers: [PlacementService],
})
export class PlacementModule {}
