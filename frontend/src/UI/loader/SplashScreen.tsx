import { ReactNode } from 'react';
import styles from './SplashScreen.module.css';
import React from 'react';

export interface SplashProps {
  children: ReactNode;
}

const SplashScreen: React.FC<SplashProps> = ({ children }) => {
  return <div className={styles.splashScreen}>{children}</div>;
};

export default SplashScreen;
