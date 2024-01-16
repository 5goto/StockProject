import styles from './Stock.module.css';
import PlacementBlock from '../features/placement/PlacementBlock';
import { CompartmentBlock } from '../features/compartment/CompartmentBlock';
import { ProductBlock } from '../features/product/ProductBlock.js';
import { Hint } from '../UI/hint/Hint';
import { CompartmentList } from '../features/compartment/CompartmentList.js';
import { useSelector } from 'react-redux';
import { RootState } from '../store.js';

export const Stock = () => {
  const productTabsIndexes = useSelector(
    (store: RootState) => store.compartment.compartmentTabs
  );

  console.log(productTabsIndexes);

  return (
    <div className={styles.stock}>
      <PlacementBlock></PlacementBlock>
      <CompartmentBlock defaultComponent={<Hint></Hint>}>
        {productTabsIndexes.map((item: number, index: number) => (
          <CompartmentList key={index} placementId={item}></CompartmentList>
        ))}
      </CompartmentBlock>
      <ProductBlock></ProductBlock>
    </div>
  );
};
