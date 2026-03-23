"use client"

import { Navbar, MobileNav } from "@/components/Navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MoreVertical, Send, Phone, Video, Info } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const MOCK_CHATS = [
  { id: "1", name: "Alex Rivera", lastMsg: "See you at 8!", time: "2m", unread: true, avatar: "https://picsum.photos/seed/u1/100/100" },
  { id: "2", name: "Sarah Chen", lastMsg: "That audio clip was fire 🔥", time: "1h", unread: false, avatar: "https://picsum.photos/seed/u2/100/100" },
  { id: "3", name: "Jordan Fox", lastMsg: "Check out this mountain spot", time: "3h", unread: false, avatar: "https://picsum.photos/seed/u3/100/100" },
  { id: "4", name: "Creative Guild", lastMsg: "New prompt is up!", time: "1d", unread: false, avatar: "https://picsum.photos/seed/u4/100/100" },
]

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0])
  const [msg, setMsg] = useState("")

  return (
    <div className="h-screen bg-background flex flex-col pb-20 md:pb-0">
      <Navbar />
      
      <main className="flex-1 overflow-hidden max-w-screen-md mx-auto w-full flex bg-white/50 border-x">
        {/* Chat List - Hidden on small screens if a chat is active in a full MERN implementation */}
        <div className="w-full md:w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9 h-9 bg-muted/50 border-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {MOCK_CHATS.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                className={cn(
                  "p-4 flex items-center space-x-3 cursor-pointer hover:bg-primary/5 transition-colors",
                  activeChat.id === chat.id && "bg-primary/10"
                )}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.unread && <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold truncate">{chat.name}</span>
                    <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className={cn("text-xs truncate", chat.unread ? "font-bold text-foreground" : "text-muted-foreground")}>
                    {chat.lastMsg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window - Desktop View/Standard View */}
        <div className="hidden md:flex flex-1 flex-col">
          <div className="p-4 border-b flex items-center justify-between bg-white">
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activeChat.avatar} />
                <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{activeChat.name}</span>
                <span className="text-[10px] text-green-500 font-medium">Active now</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="text-muted-foreground"><Phone className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground"><Video className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground"><Info className="h-5 w-5" /></Button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/20">
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-2xl rounded-tl-none bg-white shadow-sm text-sm">
                Hey! Loved the post you shared earlier.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] p-3 rounded-2xl rounded-tr-none bg-primary text-primary-foreground shadow-sm text-sm">
                Thanks Alex! It was a fun process.
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-2xl rounded-tl-none bg-white shadow-sm text-sm">
                Let's catch up soon. Maybe work on that audio track together?
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground"><PlusSquare className="h-5 w-5" /></Button>
              <Input 
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Message..." 
                className="flex-1 bg-muted/50 border-none focus-visible:ring-primary" 
              />
              <Button 
                size="icon" 
                className={cn("rounded-full transition-all scale-0", msg.length > 0 && "scale-100")}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}

import { PlusSquare } from "lucide-react"