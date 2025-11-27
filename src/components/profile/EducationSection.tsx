"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Education } from '@/types/profile';
import EducationDialog from './EducationDialog';
import { useAppDispatch } from '@/lib/store';
import { deleteEducation } from '@/lib/store/educationStore';

interface EducationSectionProps {
  educations?: Education[];
  userId?: number | null;
}

export function EducationSection({ educations, userId }: EducationSectionProps) {
  const [open, setOpen] = useState(false);
  const [selectedEdu, setSelectedEdu] = useState<Education | null>(null);

  const getYear = (dateString?: string | null) => {
    if (!dateString) return 'Nay';
    return new Date(dateString).getFullYear();
  };

  const handleEditClick = (edu?: Education) => {
    setSelectedEdu(edu ?? null); // Nếu click vào pencil tổng → không chọn edu nào
    setOpen(true);
  };

  const dispatch = useAppDispatch();

  const handleDelete = async (id?: number) => {
    if (!id || !userId) return;
    if (!confirm('Bạn có chắc muốn xóa học vấn này?')) return;
    try {
      await dispatch(deleteEducation({ id, userId })).unwrap();
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
  };

  return (
    <>
      <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Trình độ học vấn</h2>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 h-10 w-10"
                onClick={() => handleEditClick()}
              >
                <Pencil className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto pr-2">
            {educations && educations.length > 0 ? (
              educations.map((edu) => (
                <div key={edu.id} className="flex gap-4 mb-4 last:mb-0 group">
                  <div className="h-12 w-12 bg-blue-50 rounded-md shrink-0 overflow-hidden flex items-center justify-center border border-gray-200">
                    <div className="text-[10px] font-bold text-blue-800 uppercase">{edu.school.substring(0, 3)}</div>
                  </div>
                  <div className="border-b border-gray-200 flex-1 pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div className="cursor-pointer" onClick={() => handleEditClick(edu)}>
                        <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 group-hover:underline">{edu.school}</h3>
                        <p className="text-sm text-gray-900">{edu.degree}, {edu.fieldOfStudy}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{getYear(edu.startDate)} - {getYear(edu.endDate)}</p>
                      </div>
                      <div className="ml-2 mt-1 flex items-start gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(edu)}>
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(edu.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-1">
                <p className="text-sm text-gray-500 mb-6">
                  Thêm thông tin trường học để tăng độ uy tín cho hồ sơ của bạn.
                </p>

                <Button
                  variant="outline"
                  className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-800 border-[1.5px] px-5 h-9"
                  onClick={() => handleEditClick()}
                >
                  Thêm trình độ học vấn
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog form */}
      <EducationDialog
        open={open}
        onOpenChange={setOpen}
        education={selectedEdu}
        userId={userId}
      />
    </>
  );
}
