import { createSlice } from "@reduxjs/toolkit";
import { EMPTY_ADDRESS } from "../../constants";

const initialState = { ...EMPTY_ADDRESS };

export const residentialAddressSlice = createSlice({
  name: "residentialAddress",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setResidentialAddress: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setResidentialAddress } = residentialAddressSlice.actions;

export default residentialAddressSlice.reducer;
