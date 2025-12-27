import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import profileReducer from "@/store/slices/profileSlice";
import educationReducer from "@/store/slices/educationSlice";
import experienceReducer from "@/store/slices/experienceSlice";
import skillReducer from "@/store/slices/skillSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    education: educationReducer,
    experience: experienceReducer,
    skill: skillReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
