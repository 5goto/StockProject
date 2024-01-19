import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Condition } from 'src/conditions/entities/condition.entity';
import { Unit } from 'src/unit/entities/unit.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ length: 255 })
  product_name: string;

  // @Column()
  // conditions_id: number;

  @ManyToOne(() => Condition, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conditions_id' })
  conditions: Condition;

  @ManyToOne(() => Unit, (unit) => unit.unit_id)
  unit: Unit;
}
