import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../UI/dndTypes';
import { StatusType } from '../../api/unit';
import { ConditionsType } from '../compartment/CompartmentList';
import styles from './Product.module.css';
import fire from '../../assets/flammable.png';
import frozen from '../../assets/frozen.png';
import fragile from '../../assets/fragile.png';

export interface ProductProps {
  id: number;
  capacity: number;
  receipt_date: Date;
  date_of_write_off: Date;
  unit_status: StatusType;
  product_name: string;
  conditions_type: ConditionsType;
}

export interface dropProp {
  type: unknown;
  id: string;
  capacity: number;
  conditions_type: ConditionsType;
}

export const Product: React.FC<ProductProps> = ({
  id,
  capacity,
  receipt_date,
  date_of_write_off,
  unit_status,
  product_name,
  conditions_type,
}) => {
  const [collected, drag] = useDrag(() => ({
    type: ItemTypes.PRODUCT,
    item: { type: ItemTypes.PRODUCT, id, capacity, conditions_type },
    name: 'product',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const rDate = new Date(receipt_date);
  const offDate = new Date(date_of_write_off);

  let statusStyleClass = '';
  switch (unit_status) {
    case StatusType.Placed:
      statusStyleClass = styles.placed;
      break;
    case StatusType.NotPlaced:
      statusStyleClass = styles.notPlaced;
      break;
    case StatusType.WrittenOff:
      statusStyleClass = styles.writtenOff;
      break;
    default:
      break;
  }

  return (
    <div
      className={styles.product}
      ref={drag}
      style={{
        opacity: collected.isDragging ? 0.5 : 1,
        cursor: 'move',
      }}>
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
      <h3>{product_name}</h3>
      <div className={styles.content}>
        Принято: {rDate.getDate()}/{rDate.getMonth() + 1}/{rDate.getFullYear()}{' '}
      </div>
      <div className={styles.content}>
        Списание: {offDate.getDate()}/{offDate.getMonth() + 1}/
        {offDate.getFullYear()}
      </div>
      <div className={styles.content}>
        Объем: {capacity} m<sup>3</sup>
      </div>
      <div className={statusStyleClass}>
        {unit_status === StatusType.Placed && <p>Размещен</p>}
        {unit_status === StatusType.NotPlaced && <p>Не размещен</p>}
        {unit_status === StatusType.WrittenOff && <p>Списан</p>}
      </div>
    </div>
  );
};
