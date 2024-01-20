import { Compartment } from 'src/compartment/entities/compartment.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
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

  @BeforeInsert() // ограничение на дату (прием < списание)
  @BeforeUpdate()
  validateDates() {
    if (
      this.receipt_date &&
      this.date_of_write_off &&
      this.receipt_date >= this.date_of_write_off
    ) {
      throw new Error(
        'Receipt date must be strictly less than date of write off',
      );
    }
  }

  @Column({ type: 'enum', enum: StatusType, default: StatusType.NotPlaced })
  status: StatusType;

  @Column({ nullable: true })
  compartment_id: number | null;

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
