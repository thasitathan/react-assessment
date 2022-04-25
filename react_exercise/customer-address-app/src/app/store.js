import { configureStore } from "@reduxjs/toolkit";
import residentialAddressReducer from "../components/Residential/residentialAddressSlice";
import propertyAddressReducer from "../components/Property/propertyAddressSlice";
import employmentReducer from "../components/Employment/employmentSlice";

export const store = configureStore({
  reducer: {
    residentialAddress: residentialAddressReducer,
    propertyAddress: propertyAddressReducer,
    employment: employmentReducer,
  },
});
