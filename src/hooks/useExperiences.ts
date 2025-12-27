import { useCallback } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createExperienceThunk,
  deleteExperienceThunk,
  fetchExperiencesByUserThunk,
  updateExperienceThunk,
  ExperienceInput,
} from "@/store/thunks/experienceThunks";

export const useExperiences = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.experience);

  const fetchExperiences = useCallback(
    async (userId: number) => {
      const result = await dispatch(fetchExperiencesByUserThunk(userId));
      if (fetchExperiencesByUserThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to fetch experiences");
      }
      return result;
    },
    [dispatch]
  );

  const createExperience = useCallback(
    async (data: ExperienceInput) => {
      const result = await dispatch(createExperienceThunk(data));
      if (createExperienceThunk.fulfilled.match(result)) {
        toast.success("Thêm kinh nghiệm thành công");
      } else if (createExperienceThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to create experience");
      }
      return result;
    },
    [dispatch]
  );

  const updateExperience = useCallback(
    async (id: number, data: ExperienceInput) => {
      const result = await dispatch(updateExperienceThunk({ id, data }));
      if (updateExperienceThunk.fulfilled.match(result)) {
        toast.success("Cập nhật kinh nghiệm thành công");
      } else if (updateExperienceThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to update experience");
      }
      return result;
    },
    [dispatch]
  );

  const deleteExperience = useCallback(
    async (id: number, userId?: number) => {
      const result = await dispatch(deleteExperienceThunk({ id, userId }));
      if (deleteExperienceThunk.fulfilled.match(result)) {
        toast.success("Xóa kinh nghiệm thành công");
      } else if (deleteExperienceThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to delete experience");
      }
      return result;
    },
    [dispatch]
  );

  return {
    experiences: items,
    loading,
    error,
    fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
  };
};
