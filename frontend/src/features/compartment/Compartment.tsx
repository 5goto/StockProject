import React, { useCallback } from 'react';
import { ConditionsType } from './CompartmentList';
import styles from './Compartment.module.css';
import { useDispatch } from 'react-redux';
import { setCompartment } from './compartmentSlice';
import { RequestType, setRequestType } from '../product/productSlice';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../UI/dndTypes';
import { useMutation } from '@tanstack/react-query';
import { updateProductCompartment } from '../../api/unit';
import { dropProp } from '../product/Product';
import fire from '../../assets/flammable.png';
import frozen from '../../assets/frozen.png';
import fragile from '../../assets/fragile.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CompartmentProps {
  id: number;
  capacity: number;
  conditions_type: ConditionsType;
  totalСapacity: number;
}

export const Compartment: React.FC<CompartmentProps> = ({
  id,
  capacity,
  conditions_type,
  totalСapacity,
}) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setCompartment(id));
    dispatch(setRequestType(RequestType.COMPARTMENT));
  };

  const isItCurrent =
    useSelector((store: RootState) => store.compartment.currentCompartment) ===
    id;

  const updateProductMutation = useMutation({
    mutationFn: updateProductCompartment,
    onSuccess: () => {
      console.log('Request done!');
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleDrop = useCallback(
    (productId: string, productCapacity: number) => {
      if (+totalСapacity + productCapacity <= capacity) {
        updateProductMutation.mutate({
          productId,
          compartmentId: id as unknown as string,
        });
        dispatch(setCompartment(id));
      } else {
        alert('Не хватает места');
      }
    },
    [totalСapacity, capacity, updateProductMutation, id, dispatch]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PRODUCT,
    drop: (item: dropProp) => handleDrop(item.id, item.capacity),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  let backgroundColor = '#ffff';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  if (isItCurrent) {
    backgroundColor = '#FFF8DC';
  }

  const fill = totalСapacity ? totalСapacity : 0;
  const filledPercentage = (fill / capacity) * 100;

  return (
    <div
      ref={drop}
      className={styles.compartment}
      onClick={onClickHandler}
      style={{ backgroundColor: backgroundColor }}>
      <div className={styles.compartmentTypeView}>
        {conditions_type === ConditionsType.Frozen && (
          <img src={frozen} alt="frozen-icon" />
        )}
        {conditions_type === ConditionsType.Flammable && (
          <img src={fire} alt="fire-icon" />
        )}
        {conditions_type === ConditionsType.Fragile && (
          <img src={fragile} alt="fragile-icon" />
        )}
      </div>
      <div className={styles.compartmentSize}>
        Размер: {fill} / {capacity}
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: '#f2f2f2',
          borderRadius: '4px',
          overflow: 'hidden',
          flex: '0 0 60%',
          marginRight: '15px',
        }}>
        <div
          style={{
            width: `${filledPercentage}%`,
            height: '10px',
            backgroundColor: '#007bff',
          }}
        />
      </div>
    </div>
  );
};
