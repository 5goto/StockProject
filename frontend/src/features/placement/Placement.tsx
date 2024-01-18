import { useDispatch } from 'react-redux';
import { addTab } from '../compartment/compartmentSlice';
import styles from './Placement.module.css';

export interface PlacementsData {
  id: number;
  name: string;
  floor: number;
}

export const Placement: React.FC<PlacementsData> = ({ id, name, floor }) => {
  const dispatch = useDispatch();

  const onBlockClickHandler = () => {
    dispatch(addTab(id));
  };

  return (
    <div className={styles.placement} onClick={onBlockClickHandler}>
      <span className={styles.floor}>Этаж: {floor}</span>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
