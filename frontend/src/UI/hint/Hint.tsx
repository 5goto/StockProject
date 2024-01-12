import styles from './Hint.module.css';
import stockPng from '../../assets/stock.png';

export const Hint = () => {
  return (
    <div className={styles.hint}>
      <img src={stockPng} alt="stock" />
    </div>
  );
};
