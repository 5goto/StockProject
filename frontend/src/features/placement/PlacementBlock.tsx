import { Placement } from './Placement';
import styles from './PlacementBlock.module.css';
import { PlacementsData } from './Placement';

const mock: Array<PlacementsData> = [
  { id: '1', name: 'Stock A', floor: 1 },
  { id: '2', name: 'Stock B', floor: 1 },
  { id: '3', name: 'Stock C', floor: 2 },
];

export default function PlacementBlock() {
  return (
    <div className={styles.placementBlock}>
      <h2>List of your placements</h2>
      {mock.map((item: PlacementsData) => (
        <Placement name={item.name} floor={item.floor} />
      ))}
    </div>
  );
}
