import Link from "next/link";
import { FaBriefcase, FaUserFriends, FaNewspaper, FaGamepad, FaLaptopCode } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";

export default function AuthNavbar() {
  return (
    <nav className="bg-white w-full">
      <div className="max-w-[1128px] w-full mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
           <Link href="/home" className="flex items-center">
             <span className="text-[#0a66c2] text-3xl font-bold tracking-tight">Linked</span>
             <div className="bg-[#0a66c2] rounded-sm ml-0.5 w-7 h-7 flex items-center justify-center">
               <span className="text-white font-bold text-xl pb-1">in</span>
             </div>
           </Link>
        </div>

        {/* Navigation Links & Buttons */}
        <div className="flex items-center gap-6">
            {/* Menu Icons - Ẩn trên mobile, hiện trên màn hình trung bình trở lên */}
            <div className="hidden lg:flex items-center gap-8 text-gray-500 text-sm font-medium">
                <NavItem icon={<MdArticle size={24}/>} text="Articles" />
                <NavItem icon={<FaUserFriends size={22}/>} text="People" />
                <NavItem icon={<PiTelevisionSimpleBold size={22}/>} text="Learning" />
                <NavItem icon={<FaBriefcase size={20}/>} text="Jobs" />
                <NavItem icon={<FaGamepad size={22}/>} text="Games" />
            </div>
            
            <div className="hidden lg:block border-l border-gray-300 h-10 mx-2"></div>
            
            <div className="flex gap-3">
                <Link href="/register" className="px-6 py-3 rounded-full font-bold text-white bg-[#0a66c2] hover:bg-[#004182] transition duration-200 whitespace-nowrap">
                    Join now for free
                </Link>
                <Link href="/login" className="px-6 py-3 rounded-full font-bold text-[#0a66c2] bg-white border border-[#0a66c2] hover:bg-blue-50 hover:border-2 transition-all duration-100 whitespace-nowrap">
                    Sign in
                </Link>
            </div>
        </div>
      </div>
    </nav>
  );
}

// Helper Component
function NavItem({icon, text}: {icon: React.ReactNode, text: string}) {
    return (
        <div className="flex flex-col items-center cursor-pointer hover:text-black transition-colors duration-200">
            <div className="text-gray-600">{icon}</div>
            <span className="mt-1 font-normal">{text}</span>
        </div>
    )
}