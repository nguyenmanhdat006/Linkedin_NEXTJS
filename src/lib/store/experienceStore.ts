// Legacy shim: re-export the new experience slice/thunks
export { default } from "@/store/slices/experienceSlice";
export * from "@/store/slices/experienceSlice";
export {
  fetchExperiencesByUserThunk as fetchExperiencesByUser,
  createExperienceThunk as createExperience,
  updateExperienceThunk as updateExperience,
  deleteExperienceThunk as deleteExperience,
} from "@/store/thunks/experienceThunks";
