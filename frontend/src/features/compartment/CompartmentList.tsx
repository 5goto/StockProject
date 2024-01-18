import { UseQueryResult, useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  CompartmentType,
  getCompartmentsByPlacement,
} from '../../api/compartment';
import { Compartment } from './Compartment';
import { useDispatch } from 'react-redux';
import { closeTab } from './compartmentSlice';
import styles from './CompartmentList.module.css';

export enum ConditionsType {
  Flammable = 'flammable',
  Frozen = 'frozen',
  Fragile = 'fragile',
}

export interface CompartmentProps {
  placementId: number;
  index: number;
}

export const CompartmentList: React.FC<CompartmentProps> = ({
  placementId,
  index,
}) => {
  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<Array<CompartmentType>, Error> = useQuery({
    queryKey: [`placement_${placementId}`],
    queryFn: () => getCompartmentsByPlacement(placementId),
  });

  const dispatch = useDispatch();

  const onCloseClickHandler = () => {
    dispatch(closeTab(index));
  };

  if (isLoading) {
    return (
      <div>
        <h2 onClick={onCloseClickHandler} style={{ cursor: 'pointer' }}>
          X
        </h2>
        <h3>Loading...</h3>;
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2 onClick={onCloseClickHandler} style={{ cursor: 'pointer' }}>
          X
        </h2>
        <h3> Error fetching data</h3>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div>
        <h2 onClick={onCloseClickHandler} style={{ cursor: 'pointer' }}>
          X
        </h2>
        <h2>Empty placement...</h2>
      </div>
    );
  }

  return (
    <div className={styles.placementView}>
      <div className={styles.placementViewTop}>
        <h2>Список помещений</h2>
        <h2 onClick={onCloseClickHandler} style={{ cursor: 'pointer' }}>
          X
        </h2>
      </div>
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
