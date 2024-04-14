import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import analysisResultsSlice from "../features/analysisResultsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    analysisResults: analysisResultsSlice,
  },
});
