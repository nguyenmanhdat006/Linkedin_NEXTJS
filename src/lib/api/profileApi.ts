import axiosClient from "@/lib/axiosClient";
import { ProfileResponse } from "@/types/profile";
export const profileApi = {
  /**
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
};
