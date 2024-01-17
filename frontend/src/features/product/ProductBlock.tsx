import { useSelector } from 'react-redux';
import styles from './ProductBlock.module.css';
import { RootState } from '../../store';
import { ProductList } from './ProductList';

export const ProductBlock = () => {
  const compartmentId = useSelector(
    (state: RootState) => state.compartment.currentCompartment
  ) as unknown as string;

  return (
    <div className={styles.productBlock}>
      <h2>Products</h2>
      <div className={styles.filter}>
        <details>
          <summary>Filters:</summary>
          <p>Раскрывающийся текст</p>
        </details>
      </div>
      <div>{compartmentId ? <ProductList /> : <h1>Hint</h1>}</div>
    </div>
  );
};
