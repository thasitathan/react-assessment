import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employmentLocations: [],
  employmentType: "",
};

export const employmentSlice = createSlice({
  name: "employmentAddress",
  initialState,
  reducers: {
    setEmploymentData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setEmploymentData } = employmentSlice.actions;

export default employmentSlice.reducer;
