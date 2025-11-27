import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { educationApi } from "@/lib/api/educationApi";
import { Education } from "@/types/profile";
import { fetchProfile } from "./userStore";
import { parseJwt } from "@/lib/utils/jwt";
import { storage } from "@/lib/utils/storage";

type EducationState = {
  items: Education[];
  loading: boolean;
  error: string | null;
};

const initialState: EducationState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchEducationsByUser = createAsyncThunk<Education[], number>(
  "education/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await educationApi.getByUserId(userId);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch educations");
    }
  }
);

export const createEducation = createAsyncThunk<any, Education>(
  "education/create",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await educationApi.createEducation(data);
      // refresh profile if userId provided
      if ((data as any).userId) {
        const u = (data as any).userId;
        // Prefer using current user's slug from token when available
        const token = storage.getToken();
        const decoded = token ? parseJwt(token) : null;
        const slugOrId = decoded?.slug ?? u;
        dispatch(fetchProfile(slugOrId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to create education");
    }
  }
);

export const updateEducation = createAsyncThunk<any, { id: number; data: Education }>(
  "education/update",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await educationApi.updateEducation(id, data);
      if ((data as any).userId) {
        const u = (data as any).userId;
        const token = storage.getToken();
        const decoded = token ? parseJwt(token) : null;
        const slugOrId = decoded?.slug ?? u;
        dispatch(fetchProfile(slugOrId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to update education");
    }
  }
);

export const deleteEducation = createAsyncThunk<any, { id: number; userId?: number }>(
  "education/delete",
  async ({ id, userId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await educationApi.deleteEducation(id);
      if (userId) {
        const token = storage.getToken();
        const decoded = token ? parseJwt(token) : null;
        const slugOrId = decoded?.slug ?? userId;
        dispatch(fetchProfile(slugOrId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to delete education");
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducationsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEducationsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch educations";
      })
      .addCase(createEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEducation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to create education";
      })
      .addCase(updateEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEducation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to update education";
      })
      .addCase(deleteEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEducation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to delete education";
      });
  },
});

export const { setEducations, clearEducationError } = educationSlice.actions;
export default educationSlice.reducer;
