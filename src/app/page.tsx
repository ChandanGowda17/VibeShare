"use client"

import { Navbar, MobileNav } from "@/components/Navigation"
import { PostCard } from "@/components/PostCard"
import { CreatePost } from "@/components/CreatePost"
import { ScrollArea } from "@/components/ui/scroll-area"

const MOCK_POSTS = [
  {
    id: "1",
    user: {
      name: "Alex Rivera",
      handle: "arivera",
      avatar: "https://picsum.photos/seed/u1/100/100"
    },
    content: {
      type: "image" as const,
      url: "https://picsum.photos/seed/creativity1/600/800",
      caption: "Chasing color and light in the concrete jungle. 🎨✨",
      hashtags: ["urbanart", "creativity", "vibes"]
    },
    likes: 1240,
    isLiked: true
  },
  {
    id: "2",
    user: {
      name: "Sarah Chen",
      handle: "schen_music",
      avatar: "https://picsum.photos/seed/u2/100/100"
    },
    content: {
      type: "audio" as const,
      url: "",
      caption: "New melody I'm working on for the weekend set. Let me know what you think!",
      hashtags: ["newmusic", "audio", "vibeshare"]
    },
    likes: 856,
    isLiked: false
  },
  {
    id: "3",
    user: {
      name: "Jordan Fox",
      handle: "jfox",
      avatar: "https://picsum.photos/seed/u3/100/100"
    },
    content: {
      type: "image" as const,
      url: "https://picsum.photos/seed/nature1/600/600",
      caption: "Peace is found in the stillness of the peaks.",
      hashtags: ["adventure", "minimal", "peace"]
    },
    likes: 2102,
    isLiked: false
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />
      
      <main className="mx-auto max-w-screen-md px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Stories placeholder for IG feel */}
          <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0">
                <div className="h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-[#9372DB] to-[#285DCE]">
                  <div className="h-full w-full rounded-full bg-white p-0.5">
                    <img 
                      src={`https://picsum.photos/seed/s${i}/100/100`} 
                      className="h-full w-full rounded-full object-cover" 
                      alt="Story"
                    />
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">User {i + 1}</span>
              </div>
            ))}
          </div>

          <CreatePost />

          <div className="space-y-6">
            {MOCK_POSTS.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}