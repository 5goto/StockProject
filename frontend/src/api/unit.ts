import axios from 'axios';
import { ConditionsType } from '../features/compartment/CompartmentList';
import { FormInputs } from '../features/product/NewProductFormBlock';

export enum StatusType {
  NotPlaced = 'not_placed',
  Placed = 'placed',
  WrittenOff = 'written-off',
}

export interface ProductUnitType {
  unit_unit_id: number;
  unit_init_capacity: number;
  unit_receipt_date: Date;
  unit_date_of_write_off: Date;
  unit_status: StatusType;
  unit_compartment_id: number;
  product_product_name: string;
  condition_conditions_type: ConditionsType;
}

export async function getProductsByCompartment(condition_id: string) {
  try {
    const { data } = await axios.get<ProductUnitType>(
      `http://localhost:3000/unit?compartment_id=${condition_id}`,
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

export async function getAllProducts() {
  try {
    const { data } = await axios.get<ProductUnitType>(
      `http://localhost:3000/unit`,
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

export async function getNotPlacedProducts() {
  try {
    const { data } = await axios.get<ProductUnitType>(
      `http://localhost:3000/unit/?not_placed=true`,
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

export interface updateProductProps {
  productId: string;
  compartmentId: string;
}

export async function updateProductCompartment(props: updateProductProps) {
  try {
    const responce = await axios.patch(
      `http://localhost:3000/unit/${props.productId}`,
      {
        compartment_id: props.compartmentId,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return responce;
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

export async function createProduct(data: FormInputs) {
  try {
    const responce = await axios.post(
      `http://localhost:3000/unit`,
      {
        ...data,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return responce;
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
