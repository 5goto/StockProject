import React from 'react';
// import { CompartmentType } from '../../api/compartment';
import { ConditionsType } from './CompartmentList';

interface CompartmentProps {
  id: number;
  capacity: number;
  conditions_type: ConditionsType;
}

export const Compartment: React.FC<CompartmentProps> = ({
  id,
  capacity,
  conditions_type,
}) => {
  return (
    <div>
      {id} {capacity} {conditions_type}
    </div>
  );
};
