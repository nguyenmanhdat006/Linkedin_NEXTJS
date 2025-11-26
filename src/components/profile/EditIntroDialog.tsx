// src/components/profile/EditIntroDialog.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { profileApi } from "@/lib/api/profileApi";
import { ProfileData } from "@/types/profile";
import { toast } from "react-toastify";

interface EditIntroDialogProps {
  open: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  profileData?: ProfileData | null;
}

export default function EditIntroDialog({ open, onOpenChange, profileData }: EditIntroDialogProps) {
  const { register, handleSubmit } = useForm<ProfileData>({
    defaultValues: {
      fullName: profileData?.fullName ?? "",
      headline: profileData?.headline ?? "",
      about: profileData?.about ?? "",
      location: profileData?.location ?? "",
      website: profileData?.website ?? "",
      phone: profileData?.phone ?? "",
    },
  });

  const onSubmit = async (data: ProfileData) => {
    try {
      const [city, country] = data.location?.split(",").map(s => s.trim()) || ["", ""];
      await profileApi.updateMyProfile({
        fullName: data.fullName,
        headline: data.headline,
        about: data.about,
        city,
        country,
        website: data.website,
        phone: data.phone,
      });
      onOpenChange?.(false);
      toast.success("Cập nhật hồ sơ thành công vui lòng reload trang");
    } catch (err) {
      console.error("Update error", err);
      toast.error("Cập nhật hồ sơ thất bại");
    }
  };

  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";
  const inputClass = "h-9 border-gray-400 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black rounded-md";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] sm:rounded-xl p-6 bg-white">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form id="edit-intro-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">

          <div>
            <label className={labelClass}>Full Name</label>
            <Input {...register("fullName")} className={inputClass} placeholder="Ex: John Doe" />
          </div>

          <div>
            <label className={labelClass}>Headline</label>
            <Input {...register("headline")} className={inputClass} placeholder="Software Engineer at Company X" />
          </div>

          <div>
            <label className={labelClass}>Summary</label>
            <Textarea {...register("about")} rows={4} className="resize-none border-gray-400 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black rounded-md" />
          </div>

          <div>
            <label className={labelClass}>Location</label>
            <Input {...register("location")} className={inputClass} placeholder="City, Country" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Phone</label>
              <Input {...register("phone")} className={inputClass} type="tel" />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <Input {...register("website")} className={inputClass} type="url" placeholder="https://" />
            </div>
          </div>

        </form>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={() => onOpenChange?.(false)}>Cancel</Button>
          <Button type="submit" form="edit-intro-form">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
