import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Placement } from 'src/placement/entities/placement.entity';
import { Condition } from 'src/conditions/entities/condition.entity';
import { Unit } from 'src/unit/entities/unit.entity';

@Entity()
export class Compartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacity: number;

  @Column()
  conditions_id: number;

  @Column()
  placement_id: number;

  @ManyToOne(() => Condition, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conditions_id' })
  conditions: Condition;

  @ManyToOne(() => Placement, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'placement_id' })
  placement: Placement;

  @OneToMany(() => Unit, (unit) => unit.compartment)
  unit: Unit[];
}
