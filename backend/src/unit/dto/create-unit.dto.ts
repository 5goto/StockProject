import { CreateCompartmentDto } from 'src/compartment/dto/create-compartment.dto';
import { StatusType } from '../entities/unit.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

export class CreateUnitDto {
  init_capacity: number;
  receipt_date: Date;
  date_of_write_off: Date;
  status: StatusType;
  compartment: CreateCompartmentDto;
  product: CreateProductDto;
}
