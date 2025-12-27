// Legacy re-export: route all imports to the new store layer under src/store
export {
  store,
  useAppDispatch,
  useAppSelector,
  type RootState,
  type AppDispatch,
  default,
} from "@/store";
