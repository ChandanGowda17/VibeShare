"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Image as ImageIcon, Mic, Share2 } from "lucide-react"
import { useUser } from "@/firebase"

export default function LandingPage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center space-y-8 max-w-3xl mx-auto">
        <div className="inline-flex p-4 rounded-3xl bg-primary/10 text-primary animate-pulse">
          <Sparkles className="h-12 w-12" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary font-headline">
            VibeShare
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Connect. Create. Inspire.
          </p>
          <p className="text-muted-foreground max-w-lg mx-auto">
            The modern social experience for sharing your creativity through high-fidelity photos, 
            immersive audio, and authentic moments.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {user ? (
            <Button asChild size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20">
              <Link href="/feed">Go to Feed</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl border-primary/20 hover:bg-primary/5">
                <Link href="/login">Sign In</Link>
              </Button>
            </>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 w-full">
          <div className="p-6 rounded-2xl bg-white/50 border border-primary/10 flex flex-col items-center space-y-3">
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="font-bold">Visual Vibes</h3>
            <p className="text-sm text-muted-foreground">Share stunning photos with AI-powered enhancements.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 border border-primary/10 flex flex-col items-center space-y-3">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Mic className="h-6 w-6" />
            </div>
            <h3 className="font-bold">Audio Moments</h3>
            <p className="text-sm text-muted-foreground">Express yourself with high-quality voice snippets.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 border border-primary/10 flex flex-col items-center space-y-3">
            <div className="p-3 rounded-xl bg-green-500/10 text-green-600">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold">Social Magic</h3>
            <p className="text-sm text-muted-foreground">Connect with creators around the globe instantly.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center border-t bg-white/30 backdrop-blur-sm">
        <p className="text-sm text-muted-foreground">
          © 2024 VibeShare. All rights reserved. Built for creators.
        </p>
      </footer>
    </div>
  )
}
