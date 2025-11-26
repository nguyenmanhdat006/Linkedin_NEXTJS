import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Pencil, Camera, MapPin, Globe, Phone, BookOpen } from 'lucide-react'
import { ProfileData } from '@/types/profile'

interface ProfileHeaderProps {
  profile: ProfileData
  currentEducation?: { school?: string } | null
  onEdit?: () => void
}

export function ProfileHeader({ profile, currentEducation, onEdit }: ProfileHeaderProps) {
  return (
    <div>
      <div className="overflow-hidden border border-gray-300 shadow-sm rounded-xl relative bg-white">
        {/* Banner */}
        <div className="relative h-[201px] w-full bg-[#a0b4b7]">
          {profile.bannerUrl ? (
            <img src={profile.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-gray-500 text-sm">
              Chưa có ảnh bìa
            </div>
          )}
          <Button
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-white text-blue-600 hover:bg-blue-50 h-8 w-8 shadow-sm border-none"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        {/* Avatar & Edit */}
        <div className="px-6 relative pb-6">
          <div className="absolute -top-[100px] left-6 border-[4px] border-white rounded-full overflow-hidden h-[160px] w-[160px] bg-white cursor-pointer shadow-none z-10">
            <Avatar className="h-full w-full rounded-none">
              <AvatarImage src={profile.avatarUrl || ""} className="object-cover" />
              <AvatarFallback className="text-4xl bg-gray-200">{profile.fullName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex justify-end pt-4 mb-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10" onClick={onEdit}>
              <Pencil className="h-6 w-6 text-gray-600" />
            </Button>
          </div>

          {/* Profile info */}
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="flex-1">
              {/* Name & Verified */}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <h1 className="text-[24px] font-bold text-gray-900 leading-snug">{profile.fullName}</h1>
                {profile.verified && (
                  <Badge variant="secondary" className="w-fit bg-gray-50 text-gray-600 gap-1 px-2 py-0.5 font-normal border border-gray-200 rounded-md flex items-center">
                    <ShieldCheck className="h-3 w-3 text-gray-500" /> Đã xác minh
                  </Badge>
                )}
              </div>

              {/* Headline */}
              <p className="text-[16px] text-gray-900 mt-1">{profile.headline || "Chưa cập nhật chức danh"}</p>

              {/* Summary / About */}
              <p className="text-sm text-gray-700 mt-2">{profile.about || "Chưa có summary"}</p>

              {/* Location */}
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" /> {profile.location || "Chưa cập nhật vị trí"}
                </div>

                {/* Phone */}
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-400" /> {profile.phone || "Chưa cập nhật"}
                </div>

                {/* Website */}
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-gray-400" /> {profile.website || "Chưa cập nhật"}
                </div>
              </div>

              {/* Education */}
              <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                <BookOpen className="h-4 w-4 text-gray-400" /> {currentEducation?.school ? currentEducation.school : "Chưa có thông tin trường học"}
              </div>

              {/* Connection */}
              <div className="text-sm text-blue-600 font-bold hover:underline mt-2 cursor-pointer">
                {profile.connectionCount} người kết nối
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button className="bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold rounded-full px-6">
              {profile.isOwnProfile ? "Đang tìm việc" : "Kết nối"}
            </Button>
            <Button variant="outline" className="border-gray-500 text-gray-600 font-semibold rounded-full hover:bg-gray-100 px-6">
              Tài nguyên
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
