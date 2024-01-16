import { Compartment } from 'src/compartment/entities/compartment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Placement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placement_floor: number;

  @Column({ length: 255 })
  placement_name: string;

  @OneToMany(() => Compartment, (compartment) => compartment.placement)
  compartments: Compartment[];
}
