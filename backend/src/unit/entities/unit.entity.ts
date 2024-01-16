import { Compartment } from 'src/compartment/entities/compartment.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum StatusType {
  NotPlaced = 'not_placed',
  Placed = 'placed',
  WrittenOff = 'written-off',
}

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  unit_id: number;

  @Column()
  init_capacity: number;

  @Column({ type: 'date', nullable: true })
  receipt_date: Date;

  @Column({ type: 'date', nullable: true })
  date_of_write_off: Date;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.NotPlaced })
  status: StatusType;

  @Column()
  compartment_id: number;

  @Column()
  product_id: number;

  @ManyToOne(() => Compartment, (compartment) => compartment.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'compartment_id' })
  compartment: Compartment;

  @ManyToOne(() => Product, (product) => product.product_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
