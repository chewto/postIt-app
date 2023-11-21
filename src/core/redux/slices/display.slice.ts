import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayState: false
};

const displaySlice = createSlice({
  name:'displayNote',
  initialState,
  reducers: {
    displayOn: (state) => {
      state.displayState = true;
    },
    displayOff: (state) => {
      state.displayState = false;
    }
  }
})

export const {displayOn, displayOff} = displaySlice.actions

export default displaySlice.reducer