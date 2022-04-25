import { createSlice } from "@reduxjs/toolkit";
import { EMPTY_ADDRESS } from "../../constants";

const initialState = { ...EMPTY_ADDRESS };

export const propertyAddressSlice = createSlice({
  name: "propertyAddress",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPropertyAddress: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPropertyAddress } = propertyAddressSlice.actions;

export default propertyAddressSlice.reducer;
