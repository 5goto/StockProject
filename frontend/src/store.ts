import { configureStore } from '@reduxjs/toolkit';
import compartmentSlice from './features/compartment/compartmentSlice';
import productSlice from './features/product/productSlice';

export const store = configureStore({
  reducer: {
    compartment: compartmentSlice,
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
