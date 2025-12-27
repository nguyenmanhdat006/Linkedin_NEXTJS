"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Pencil } from "lucide-react";
import { Experience } from "@/types/profile";
import ExperienceDialog from "./ExperienceDialog";
import { useExperiences } from "@/hooks/useExperiences";

interface ExperienceSectionProps {
  experiences?: Experience[];
  userId?: number | null;
}

export function ExperienceSection({ experiences, userId }: ExperienceSectionProps) {
  const [open, setOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const getYear = (dateString?: string | null) => {
    if (!dateString) return "Nay";
    return new Date(dateString).getFullYear();
  };

  const handleEditClick = (exp?: Experience) => {
    setSelectedExp(exp ?? null);
    setOpen(true);
  };

  const { deleteExperience } = useExperiences();

  const handleDelete = async (id: number) => {
    if (!userId) return;
    if (!confirm("Bạn có chắc muốn xóa kinh nghiệm này?")) return;
    try {
      await deleteExperience(id, userId ?? undefined);
    } catch (e) {
      console.error(e);
      alert("Xóa thất bại");
    }
  };

  return (
    <>
      <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Kinh nghiệm</h2>
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
            {experiences && experiences.length > 0 ? (
              experiences.map((exp) => (
                <div key={exp.id} className="flex gap-4 mb-4 last:mb-0 group">
                  <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center shrink-0 border border-gray-200">
                    <Briefcase className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="border-b border-gray-200 flex-1 pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div className="cursor-pointer" onClick={() => handleEditClick(exp)}>
                        <h3 className="font-bold text-base text-gray-900">{exp.title}</h3>
                        <p className="text-sm text-gray-900">{exp.company}</p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {getYear(exp.startDate)} - {exp.isCurrent ? "Hiện tại" : getYear(exp.endDate)}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                      </div>
                      <div className="ml-2 mt-1 flex items-start gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(exp)}>
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(exp.id)}>
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
                  Thêm thông tin kinh nghiệm để hồ sơ của bạn nổi bật hơn.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-800 border-[1.5px] px-5 h-9"
                  onClick={() => handleEditClick()}
                >
                  Thêm kinh nghiệm
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ExperienceDialog
        open={open}
        onOpenChange={setOpen}
        experience={selectedExp}
        userId={userId}
      />
    </>
  );
}
