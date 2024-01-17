import styles from './CompartmentBlock.module.css';
import React, { ReactNode } from 'react';

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
    return <h1>&larr; Select one of the placement</h1>;
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
