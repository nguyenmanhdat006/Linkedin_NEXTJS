// Legacy shim: re-export the new profile slice/thunks so old imports keep working
export { default } from "@/store/slices/profileSlice";
export * from "@/store/slices/profileSlice";
export {
  fetchProfileThunk as fetchProfile,
  updateMyProfileThunk as updateMyProfile,
} from "@/store/thunks/profileThunks";
