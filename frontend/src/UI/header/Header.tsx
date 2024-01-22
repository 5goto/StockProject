import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.headerStyle}>
      <div className={styles.logo}>
        <NavLink to="/">
          <h2>Stockman</h2>
        </NavLink>
      </div>
      <nav className={styles.navigation}>
        <NavLink to="../product/new">Добавить товар</NavLink>
      </nav>
    </div>
  );
};
