import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileApi } from "@/lib/api/profileApi";
import { ProfileResponse, ProfileData, UpdateProfileRequest } from "@/types/profile";

type UserState = {
  profile: ProfileData | null; 
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk<ProfileData, string | number>(
  "user/fetchProfile",
  async (userSlug, { rejectWithValue }) => {
    try {
      const res: ProfileResponse = await profileApi.getProfileBySlug(userSlug);
      return res.data; 
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch profile");
    }
  }
);

// Update profile thunk giữ nguyên
export const updateMyProfile = createAsyncThunk<void, UpdateProfileRequest>(
  "user/updateMyProfile",
  async (data, { rejectWithValue }) => {
    try {
      await profileApi.updateMyProfile(data);
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to update profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileData | null>) {
      state.profile = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<ProfileData>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch profile";
      })
      .addCase(updateMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMyProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to update profile";
      });
  },
});

export const { setProfile, clearError } = userSlice.actions;
export default userSlice.reducer;
