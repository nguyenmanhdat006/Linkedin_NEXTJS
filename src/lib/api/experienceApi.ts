// src/lib/api/experienceApi.ts
import axiosClient from '../axiosClient';
import { Experience } from '@/types/profile';

export const experienceApi = {
  // Lấy danh sách kinh nghiệm theo userId
  getExperiences: async (userId: number) => {
    const res = await axiosClient.get(`/profiles/${userId}/experiences`);
    return res.data;
  },

  // Thêm kinh nghiệm mới
  createExperience: async (userId: number, data: Partial<Experience>) => {
    const res = await axiosClient.post(`/profiles/${userId}/experiences`, data);
    return res.data;
  },

  // Cập nhật kinh nghiệm
  updateExperience: async (userId: number, experienceId: number, data: Partial<Experience>) => {
    const res = await axiosClient.put(`/profiles/${userId}/experiences/${experienceId}`, data);
    return res.data;
  },

  // Xóa kinh nghiệm
  deleteExperience: async (userId: number, experienceId: number) => {
    const res = await axiosClient.delete(`/profiles/${userId}/experiences/${experienceId}`);
    return res.data;
  },
};
