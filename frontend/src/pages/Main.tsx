import styles from './Main.module.css';
import left from '../assets/left.jpg';
import stock from '../assets/stock.png';
import startTr from '../assets/tr1.png';
import topImg from '../assets/tr2.png';
import bottomImg from '../assets/tr3.png';

import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
  const controls = useAnimation();
  const navigate = useNavigate();

  const handleHover = async () => {
    // Запускаем анимацию приближения
    await controls.start({ scale: 2, transition: { duration: 15 } }); // Можно установить любой желаемый масштаб

    // После некоторой задержки запускаем анимацию отдаления на место
    await controls.start({ scale: 1, transition: { duration: 15 } }); // отменить масштабирование
  };

  const handleClick = () => {
    navigate('review');
  };

  return (
    <div className={styles.main}>
      <div className={styles.left} onMouseEnter={handleHover}>
        <div className={styles.content}>
          <img src={stock} alt="stock" />
          <h1>Stockman</h1>
          <h3>
            Удобная система
            <br />
            распределения
            <br />
            товаров
          </h3>
        </div>
        <div className={styles.foot}>powered by react dnd</div>
      </div>
      <motion.div className={styles.right} onClick={handleClick}>
        <div className={styles.imageContainer}>
          <motion.img
            className={styles.image}
            animate={controls}
            src={left}
            alt="stock"
          />
        </div>
        <img className={styles.startImg} src={startTr} alt="start" />
        <img className={styles.topImg} src={topImg} alt="top" />
        <img className={styles.bottomImg} src={bottomImg} alt="bottom" />
        <div className={styles.imgText}>
          <h2>Начать</h2>
        </div>
      </motion.div>
    </div>
  );
};
