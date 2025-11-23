'use client';

import React from 'react';
import { 
  Pencil, Camera, Plus, Eye, Users, Search, 
  MoreHorizontal, ArrowRight, ShieldCheck, X, Check, ChevronDown 
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MainFooter } from "@/components/layout/Footer"; 

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f3f2ef] font-sans pb-4 relative">
      <div className="container max-w-[1128px] mx-auto pt-6 px-0 md:px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          
          {/* --- CỘT TRÁI (NỘI DUNG CHÍNH) --- */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* 1. HEADER CARD (ĐÃ SỬA LỖI LỆCH) */}
            <Card className="overflow-hidden border border-gray-300 shadow-sm rounded-xl relative bg-white">
              {/* Ảnh bìa */}
              <div className="relative h-[201px] w-full bg-[#a0b4b7]">
                 <Button size="icon" className="absolute top-4 right-4 rounded-full bg-white text-blue-600 hover:bg-blue-50 h-8 w-8 shadow-sm border-none">
                    <Camera className="h-4 w-4" />
                 </Button>
              </div>

              <div className="px-6 relative pb-6">
                {/* Avatar */}
                <div className="absolute -top-[100px] left-6 border-[4px] border-white rounded-full overflow-hidden h-[160px] w-[160px] bg-white cursor-pointer shadow-none z-10">
                   <img src="https://github.com/shadcn.png" alt="Profile" className="h-full w-full object-cover" />
                </div>
                
                {/* Nút Edit nằm riêng ở góc trên cùng bên phải */}
                <div className="flex justify-end pt-4 mb-2">
                   <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                      <Pencil className="h-6 w-6 text-gray-600" />
                   </Button>
                </div>

                {/* Grid chia 2 phần: Thông tin cá nhân (Trái) - Trường học (Phải) */}
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    
                    {/* Phần thông tin cá nhân (Tên, Headline...) */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                            <h1 className="text-[24px] font-bold text-gray-900 leading-snug">Dat Nguyen</h1>
                            <Badge variant="secondary" className="w-fit bg-gray-50 text-gray-600 hover:bg-gray-200 gap-1 px-2 py-0.5 font-normal border border-gray-200 rounded-md">
                                <ShieldCheck className="h-3 w-3 text-gray-500" />
                                Thêm huy hiệu xác minh
                            </Badge>
                        </div>

                        <p className="text-[16px] text-gray-900 mt-1">
                            Sinh viên tại Học viện Công nghệ Bưu chính viễn thông
                        </p>

                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <span>Hanoi Capital Region</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-blue-600 font-bold hover:underline cursor-pointer">Thông tin liên hệ</span>
                        </div>

                        <div className="text-sm text-blue-600 font-bold hover:underline mt-2 cursor-pointer">
                            1 người theo dõi
                        </div>
                    </div>

                    {/* Phần Trường học (Logo PTIT) - Nằm bên phải, ngang hàng với Tên */}
                    <div className="hidden md:block w-[232px] shrink-0">
                        <div className="flex items-center gap-3 cursor-pointer hover:underline">
                            <div className="h-8 w-8 bg-yellow-500 flex items-center justify-center font-bold text-[10px] text-white rounded-sm shrink-0">
                                PTIT
                            </div>
                            <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 leading-tight">
                                Học viện Công nghệ Bưu chính viễn thông
                            </span>
                        </div>
                    </div>

                </div>

                {/* Các nút bấm hành động */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <Button className="bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold rounded-full px-6 transition-colors">
                      Đang tìm việc
                    </Button>
                    <Button variant="outline" className="border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 hover:border-blue-800 transition-colors bg-transparent border-2 px-6">
                      Phần Thêm hồ sơ
                    </Button>
                    <Button variant="outline" className="border-gray-500 text-gray-600 font-semibold rounded-full hover:bg-gray-100 hover:border-gray-900 transition-colors bg-transparent border px-6">
                      Cải thiện hồ sơ
                    </Button>
                    <Button variant="outline" className="border-gray-500 text-gray-600 font-semibold rounded-full hover:bg-gray-100 hover:border-gray-900 transition-colors bg-transparent border px-6">
                      Tài nguyên
                    </Button>
                </div>

                {/* Banner giới thiệu dịch vụ */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl flex justify-between items-start relative border border-gray-200">
                    <div className="pr-8">
                       <span className="font-semibold text-sm text-gray-900">Giới thiệu các dịch vụ của bạn</span>
                       <span className="text-sm text-gray-900"> dưới dạng một phần trên hồ sơ để mọi người có thể dễ dàng tìm thấy doanh nghiệp của bạn.</span>
                       <div className="mt-1 text-blue-600 font-bold text-sm cursor-pointer hover:underline">Bắt đầu</div>
                    </div>
                    <button className="text-gray-500 hover:bg-gray-200 p-1 rounded-full transition-colors">
                      <X className="h-5 w-5" />
                    </button>
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

            {/* 3. ANALYTICS */}
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
                        <div className="h-6 w-6 flex items-end justify-center gap-[2px] pb-0.5 shrink-0">
                           <div className="w-1 h-2 bg-gray-600 rounded-t-sm"></div>
                           <div className="w-1 h-4 bg-gray-600 rounded-t-sm"></div>
                           <div className="w-1 h-3 bg-gray-600 rounded-t-sm"></div>
                        </div>
                        <div>
                           <div className="font-bold text-gray-900 hover:text-blue-700 hover:underline">14 lượt hiển thị bài đăng</div>
                           <p className="text-sm text-gray-600 leading-tight mt-1">Kiểm tra xem ai đang tương tác với bài đăng.</p>
                        </div>
                     </div>
                     <div className="flex gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                        <Search className="h-6 w-6 text-gray-600 mt-1 shrink-0" />
                        <div>
                           <div className="font-bold text-gray-900 hover:text-blue-700 hover:underline">1 lượt xuất hiện tìm kiếm</div>
                           <p className="text-sm text-gray-600 leading-tight mt-1">Xem tần suất bạn xuất hiện trong kết quả.</p>
                        </div>
                     </div>
                  </div>

                  <Separator className="my-3" />
                  
                  <div className="flex justify-center -mb-2">
                    <Button variant="ghost" className="w-full text-gray-600 font-semibold hover:bg-gray-100 h-10 rounded-lg">
                      Hiển thị tất cả dữ liệu phân tích <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
               </CardContent>
            </Card>

            {/* 4. ACTIVITY */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                   <div>
                      <h2 className="text-xl font-bold text-gray-900">Hoạt động</h2>
                      <p className="text-sm text-blue-600 font-bold hover:underline cursor-pointer mt-1">0 người theo dõi</p>
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 px-4 h-8 bg-transparent">
                        Tạo bài đăng
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-gray-100">
                        <Pencil className="h-5 w-5 text-gray-600" />
                      </Button>
                   </div>
                </div>

                <div className="flex gap-2 mt-4 mb-4">
                   <Button className="rounded-full bg-[#01754f] hover:bg-[#016241] text-white font-semibold h-8 text-sm px-4">
                      Bài đăng
                   </Button>
                   <Button variant="ghost" className="rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 font-semibold h-8 text-sm px-4">
                      Ảnh
                   </Button>
                </div>

                <div className="pt-2">
                   <div className="text-xs text-gray-500 mb-2">
                      <span className="font-semibold text-gray-900">Dat Nguyen</span> đã đăng lại bài này • 5 tháng trước
                   </div>
                   <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="sm:w-[140px] h-[100px] bg-gray-200 shrink-0">
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b" className="w-full h-full object-cover" alt="Post" />
                      </div>
                      <div className="p-3 flex flex-col justify-center">
                         <h4 className="font-bold text-sm text-gray-900 line-clamp-2">Set up a Web Server with Nginx and Deploy Your App</h4>
                         <p className="text-xs text-gray-500 mt-1">Mads Akselsen on LinkedIn</p>
                      </div>
                   </div>
                </div>
                
                <Separator className="my-4" />
                <div className="flex justify-center -mb-2">
                    <Button variant="ghost" className="w-full text-gray-600 font-semibold hover:bg-gray-100 h-10 rounded-lg">
                    Hiển thị tất cả hoạt động <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
              </CardContent>
            </Card>

            {/* 5. EXPERIENCE */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
               <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="text-xl font-bold text-gray-900">Kinh nghiệm</h2>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                           <Plus className="h-6 w-6 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                           <Pencil className="h-5 w-5 text-gray-600" />
                        </Button>
                     </div>
                  </div>
                  
                  <div className="flex gap-4">
                     <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center shrink-0 border border-gray-200">
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-sm bg-transparent"></div>
                     </div>
                     <div className="border-b border-gray-200 flex-1 pb-4">
                        <h3 className="font-bold text-base text-gray-900">Chức danh</h3>
                        <p className="text-sm text-gray-900">Tổ chức</p>
                        <p className="text-sm text-gray-500 mt-0.5">2023 - nay</p>
                        <Button variant="ghost" className="mt-1 pl-0 hover:bg-transparent hover:underline text-gray-500 font-semibold h-auto py-1">
                           Thêm kinh nghiệm
                        </Button>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* 6. EDUCATION */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
               <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="text-xl font-bold text-gray-900">Trình độ học vấn</h2>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                           <Plus className="h-6 w-6 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
                           <Pencil className="h-5 w-5 text-gray-600" />
                        </Button>
                     </div>
                  </div>
                  
                  <div className="flex gap-4">
                     <div className="h-12 w-12 bg-blue-50 rounded-md shrink-0 overflow-hidden flex items-center justify-center border border-gray-200">
                        <div className="text-[10px] font-bold text-blue-800">PTIT</div>
                     </div>
                     <div className="border-b border-gray-200 flex-1 pb-4">
                        <h3 className="font-bold text-base text-gray-900">Học viện Công nghệ Bưu chính viễn thông</h3>
                        <p className="text-sm text-gray-500 mt-0.5">2024 - 2028</p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* 7. KỸ NĂNG */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
               <CardContent className="p-6">
                  <div className="border-[1.5px] border-dashed border-blue-300 rounded-lg p-4 relative">
                     <button className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 rounded-full p-1">
                        <X className="h-5 w-5" />
                     </button>
                     <h2 className="text-xl font-bold text-gray-900 mb-1">Kỹ năng</h2>
                     <p className="text-sm text-gray-700 mb-4 pr-6">
                        Truyền đạt sự phù hợp của bạn với các cơ hội mới - 50% nhà tuyển dụng sử dụng dữ liệu kỹ năng để hoàn thành vai trò của họ
                     </p>
                     <div className="flex flex-col gap-2 mb-4">
                        <div className="text-sm text-gray-400 font-semibold border-b border-gray-100 pb-2">Kỹ năng mềm</div>
                        <div className="text-sm text-gray-400 font-semibold pb-1">Kỹ năng kỹ thuật</div>
                     </div>
                     <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-800 bg-transparent h-9 px-6 border-[1.5px]">
                        Thêm kỹ năng
                     </Button>
                  </div>
               </CardContent>
            </Card>

            {/* 8. MỐI QUAN TÂM */}
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
               <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Mối quan tâm</h2>
                  <div className="flex gap-6 border-b border-gray-200 mb-4">
                     <div className="pb-3 border-b-[2px] border-[#01754f] text-[#01754f] font-semibold text-sm cursor-pointer">Công ty</div>
                     <div className="pb-3 text-gray-600 font-semibold text-sm cursor-pointer hover:bg-gray-50 px-2 rounded-t-md">Trường</div>
                  </div>
                  <div className="flex gap-4">
                     <div className="h-12 w-12 shrink-0 border border-gray-200 bg-white p-1">
                        <div className="w-full h-full flex items-center justify-center text-red-600 font-bold border border-red-200 rounded-sm">PTIT</div>
                     </div>
                     <div className="flex-1">
                        <h3 className="font-bold text-sm text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">Posts and Telecommunications Institute of Technology</h3>
                        <p className="text-xs text-gray-500 mt-0.5">11.329 người theo dõi</p>
                        <Button variant="outline" className="mt-2 rounded-full border-gray-600 text-gray-600 font-semibold hover:bg-gray-100 hover:border-gray-900 bg-transparent h-8 px-4 flex items-center gap-1.5">
                           <Check className="h-4 w-4" /> <span>Đang theo dõi</span>
                        </Button>
                     </div>
                  </div>
               </CardContent>
            </Card>

          </div>

          {/* --- CỘT PHẢI (SIDEBAR) --- */}
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
                            <img src="https://github.com/shadcn.png" className="w-full h-full object-cover rounded-full" />
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

                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <Avatar className="h-12 w-12 cursor-pointer border border-gray-200">
                                <AvatarFallback className="bg-orange-100 text-orange-700 font-bold">TN</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-sm cursor-pointer hover:underline decoration-blue-600 text-gray-900">Viet Nguyen</div>
                                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">Founder & CEO at Computer Vision Vietnam</p>
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

        {/* --- MAIN FOOTER --- */}
        <MainFooter />

      </div>

    </div>
  );
}