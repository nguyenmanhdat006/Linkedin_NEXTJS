import { createAsyncThunk } from "@reduxjs/toolkit";
import { educationService } from "@/services/educationService";
import { Education } from "@/types/profile";
import { parseJwt } from "@/lib/utils/jwt";
import { storage } from "@/lib/utils/storage";
import { fetchProfileThunk } from "./profileThunks";

export type EducationInput = Education & { userId?: number };

export const fetchEducationsByUserThunk = createAsyncThunk<
  Education[],
  number,
  { rejectValue: string }
>("education/fetchByUser", async (userId, { rejectWithValue }) => {
  try {
    return await educationService.getByUserId(userId);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to fetch educations");
  }
});

export const createEducationThunk = createAsyncThunk<
  Education,
  EducationInput,
  { rejectValue: string }
>("education/create", async (data, { dispatch, rejectWithValue }) => {
  try {
    const result = await educationService.createEducation(data);
    if (data.userId) {
      const token = storage.getToken();
      const decoded = token ? parseJwt(token) : null;
      const slugOrId = decoded?.slug ?? data.userId;
      dispatch(fetchProfileThunk(slugOrId));
    }
    return result;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to create education");
  }
});

export const updateEducationThunk = createAsyncThunk<
  Education,
  { id: number; data: EducationInput },
  { rejectValue: string }
>("education/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
  try {
    const result = await educationService.updateEducation(id, data);
    if (data.userId) {
      const token = storage.getToken();
      const decoded = token ? parseJwt(token) : null;
      const slugOrId = decoded?.slug ?? data.userId;
      dispatch(fetchProfileThunk(slugOrId));
    }
    return result;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to update education");
  }
});

export const deleteEducationThunk = createAsyncThunk<
  string,
  { id: number; userId?: number },
  { rejectValue: string }
>("education/delete", async ({ id, userId }, { dispatch, rejectWithValue }) => {
  try {
    await educationService.deleteEducation(id);
    if (userId) {
      const token = storage.getToken();
      const decoded = token ? parseJwt(token) : null;
      const slugOrId = decoded?.slug ?? userId;
      dispatch(fetchProfileThunk(slugOrId));
    }
    return "Education deleted successfully";
  } catch (error: any) {
    return rejectWithValue(error?.message || "Failed to delete education");
  }
});
