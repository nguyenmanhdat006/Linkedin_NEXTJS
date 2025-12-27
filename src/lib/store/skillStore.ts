// Legacy shim: re-export the new skill slice/thunks
export { default } from "@/store/slices/skillSlice";
export * from "@/store/slices/skillSlice";
export {
  fetchSkillsThunk as fetchSkills,
  createSkillThunk as createSkill,
  updateSkillThunk as updateSkill,
  deleteSkillThunk as deleteSkill,
} from "@/store/thunks/skillThunks";
