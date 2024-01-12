import styles from './PlacementBlock.module.css';

const mock = [
  { id: 1, name: 'Stock A', floor: 1 },
  { id: 2, name: 'Stock B', floor: 1 },
  { id: 3, name: 'Stock C', floor: 2 },
];

export default function PlacementBlock() {
  return <div className={styles.placementBlock}>PlacementBlock</div>;
}
