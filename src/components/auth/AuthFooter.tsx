import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa"; // Đã đổi sang FaLinkedinIn để lấy icon chỉ có chữ "in"

export default function AuthFooter() {
  const links = [
    "About", "Accessibility", "User Agreement", "Privacy Policy", 
    "Cookie Policy", "Copyright Policy", "Brand Policy", 
    "Guest Controls", "Community Guidelines", "Language"
  ];

  return (
    <footer className="bg-white py-6 px-4 mt-auto border-t border-gray-100"> {/* Thêm border-t */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1.5 mr-2"> {/* Khoảng cách và margin-right */}
            <span className="font-bold text-black text-base">Linked</span>
            <FaLinkedinIn className="text-[#0a66c2] text-xl" /> {/* icon chữ 'in' màu xanh */}
            <span>© 2025</span>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link key={link} href="#" className="hover:underline hover:text-linkedin font-medium">
              {link}
            </Link>
          ))}
        </div>
        {/* Language selector (mockup) */}
        <div className="ml-auto relative">
          <select className="appearance-none bg-transparent border border-gray-400 rounded-md py-1 px-2 pr-6 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-900">
            <option>Tiếng Việt</option>
            <option>English</option>
          </select>
          <svg className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </footer>
  );
}