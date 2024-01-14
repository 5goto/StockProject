import React from 'react';

export enum ConditionsType {
  Flammable = 'flammable',
  Frozen = 'frozen',
  Fragile = 'fragile',
}

export interface CompartmentProps {
  id?: string;
  capacity: number;
  condition: ConditionsType;
}

export const Compartment: React.FC<CompartmentProps> = ({
  capacity,
  condition,
}) => {
  return (
    <div>
      <span>{capacity}</span>
      <span>{condition}</span>
    </div>
  );
};
