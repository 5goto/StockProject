import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CompartmentState {
  compartmentTabs: number[];
  currentCompartment: number | null;
}

const initialState: CompartmentState = {
  compartmentTabs: [],
  currentCompartment: null,
};

const compartmentSlice = createSlice({
  name: 'compartment', // название slice
  initialState, // initial state для slice
  reducers: {
    // все наши action
    addTab(state, action: PayloadAction<number>) {
      // action creator
      if (state.compartmentTabs.length < 4) {
        state.compartmentTabs.push(action.payload);
      } else {
        state.compartmentTabs[3] = action.payload;
      }
    },
    closeTab(state, action) {
      state.compartmentTabs = state.compartmentTabs.filter(
        (_, index) => index !== action.payload
      );
    },
    setCompartment(state, action: PayloadAction<number>) {
      state.currentCompartment = action.payload;
    },
  },
});

export const { addTab, setCompartment, closeTab } = compartmentSlice.actions;
export default compartmentSlice.reducer;
