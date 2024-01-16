import { configureStore } from '@reduxjs/toolkit';
import compartmentSlice from './features/compartment/compartmentSlice';

export const store = configureStore({
  reducer: {
    compartment: compartmentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
