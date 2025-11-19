import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, MessageSquare, Share2, Send, MoreHorizontal, Globe } from 'lucide-react'
import Image from "next/image"

interface PostProps {
  author: {
    name: string
    title: string
    image: string
    followers?: string
  }
  content: string
  timeAgo: string
  image?: string
  likes: number
  comments: number
  reposts?: number
}

export function FeedPost({ author, content, timeAgo, image, likes, comments, reposts }: PostProps) {
  return (
    <Card className="mb-4 border-none shadow-sm">
      <CardHeader className="flex flex-row items-start gap-3 p-4 pb-2">
        <Avatar className="cursor-pointer">
          <AvatarImage src={author.image || "/placeholder.svg"} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm hover:text-blue-600 hover:underline cursor-pointer">
                {author.name}
              </h3>
              <p className="text-xs text-muted-foreground">{author.followers || author.title}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>{timeAgo}</span>
                <span>•</span>
                <Globe className="h-3 w-3" />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 pb-2 text-sm whitespace-pre-line">
          {content}
        </div>
        {image && (
          <div className="relative w-full aspect-video bg-slate-100 mt-2">
            <Image 
              src={image || "/placeholder.svg"} 
              alt="Post content" 
              fill 
              className="object-cover"
            />
          </div>
        )}
        <div className="px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1 hover:text-blue-600 hover:underline cursor-pointer">
            <div className="flex -space-x-1">
               <div className="bg-blue-500 rounded-full p-[2px]"><ThumbsUp className="h-2 w-2 text-white fill-current" /></div>
            </div>
            <span>{likes}</span>
          </div>
          <div className="hover:text-blue-600 hover:underline cursor-pointer">
            {comments} comments • 2 reposts
          </div>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="p-1 flex justify-between">
        <PostAction icon={ThumbsUp} label="Like" />
        <PostAction icon={MessageSquare} label="Comment" />
        <PostAction icon={Share2} label="Repost" />
        <PostAction icon={Send} label="Send" />
      </CardFooter>
    </Card>
  )
}

function PostAction({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground hover:bg-slate-100 font-semibold h-12 rounded-md">
      <Icon className="h-5 w-5" />
      <span className="hidden sm:inline">{label}</span>
    </Button>
  )
}
