import React from 'react';
import { ConditionsType } from './CompartmentList';
import styles from './Compartment.module.css';
import { useDispatch } from 'react-redux';
import { setCompartment } from './compartmentSlice';
import { RequestType, setRequestType } from '../product/productSlice';

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
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setCompartment(id));
    dispatch(setRequestType(RequestType.COMPARTMENT));
  };

  return (
    <div className={styles.compartment} onClick={onClickHandler}>
      {id} {capacity} {conditions_type}
    </div>
  );
};
