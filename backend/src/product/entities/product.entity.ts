import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Compartment } from 'src/compartment/entities/compartment.entity';
import { Condition } from 'src/conditions/entities/condition.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column({ type: 'date' })
  receiptDate: Date;

  @Column()
  shelfLifeDays: number;

  @ManyToOne(() => Condition, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conditions_id' })
  conditions: Condition;

  @ManyToOne(() => Compartment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compartment_id' })
  compartment: Compartment;
}
