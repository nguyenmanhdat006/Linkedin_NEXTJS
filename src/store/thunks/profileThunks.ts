import { createAsyncThunk } from "@reduxjs/toolkit";
import { profileService } from "@/services/profileService";
import { ProfileData, UpdateProfileRequest } from "@/types/profile";

export const fetchProfileThunk = createAsyncThunk<
  ProfileData,
  string | number,
  { rejectValue: string }
>("profile/fetchProfile", async (userSlug, { rejectWithValue }) => {
  try {
    return await profileService.getProfileBySlug(userSlug);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to fetch profile");
  }
});

export const updateMyProfileThunk = createAsyncThunk<
  void,
  UpdateProfileRequest,
  { rejectValue: string }
>("profile/updateMyProfile", async (data, { rejectWithValue }) => {
  try {
    await profileService.updateMyProfile(data);
  } catch (error: any) {
    return rejectWithValue(error?.message || "Failed to update profile");
  }
});
