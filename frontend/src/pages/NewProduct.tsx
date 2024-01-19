import styles from './NewProduct.module.css';
import { NewProductFormBlock } from '../features/product/NewProductFormBlock';

export const NewProduct = () => {
  return (
    <div className={styles.newProduct}>
      <NewProductFormBlock />
    </div>
  );
};
