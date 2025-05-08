import { createSlice } from "@reduxjs/toolkit";
import { fetchFlagsThunk } from "./featureFlagThunks";
import type { FeatureFlag } from "../../types/featureFlag";

/**
 * slice for the featureFlag -redux
 */
const initialState = {
  flags: [] as FeatureFlag[],
  loading: false,
  error: null as string | null,
};

const flagSlice = createSlice({
  name: "featureFlags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlagsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlagsThunk.fulfilled, (state, action) => {
        state.flags = action.payload;
        state.loading = false;
      })
      .addCase(fetchFlagsThunk.rejected, (state, action) => {
        state.error = action.error.message || "Error loading flags";
        state.loading = false;
      });
  },
});

export default flagSlice.reducer;
