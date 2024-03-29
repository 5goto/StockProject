import { Module } from '@nestjs/common';

import { CompartmentModule } from './compartment/compartment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/pg.config';
import { PlacementModule } from './placement/placement.module';
import { ConditionsModule } from './conditions/conditions.module';
import { UnitModule } from './unit/unit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    CompartmentModule,
    PlacementModule,
    ConditionsModule,
    UnitModule,
  ],
})
export class AppModule {}
