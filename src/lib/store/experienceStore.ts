import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { experienceApi } from "@/lib/api/experienceApi";
import { Experience } from "@/types/profile";
import { fetchProfile } from "./userStore";
import { parseJwt } from "@/lib/utils/jwt";
import { storage } from "@/lib/utils/storage";

type ExperienceState = {
  items: Experience[];
  loading: boolean;
  error: string | null;
};

const initialState: ExperienceState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchExperiencesByUser = createAsyncThunk<Experience[], number>(
  "experience/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await experienceApi.getByUserId(userId);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch experiences");
    }
  }
);

export const createExperience = createAsyncThunk<any, Experience>(
  "experience/create",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await experienceApi.createExperience(data);
      if ((data as any).userId) {
        const u = (data as any).userId;
        const token = storage.getToken();
        const decoded = token ? parseJwt(token) : null;
        const slugOrId = decoded?.slug ?? u;
        dispatch(fetchProfile(slugOrId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to create experience");
    }
  }
);

export const updateExperience = createAsyncThunk<any, { id: number; data: Experience }>(
  "experience/update",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await experienceApi.updateExperience(id, data);
      if ((data as any).userId) {
        const u = (data as any).userId;
        const token = storage.getToken();
        const decoded = token ? parseJwt(token) : null;
        const slugOrId = decoded?.slug ?? u;
        dispatch(fetchProfile(slugOrId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to update experience");
    }
  }
);

export const deleteExperience = createAsyncThunk<any, { id: number; userId?: number }>(
  "experience/delete",
  async ({ id, userId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await experienceApi.deleteExperience(id);
      if (userId) {
        const token = storage.getToken();
        const decoded = token ? parseJwt(token) : null;
        const slugOrId = decoded?.slug ?? userId;
        dispatch(fetchProfile(slugOrId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to delete experience");
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiencesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiencesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExperiencesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch experiences";
      })
      .addCase(createExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExperience.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to create experience";
      })
      .addCase(updateExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExperience.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to update experience";
      })
      .addCase(deleteExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExperience.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to delete experience";
      });
  },
});

export const { setExperiences, clearExperienceError } = experienceSlice.actions;
export default experienceSlice.reducer;
