
"use client"

import { Navbar, MobileNav } from "@/components/Navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Grid, Bookmark, Users, Settings, Loader2, LogOut } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser, useDoc, useMemoFirebase, useAuth, useFirestore } from "@/firebase"
import { doc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProfilePage() {
  const { user, isUserLoading: isAuthLoading } = useUser()
  const db = useFirestore()
  const auth = useAuth()
  const router = useRouter()

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null
    return doc(db, "users", user.uid)
  }, [db, user?.uid])

  const { data: profile, isLoading: isProfileLoading } = useDoc(userDocRef)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (isAuthLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const displayName = profile?.displayName || user?.displayName || "Vibe User"
  const username = profile?.username || user?.email?.split('@')[0] || "user"
  const bio = profile?.bio || "Capturing moments, sounds, and everything in between. Based in the clouds. ☁️✨"
  const profilePic = profile?.profilePictureUrl || `https://picsum.photos/seed/${user?.uid}/200/200`

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
                  <AvatarImage src={profilePic} />
                  <AvatarFallback>{displayName[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col space-y-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <h1 className="text-2xl font-bold">{username}</h1>
              <div className="flex items-center justify-center space-x-2">
                <Button size="sm" variant="secondary" className="font-semibold">Edit Profile</Button>
                <Button size="sm" variant="secondary" className="font-semibold">View Archive</Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-8">
              <div className="text-sm">
                <span className="font-bold">0</span> <span className="text-muted-foreground">posts</span>
              </div>
              <div className="text-sm">
                <span className="font-bold">{profile?.followerIds?.length || 0}</span> <span className="text-muted-foreground">followers</span>
              </div>
              <div className="text-sm">
                <span className="font-bold">{profile?.followingIds?.length || 0}</span> <span className="text-muted-foreground">following</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-bold">{displayName}</span>
              <p className="text-sm text-muted-foreground max-w-xs">
                {bio}
              </p>
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
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Grid className="h-12 w-12 mb-4 opacity-20" />
              <p>No vibes shared yet.</p>
              <Button variant="link" className="text-primary">Start creating</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <MobileNav />
    </div>
  )
}
