import axiosClient from "@/lib/axiosClient";
import { API_ENDPOINTS } from "@/constants";
import { Education } from "@/types/profile";
import { ApiResponse } from "@/types/api";

export const educationService = {
  getByUserId: async (userId: number): Promise<Education[]> => {
    const res = await axiosClient.get<ApiResponse<Education[]>>(
      API_ENDPOINTS.EDUCATION.BY_USER(userId)
    );
    return res.data.data; // unwrap
  },

  createEducation: async (data: Education): Promise<Education> => {
    const res = await axiosClient.post<ApiResponse<Education>>(
      API_ENDPOINTS.EDUCATION.ROOT,
      data
    );
    return res.data.data;
  },

  updateEducation: async (id: number, data: Education): Promise<Education> => {
    const res = await axiosClient.put<ApiResponse<Education>>(
      API_ENDPOINTS.EDUCATION.DETAIL(id),
      data
    );
    return res.data.data;
  },

  deleteEducation: async (id: number): Promise<void> => {
    await axiosClient.delete(API_ENDPOINTS.EDUCATION.DETAIL(id));
  },
};
