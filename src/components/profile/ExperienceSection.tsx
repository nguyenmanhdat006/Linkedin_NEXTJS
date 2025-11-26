"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Pencil } from "lucide-react";
import { Experience } from "@/types/profile";
import ExperienceDialog from "./ExperienceDialog";

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
                <div
                  key={exp.id}
                  className="flex gap-4 mb-4 last:mb-0 group cursor-pointer"
                  onClick={() => handleEditClick(exp)}
                >
                  <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center shrink-0 border border-gray-200">
                    <Briefcase className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="border-b border-gray-200 flex-1 pb-4 last:border-0">
                    <h3 className="font-bold text-base text-gray-900">{exp.title}</h3>
                    <p className="text-sm text-gray-900">{exp.company}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {getYear(exp.startDate)} - {exp.isCurrent ? "Hiện tại" : getYear(exp.endDate)}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
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
