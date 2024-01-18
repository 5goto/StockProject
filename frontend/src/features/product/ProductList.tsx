import { useSelector } from 'react-redux';
import { useTypedQuery } from './product.hooks';
import { RootState } from '../../store';
import { ProductUnitType } from '../../api/unit';
import { Product } from './Product';

export const ProductList = () => {
  const requestType = useSelector(
    (state: RootState) => state.product.requestType
  );
  const compartmentId = useSelector(
    (state: RootState) => state.compartment.currentCompartment
  ) as unknown as string;

  const { data, isLoading, isError } = useTypedQuery(
    requestType,
    compartmentId
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (data?.length === 0) {
    return <div>Empty</div>;
  }

  return (
    <div>
      {data?.map((item: ProductUnitType) => (
        <Product
          key={item.unit_unit_id}
          id={item.unit_unit_id}
          capacity={item.unit_init_capacity}
          receipt_date={item.unit_receipt_date}
          date_of_write_off={item.unit_date_of_write_off}
          unit_status={item.unit_status}
          product_name={item.product_product_name}
          conditions_type={item.condition_conditions_type}></Product>
      ))}
    </div>
  );
};
