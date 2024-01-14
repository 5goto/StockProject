import styles from './Main.module.css';
import left from '../assets/left.jpg';
import right from '../assets/right.jpeg';
import stock from '../assets/stock.png';

export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={left} alt="stock" />
          <div className={styles.overlayContent}>
            <h2>Заголовок</h2>
            <p>Описание</p>
            <img src={stock} alt="Small Image" />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={right} alt="stock" />
          <div className={styles.overlayContent}>
            <h2>Заголовок</h2>
            <div className={styles.additionalContent}>
              <p>Описание</p>
              <img src={stock} alt="Small Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
