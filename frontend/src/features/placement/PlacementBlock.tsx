import { Placement } from './Placement';
import styles from './PlacementBlock.module.css';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { PlacementType, getPlacement } from '../../api/placement';

export default function PlacementBlock() {
  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<Array<PlacementType>, Error> = useQuery({
    queryKey: ['placement'],
    queryFn: getPlacement,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  console.log(data);

  return (
    <div className={styles.placementBlock}>
      <h2>List of your placements</h2>
      {data?.map((item: PlacementType) => (
        <Placement
          key={item.id}
          id={item.id}
          name={item.placement_name}
          floor={item.placement_floor}
        />
      ))}
    </div>
  );
}
