'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Home, Users, Briefcase, MessageSquare, Bell, Grid, ChevronDown } from 'lucide-react';

import { parseJwt } from '@/lib/utils/jwt';
import { storage } from '@/lib/utils/storage';

const Input = ({ type, placeholder, className = "" }: { type: string, placeholder: string, className?: string }) =>
  <input type={type} placeholder={placeholder} className={className} />;

const Avatar = ({ children, className = "" }: { children: React.ReactNode, className?: string }) =>
  <div className={className}>{children}</div>;

const AvatarImage = ({ src }: { src: string }) =>
  <img src={src} alt="Avatar" className="h-full w-full rounded-full object-cover" />;

const AvatarFallback = ({ children, className = "" }: { children: React.ReactNode, className?: string }) =>
  <div className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}>{children}</div>;

interface NavItemData {
  icon: any;
  label: string;
  href: string;
}

const navItemsData: NavItemData[] = [
  { icon: Home, label: "Home", href: "/feed" },
  { icon: Users, label: "My Network", href: "/network" },
  { icon: Briefcase, label: "Jobs", href: "/jobs" },
  { icon: MessageSquare, label: "Messaging", href: "/messaging" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
];

function NavItem({ icon: Icon, label, href }: NavItemData) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all duration-200 ${
        isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      <Icon
        className={`h-6 w-6 transition-all duration-200 ${
          isActive ? "stroke-[2.5] fill-current" : "group-hover:scale-110"
        }`}
      />

      <span
        className={`text-[10px] md:text-xs font-medium transition-colors ${
          isActive ? "text-gray-900 font-semibold" : ""
        }`}
      >
        {label}
      </span>

      {isActive && (
        <div className="absolute bottom-0 h-0.5 w-12 bg-gray-900 rounded-full mt-1" />
      )}
    </Link>
  );
}

// --- Main Component ---
export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = storage.getToken();
    if (token) {
      const decoded = parseJwt(token); 
      if (decoded) {
        setUserId(decoded.userId || decoded.sub || decoded.id);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    storage.removeToken();
    window.location.href = '/login'; 
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm font-sans">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-7xl">

        {/* LEFT: Logo & Search */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </Link>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search"
              className="w-[280px] pl-10 py-1.5 bg-gray-100/80 border-0 rounded-md text-sm placeholder:text-gray-500 
                        focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:bg-white 
                        hover:bg-gray-100 transition-all duration-200 outline-none"
            />
          </div>
        </div>

        {/* RIGHT: Nav Items & User Dropdown */}
        <nav className="flex items-center gap-1 md:gap-6">
          {navItemsData.map(item => (
            <NavItem key={item.label} {...item} />
          ))}

          {/* --- USER MENU DROP DOWN SECTION --- */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex flex-col items-center justify-center gap-0.5 cursor-pointer text-gray-600 hover:text-gray-900 transition-all duration-200 px-2 outline-none"
            >
              <Avatar className="h-6 w-6 rounded-full overflow-hidden ring-1 ring-transparent hover:ring-gray-300">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-xs">ME</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex items-center gap-0.5">
                <span className="text-[12px]">Tôi</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-[280px] rounded-tr-none rounded-tl-lg rounded-b-lg border border-gray-300 bg-white shadow-xl z-50 overflow-hidden">
                
                <div className="p-4 border-b border-gray-200">
                  <div className="flex gap-3 mb-3">
                    <Avatar className="h-14 w-14 rounded-full overflow-hidden shrink-0">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>DN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <h3 className="font-bold text-base truncate text-gray-900">Dat Nguyen</h3>
                      <p className="text-sm text-gray-500 leading-tight line-clamp-2">
                        Sinh viên tại Học viện Công nghệ Bưu chính viễn thông
                      </p>
                    </div>
                  </div>
                  
                  {/* Link Xem hồ sơ với userId động */}
                  <Link 
                    href={userId ? `/profile/${userId}` : '/login'} 
                    className="block w-full mb-2 rounded-full border border-blue-600 py-1 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50 hover:border-blue-800 hover:text-blue-800 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Xem hồ sơ
                  </Link>
                  
                   <button className="w-full rounded-full bg-blue-700 py-1 text-center text-sm font-semibold text-white hover:bg-blue-800 transition-colors">
                    Xác minh
                  </button>
                </div>

                <div className="border-b border-gray-200 py-2">
                  <h4 className="px-4 py-1 text-sm font-bold text-gray-900">Tài khoản</h4>
                  <div className="px-4 py-1 group cursor-pointer hover:underline">
                    <div className="flex items-start gap-2">
                      <div className="h-4 w-4 mt-0.5 rounded bg-amber-500 shrink-0" /> 
                      <span className="text-sm text-gray-600 font-medium group-hover:text-blue-600 hover:underline decoration-blue-600">
                        Bắt đầu dùng thử Premium miễn phí
                      </span>
                    </div>
                  </div>
                  <Link href="/settings" className="block px-4 py-1 text-sm text-gray-500 hover:underline hover:text-gray-900 mt-1">Cài đặt và quyền riêng tư</Link>
                  <Link href="/help" className="block px-4 py-1 text-sm text-gray-500 hover:underline hover:text-gray-900">Trợ giúp</Link>
                  <Link href="/language" className="block px-4 py-1 text-sm text-gray-500 hover:underline hover:text-gray-900">Ngôn ngữ</Link>
                </div>

                <div className="border-b border-gray-200 py-2">
                  <h4 className="px-4 py-1 text-sm font-bold text-gray-900">Quản lý</h4>
                  <Link href="/posts" className="block px-4 py-1 text-sm text-gray-500 hover:underline hover:text-gray-900">Bài đăng và hoạt động</Link>
                  <Link href="/posting-account" className="block px-4 py-1 text-sm text-gray-500 hover:underline hover:text-gray-900">Tài khoản đăng tin tuyển dụng</Link>
                </div>

                <div className="py-2">
                  {/* Sử dụng hàm logout từ storage */}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-1 text-sm text-gray-500 hover:underline hover:text-gray-900"
                  >
                    Đăng xuất
                  </button>
                </div>

              </div>
            )}
          </div>

          <div className="hidden md:flex border-l border-gray-200 pl-6 ml-2 items-center gap-4">
            <NavItem icon={Grid} label="For Business" href="/business" />
            <div className="text-xs font-medium text-amber-700 hover:text-amber-800 underline underline-offset-2 cursor-pointer transition-colors max-w-[80px] text-center leading-tight">
              Try Premium for 0 VND
            </div>
          </div>
        </nav>

      </div>
    </header>
  );
}