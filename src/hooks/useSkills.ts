import { useCallback } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createSkillThunk,
  deleteSkillThunk,
  fetchSkillsThunk,
  updateSkillThunk,
  SkillInput,
} from "@/store/thunks/skillThunks";

export const useSkills = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.skill);

  const fetchSkills = useCallback(async () => {
    const result = await dispatch(fetchSkillsThunk());
    if (fetchSkillsThunk.rejected.match(result)) {
      toast.error(result.payload || "Failed to fetch skills");
    }
    return result;
  }, [dispatch]);

  const createSkill = useCallback(
    async (data: SkillInput) => {
      const result = await dispatch(createSkillThunk(data));
      if (createSkillThunk.fulfilled.match(result)) {
        toast.success("Thêm kỹ năng thành công");
      } else if (createSkillThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to create skill");
      }
      return result;
    },
    [dispatch]
  );

  const updateSkill = useCallback(
    async (id: number, data: SkillInput) => {
      const result = await dispatch(updateSkillThunk({ id, data }));
      if (updateSkillThunk.fulfilled.match(result)) {
        toast.success("Cập nhật kỹ năng thành công");
      } else if (updateSkillThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to update skill");
      }
      return result;
    },
    [dispatch]
  );

  const deleteSkill = useCallback(
    async (id: number, userId?: number) => {
      const result = await dispatch(deleteSkillThunk({ id, userId }));
      if (deleteSkillThunk.fulfilled.match(result)) {
        toast.success("Xóa kỹ năng thành công");
      } else if (deleteSkillThunk.rejected.match(result)) {
        toast.error(result.payload || "Failed to delete skill");
      }
      return result;
    },
    [dispatch]
  );

  return {
    skills: items,
    loading,
    error,
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
  };
};
