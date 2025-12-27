import { createAsyncThunk } from "@reduxjs/toolkit";
import { skillService } from "@/services/skillService";
import { Skill } from "@/types/profile";
import { parseJwt } from "@/lib/utils/jwt";
import { storage } from "@/lib/utils/storage";
import { fetchProfileThunk } from "./profileThunks";

export type SkillInput = Partial<Skill> & { userId?: number };

export const fetchSkillsThunk = createAsyncThunk<
  Skill[],
  void,
  { rejectValue: string }
>("skill/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await skillService.getSkills();
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to fetch skills");
  }
});

export const createSkillThunk = createAsyncThunk<
  Skill,
  SkillInput,
  { rejectValue: string }
>("skill/create", async (payload, { dispatch, rejectWithValue }) => {
  try {
    const { userId, ...data } = payload;
    const result = userId
      ? await skillService.createSkillForUser(userId, data as Skill)
      : await skillService.createSkill(data as Skill);

    if (userId) {
      const token = storage.getToken();
      const decoded = token ? parseJwt(token) : null;
      const slugOrId = decoded?.slug ?? userId;
      dispatch(fetchProfileThunk(slugOrId));
    }

    return result;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to create skill");
  }
});

export const updateSkillThunk = createAsyncThunk<
  Skill,
  { id: number; data: SkillInput },
  { rejectValue: string }
>("skill/update", async ({ id, data }, { dispatch, rejectWithValue }) => {
  try {
    const result = await skillService.updateSkill(id, data as Skill);
    if (data.userId) {
      const token = storage.getToken();
      const decoded = token ? parseJwt(token) : null;
      const slugOrId = decoded?.slug ?? data.userId;
      dispatch(fetchProfileThunk(slugOrId));
    }
    return result;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to update skill");
  }
});

export const deleteSkillThunk = createAsyncThunk<
  string,
  { id: number; userId?: number },
  { rejectValue: string }
>("skill/delete", async ({ id, userId }, { dispatch, rejectWithValue }) => {
  try {
    await skillService.deleteSkill(id);
    if (userId) {
      const token = storage.getToken();
      const decoded = token ? parseJwt(token) : null;
      const slugOrId = decoded?.slug ?? userId;
      dispatch(fetchProfileThunk(slugOrId));
    }
    return String(id);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to delete skill");
  }
});
