// src/api/profileApi.ts
import axiosClient from "@/lib/axiosClient";
import { ProfileResponse, UpdateProfileRequest } from "@/types/profile";

export const profileApi = {
  /**
   * Lấy profile theo userId (slug hoặc id)
   * @param userId 
   * @returns Promise<ProfileResponse>
   */
  getProfileByUserId: (userId: string | number): Promise<ProfileResponse> => {
    return axiosClient
      .get<ProfileResponse>(`/api/profile/${userId}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error("❌ Error fetching profile:", err);
        throw err;
      });
  },

  /**
   * Cập nhật thông tin profile của chính người dùng
   * @param data UpdateProfileRequest
   * @returns Promise<void>
   */
  updateMyProfile: (data: UpdateProfileRequest): Promise<void> => {
    return axiosClient
      .put("/api/profile/me", data)
      .then(() => {})
      .catch((err) => {
        console.error("❌ Error updating profile:", err);
        throw err;
      });
  },
};
