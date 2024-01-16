import { UseQueryResult, useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  CompartmentType,
  getCompartmentsByPlacement,
} from '../../api/compartment';
import { Compartment } from './Compartment';

export enum ConditionsType {
  Flammable = 'flammable',
  Frozen = 'frozen',
  Fragile = 'fragile',
}

export interface CompartmentProps {
  placementId: number;
}

export const CompartmentList: React.FC<CompartmentProps> = ({
  placementId,
}) => {
  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<Array<CompartmentType>, Error> = useQuery({
    queryKey: [`placement_${placementId}`],
    queryFn: () => getCompartmentsByPlacement(placementId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (data?.length === 0) {
    return <h2>Empty placement...</h2>;
  }

  return (
    <div>
      <h2>Compartments:</h2>
      {data?.map((item: CompartmentType) => (
        <Compartment
          key={item.compartment_id}
          id={item.compartment_id}
          capacity={item.compartment_capacity}
          conditions_type={item.condition_conditions_type}
        />
      ))}
    </div>
  );
};
