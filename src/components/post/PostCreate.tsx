import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Image, Video, Calendar, Newspaper } from 'lucide-react'

export function CreatePost() {
  return (
    <Card className="mb-6 overflow-hidden border border-gray-200 shadow-sm bg-white rounded-xl">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-white border border-gray-300">
            <AvatarImage src="/placeholder-user.jpg" alt="Your profile" />
            <AvatarFallback className="bg-gray-200 text-lg font-medium">ME</AvatarFallback>
          </Avatar>

          <button className="flex-1 text-left">
            <Input
              className="h-12 rounded-full border border-gray-300 bg-transparent hover:bg-gray-50 transition-colors cursor-pointer text-base font-medium text-muted-foreground placeholder:text-muted-foreground/70 pl-5"
              placeholder="Start a post"
              readOnly
            />
          </button>
        </div>

        <div className="mt-3 flex justify-between">
          <ActionButton icon={Image} label="Media" color="text-blue-600" hover="hover:bg-blue-50" />
          <ActionButton icon={Video} label="Video" color="text-green-600" hover="hover:bg-green-50" />
          <ActionButton icon={Calendar} label="Event" color="text-amber-700" hover="hover:bg-amber-50" />
          <ActionButton icon={Newspaper} label="Write article" color="text-red-600" hover="hover:bg-red-50" />
        </div>
      </CardContent>
    </Card>
  )
}

function ActionButton({ 
  icon: Icon, 
  label, 
  color, 
  hover 
}: { 
  icon: any; 
  label: string; 
  color: string;
  hover: string;
}) {
  return (
    <button className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-lg transition-all ${hover} group`}>
      <Icon className={`h-5 w-5 ${color} group-hover:scale-110 transition-transform`} strokeWidth={2} />
      <span className={`text-sm font-medium text-gray-700 ${color.replace('text-', 'group-hover:text-').replace('600', '700')}`}>
        {label}
      </span>
    </button>
  )
}