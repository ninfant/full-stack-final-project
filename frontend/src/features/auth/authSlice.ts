import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./authThunks";
/**
 * slice for the authentication -redux
 */
const initialState = {
  token: localStorage.getItem("jwt") || null,
  loading: false,
  error: null as string | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("jwt");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
        localStorage.setItem("jwt", action.payload);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message || "Login failed";
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
