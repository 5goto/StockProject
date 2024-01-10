import { Module } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { ConditionsController } from './conditions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition } from './entities/condition.entity';

@Module({
  controllers: [ConditionsController],
  imports: [TypeOrmModule.forFeature([Condition])],
  providers: [ConditionsService],
})
export class ConditionsModule {}
