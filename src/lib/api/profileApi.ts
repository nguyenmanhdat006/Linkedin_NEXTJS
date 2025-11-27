import axiosClient from "@/lib/axiosClient";
import { ProfileResponse, UpdateProfileRequest } from "@/types/profile";

export const profileApi = {
  /**
   * @param userId 
   * @returns Promise<ProfileResponse>
   */
  getProfileBySlug: (userSlug: string | number): Promise<ProfileResponse> => {
    return axiosClient
      .get<ProfileResponse>(`/api/profile/${userSlug}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error("❌ Error fetching profile:", err);
        throw err;
      });
  },

  /**
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
