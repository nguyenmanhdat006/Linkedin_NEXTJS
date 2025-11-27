import axiosClient from '../axiosClient';
import { Experience } from '@/types/profile';

export const experienceApi = {
  getExperiences: async (userId: number) => {
    const res = await axiosClient.get(`/profiles/${userId}/experiences`);
    return res.data;
  },

  createExperience: async (userId: number, data: Partial<Experience>) => {
    const res = await axiosClient.post(`/profiles/${userId}/experiences`, data);
    return res.data;
  },

  updateExperience: async (userId: number, experienceId: number, data: Partial<Experience>) => {
    const res = await axiosClient.put(`/profiles/${userId}/experiences/${experienceId}`, data);
    return res.data;
  },

  deleteExperience: async (userId: number, experienceId: number) => {
    const res = await axiosClient.delete(`/profiles/${userId}/experiences/${experienceId}`);
    return res.data;
  },
};
