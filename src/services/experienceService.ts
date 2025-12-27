import axiosClient from "@/lib/axiosClient";
import { API_ENDPOINTS } from "@/constants";
import { Experience } from "@/types/profile";
import { ApiResponse } from "@/types/api";

export const experienceService = {
  getByUserId: async (userId: number): Promise<Experience[]> => {
    const res = await axiosClient.get<ApiResponse<Experience[]>>(
      API_ENDPOINTS.EXPERIENCE.BY_USER(userId)
    );
    return res.data.data;
  },

  createExperience: async (data: Experience): Promise<Experience> => {
    const res = await axiosClient.post<ApiResponse<Experience>>(
      API_ENDPOINTS.EXPERIENCE.ROOT,
      data
    );
    return res.data.data;
  },

  updateExperience: async (id: number, data: Experience): Promise<Experience> => {
    const res = await axiosClient.put<ApiResponse<Experience>>(
      API_ENDPOINTS.EXPERIENCE.DETAIL(id),
      data
    );
    return res.data.data;
  },

  deleteExperience: async (id: number): Promise<void> => {
    await axiosClient.delete(API_ENDPOINTS.EXPERIENCE.DETAIL(id));
  },
};
