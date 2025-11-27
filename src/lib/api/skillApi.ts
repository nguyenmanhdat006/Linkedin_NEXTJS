import axiosClient from "@/lib/axiosClient";
import { Skill } from "@/types/profile";

export const skillApi = {
  // GET all skills
  getSkills() {
    return axiosClient.get<{ success: boolean; message: string; data: Skill[] }>(
      `/api/skills`
    );
  },

  // CREATE new skill
  createSkill(data: Skill) {
    return axiosClient.post<{ success: boolean; message: string; data: Skill }>(
      `/api/skills`,
      data
    );
  },

  // UPDATE skill
  updateSkill(id: number, data: Skill) {
    return axiosClient.put<{ success: boolean; message: string; data: Skill }>(
      `/api/skills/${id}`,
      data
    );
  },

  // DELETE skill
  deleteSkill(id: number) {
    return axiosClient.delete<{ success: boolean; message: string; data: string }>(
      `/api/skills/${id}`
    );
  },
};
