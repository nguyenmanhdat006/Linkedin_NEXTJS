import axiosClient from "@/lib/axiosClient";
import { API_ENDPOINTS } from "@/constants";
import { ProfileData, UpdateProfileRequest } from "@/types/profile";
import { ApiResponse } from "@/types/api";

export const profileService = {
  getProfileBySlug: async (slug: string | number): Promise<ProfileData> => {
    const res = await axiosClient.get<ApiResponse<ProfileData>>(API_ENDPOINTS.PROFILE.BY_SLUG(slug));
    return res.data.data; // unwrap ApiResponse<ProfileData>
  },

  updateMyProfile: async (data: UpdateProfileRequest): Promise<void> => {
    await axiosClient.put(API_ENDPOINTS.PROFILE.ME, data);
  },
};
