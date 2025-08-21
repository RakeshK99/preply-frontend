"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Upload, 
  MessageSquare, 
  BookOpen, 
  Calendar, 
  Brain, 
  FileText, 
  Send,
  LogOut,
  User,
  Settings,
  Plus,
  Trash2,
  Download
} from "lucide-react"
import { toast } from "sonner"

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
}

interface UploadedFile {
  id: string
  filename: string
  file_type: string
  uploaded_at: string
  status: string
}

interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    
    if (!token || !userData) {
      router.push("/auth/sign-in")
      return
    }

    setUser(JSON.parse(userData))
    fetchUploadedFiles()
    fetchChatHistory()
  }, [router])

  const fetchUploadedFiles = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/uploads/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setUploadedFiles(data)
      }
    } catch (error) {
      console.error("Error fetching files:", error)
    }
  }

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/ai/chat/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setChatMessages(data)
      }
    } catch (error) {
      console.error("Error fetching chat history:", error)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file")
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/uploads/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (response.ok) {
        toast.success("File uploaded successfully!")
        setSelectedFile(null)
        fetchUploadedFiles()
      } else {
        toast.error("Upload failed")
      }
    } catch (error) {
      toast.error("Network error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      role: "user",
      timestamp: new Date().toISOString(),
    }

    setChatMessages(prev => [...prev, userMessage])
    setNewMessage("")

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: newMessage,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          role: "assistant",
          timestamp: new Date().toISOString(),
        }
        setChatMessages(prev => [...prev, assistantMessage])
      } else {
        toast.error("Failed to get response")
      }
    } catch (error) {
      toast.error("Network error")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleTutoringBooking = () => {
    // Open email client with pre-filled booking request
    const subject = encodeURIComponent("Tutoring Session Booking Request")
    const body = encodeURIComponent(`
Hi,

I would like to book a tutoring session with you.

Student: ${user?.first_name} ${user?.last_name}
Email: ${user?.email}

Please let me know your available times and rates.

Best regards,
${user?.first_name} ${user?.last_name}
    `)
    
    window.open(`mailto:your-email@example.com?subject=${subject}&body=${body}`)
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Preply Dashboard</h1>
              <Badge variant="secondary">Student</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.first_name} {user.last_name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="study">Study Tools</TabsTrigger>
            <TabsTrigger value="tutoring">Book Tutoring</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Uploaded Files</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{uploadedFiles.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Documents ready for AI analysis
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Conversations</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{chatMessages.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Total messages exchanged
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Sessions</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Tutoring sessions completed
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length === 0 && chatMessages.length === 0 ? (
                  <p className="text-muted-foreground">No recent activity. Start by uploading a file or asking a question!</p>
                ) : (
                  <div className="space-y-4">
                    {uploadedFiles.slice(0, 3).map((file) => (
                      <div key={file.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{file.filename}</span>
                        </div>
                        <Badge variant="outline">{file.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Files Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Study Materials</CardTitle>
                <CardDescription>
                  Upload your notes, textbooks, or assignments for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Select File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </div>
                <Button onClick={handleFileUpload} disabled={!selectedFile || isLoading}>
                  <Upload className="w-4 h-4 mr-2" />
                  {isLoading ? "Uploading..." : "Upload File"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length === 0 ? (
                  <p className="text-muted-foreground">No files uploaded yet.</p>
                ) : (
                  <div className="space-y-4">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{file.filename}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(file.uploaded_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={file.status === "processed" ? "default" : "secondary"}>
                            {file.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Study Assistant</CardTitle>
                <CardDescription>
                  Ask questions about your uploaded materials and get instant answers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-96 border rounded-lg p-4 overflow-y-auto space-y-4">
                    {chatMessages.length === 0 ? (
                      <p className="text-muted-foreground text-center">
                        Start a conversation with your AI tutor!
                      </p>
                    ) : (
                      chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Ask a question about your study materials..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Tools Tab */}
          <TabsContent value="study" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Flashcards</CardTitle>
                  <CardDescription>
                    Create flashcards from your uploaded materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Flashcards
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Create Quiz</CardTitle>
                  <CardDescription>
                    Generate practice quizzes based on your materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Generate Quiz
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tutoring Tab */}
          <TabsContent value="tutoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book a Tutoring Session</CardTitle>
                <CardDescription>
                  Schedule a one-on-one session with your personal tutor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 border rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">Personal Tutor: Rakesh</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Expert in mathematics, physics, computer science, and more. 
                    Available for personalized tutoring sessions to help you excel in your studies.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Flexible scheduling available</span>
                  </div>
                </div>
                
                <Button onClick={handleTutoringBooking} className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Tutoring Session
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Click the button above to send an email with your booking request. 
                  We'll coordinate the session details via email.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
