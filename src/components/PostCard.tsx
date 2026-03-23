"use client"

import Image from "next/image"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play, Mic } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PostCardProps {
  id: string
  user: {
    name: string
    avatar: string
    handle: string
  }
  content: {
    type: "image" | "video" | "audio"
    url: string
    caption: string
    hashtags: string[]
  }
  likes: number
  isLiked?: boolean
}

export function PostCard({ user, content, likes: initialLikes, isLiked: initialIsLiked }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [likes, setLikes] = useState(initialLikes)

  const toggleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  return (
    <Card className="mb-6 overflow-hidden border-none bg-card shadow-sm transition-all hover:shadow-md max-w-screen-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9 border-2 border-primary/20 p-0.5">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none">{user.name}</span>
            <span className="text-xs text-muted-foreground">@{user.handle}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0 relative group">
        {content.type === "image" && (
          <div className="relative aspect-[4/5] w-full bg-muted">
            <Image
              src={content.url}
              alt={content.caption}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
        {content.type === "audio" && (
          <div className="flex flex-col items-center justify-center space-y-4 p-12 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white shadow-lg animate-pulse">
              <Mic className="h-10 w-10" />
            </div>
            <div className="w-full max-w-xs h-12 bg-white/50 backdrop-blur rounded-full flex items-center px-4 space-x-3">
               <Play className="h-5 w-5 text-primary fill-primary" />
               <div className="flex-1 h-1 bg-primary/20 rounded-full overflow-hidden">
                 <div className="w-1/3 h-full bg-primary rounded-full" />
               </div>
               <span className="text-xs font-medium text-primary">0:12</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start p-4 space-y-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLike}
              className={cn("h-8 w-8", isLiked && "text-destructive hover:text-destructive")}
            >
              <Heart className={cn("h-6 w-6", isLiked && "fill-current")} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-sm font-bold">{likes.toLocaleString()} likes</span>
          <p className="text-sm">
            <span className="font-bold mr-2">{user.handle}</span>
            {content.caption}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {content.hashtags.map((tag) => (
              <span key={tag} className="text-xs text-accent font-medium hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <button className="text-xs text-muted-foreground hover:underline pt-1">
          View all 12 comments
        </button>
      </CardFooter>
    </Card>
  )
}