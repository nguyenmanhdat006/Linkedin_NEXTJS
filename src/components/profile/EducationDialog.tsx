'use client';

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Education } from "@/types/profile";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/store";
import { createEducation, updateEducation } from "@/lib/store/educationStore";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education?: Education | null;
  userId?: number | null;
}

export default function EducationDialog({ open, onOpenChange, education, userId }: Props) {

  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<Education>({
    defaultValues: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: undefined,
      activities: "",
      description: "",
      displayOrder: 0,
    },
  });

  useEffect(() => {
    if (education) {
      reset({
        school: education.school,
        degree: education.degree,
        fieldOfStudy: education.fieldOfStudy,
        startDate: education.startDate ?? "",
        endDate: education.endDate ?? "",
        grade: education.grade ?? undefined,
        activities: education.activities ?? "",
        description: education.description ?? "",
        displayOrder: education.displayOrder ?? 0,
      });
    } else {
      reset({
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: undefined,
        activities: "",
        description: "",
        displayOrder: 0,
      });
    }
  }, [education, reset]);

  const onSubmit = async (data: Education) => {
    try {
      const payload = { userId, ...data } as any;

      if (education?.id) {
        await dispatch(updateEducation({ id: education.id, data: payload })).unwrap();
        toast.success("Cập nhật học vấn thành công!");
      } else {
        await dispatch(createEducation(payload)).unwrap();
        toast.success("Thêm học vấn thành công!");
      }

      onOpenChange(false);

    } catch (e) {
      console.error(e);
      toast.error("Thao tác thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] sm:rounded-2xl p-0 bg-white shadow-xl flex flex-col max-h-[80vh]">

        {/* Sticky Header */}
        <DialogHeader className="p-6 bg-white sticky top-0 z-10 shadow-sm rounded-t-2xl">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {education ? "Chỉnh sửa học vấn" : "Thêm học vấn"}
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable form content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-b-2xl">
          <form id="edu-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Trường / Học viện</label>
              <Input {...register("school")} className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ví dụ: Đại học Bách Khoa" />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bằng cấp</label>
              <Input {...register("degree")} className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Cử nhân, Kỹ sư..." />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngành học</label>
              <Input {...register("fieldOfStudy")} className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ví dụ: CNTT" />
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

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Điểm GPA</label>
              <Input {...register("grade")} type="number" step="0.01" className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ví dụ: 3.8" />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hoạt động ngoại khóa</label>
              <Textarea {...register("activities")} rows={2} className="resize-none border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="CLB, dự án..." />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả thêm</label>
              <Textarea {...register("description")} rows={3} className="resize-none border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Thành tích, dự án..." />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
              <Input {...register("displayOrder")} type="number" className="h-10 border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ví dụ: 1" />
            </div>

          </form>
        </div>

        {/* Sticky Footer */}
        <DialogFooter className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10 flex justify-end gap-2 rounded-b-2xl shadow-t">
          <Button variant="ghost" className="rounded-full" onClick={() => onOpenChange(false)}>Hủy</Button>
          <Button form="edu-form" type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
