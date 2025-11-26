'use client';

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skill } from "@/types/profile";
import { skillApi } from "@/lib/api/skillApi";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: Skill | null;
  userId?: number | null;
}

export default function SkillDialog({ open, onOpenChange, skill, userId }: Props) {
  const { register, handleSubmit, reset } = useForm<Partial<Skill>>({
    defaultValues: { name: '', category: '', description: '' },
  });

  useEffect(() => {
    if (skill) {
      reset({
        name: skill.name ?? '',
        category: skill.category ?? '',
        description: skill.description ?? '',
      });
    } else {
      reset({ name: '', category: '', description: '' });
    }
  }, [skill, reset]);

  const onSubmit = async (data: Partial<Skill>) => {
    if (!userId) return;
    try {
      if (skill?.id) {
        await skillApi.updateSkill(userId, skill.id, data);
        toast.success("Cập nhật kỹ năng thành công!");
      } else {
        await skillApi.createSkill(userId, data);
        toast.success("Thêm kỹ năng thành công!");
      }
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Thao tác thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] sm:rounded-2xl p-0 bg-white shadow-xl flex flex-col max-h-[80vh]">

        {/* Sticky Header */}
        <DialogHeader className="p-6 bg-white sticky top-0 z-10 shadow-sm rounded-t-2xl">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {skill ? "Chỉnh sửa kỹ năng" : "Thêm kỹ năng"}
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable form content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-b-2xl">
          <form id="skill-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên kỹ năng</label>
              <Input
                {...register("name")}
                className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ví dụ: JavaScript"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại kỹ năng</label>
              <Input
                {...register("category")}
                className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ví dụ: Kỹ năng mềm, Kỹ thuật"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
              <Textarea
                {...register("description")}
                rows={3}
                className="resize-none border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Thành tích, dự án liên quan..."
              />
            </div>

          </form>
        </div>

        {/* Sticky Footer */}
        <DialogFooter className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10 flex justify-end gap-2 rounded-b-2xl shadow-t">
          <Button variant="ghost" className="rounded-full" onClick={() => onOpenChange(false)}>Hủy</Button>
          <Button form="skill-form" type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
            Lưu
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
