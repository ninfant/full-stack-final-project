import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import featureFlagReducer from "../features/featureFlags/featureFlagSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    featureFlags: featureFlagReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;// RootState is an type alias and is mostly use with useSelector() to get strongly typed access to the state
export type MyDispatch = typeof store.dispatch; //This captures the type of the store’s dispatch function, which includes:Redux actions, Async thunks (createAsyncThunk) and Middleware enhancements

/** TypeScript no puede adivinar la estructura exacta de tu store
 *  ni el tipo de tus acciones a menos que se lo digas, por eso necesito lo de arriba: */