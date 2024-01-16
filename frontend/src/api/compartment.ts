import axios from 'axios';
import { ConditionsType } from '../features/compartment/CompartmentList';

export interface CompartmentType {
  compartment_id: number;
  compartment_capacity: number;
  condition_conditions_type: ConditionsType;
}

export async function getCompartmentsByPlacement(placement_id: number) {
  try {
    const { data } = await axios.get<CompartmentType>(
      `http://localhost:3000/compartment?placement_id=${placement_id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      throw error;
    } else {
      console.log('unexpected error: ', error);
      throw error;
    }
  }
}
