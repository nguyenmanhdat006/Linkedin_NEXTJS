import { Navbar } from "@/components/layout/navbar"
import { SidebarProfile } from "@/components/profile/sidebar_profile"
import { FeedView } from "@/components/feed/feed-view"
import { Recommendations } from "@/components/network/recommendation"

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[#F3F2EF] font-sans">
      <Navbar />
      
      <main className="container mx-auto max-w-7xl px-0 md:px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden md:block md:col-span-3 lg:col-span-3">
            <SidebarProfile />
          </div>

          {/* Main Feed */}
          <FeedView />

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <Recommendations />
          </div>
        </div>
      </main>
    </div>
  )
}
