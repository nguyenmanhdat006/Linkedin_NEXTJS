import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "@/types/profile";
import {
  createExperienceThunk,
  deleteExperienceThunk,
  fetchExperiencesByUserThunk,
  updateExperienceThunk,
} from "@/store/thunks/experienceThunks";

export type ExperienceState = {
  items: Experience[];
  loading: boolean;
  error: string | null;
};

const initialState: ExperienceState = {
  items: [],
  loading: false,
  error: null,
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    setExperiences(state, action: PayloadAction<Experience[]>) {
      state.items = action.payload;
    },
    clearExperienceError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExperiencesByUserThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiencesByUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExperiencesByUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch experiences";
      })
      .addCase(createExperienceThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExperienceThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createExperienceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to create experience";
      })
      .addCase(updateExperienceThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExperienceThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateExperienceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to update experience";
      })
      .addCase(deleteExperienceThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExperienceThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteExperienceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to delete experience";
      });
  },
});

export const { setExperiences, clearExperienceError } = experienceSlice.actions;
export default experienceSlice.reducer;
