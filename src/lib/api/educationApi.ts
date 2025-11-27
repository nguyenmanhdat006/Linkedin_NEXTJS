import axiosClient from "@/lib/axiosClient";
import { Education } from "@/types/profile";

export const educationApi = {
  // GET all education by userId
  getByUserId(userId: number) {
    return axiosClient.get<{ success: boolean; message: string; data: Education[] }>(
      `/api/educations/user/${userId}`
    );
  },

  // CREATE new education
  createEducation(data: Education) {
    return axiosClient.post<{ success: boolean; message: string; data: Education }>(
      `/api/educations`,
      data
    );
  },

  // UPDATE education
  updateEducation(id: number, data: Education) {
    return axiosClient.put<{ success: boolean; message: string; data: Education }>(
      `/api/educations/${id}`,
      data
    );
  },

  // DELETE education
  deleteEducation(id: number) {
    return axiosClient.delete<{ success: boolean; message: string; data: string }>(
      `/api/educations/${id}`
    );
  },
};
