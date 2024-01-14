import styles from './Placement.module.css';

export interface PlacementsData {
  id?: number;
  name: string;
  floor: number;
}

export const Placement: React.FC<PlacementsData> = ({ id, name, floor }) => {
  return (
    <div className={styles.placement}>
      <span>{id}</span>
      <span>{name}</span>
      <span>{floor}</span>
    </div>
  );
};
