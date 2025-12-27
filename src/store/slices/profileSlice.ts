import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileData } from "@/types/profile";
import { fetchProfileThunk, updateMyProfileThunk } from "@/store/thunks/profileThunks";

export type ProfileState = {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileData | null>) {
      state.profile = action.payload;
    },
    clearProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfileThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action: PayloadAction<ProfileData>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch profile";
      })
      .addCase(updateMyProfileThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMyProfileThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateMyProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to update profile";
      });
  },
});

export const { setProfile, clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
