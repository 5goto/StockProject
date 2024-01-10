import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ConditionsType {
  Flammable = 'flammable',
  Frozen = 'frozen',
  Fragile = 'fragile',
}

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conditions_type: ConditionsType;
}
