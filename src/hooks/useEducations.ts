import { useCallback } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createEducationThunk,
  deleteEducationThunk,
  fetchEducationsByUserThunk,
  updateEducationThunk,
  EducationInput,
} from "@/store/thunks/educationThunks";

export const useEducations = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.education);

  const fetchEducations = useCallback(
    async (userId: number) => {
      const result = await dispatch(fetchEducationsByUserThunk(userId));
      if (fetchEducationsByUserThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to fetch educations");
      }
      return result;
    },
    [dispatch]
  );

  const createEducation = useCallback(
    async (data: EducationInput) => {
      const result = await dispatch(createEducationThunk(data));
      if (createEducationThunk.fulfilled.match(result)) {
        toast.success("Thêm học vấn thành công");
      } else if (createEducationThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to create education");
      }
      return result;
    },
    [dispatch]
  );

  const updateEducation = useCallback(
    async (id: number, data: EducationInput) => {
      const result = await dispatch(updateEducationThunk({ id, data }));
      if (updateEducationThunk.fulfilled.match(result)) {
        toast.success("Cập nhật học vấn thành công");
      } else if (updateEducationThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to update education");
      }
      return result;
    },
    [dispatch]
  );

  const deleteEducation = useCallback(
    async (id: number, userId?: number) => {
      const result = await dispatch(deleteEducationThunk({ id, userId }));
      if (deleteEducationThunk.fulfilled.match(result)) {
        toast.success("Xóa học vấn thành công");
      } else if (deleteEducationThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to delete education");
      }
      return result;
    },
    [dispatch]
  );

  return {
    educations: items,
    loading,
    error,
    fetchEducations,
    createEducation,
    updateEducation,
    deleteEducation,
  };
};
