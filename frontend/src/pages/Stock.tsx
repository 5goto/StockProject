import styles from './Stock.module.css';
import PlacementBlock from '../features/placement/PlacementBlock';
import { CompartmentBlock } from '../features/compartment/CompartmentBlock';
import { ProductBlock } from '../features/product/ProductBlock.jsx';
import { Hint } from '../UI/hint/Hint';
import {
  Compartment,
  CompartmentProps,
  ConditionsType,
} from '../features/compartment/Compartment';

// const test: Array<number> = [1];

const test: Array<CompartmentProps> = [
  { id: '1', capacity: 120, condition: ConditionsType.Flammable },
  { id: '2', capacity: 200, condition: ConditionsType.Flammable },
  { id: '3', capacity: 130, condition: ConditionsType.Flammable },
];

export const Stock = () => {
  return (
    <div className={styles.stock}>
      <PlacementBlock></PlacementBlock>
      <CompartmentBlock defaultComponent={<Hint></Hint>}>
        {test.map((item: CompartmentProps) => (
          <Compartment
            capacity={item.capacity}
            condition={item.condition}></Compartment>
        ))}
      </CompartmentBlock>
      <ProductBlock></ProductBlock>
    </div>
  );
};
