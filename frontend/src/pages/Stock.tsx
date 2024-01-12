import styles from './Stock.module.css';
import PlacementBlock from '../features/placement/PlacementBlock';
import { Hint } from '../UI/hint/Hint';

export const Stock = () => {
  return (
    <div className={styles.stock}>
      <PlacementBlock></PlacementBlock>
      <Hint></Hint>
    </div>
  );
};
