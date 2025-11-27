  'use client';

  import React, { useEffect, useState } from 'react';
  import { useParams } from 'next/navigation';
  import { useDispatch, useSelector } from 'react-redux';
  import { RootState, AppDispatch } from '@/lib/store';
  import { fetchProfile } from '@/lib/store/userStore';

  import { Pencil, Eye, Users, Search, MoreHorizontal } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent } from '@/components/ui/card';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

  import { ProfileHeader } from '@/components/profile/ProfileHeader';
  import { ExperienceSection } from '@/components/profile/ExperienceSection';
  import { EducationSection } from '@/components/profile/EducationSection';
  import { SkillsSection } from '@/components/profile/SkillsSection';
  import EditIntroDialog from '@/components/profile/EditIntroDialog';
  import { MainFooter } from '@/components/layout/Footer';

  export default function ProfilePage() {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { profile, loading, error } = useSelector((state: RootState) => state.user);
    const [isEditIntroOpen, setIsEditIntroOpen] = useState(false);

    const userSlug = typeof params.userSlug === 'string' ? params.userSlug : '';

    useEffect(() => {
      if (userSlug) {
        dispatch(fetchProfile(userSlug));
      }
    }, [userSlug, dispatch]);

    if (loading) {
      return <div className="min-h-screen flex items-center justify-center bg-[#f3f2ef]">Đang tải hồ sơ...</div>;
    }

    if (error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f2ef] gap-4">
          <p>Lỗi: {error}</p>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      );
    }

    if (!profile) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f2ef] gap-4">
          <p>Không tìm thấy hồ sơ người dùng.</p>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      );
    }

    const profileData = profile; // profile đã là ProfileData
    const currentEducation = profileData.educations?.[0];

    return (
      <div className="min-h-screen bg-[#f3f2ef] font-sans pb-4 relative">
        {/* Edit Intro Dialog */}
        <EditIntroDialog open={isEditIntroOpen} onOpenChange={setIsEditIntroOpen} profileData={profileData} />

        <div className="container max-w-[1128px] mx-auto pt-6 px-0 md:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
            {/* Main content */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <ProfileHeader profile={profileData} currentEducation={currentEducation} onEdit={() => setIsEditIntroOpen(true)} />

              {/* Suggested / Analytics */}
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

              <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-bold text-gray-900">Phân tích</h2>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mb-4"><Eye className="h-3 w-3" /> Riêng cho bạn</div>
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

              {/* Sections */}
              <ExperienceSection experiences={profileData.experiences} userId={profileData.id} />
              <EducationSection educations={profileData.educations} userId={profileData.id} />
              <SkillsSection skills={profileData.skills} userId={profileData.id} />

              {/* Interests */}
              <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Mối quan tâm</h2>
                  <div className="flex gap-6 border-b border-gray-200 mb-4">
                    <div className="pb-3 border-b-[2px] border-[#01754f] text-[#01754f] font-semibold text-sm cursor-pointer">Công ty</div>
                    <div className="pb-3 text-gray-600 font-semibold text-sm cursor-pointer hover:bg-gray-50 px-2 rounded-t-md">Trường</div>
                  </div>
                  <div className="text-center py-6 text-gray-500 italic border border-dashed border-gray-300 rounded-lg">Chưa có thông tin về mối quan tâm.</div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
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
