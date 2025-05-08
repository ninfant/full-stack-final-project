import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import featureFlagReducer from "../features/featureFlags/featureFlagSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    featureFlags: featureFlagReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
