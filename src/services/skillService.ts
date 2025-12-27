import axiosClient from "@/lib/axiosClient";
import { API_ENDPOINTS } from "@/constants";
import { Skill } from "@/types/profile";
import { ApiResponse } from "@/types/api";

export const skillService = {
  getSkills: async (): Promise<Skill[]> => {
    const res = await axiosClient.get<ApiResponse<Skill[]>>(API_ENDPOINTS.SKILL.ROOT);
    return res.data.data;
  },

  getSkillsByUser: async (userId: number): Promise<Skill[]> => {
    const res = await axiosClient.get<ApiResponse<Skill[]>>(
      API_ENDPOINTS.SKILL.BY_USER(userId)
    );
    return res.data.data;
  },

  getSkill: async (id: number): Promise<Skill> => {
    const res = await axiosClient.get<ApiResponse<Skill>>(API_ENDPOINTS.SKILL.DETAIL(id));
    return res.data.data;
  },

  createSkill: async (data: Skill): Promise<Skill> => {
    const res = await axiosClient.post<ApiResponse<Skill>>(API_ENDPOINTS.SKILL.ROOT, data);
    return res.data.data;
  },

  createSkillForUser: async (userId: number, data: Skill): Promise<Skill> => {
    const res = await axiosClient.post<ApiResponse<Skill>>(API_ENDPOINTS.SKILL.BY_USER(userId), data);
    return res.data.data;
  },

  updateSkill: async (id: number, data: Skill): Promise<Skill> => {
    const res = await axiosClient.put<ApiResponse<Skill>>(API_ENDPOINTS.SKILL.DETAIL(id), data);
    return res.data.data;
  },

  deleteSkill: async (id: number): Promise<void> => {
    await axiosClient.delete(API_ENDPOINTS.SKILL.DETAIL(id));
  },
};
