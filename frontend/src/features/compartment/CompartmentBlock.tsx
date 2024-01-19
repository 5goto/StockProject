import styles from './CompartmentBlock.module.css';
import React, { ReactNode } from 'react';
import placementImg from '../../assets/placementImg.png';

type Props = {
  children: ReactNode | ReactNode[];
  defaultComponent: ReactNode;
};

export const CompartmentBlock: React.FC<Props> = ({
  children,
  defaultComponent,
}) => {
  const childCount = React.Children.count(children);

  if (childCount === 0) {
    return (
      <div className={styles.screen}>
        <h1>&larr; Выберете одно из помещений</h1>
      </div>
    );
  }

  if (childCount === 1) {
    return (
      <div className={styles.containerWithOnlyOneItem}>
        <div className={styles.item}>{children}</div>
        <div className={styles.item}>{defaultComponent}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={styles.item}>
          {child}
        </div>
      ))}
      {childCount < 4 &&
        [...Array(4 - childCount)].map((_, index) => (
          <div key={childCount + index} className={styles.item}>
            {defaultComponent}
          </div>
        ))}
    </div>
  );
};
