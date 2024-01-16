import { CreateCompartmentDto } from 'src/compartment/dto/create-compartment.dto';
import { CreateConditionDto } from 'src/conditions/dto/create-condition.dto';

export class CreateProductDto {
  product_id: number;
  product_name: string;

  conditions: CreateConditionDto;
  compartment: CreateCompartmentDto;
}
