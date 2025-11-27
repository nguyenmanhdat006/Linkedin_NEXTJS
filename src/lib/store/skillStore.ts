import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { skillApi } from "@/lib/api/skillApi";
import { Skill } from "@/types/profile";
import { fetchProfile } from "./userStore";
import { parseJwt } from "@/lib/utils/jwt";
import { storage } from "@/lib/utils/storage";

type SkillState = {
  items: Skill[];
  loading: boolean;
  error: string | null;
};

const initialState: SkillState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchSkills = createAsyncThunk<Skill[]>(
  "skill/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await skillApi.getSkills();
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch skills");
    }
  }
);

export const createSkill = createAsyncThunk<any, Partial<Skill> & { userId: number }>(
  "skill/create",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { userId, ...data } = payload as any;
      // If a userId is provided, use the user-specific endpoint
      const res = userId
        ? await skillApi.createSkillForUser(userId, data as Skill)
        : await skillApi.createSkill(data as Skill);
      if (userId) {
        const token = storage.getToken();
        const decoded = token ? parseJwt(token) : null;
        const slugOrId = decoded?.slug ?? userId;
        dispatch(fetchProfile(slugOrId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to create skill");
    }
  }
);

export const updateSkill = createAsyncThunk<any, { id: number; data: Partial<Skill> & { userId?: number } }>(
  "skill/update",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await skillApi.updateSkill(id, data as Skill);
      if ((data as any).userId) {
        const u = (data as any).userId;
        const token = storage.getToken();
        const decoded = token ? parseJwt(token) : null;
        const slugOrId = decoded?.slug ?? u;
        dispatch(fetchProfile(slugOrId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to update skill");
    }
  }
);

export const deleteSkill = createAsyncThunk<any, { id: number; userId?: number }>(
  "skill/delete",
  async ({ id, userId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await skillApi.deleteSkill(id);
      if (userId) {
        const token = storage.getToken();
        const decoded = token ? parseJwt(token) : null;
        const slugOrId = decoded?.slug ?? userId;
        dispatch(fetchProfile(slugOrId));
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to delete skill");
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch skills";
      })
      .addCase(createSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSkill.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to create skill";
      })
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to update skill";
      })
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to delete skill";
      });
  },
});

export const { setSkills, clearSkillError } = skillSlice.actions;
export default skillSlice.reducer;
