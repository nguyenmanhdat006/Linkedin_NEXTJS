import { useCallback } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProfileThunk, updateMyProfileThunk } from "@/store/thunks/profileThunks";
import { UpdateProfileRequest } from "@/types/profile";

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector(state => state.profile);

  const fetchProfile = useCallback(
    async (slug: string | number) => {
      const result = await dispatch(fetchProfileThunk(slug));
      if (fetchProfileThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to fetch profile");
      }
      return result;
    },
    [dispatch]
  );

  const updateMyProfile = useCallback(
    async (data: UpdateProfileRequest) => {
      const result = await dispatch(updateMyProfileThunk(data));
      if (updateMyProfileThunk.fulfilled.match(result)) {
        toast.success("Cập nhật hồ sơ thành công");
      } else if (updateMyProfileThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to update profile");
      }
      return result;
    },
    [dispatch]
  );

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateMyProfile,
  };
};
