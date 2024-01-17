import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum RequestType {
  NONE,
  COMPARTMENT,
  ALL,
}

interface ProductState {
  requestType: RequestType;
}

const initialState: ProductState = {
  requestType: RequestType.NONE,
};

const productSlice = createSlice({
  name: 'product', // название slice
  initialState, // initial state для slice
  reducers: {
    setRequestType(state, action: PayloadAction<RequestType>) {
      state.requestType = action.payload;
    },
  },
});

export const { setRequestType } = productSlice.actions;
export default productSlice.reducer;
