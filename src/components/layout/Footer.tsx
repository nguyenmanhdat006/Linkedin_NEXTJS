import React from 'react';
import { HelpCircle, Settings, Shield, ChevronDown } from 'lucide-react';

export function MainFooter() {
  return (
    <footer className="w-full mt-8 pt-4 pb-10 border-t border-transparent">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* --- CỘT LINKS 1 (2 phần) --- */}
            <div className="md:col-span-2 flex flex-col gap-2">
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Giới thiệu</a>
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Chính sách cộng đồng chuyên gia</a>
                <div className="relative group cursor-pointer">
                    <span className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline flex items-center gap-1">
                        Quyền riêng tư và điều khoản <ChevronDown className="h-3 w-3" />
                    </span>
                </div>
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Giải pháp bán hàng</a>
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Trung tâm an toàn</a>
                <div className="text-xs text-gray-500 mt-2">LinkedIn Corporation © 2025</div>
            </div>

            {/* --- CỘT LINKS 2 (2 phần) --- */}
            <div className="md:col-span-2 flex flex-col gap-2">
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Trợ năng</a>
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Nghề nghiệp</a>
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Lựa chọn quảng cáo</a>
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Thiết bị di động</a>
            </div>

            {/* --- CỘT LINKS 3 (2 phần) --- */}
            <div className="md:col-span-2 flex flex-col gap-2">
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Giải pháp nhân tài</a>
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Giải pháp tiếp thị</a>
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Quảng cáo</a>
                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-blue-600 hover:underline">Doanh nghiệp nhỏ</a>
            </div>

            {/* --- CỘT CÀI ĐẶT & HỎI ĐÁP (3 phần) --- */}
            <div className="md:col-span-3 flex flex-col gap-4">
                <div className="flex gap-2">
                    <HelpCircle className="h-6 w-6 text-gray-600 shrink-0" />
                    <div>
                        <div className="text-sm font-semibold text-gray-700 hover:text-blue-600 hover:underline cursor-pointer">Bạn có câu hỏi?</div>
                        <div className="text-xs text-gray-500">Truy cập Trung tâm trợ giúp của chúng tôi.</div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Settings className="h-6 w-6 text-gray-600 shrink-0" />
                    <div>
                        <div className="text-sm font-semibold text-gray-700 hover:text-blue-600 hover:underline cursor-pointer">Quản lý tài khoản và quyền riêng tư của bạn</div>
                        <div className="text-xs text-gray-500">Đi tới Cài đặt của bạn.</div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Shield className="h-6 w-6 text-gray-600 shrink-0" />
                    <div>
                        <div className="text-sm font-semibold text-gray-700 hover:text-blue-600 hover:underline cursor-pointer">Tính minh bạch của đề xuất</div>
                        <div className="text-xs text-gray-500">Tìm hiểu thêm về nội dung được đề xuất.</div>
                    </div>
                </div>
            </div>

            {/* --- CỘT NGÔN NGỮ (3 phần) --- */}
            <div className="md:col-span-3">
                <label className="text-xs text-gray-600 mb-1 block">Chọn ngôn ngữ</label>
                <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-400 hover:border-gray-600 text-gray-700 py-1.5 pl-3 pr-8 rounded-md text-sm font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-500">
                        <option>Tiếng Việt (Vietnamese)</option>
                        <option>English (English)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="h-4 w-4 fill-current" />
                    </div>
                </div>
            </div>

        </div>
    </footer>
  );
}