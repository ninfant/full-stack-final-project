import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFlagsThunk,
  createFlagsThunk,
  toggleFlagThunk,
  deleteFlagThunk,
} from "./featureFlagThunks";
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
        state.error = action.error.message || "Fetch failed";
        state.loading = false;
      })

      .addCase(createFlagsThunk.fulfilled, (state, action) => {
        // agrega directamente el nuevo flag a la lista
        if (action.payload) {
          state.flags.push(action.payload);
        }
      })

      // eliminar el flag visualmente también
      .addCase(deleteFlagThunk.fulfilled, (state, action) => {
        state.flags = state.flags.filter((f) => f.id !== action.payload);
      })

      // toggle
      .addCase(toggleFlagThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        console.log(" Toggle fulfilled:", updated);

        const idx = state.flags.findIndex((f) => f.id === updated.id);
        if (idx !== -1) {
          // Forzar nueva referencia (muy importante)
          state.flags[idx] = {
            ...state.flags[idx],
            enabled: updated.enabled,
          };
        }
      });
  },
});

export default flagSlice.reducer;
