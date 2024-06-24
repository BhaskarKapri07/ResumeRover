import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      sessionStorage.clear() // Clear token from storage
    },
    newAnalysis: (state) => {
      state.token = localStorage.getItem("token");
      sessionStorage.clear() // Clear token from storage
    }
  },
});

export const { login, logout, newAnalysis } = authSlice.actions;

export default authSlice.reducer;
