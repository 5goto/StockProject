import axios from 'axios';

export interface PlacementType {
  id: number;
  placement_floor: number;
  placement_name: string;
}

export async function getPlacement() {
  try {
    const { data } = await axios.get<PlacementType>(
      'http://localhost:3000/placement',
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
