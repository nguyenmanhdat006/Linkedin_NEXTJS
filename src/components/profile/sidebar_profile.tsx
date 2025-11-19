import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Bookmark } from 'lucide-react'

export function SidebarProfile() {
  return (
    <div className="space-y-2">
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="relative h-16 bg-slate-200">
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <Avatar className="h-16 w-16 border-2 border-white cursor-pointer">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardContent className="pt-10 pb-4 text-center">
          <h3 className="font-semibold hover:underline cursor-pointer">Kemal Salih Carfi</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Digital Sahne şirketinde Intern UI/UX Designer
          </p>
        </CardContent>
        <Separator />
        <div className="py-3 px-4 text-xs font-medium text-muted-foreground hover:bg-slate-50 cursor-pointer">
          <div className="flex justify-between mb-1">
            <span>Profile viewers</span>
            <span className="text-blue-600">25</span>
          </div>
          <div className="flex justify-between">
            <span>Connections</span>
            <span className="text-blue-600">51</span>
          </div>
        </div>
        <Separator />
        <div className="py-3 px-4 text-xs hover:bg-slate-50 cursor-pointer">
          <p className="text-muted-foreground">Access exclusive tools & insights</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-3 w-3 bg-amber-400 rounded-sm" />
            <span className="font-semibold underline decoration-1">Try Premium for Free</span>
          </div>
        </div>
        <Separator />
        <div className="py-3 px-4 text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
          <Bookmark className="h-4 w-4 text-muted-foreground" />
          <span>My Items</span>
        </div>
      </Card>

      <Card className="bg-white border border-gray-200 shadow-sm rounded-xl sticky top-20">
        <CardContent className="p-0 py-2">
          <div className="px-4 py-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
            Groups
          </div>
          <div className="px-4 py-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex justify-between items-center">
            <span>Events</span>
            <span className="text-muted-foreground text-lg">+</span>
          </div>
          <div className="px-4 py-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
            Followed Hashtags
          </div>
          <Separator className="my-2" />
          <div className="px-4 py-2 text-sm font-semibold text-muted-foreground text-center hover:bg-slate-50 cursor-pointer">
            Discover more
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
