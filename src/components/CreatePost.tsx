"use client"

import { useState } from "react"
import { Image as ImageIcon, Sparkles, Mic, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { suggestCaptionsAndHashtags } from "@/ai/flows/ai-caption-hashtag-suggestions"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CreatePost() {
  const [mediaType, setMediaType] = useState<"image" | "audio">("image")
  const [mediaSelected, setMediaSelected] = useState(false)
  const [caption, setCaption] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleMediaSelect = () => {
    // Mocking file selection
    setMediaSelected(true)
    setPreviewUrl("https://picsum.photos/seed/vibeshare_new/600/600")
  }

  const handleGenerateAI = async () => {
    if (!mediaSelected) {
      toast({ title: "Select media first", description: "You need to select an image to generate suggestions." })
      return
    }

    setIsGenerating(true)
    try {
      // Use a base64 encoded placeholder for demo purposes if real file upload isn't connected
      const result = await suggestCaptionsAndHashtags({
        mediaDataUri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYFxcYGBgXGBgYFxcXFxcXFxcYHSggGBolHRcXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xABEEAACAQIEAwYDBQUGBAcAAAABAgMAEQQSITEFBkETIlFhcYEyQpGhscHR8BQjUuHxBxVicrKzJDNDgpKiFhc0U2PB/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QALREAAgICAgEDBAEEAwEBAAAAAAECERIhAzFBUWEiMnGBBCMzQpGxwfDR4SCh/9oADAMBAAIRAxEAPwD" 
      })
      
      setCaption(result.captions[0])
      setHashtags(result.hashtags)
      toast({ title: "AI Magic Ready!", description: "Check out the suggestions we found for you." })
    } catch (error) {
      console.error(error)
      toast({ title: "Oops!", description: "Something went wrong with the AI generation." })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setMediaSelected(false)
    setPreviewUrl(null)
    setCaption("")
    setHashtags([])
  }

  return (
    <Card className="p-4 mb-6 border-primary/20 bg-white/50 backdrop-blur-sm">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="p-2 bg-primary/10 rounded-lg text-primary"><PlusSquare className="h-5 w-5" /></span>
        Share your vibe
      </h2>
      
      {!mediaSelected ? (
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-32 flex flex-col gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5"
            onClick={handleMediaSelect}
          >
            <ImageIcon className="h-8 w-8 text-primary" />
            <span>Add Photo</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-32 flex flex-col gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5"
            onClick={() => { setMediaType("audio"); handleMediaSelect(); }}
          >
            <Mic className="h-8 w-8 text-primary" />
            <span>Record Audio</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group">
            {previewUrl && mediaType === "image" && (
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            )}
            {mediaType === "audio" && (
              <div className="flex items-center justify-center h-full bg-primary/5">
                <Mic className="h-12 w-12 text-primary animate-pulse" />
              </div>
            )}
            <button 
              onClick={handleReset}
              className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Caption</label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="text-primary hover:text-primary/80 flex gap-2"
              >
                <Sparkles className={cn("h-4 w-4", isGenerating && "animate-spin")} />
                {isGenerating ? "Analyzing..." : "AI Suggestions"}
              </Button>
            </div>
            <Textarea 
              placeholder="What's on your mind?" 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="resize-none h-24"
            />
            
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button className="flex-1 gap-2" onClick={() => toast({ title: "Posted!", description: "Your vibe is live." })}>
                <Check className="h-4 w-4" /> Share Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

import { PlusSquare } from "lucide-react"