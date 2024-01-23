import styles from './Stock.module.css';
import PlacementBlock from '../features/placement/PlacementBlock';
import { CompartmentBlock } from '../features/compartment/CompartmentBlock';
import { ProductBlock } from '../features/product/ProductBlock.js';
import { Hint } from '../UI/hint/Hint';
import { CompartmentList } from '../features/compartment/CompartmentList.js';
import { useSelector } from 'react-redux';
import { RootState } from '../store.js';
import { Header } from '../UI/header/Header.js';
import { TabProp } from '../features/compartment/compartmentSlice.js';

export const Stock = () => {
  const productTabsIndexes = useSelector(
    (store: RootState) => store.compartment.compartmentTabs
  );

  return (
    <div className={styles.stock}>
      <Header />
      <div className={styles.main}>
        <PlacementBlock></PlacementBlock>
        <CompartmentBlock defaultComponent={<Hint></Hint>}>
          {productTabsIndexes.map((item: TabProp, index: number) => (
            <CompartmentList
              key={index}
              index={index}
              placementId={item.id}
              placementName={item.name}></CompartmentList>
          ))}
        </CompartmentBlock>
        <ProductBlock />
      </div>
    </div>
  );
};
