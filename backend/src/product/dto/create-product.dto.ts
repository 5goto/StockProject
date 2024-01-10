import { CreateCompartmentDto } from 'src/compartment/dto/create-compartment.dto';
import { CreateConditionDto } from 'src/conditions/dto/create-condition.dto';

export class CreateProductDto {
  id: number;
  name: string;
  capacity: number;
  receiptDate: Date;
  shelfLifeDays: number;
  conditions: CreateConditionDto;
  compartment: CreateCompartmentDto;
}
