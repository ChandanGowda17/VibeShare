"use client"

import { Navbar, MobileNav } from "@/components/Navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Grid, Bookmark, Users, Settings, MoreHorizontal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />
      
      <main className="mx-auto max-w-screen-md px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-12 mb-12">
          <div className="relative">
            <div className="h-24 w-24 md:h-36 md:w-36 rounded-full p-1 bg-gradient-to-tr from-primary to-accent">
              <div className="h-full w-full rounded-full bg-white p-1">
                <Avatar className="h-full w-full">
                  <AvatarImage src="https://picsum.photos/seed/u_main/200/200" />
                  <AvatarFallback>VS</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col space-y-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <h1 className="text-2xl font-bold">vibemaster_99</h1>
              <div className="flex items-center justify-center space-x-2">
                <Button size="sm" variant="secondary" className="font-semibold">Edit Profile</Button>
                <Button size="sm" variant="secondary" className="font-semibold">View Archive</Button>
                <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-8">
              <div className="text-sm">
                <span className="font-bold">42</span> <span className="text-muted-foreground">posts</span>
              </div>
              <div className="text-sm">
                <span className="font-bold">1.2k</span> <span className="text-muted-foreground">followers</span>
              </div>
              <div className="text-sm">
                <span className="font-bold">850</span> <span className="text-muted-foreground">following</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-bold">Vibe Creator</span>
              <p className="text-sm text-muted-foreground max-w-xs">
                Capturing moments, sounds, and everything in between. 
                Based in the clouds. ☁️✨
              </p>
              <a href="#" className="text-sm text-accent font-medium hover:underline">vibeshare.com/creator</a>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-center bg-transparent border-t rounded-none h-12 gap-12">
            <TabsTrigger value="posts" className="data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-primary rounded-none h-full gap-2">
              <Grid className="h-4 w-4" /> <span className="text-xs uppercase tracking-widest hidden sm:inline">Posts</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-primary rounded-none h-full gap-2">
              <Bookmark className="h-4 w-4" /> <span className="text-xs uppercase tracking-widest hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="tagged" className="data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-primary rounded-none h-full gap-2">
              <Users className="h-4 w-4" /> <span className="text-xs uppercase tracking-widest hidden sm:inline">Tagged</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="relative aspect-square group cursor-pointer overflow-hidden rounded-md">
                  <img 
                    src={`https://picsum.photos/seed/p${i}/400/400`} 
                    alt="Post" 
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white">
                    <span className="flex items-center font-bold"><Bookmark className="h-4 w-4 mr-1 fill-white" /> 12</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <MobileNav />
    </div>
  )
}