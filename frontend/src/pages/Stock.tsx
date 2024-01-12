import styles from './Stock.module.css';
import PlacementBlock from '../features/placement/PlacementBlock';
import { CompartmentBlock } from '../features/compartment/CompartmentBlock';
import { Hint } from '../UI/hint/Hint';

const test: Array<number> = [1];

export const Stock = () => {
  return (
    <div className={styles.stock}>
      <PlacementBlock></PlacementBlock>
      <CompartmentBlock defaultComponent={<Hint></Hint>}>
        {test.map((item: number) => (
          <h1>{item}</h1>
        ))}
      </CompartmentBlock>
    </div>
  );
};
