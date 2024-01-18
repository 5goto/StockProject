import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../UI/dndTypes';
import { StatusType } from '../../api/unit';
import { ConditionsType } from '../compartment/CompartmentList';
import styles from './Product.module.css';

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
    item: { type: ItemTypes.PRODUCT, id },
    name: 'product',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={styles.product}
      ref={drag}
      style={{
        opacity: collected.isDragging ? 0.5 : 1,
        cursor: 'move',
      }}>
      <div>
        {id}, {product_name}, {capacity}, {receipt_date as unknown as string},{' '}
        {date_of_write_off as unknown as string} {unit_status} {conditions_type}
      </div>
      <button>Подробнее</button>
    </div>
  );
};
