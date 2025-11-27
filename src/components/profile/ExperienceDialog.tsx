'use client';

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Experience } from "@/types/profile";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/store";
import { createExperience, updateExperience } from "@/lib/store/experienceStore";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience?: Experience | null;
  userId?: number | null;
}

export default function ExperienceDialog({ open, onOpenChange, experience, userId }: Props) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<Experience>({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    },
  });

  useEffect(() => {
    if (experience) {
      reset({
        title: experience.title ?? "",
        company: experience.company ?? "",
        location: experience.location ?? "",
        employmentType: experience.employmentType ?? "",
        startDate: experience.startDate ?? "",
        endDate: experience.endDate ?? "",
        isCurrent: experience.isCurrent ?? false,
        description: experience.description ?? "",
      });
    } else {
      reset({
        title: "",
        company: "",
        location: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      });
    }
  }, [experience, reset]);

  const onSubmit = async (data: Experience) => {
    if (!userId) return;
    try {
      const payload = { userId, ...data } as any;
      if (experience?.id) {
        await dispatch(updateExperience({ id: experience.id, data: payload })).unwrap();
        toast.success("Cập nhật kinh nghiệm thành công!");
      } else {
        await dispatch(createExperience(payload)).unwrap();
        toast.success("Thêm kinh nghiệm thành công!");
      }
      onOpenChange(false);
    } catch (e) {
      console.error(e);
      toast.error("Thao tác thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] sm:rounded-2xl p-0 bg-white shadow-xl flex flex-col max-h-[80vh] overflow-hidden">

        {/* Sticky Header */}
        <DialogHeader className="p-6 bg-white sticky top-0 z-10 shadow-sm rounded-t-2xl">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {experience ? "Chỉnh sửa kinh nghiệm" : "Thêm kinh nghiệm"}
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable form content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-b-2xl">
          <form id="exp-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Chức danh</label>
              <Input {...register("title")} className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ví dụ: Kỹ sư phần mềm" />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
              <Input {...register("company")} className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ví dụ: Google" />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
              <Input {...register("location")} className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ví dụ: Hà Nội" />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình công việc</label>
              <select
                {...register("employmentType")}
                className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                defaultValue=""
              >
                <option value="" disabled>Chọn loại hình công việc</option>
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="FREELANCE">Freelance</option>
                <option value="SELF_EMPLOYED">Self-employed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bắt đầu</label>
                <Input {...register("startDate")} type="date" className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kết thúc</label>
                <Input {...register("endDate")} type="date" className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("isCurrent")} className="w-4 h-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-gray-700">Hiện tại</span>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
              <Textarea {...register("description")} rows={3} className="resize-none border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Thành tích, dự án..." />
            </div>

          </form>
        </div>

        {/* Sticky Footer */}
        <DialogFooter className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10 flex justify-end gap-2 rounded-b-2xl shadow-t">
          <Button variant="ghost" className="rounded-full" onClick={() => onOpenChange(false)}>Hủy</Button>
          <Button form="exp-form" type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
