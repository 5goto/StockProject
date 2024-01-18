import React, { useCallback } from 'react';
import { ConditionsType } from './CompartmentList';
import styles from './Compartment.module.css';
import { useDispatch } from 'react-redux';
import { setCompartment } from './compartmentSlice';
import { RequestType, setRequestType } from '../product/productSlice';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../UI/dndTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductCompartment } from '../../api/unit';
import { dropProp } from '../product/Product';
import fire from '../../assets/flammable.png';
import frozen from '../../assets/frozen.png';
import fragile from '../../assets/fragile.png';

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

  const updateProductMutation = useMutation({
    mutationFn: updateProductCompartment,
    onSuccess: () => {
      console.log('Request done!');
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const queryClient = useQueryClient();

  const handleDrop = useCallback(
    (productId: string) => {
      updateProductMutation.mutate({
        productId,
        compartmentId: id as unknown as string,
      });
      queryClient.invalidateQueries();
    },
    [updateProductMutation, id, queryClient]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PRODUCT,
    drop: (item: dropProp) => handleDrop(item.id),
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

  const filledPercentage = (40 / capacity) * 100;

  return (
    <div
      ref={drop}
      className={styles.compartment}
      onClick={onClickHandler}
      style={{ backgroundColor: backgroundColor }}>
      <div>
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
      <div>Размер отсека: {capacity} </div>
      <div
        style={{
          width: '100%',
          backgroundColor: '#f2f2f2',
          borderRadius: '4px',
          overflow: 'hidden',
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
