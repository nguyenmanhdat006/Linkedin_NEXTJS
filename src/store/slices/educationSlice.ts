import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Education } from "@/types/profile";
import {
  createEducationThunk,
  deleteEducationThunk,
  fetchEducationsByUserThunk,
  updateEducationThunk,
} from "@/store/thunks/educationThunks";

export type EducationState = {
  items: Education[];
  loading: boolean;
  error: string | null;
};

const initialState: EducationState = {
  items: [],
  loading: false,
  error: null,
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setEducations(state, action: PayloadAction<Education[]>) {
      state.items = action.payload;
    },
    clearEducationError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEducationsByUserThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducationsByUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEducationsByUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch educations";
      })
      .addCase(createEducationThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEducationThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createEducationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to create education";
      })
      .addCase(updateEducationThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEducationThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateEducationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to update education";
      })
      .addCase(deleteEducationThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEducationThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteEducationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to delete education";
      });
  },
});

export const { setEducations, clearEducationError } = educationSlice.actions;
export default educationSlice.reducer;
