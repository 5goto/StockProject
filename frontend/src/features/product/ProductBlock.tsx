import { useSelector } from 'react-redux';
import styles from './ProductBlock.module.css';
import { RootState } from '../../store';
import { ProductList } from './ProductList';
import { useDispatch } from 'react-redux';
import { RequestType, setRequestType } from './productSlice';

export const ProductBlock = () => {
  const compartmentId = useSelector(
    (state: RootState) => state.compartment.currentCompartment
  ) as unknown as string;

  const requestType = useSelector(
    (state: RootState) => state.product.requestType
  );

  const dispatch = useDispatch();

  const allProductFilterHandler = () => {
    dispatch(setRequestType(RequestType.ALL));
  };

  const notPlacedFilterHandler = () => {
    dispatch(setRequestType(RequestType.NOT_PLACED));
  };

  return (
    <div className={styles.productBlock}>
      <div className={styles.title}>
        <h2>Товары</h2>
      </div>
      <div className={styles.filter}>
        <details className={styles.details} open>
          <summary>Фильтры:</summary>
          <div className={styles.filterButtonsBlock}>
            <button onClick={allProductFilterHandler}>Все товары</button>
            <button onClick={notPlacedFilterHandler}>Не размещенные</button>
          </div>
        </details>
      </div>
      <div className={styles.hint}>
        {compartmentId || requestType !== RequestType.NONE ? (
          <ProductList />
        ) : (
          <h2>&larr; Выберите отсек</h2>
        )}
      </div>
    </div>
  );
};
