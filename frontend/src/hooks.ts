import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, MyDispatch } from "./app/store";

export const useMyDispatch = () => useDispatch<MyDispatch>();
export const usePostsSelector: TypedUseSelectorHook<RootState> = useSelector;

/** TypedUseSelectorHook: special type helper provided by react-redux */
