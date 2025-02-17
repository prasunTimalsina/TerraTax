import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },

    logout: (state) => {
      state.status = false;
      state.userData = null;
      window.localStorage.removeItem("userData");
    },

    persistOnLocalStorage: (state) => {
      window.localStorage.setItem("userData", JSON.stringify(state.userData));
    },
  },
});

export const { login, logout, persistOnLocalStorage } = authSlice.actions;

export default authSlice.reducer;
