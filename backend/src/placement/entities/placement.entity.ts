import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Placement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placement_floor: number;

  @Column()
  placement_name: string;
}
