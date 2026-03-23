"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlusSquare, MessageCircle, User, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-md items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-primary font-headline">VibeShare</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/notifications" className="text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-6 w-6" />
          </Link>
          <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, href: "/", label: "Home" },
    { icon: Search, href: "/explore", label: "Explore" },
    { icon: PlusSquare, href: "/create", label: "Create" },
    { icon: MessageCircle, href: "/chat", label: "Chat" },
    { icon: User, href: "/profile", label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-background px-2 py-2 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center p-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "fill-current")} />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}