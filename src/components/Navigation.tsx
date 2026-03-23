"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlusSquare, MessageCircle, User, Bell, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    setTheme(initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (!mounted) return <div className="h-10 w-10" />

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-md items-center justify-between px-4">
        <Link href="/feed" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-primary font-headline">VibeShare</span>
        </Link>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Link href="/notifications" className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <Bell className="h-6 w-6" />
          </Link>
          <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors p-2">
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
    { icon: Home, href: "/feed", label: "Home" },
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
