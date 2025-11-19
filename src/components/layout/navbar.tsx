'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Home, Users, Briefcase, MessageSquare, Bell, User, Grid } from 'lucide-react';

const Input = ({ type, placeholder, className }: { type: string, placeholder: string, className: string }) =>
  <input type={type} placeholder={placeholder} className={className} />;

const Avatar = ({ children, className }: { children: React.ReactNode, className: string }) =>
  <div className={className}>{children}</div>;

const AvatarImage = ({ src }: { src: string }) =>
  <img src={src} alt="Avatar" className="h-full w-full rounded-full object-cover" />;

const AvatarFallback = ({ children, className }: { children: React.ReactNode, className: string }) =>
  <div className={`flex items-center justify-center ${className}`}>{children}</div>;


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

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-7xl">

        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </Link>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search"
              className="w-[280px] pl-10 bg-gray-100/80 border-0 rounded-md text-sm placeholder:text-gray-500 
                        focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:bg-white 
                        hover:bg-gray-100 transition-all duration-200"
            />
          </div>
        </div>

        {/* RIGHT: nav + user */}
        <nav className="flex items-center gap-1 md:gap-6">
          {navItemsData.map(item => (
            <NavItem key={item.label} {...item} />
          ))}

          {/* User */}
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer text-muted-foreground hover:text-gray-900 transition-all duration-200">
            <Avatar className="h-6 w-6 ring-2 ring-transparent hover:ring-gray-300 transition-all">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="text-xs">ME</AvatarFallback>
            </Avatar>
            <span className="hidden text-[10px] md:block">Me</span>
          </div>

          <div className="hidden md:flex border-l border-gray-200 pl-6 ml-2 items-center gap-4">
            <NavItem icon={Grid} label="For Business" href="/business" />
            <div className="text-xs font-medium text-amber-700 hover:text-amber-800 underline underline-offset-2 cursor-pointer transition-colors">
              Try Premium for 0 VND
            </div>
          </div>
        </nav>

      </div>
    </header>
  );
}
