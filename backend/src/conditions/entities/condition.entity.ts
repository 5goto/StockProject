import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ConditionsType {
  Flammable = 'flammable',
  Frozen = 'frozen',
  Fragile = 'fragile',
}

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  conditions_id: number;

  @Column({
    type: 'enum',
    enum: ConditionsType,
  })
  conditions_type: ConditionsType;
}
