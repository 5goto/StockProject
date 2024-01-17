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

export const Product: React.FC<ProductProps> = ({
  id,
  capacity,
  receipt_date,
  date_of_write_off,
  unit_status,
  product_name,
  conditions_type,
}) => {
  return (
    <div className={styles.product}>
      <div>
        {id}, {product_name}, {capacity}, {receipt_date as unknown as string},{' '}
        {date_of_write_off as unknown as string} {unit_status} {conditions_type}
      </div>
      <button>Подробнее</button>
    </div>
  );
};
