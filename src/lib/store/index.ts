import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./userStore";
import educationReducer from "./educationStore";
import experienceReducer from "./experienceStore";
import skillReducer from "./skillStore";

export const store = configureStore({
  reducer: {
  user: userReducer,
  education: educationReducer,
  experience: experienceReducer,
  skill: skillReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
