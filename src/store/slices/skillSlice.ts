import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Skill } from "@/types/profile";
import {
  createSkillThunk,
  deleteSkillThunk,
  fetchSkillsThunk,
  updateSkillThunk,
} from "@/store/thunks/skillThunks";

export type SkillState = {
  items: Skill[];
  loading: boolean;
  error: string | null;
};

const initialState: SkillState = {
  items: [],
  loading: false,
  error: null,
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    setSkills(state, action: PayloadAction<Skill[]>) {
      state.items = action.payload;
    },
    clearSkillError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSkillsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSkillsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch skills";
      })
      .addCase(createSkillThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSkillThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createSkillThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to create skill";
      })
      .addCase(updateSkillThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkillThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateSkillThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to update skill";
      })
      .addCase(deleteSkillThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkillThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteSkillThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to delete skill";
      });
  },
});

export const { setSkills, clearSkillError } = skillSlice.actions;
export default skillSlice.reducer;
