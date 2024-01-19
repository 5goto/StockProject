import { ConditionsType } from '../entities/condition.entity';

export class CreateConditionDto {
  id?: number;
  conditions_type: ConditionsType;
}
