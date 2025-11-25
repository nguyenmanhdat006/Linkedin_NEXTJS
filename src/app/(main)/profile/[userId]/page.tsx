'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Pencil, Camera, Plus, Eye, Users, Search, 
  MoreHorizontal, ArrowRight, ShieldCheck, X, Check, Briefcase 
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator"; 
import { MainFooter } from "@/components/layout/Footer"; 

import { profileApi } from '@/lib/api/profileApi'; 
import { ProfileData } from '@/types/profile'; 

// Helper format ngày
const getYear = (dateString: string | null) => {
  if (!dateString) return 'Nay';
  return new Date(dateString).getFullYear();
};

export default function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userSlug = params?.userId; 

      if (!userSlug) {
        console.error("Không tìm thấy ID trên URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await profileApi.getProfileByUserId(userSlug as string);
        if (res.success) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Lỗi tải profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params?.userId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f3f2ef]">Đang tải hồ sơ...</div>;
  }

  if (!profile) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f2ef] gap-4">
            <p>Không tìm thấy hồ sơ người dùng.</p>
            <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
    );
  }

  const currentEducation = profile.educations?.[0];

  return (
    <div className="min-h-screen bg-[#f3f2ef] font-sans pb-4 relative">
      <div className="container max-w-[1128px] mx-auto pt-6 px-0 md:px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          
          {/* --- CỘT TRÁI  --- */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* 1. HEADER CARD */}
            <Card className="overflow-hidden border border-gray-300 shadow-sm rounded-xl relative bg-white">
              {/* Ảnh bìa */}
              <div className="relative h-[201px] w-full bg-[#a0b4b7]">
                 {profile.bannerUrl ? (
                    <img src={profile.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-gray-500 text-sm">Chưa có ảnh bìa</div>
                 )}
                 <Button size="icon" className="absolute top-4 right-4 rounded-full bg-white text-blue-600 hover:bg-blue-50 h-8 w-8 shadow-sm border-none">
                    <Camera className="h-4 w-4" />
                 </Button>
              </div>

              <div className="px-6 relative pb-6">
                {/* Avatar */}
                <div className="absolute -top-[100px] left-6 border-[4px] border-white rounded-full overflow-hidden h-[160px] w-[160px] bg-white cursor-pointer shadow-none z-10">
                   <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src={profile.avatarUrl || ""} className="object-cover" />
                      <AvatarFallback className="text-4xl bg-gray-200">{profile.fullName?.charAt(0) || "U"}</AvatarFallback>
                   </Avatar>
                </div>
                
                {/* Nút Edit */}
                <div className="flex justify-end pt-4 mb-2">
                   <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                      <Pencil className="h-6 w-6 text-gray-600" />
                   </Button>
                </div>

                {/* Thông tin chính */}
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                            <h1 className="text-[24px] font-bold text-gray-900 leading-snug">{profile.fullName}</h1>
                            {profile.verified && (
                                <Badge variant="secondary" className="w-fit bg-gray-50 text-gray-600 gap-1 px-2 py-0.5 font-normal border border-gray-200 rounded-md">
                                    <ShieldCheck className="h-3 w-3 text-gray-500" /> Đã xác minh
                                </Badge>
                            )}
                        </div>

                        <p className="text-[16px] text-gray-900 mt-1">
                            {profile.headline || "Chưa cập nhật chức danh"}
                        </p>

                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <span>{profile.location || "Chưa cập nhật vị trí"}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-blue-600 font-bold hover:underline cursor-pointer">Thông tin liên hệ</span>
                        </div>

                        <div className="text-sm text-blue-600 font-bold hover:underline mt-2 cursor-pointer">
                            {profile.connectionCount} người kết nối
                        </div>
                    </div>

                    {/* Logo trường (Lấy từ Education đầu tiên) */}
                    {currentEducation && (
                        <div className="hidden md:block w-[232px] shrink-0">
                            <div className="flex items-center gap-3 cursor-pointer hover:underline">
                                <div className="h-8 w-8 bg-yellow-500 flex items-center justify-center font-bold text-[10px] text-white rounded-sm shrink-0 uppercase">
                                    {currentEducation.school.substring(0, 4)}
                                </div>
                                <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 leading-tight">
                                    {currentEducation.school}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <Button className="bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold rounded-full px-6">
                      {profile.isOwnProfile ? "Đang tìm việc" : "Kết nối"}
                    </Button>
                    <Button variant="outline" className="border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 px-6">
                      {profile.isOwnProfile ? "Phần Thêm hồ sơ" : "Nhắn tin"}
                    </Button>
                    <Button variant="outline" className="border-gray-500 text-gray-600 font-semibold rounded-full hover:bg-gray-100 px-6">
                      Thêm
                    </Button>
                </div>
              </div>
            </Card>

            {/* 2. SUGGESTED */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
              <CardContent className="p-6">
                 <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-900">Đề xuất cho bạn</h2>
                    <span className="text-xs text-gray-500 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <Eye className="h-3 w-3" /> Riêng cho bạn
                    </span>
                 </div>
                 <div className="border border-gray-200 rounded-xl p-4 mt-4">
                    <div className="flex gap-4">
                       <div className="h-12 w-12 bg-amber-100 rounded-md flex items-center justify-center shrink-0 border border-amber-200">
                          <div className="h-6 w-8 bg-amber-400 rounded-sm shadow-sm"></div>
                       </div>
                       <div className="flex-1">
                          <h3 className="font-bold text-sm text-gray-900">Viết một bản tóm tắt để làm nổi bật tính cách...</h3>
                          <p className="text-sm text-gray-600 mt-1 mb-3">Thành viên bao gồm tóm tắt nhận được nhiều lượt xem hồ sơ hơn đến 3,9 lần.</p>
                          <Button variant="outline" className="rounded-full font-semibold border-gray-600 text-gray-600 hover:bg-gray-100 bg-transparent">
                            Thêm tóm tắt
                          </Button>
                       </div>
                    </div>
                 </div>
              </CardContent>
            </Card>

            {/* 3. ANALYTICS  */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
               <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-bold text-gray-900">Phân tích</h2>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                      <Eye className="h-3 w-3" /> Riêng cho bạn
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                     <div className="flex gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                        <Users className="h-6 w-6 text-gray-600 mt-1 shrink-0" />
                        <div>
                           <div className="font-bold text-gray-900 hover:text-blue-700 hover:underline">0 lượt xem hồ sơ</div>
                           <p className="text-sm text-gray-600 leading-tight mt-1">Cập nhật hồ sơ của bạn để thu hút người xem.</p>
                        </div>
                     </div>
                     <div className="flex gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                        <Search className="h-6 w-6 text-gray-600 mt-1 shrink-0" />
                        <div>
                           <div className="font-bold text-gray-900 hover:text-blue-700 hover:underline">0 lượt xuất hiện tìm kiếm</div>
                           <p className="text-sm text-gray-600 leading-tight mt-1">Xem tần suất bạn xuất hiện trong kết quả.</p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* 5. EXPERIENCE (KINH NGHIỆM) - UPDATE LOGIC & UI */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
               <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold text-gray-900">Kinh nghiệm</h2>
                     <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                           <Plus className="h-6 w-6 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                           <Pencil className="h-5 w-5 text-gray-600" />
                        </Button>
                     </div>
                  </div>
                  
                  {profile.experiences && profile.experiences.length > 0 ? (
                    profile.experiences.map((exp) => (
                      <div key={exp.id} className="flex gap-4 mb-4 last:mb-0">
                         <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center shrink-0 border border-gray-200">
                            <Briefcase className="w-6 h-6 text-gray-500" />
                         </div>
                         <div className="border-b border-gray-200 flex-1 pb-4 last:border-0">
                            <h3 className="font-bold text-base text-gray-900">{exp.title}</h3>
                            <p className="text-sm text-gray-900">{exp.company}</p>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {getYear(exp.startDate)} - {exp.isCurrent ? 'Hiện tại' : getYear(exp.endDate)}
                            </p>
                            <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                         </div>
                      </div>
                    ))
                  ) : (
                      /* EMPTY STATE - GIỐNG SCREENSHOT */
                      <div className="mt-1">
                          <p className="text-sm text-gray-500 mb-6">
                             Giới thiệu thành tích của bạn và nhận được số lượt xem hồ sơ và kết nối gấp 2 lần.
                          </p>
                          {/* Ghost UI (Giả lập mục rỗng) */}
                          <div className="flex gap-4 mb-6 opacity-40 select-none pointer-events-none">
                             <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center shrink-0 border border-gray-300">
                                <Briefcase className="w-6 h-6 text-gray-400" />
                             </div>
                             <div className="flex-1">
                                <div className="text-base font-bold text-gray-400">Chức danh</div>
                                <div className="text-sm text-gray-400">Tổ chức</div>
                                <div className="text-sm text-gray-400 mt-0.5">2023 - nay</div>
                             </div>
                          </div>
                          
                          <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-800 border-[1.5px] px-5 h-9">
                             Thêm kinh nghiệm
                          </Button>
                      </div>
                  )}
               </CardContent>
            </Card>

            {/* 6. EDUCATION (HỌC VẤN) - UPDATE LOGIC & UI */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
               <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold text-gray-900">Trình độ học vấn</h2>
                     <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                           <Plus className="h-6 w-6 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                            <Pencil className="h-5 w-5 text-gray-600" />
                        </Button>
                     </div>
                  </div>
                  
                  {profile.educations && profile.educations.length > 0 ? (
                    profile.educations.map((edu) => (
                        <div key={edu.id} className="flex gap-4 mb-4 last:mb-0 group">
                            <div className="h-12 w-12 bg-blue-50 rounded-md shrink-0 overflow-hidden flex items-center justify-center border border-gray-200">
                                <div className="text-[10px] font-bold text-blue-800 uppercase">{edu.school.substring(0,3)}</div>
                            </div>
                            <div className="border-b border-gray-200 flex-1 pb-4 last:border-0">
                                <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 group-hover:underline cursor-pointer">{edu.school}</h3>
                                <p className="text-sm text-gray-900">{edu.degree}, {edu.fieldOfStudy}</p>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {getYear(edu.startDate)} - {getYear(edu.endDate)}
                                </p>
                            </div>
                        </div>
                    ))
                  ) : (
                      /* EMPTY STATE  */
                      <div className="mt-1">
                          <p className="text-sm text-gray-500 mb-6">
                              Thêm thông tin trường học để tăng độ uy tín cho hồ sơ của bạn.
                          </p>
                           {/* Ghost UI */}
                           <div className="flex gap-4 mb-6 opacity-40 select-none pointer-events-none">
                             <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center shrink-0 border border-gray-300">
                                <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                             </div>
                             <div className="flex-1">
                                <div className="text-base font-bold text-gray-400">Trường học</div>
                                <div className="text-sm text-gray-400 mt-0.5">2024 - 2028</div>
                             </div>
                          </div>
                          <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-800 border-[1.5px] px-5 h-9">
                             Thêm trình độ học vấn
                          </Button>
                      </div>
                  )}
               </CardContent>
            </Card>

            {/* 7. SKILLS (KỸ NĂNG) - UPDATE LOGIC & UI */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
               <CardContent className="p-6 relative">
                 <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold text-gray-900">Kỹ năng</h2>
                     <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                            <Plus className="h-6 w-6 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                            <Pencil className="h-5 w-5 text-gray-600" />
                        </Button>
                     </div>
                 </div>

                 {profile.skills && profile.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill) => (
                            <Badge key={skill.id} variant="secondary" className="px-3 py-1.5 text-sm font-medium border-gray-300 hover:bg-gray-200 cursor-pointer">
                                {skill.name} ({skill.endorsementCount})
                            </Badge>
                        ))}
                    </div>
                 ) : (
                    /* EMPTY STATE - GIỐNG SCREENSHOT */
                    <div>
                        <p className="text-sm text-gray-700 mb-4 pr-6">
                            Truyền đạt sự phù hợp của bạn với các cơ hội mới - 50% nhà tuyển dụng sử dụng dữ liệu kỹ năng để hoàn thành vai trò của họ
                        </p>
                        
                        {/* Placeholder Lines */}
                        <div className="flex flex-col gap-2 mb-5">
                            <div className="text-sm text-gray-400 font-medium border-b border-gray-100 pb-2">
                                Kỹ năng mềm
                            </div>
                            <div className="text-sm text-gray-400 font-medium pb-1">
                                Kỹ năng kỹ thuật
                            </div>
                        </div>

                        <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-800 border-[1.5px] px-6 h-9">
                            Thêm kỹ năng
                        </Button>
                    </div>
                 )}
               </CardContent>
            </Card>

            {/* 8. INTERESTS (GIỮ NGUYÊN) */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
               <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Mối quan tâm</h2>
                  <div className="flex gap-6 border-b border-gray-200 mb-4">
                     <div className="pb-3 border-b-[2px] border-[#01754f] text-[#01754f] font-semibold text-sm cursor-pointer">Công ty</div>
                     <div className="pb-3 text-gray-600 font-semibold text-sm cursor-pointer hover:bg-gray-50 px-2 rounded-t-md">Trường</div>
                  </div>
                  <div className="text-center py-6 text-gray-500 italic border border-dashed border-gray-300 rounded-lg">
                      Chưa có thông tin về mối quan tâm.
                  </div>
               </CardContent>
            </Card>

          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white overflow-hidden">
                <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="text-base font-semibold text-gray-600">Ngôn ngữ hồ sơ</div>
                    <Pencil className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex justify-between items-start px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div>
                        <div className="text-base font-semibold text-gray-600">Hồ sơ công khai và URL</div>
                        <div className="text-sm text-gray-500 mt-1 truncate max-w-[220px]">www.linkedin.com/in/dat-nguyen</div>
                    </div>
                    <Pencil className="h-5 w-5 text-gray-600 mt-1" />
                </div>
            </Card>

            <Card className="rounded-xl border border-gray-300 shadow-sm overflow-hidden bg-white">
                <div className="p-2 text-right text-[11px] text-gray-900 flex justify-end items-center gap-1">
                    Quảng cáo <MoreHorizontal className="h-3 w-3" />
                </div>
                <div className="px-4 pb-4 text-center cursor-pointer">
                    <p className="text-sm text-gray-500 mb-3 font-normal">Dat, see who's hiring on LinkedIn.</p>
                    <div className="flex gap-4 items-center justify-center mb-6">
                        <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-gray-200 bg-white p-0.5 shadow-sm">
                            <img src="https://github.com/shadcn.png" className="w-full h-full object-cover rounded-full" alt="Ad Avatar" />
                        </div>
                        <div className="w-[80px] h-[80px] rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                            <div className="bg-amber-700 h-10 w-10 rounded"></div>
                        </div>
                    </div>
                    <p className="text-base text-gray-900 mb-4 px-2">See who's hiring on LinkedIn.</p>
                    <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 font-semibold w-3/4 hover:bg-blue-50 bg-transparent h-10 text-base">
                        View jobs
                    </Button>
                </div>
            </Card>

            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4 text-base">Những người bạn có thể biết</h3>
                    
                    <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
                        <div className="flex gap-3">
                            <Avatar className="h-12 w-12 cursor-pointer border border-gray-200">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>VN</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-sm cursor-pointer hover:underline decoration-blue-600 text-gray-900">Vân Nguyễn</div>
                                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">Public Relations Manager</p>
                            </div>
                        </div>
                        <Button variant="outline" className="ml-14 rounded-full border-gray-500 text-gray-600 font-semibold hover:bg-gray-100 hover:border-gray-900 h-9 bg-transparent transition-all">
                            <Users className="w-4 h-4 mr-1" /> Kết nối
                        </Button>
                    </div>

                    <div className="mt-4 pt-2 border-t border-gray-100">
                        <div className="flex justify-center cursor-pointer hover:bg-gray-100 py-2 rounded-lg transition-colors">
                            <span className="text-sm font-semibold text-gray-600">Hiển thị tất cả</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

          </div>
          
        </div>

        <MainFooter />

      </div>

    </div>
  );
}