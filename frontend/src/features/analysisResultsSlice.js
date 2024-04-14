// analysisResultsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analysisResults: JSON.parse(localStorage.getItem("analysisResults")) || [],
};

export const analysisResultsSlice = createSlice({
  name: "analysisResults",
  initialState,
  reducers: {
    setAnalysisResults: (state, action) => {
      state.analysisResults = action.payload;
      localStorage.setItem("analysisResults", JSON.stringify(action.payload));
    },
    clearAnalysisResults: (state) => {
      state.analysisResults = null;
      localStorage.removeItem("analysisResults");
    },
  },
});

export const { setAnalysisResults, clearAnalysisResults } =
  analysisResultsSlice.actions;

export default analysisResultsSlice.reducer;
