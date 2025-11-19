import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Plus } from 'lucide-react'

export function Recommendations() {
  return (
    <div className="space-y-2">
      <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Add to your feed</CardTitle>
          <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
        </CardHeader>
        <CardContent className="p-4 pt-2 grid gap-4">
          <RecommendationItem 
            name="Arun Kumar" 
            desc="Design @BYJU'S (Hiring Product, UI, Motion Designers)" 
            image="/placeholder-user.jpg"
          />
          <RecommendationItem 
            name="Chris Do" 
            desc="Loud Introvert with a big mission: Teach 1B people" 
            image="/placeholder-user.jpg"
          />
          <RecommendationItem 
            name="Sascha Lichtenstein" 
            desc="UX/UI Designer at FinanzTip" 
            image="/placeholder-user.jpg"
          />
          <Button variant="ghost" className="w-full text-muted-foreground text-sm font-semibold">
            View all recommendations →
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-200 shadow-sm rounded-xl sticky top-20">
        <div className="relative w-full h-64 bg-slate-200 rounded-lg overflow-hidden cursor-pointer group">
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-transparent to-black/60">
              <h3 className="text-white font-bold text-xl mb-4 drop-shadow-md">Your dream job is closer than you think</h3>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">See jobs</Button>
           </div>
        </div>
        <div className="p-4 flex flex-wrap gap-x-4 gap-y-1 justify-center text-[11px] text-muted-foreground">
           <a href="#" className="hover:underline hover:text-blue-600">About</a>
           <a href="#" className="hover:underline hover:text-blue-600">Accessibility</a>
           <a href="#" className="hover:underline hover:text-blue-600">Help Center</a>
           <a href="#" className="hover:underline hover:text-blue-600">Privacy & Terms</a>
           <a href="#" className="hover:underline hover:text-blue-600">Ad Choices</a>
           <div className="w-full text-center mt-2">
              <span className="text-blue-600 font-bold">LinkedIn</span> Corporation © 2025
           </div>
        </div>
      </Card>
    </div>
  )
}

function RecommendationItem({ name, desc, image }: { name: string; desc: string; image: string }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-10 w-10 cursor-pointer">
        <AvatarImage src={image || "/placeholder.svg"} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold hover:underline cursor-pointer">{name}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{desc}</p>
        <Button variant="outline" size="sm" className="rounded-full h-8 gap-1 w-fit border-muted-foreground/50 text-muted-foreground hover:bg-slate-100 hover:border-black hover:text-black font-semibold transition-all">
          <Plus className="h-4 w-4" /> Follow
        </Button>
      </div>
    </div>
  )
}
