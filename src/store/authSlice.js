import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  userFullData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    addFullData: (state, action) => {
      state.userFullData = action.payload.data;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.userFullData = null;
    },
  },
});

export const { login, logout, addFullData } = authSlice.actions;

export default authSlice.reducer;
