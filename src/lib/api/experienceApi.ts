import axiosClient from "@/lib/axiosClient";
import { Experience } from "@/types/profile";

export const experienceApi = {
  // GET all experiences by userId
  getByUserId(userId: number) {
    return axiosClient.get<{ success: boolean; message: string; data: Experience[] }>(
      `/api/experiences/user/${userId}`
    );
  },

  // CREATE new experience
  createExperience(data: Experience) {
    return axiosClient.post<{ success: boolean; message: string; data: Experience }>(
      `/api/experiences`,
      data
    );
  },

  // UPDATE experience
  updateExperience(id: number, data: Experience) {
    return axiosClient.put<{ success: boolean; message: string; data: Experience }>(
      `/api/experiences/${id}`,
      data
    );
  },

  // DELETE experience
  deleteExperience(id: number) {
    return axiosClient.delete<{ success: boolean; message: string; data: string }>(
      `/api/experiences/${id}`
    );
  },
};
