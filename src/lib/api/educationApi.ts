import axiosClient from "@/lib/axiosClient";

export const educationApi = {
  // GET all education by userId
  getByUserId(userId: number) {
    return axiosClient.get(`/education/user/${userId}`);
  },

  // CREATE new education
  createEducation(data: any) {
    return axiosClient.post(`/education`, data);
  },

  // UPDATE education
  updateEducation(id: number, data: any) {
    return axiosClient.put(`/education/${id}`, data);
  },

  // DELETE education
  deleteEducation(id: number) {
    return axiosClient.delete(`/education/${id}`);
  },
};
