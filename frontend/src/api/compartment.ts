import axios from 'axios';
import { ConditionsType } from '../features/compartment/CompartmentList';

export interface CompartmentType {
  id: number;
  capacity: number;
  conditionType: ConditionsType;
  totalCapacity: number;
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

export async function getAllCompartments() {
  try {
    const { data } = await axios.get<CompartmentType>(
      `http://localhost:3000/compartment`,
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
