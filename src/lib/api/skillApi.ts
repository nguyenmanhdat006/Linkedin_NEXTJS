// src/lib/api/skillApi.ts
import axiosClient from '../axiosClient';
import { Skill } from '@/types/profile';

export const skillApi = {
  getSkills: async (userId: number) => {
    const res = await axiosClient.get(`/profiles/${userId}/skills`);
    return res.data;
  },

  createSkill: async (userId: number, data: Partial<Skill>) => {
    const res = await axiosClient.post(`/profiles/${userId}/skills`, data);
    return res.data;
  },

  updateSkill: async (userId: number, skillId: number, data: Partial<Skill>) => {
    const res = await axiosClient.put(`/profiles/${userId}/skills/${skillId}`, data);
    return res.data;
  },

  deleteSkill: async (userId: number, skillId: number) => {
    const res = await axiosClient.delete(`/profiles/${userId}/skills/${skillId}`);
    return res.data;
  },
};
