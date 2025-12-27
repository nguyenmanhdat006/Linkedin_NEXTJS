import { createAsyncThunk } from "@reduxjs/toolkit";
import { experienceService } from "@/services/experienceService";
import { Experience } from "@/types/profile";
import { parseJwt } from "@/lib/utils/jwt";
import { storage } from "@/lib/utils/storage";
import { fetchProfileThunk } from "./profileThunks";

export type ExperienceInput = Experience & { userId?: number };

export const fetchExperiencesByUserThunk = createAsyncThunk<
  Experience[],
  number,
  { rejectValue: string }
>("experience/fetchByUser", async (userId, { rejectWithValue }) => {
  try {
    return await experienceService.getByUserId(userId);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to fetch experiences");
  }
});

export const createExperienceThunk = createAsyncThunk<
  Experience,
  ExperienceInput,
  { rejectValue: string }
>("experience/create", async (data, { dispatch, rejectWithValue }) => {
  try {
    const result = await experienceService.createExperience(data);
    if (data.userId) {
      const token = storage.getToken();
      const decoded = token ? parseJwt(token) : null;
      const slugOrId = decoded?.slug ?? data.userId;
      dispatch(fetchProfileThunk(slugOrId));
    }
    return result;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to create experience");
  }
});

export const updateExperienceThunk = createAsyncThunk<
  Experience,
  { id: number; data: ExperienceInput },
  { rejectValue: string }
>("experience/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
  try {
    const result = await experienceService.updateExperience(id, data);
    if (data.userId) {
      const token = storage.getToken();
      const decoded = token ? parseJwt(token) : null;
      const slugOrId = decoded?.slug ?? data.userId;
      dispatch(fetchProfileThunk(slugOrId));
    }
    return result;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to update experience");
  }
});

export const deleteExperienceThunk = createAsyncThunk<
  string,
  { id: number; userId?: number },
  { rejectValue: string }
>("experience/delete", async ({ id, userId }, { dispatch, rejectWithValue }) => {
  try {
    await experienceService.deleteExperience(id);
    if (userId) {
      const token = storage.getToken();
      const decoded = token ? parseJwt(token) : null;
      const slugOrId = decoded?.slug ?? userId;
      dispatch(fetchProfileThunk(slugOrId));
    }
    return String(id);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to delete experience");
  }
});
