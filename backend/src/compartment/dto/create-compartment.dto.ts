import { CreateConditionDto } from 'src/conditions/dto/create-condition.dto';
import { CreatePlacementDto } from 'src/placement/dto/create-placement.dto';

export class CreateCompartmentDto {
  id: number;
  capacity: number;
  conditions_id: number;
  placement_id: number;

  conditions: CreateConditionDto;
  placement: CreatePlacementDto;
}
