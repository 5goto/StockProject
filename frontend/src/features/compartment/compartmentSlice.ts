import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CompartmentState {
  compartmentTabs: number[];
}

const initialState: CompartmentState = {
  compartmentTabs: [],
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
    // closeTab(state, action) {},
  },
});

export const { addTab } = compartmentSlice.actions;
export default compartmentSlice.reducer;
