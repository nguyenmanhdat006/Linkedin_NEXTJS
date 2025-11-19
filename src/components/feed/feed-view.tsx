// src/components/feed/feed-view.tsx
import { CreatePost } from "@/components/post/PostCreate"
import { FeedPost } from "@/components/post/feed_post"
import { Separator } from "@/components/ui/separator"

export function FeedView() {
  return (
    <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-6">
      {/* Create Post – đã đẹp rồi */}
      <CreatePost />

      {/* Sort bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <Separator className="flex-1 bg-gray-300 h-px" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            Sort by: <span className="font-semibold text-black hover:underline cursor-pointer">Top</span>
          </span>
        </div>
      </div>

      {/* ==================== CÁC BÀI POST – ĐÃ FIX TRẮNG NỔI KHỐI ==================== */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden mb-6">
        <FeedPost
          author={{
            name: "Webrazzi",
            title: "43,796 followers",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
          }}
          timeAgo="4h"
          content="Kitlesel kaynak kullanımına Moov'dan dikkat çeken örnek: Kiralamada indirimle operasyon yönetimi https://buff.ly/3e3QzL7"
          image="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=450&fit=crop"
          likes={124}
          comments={5}
          reposts={2}
        />
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden mb-6">
        <FeedPost
          author={{
            name: "GitHub",
            title: "3,838,968 followers",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
          }}
          timeAgo="2h"
          content="The 2020 State of the Octoverse uncovered COVID's impact on developer contributions, the OSS community pandemic response, and the challenge of securing the world's software."
          image="https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=800&h=450&fit=crop"
          likes={892}
          comments={42}
          reposts={18}
        />
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden mb-6">
        <FeedPost
          author={{
            name: "Webrazzi",
            title: "43,796 followers",
            image: "https://randomuser.me/api/portraits/men/65.jpg"
          }}
          timeAgo="5h"
          content="Halka arzı gerçekleşen Oscar Health'e dair tüm detaylar https://buff.ly/3e3QzL7"
          image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop"
          likes={56}
          comments={2}
          reposts={1}
        />
      </div>
      {/* ===================================================================== */}

    </div>
  )
}