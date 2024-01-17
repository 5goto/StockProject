import { UseQueryResult, useQuery } from '@tanstack/react-query';
import {
  ProductUnitType,
  getAllProducts,
  getProductsByCompartment,
} from '../../api/unit';
import { RequestType } from './productSlice';

export const useTypedQuery = (
  requestType: RequestType,
  compartmentId: string
) => {
  const r = useQuery({
    queryKey: ['products', requestType, compartmentId],
    queryFn: async () => {
      switch (requestType) {
        case RequestType.ALL:
          return getAllProducts();
        case RequestType.COMPARTMENT:
          return getProductsByCompartment(compartmentId);
        case RequestType.NONE:
        default:
          throw new Error('Invalid request type');
      }
    },
  });
  return r as UseQueryResult<Array<ProductUnitType>, Error>;
};
