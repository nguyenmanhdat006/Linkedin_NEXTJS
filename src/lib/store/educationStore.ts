// Legacy shim: re-export the new education slice/thunks
export { default } from "@/store/slices/educationSlice";
export * from "@/store/slices/educationSlice";
export {
  fetchEducationsByUserThunk as fetchEducationsByUser,
  createEducationThunk as createEducation,
  updateEducationThunk as updateEducation,
  deleteEducationThunk as deleteEducation,
} from "@/store/thunks/educationThunks";
