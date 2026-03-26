"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp } from "@/firebase"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const auth = useAuth()
  const { user, isUserLoading } = useUser()

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/feed")
    }
  }, [user, isUserLoading, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (isLogin) {
      initiateEmailSignIn(auth, email, password)
    } else {
      initiateEmailSignUp(auth, email, password, name)
    }
    
    // Reset submission state after a short delay or let the auth observer handle it
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="absolute top-4 left-4">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/"><ArrowLeft className="h-4 w-4" /> Back</Link>
          </Button>
        </div>

        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4">
             <Sparkles className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">VibeShare</h1>
          <p className="text-muted-foreground mt-2">Connect, Create, Inspire.</p>
        </div>

        <Card className="border-primary/20 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>{isLogin ? "Sign In" : "Create Account"}</CardTitle>
            <CardDescription>
              {isLogin ? "Enter your credentials to access your vibes." : "Join the creative community today."}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full font-semibold h-11 text-lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  isLogin ? "Sign In" : "Get Started"
                )}
              </Button>
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                disabled={isSubmitting}
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
