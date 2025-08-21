"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Upload, 
  Target, 
  Clock, 
  Users, 
  TrendingUp,
  Plus,
  FileText,
  Brain,
  Video,
  CreditCard,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/auth/sign-in");
      return;
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  // Mock data - in real app this would come from API
  const upcomingSessions = [
    {
      id: 1,
      tutor: "Dr. Sarah Johnson",
      subject: "Advanced Calculus",
      date: "2024-01-15",
      time: "14:00",
      duration: "60 min",
      status: "confirmed"
    },
    {
      id: 2,
      tutor: "Prof. Michael Chen",
      subject: "Physics",
      date: "2024-01-17",
      time: "10:00",
      duration: "45 min",
      status: "pending"
    }
  ];

  const recentUploads = [
    {
      id: 1,
      title: "Calculus Chapter 3",
      subject: "Mathematics",
      uploadedAt: "2 days ago",
      status: "processed",
      summary: "Derivatives and their applications"
    },
    {
      id: 2,
      title: "Physics Lab Notes",
      subject: "Physics",
      uploadedAt: "1 week ago",
      status: "processing",
      summary: "Mechanics and motion experiments"
    }
  ];

  const quickStats = [
    {
      title: "Study Hours",
      value: "12.5",
      unit: "hours",
      icon: Clock,
      change: "+2.3",
      changeType: "positive"
    },
    {
      title: "Sessions Completed",
      value: "8",
      unit: "sessions",
      icon: Video,
      change: "+3",
      changeType: "positive"
    },
    {
      title: "Notes Uploaded",
      value: "15",
      unit: "files",
      icon: FileText,
      change: "+5",
      changeType: "positive"
    },
    {
      title: "AI Interactions",
      value: "47",
      unit: "chats",
      icon: Brain,
      change: "+12",
      changeType: "positive"
    }
  ];

  const subscriptionStatus = {
    plan: "Pro",
    credits: 3,
    totalCredits: 5,
    aiUsage: {
      qa: 45,
      qaLimit: 200,
      summaries: 8,
      summariesLimit: 25,
      flashcards: 3,
      flashcardsLimit: 15
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Preply</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </span>
              <Link href="/billing">
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value} {stat.unit}
                    </p>
                    <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/ai/chat">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                      <MessageSquare className="h-6 w-6" />
                      <span className="text-sm">AI Chat</span>
                    </Button>
                  </Link>
                  <Link href="/uploads">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                      <Upload className="h-6 w-6" />
                      <span className="text-sm">Upload Notes</span>
                    </Button>
                  </Link>
                  <Link href="/tutors">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                      <Calendar className="h-6 w-6" />
                      <span className="text-sm">Book Session</span>
                    </Button>
                  </Link>
                  <Link href="/progress">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                      <TrendingUp className="h-6 w-6" />
                      <span className="text-sm">View Progress</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Uploads */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Recent Uploads</span>
                  </CardTitle>
                  <Link href="/uploads">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUploads.map((upload) => (
                    <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{upload.title}</h4>
                          <p className="text-sm text-gray-600">{upload.subject}</p>
                          <p className="text-sm text-gray-500">{upload.summary}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{upload.uploadedAt}</p>
                        <Badge 
                          variant={upload.status === 'processed' ? 'default' : 'secondary'}
                          className="mt-2"
                        >
                          {upload.status === 'processed' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Ready
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Processing
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Subscription Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>{subscriptionStatus.plan} Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Session Credits</span>
                      <span>{subscriptionStatus.credits}/{subscriptionStatus.totalCredits}</span>
                    </div>
                    <Progress value={(subscriptionStatus.credits / subscriptionStatus.totalCredits) * 100} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>AI Q&A</span>
                      <span>{subscriptionStatus.aiUsage.qa}/{subscriptionStatus.aiUsage.qaLimit}</span>
                    </div>
                    <Progress value={(subscriptionStatus.aiUsage.qa / subscriptionStatus.aiUsage.qaLimit) * 100} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Summaries</span>
                      <span>{subscriptionStatus.aiUsage.summaries}/{subscriptionStatus.aiUsage.summariesLimit}</span>
                    </div>
                    <Progress value={(subscriptionStatus.aiUsage.summaries / subscriptionStatus.aiUsage.summariesLimit) * 100} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Flashcards</span>
                      <span>{subscriptionStatus.aiUsage.flashcards}/{subscriptionStatus.aiUsage.flashcardsLimit}</span>
                    </div>
                    <Progress value={(subscriptionStatus.aiUsage.flashcards / subscriptionStatus.aiUsage.flashcardsLimit) * 100} />
                  </div>
                  
                  <Link href="/billing">
                    <Button variant="outline" className="w-full">
                      Manage Subscription
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Next Sessions</span>
                  </CardTitle>
                  <Link href="/tutors">
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{session.tutor}</h4>
                          <p className="text-sm text-gray-600">{session.subject}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-3">
                        <span>{session.date} at {session.time}</span>
                        <span>{session.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                        >
                          {session.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Join
                          </Button>
                          <Button size="sm" variant="ghost">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Practice Calculus</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Based on your recent sessions, you should focus on derivative applications.
                    </p>
                    <Button size="sm" className="w-full">
                      Start Practice
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Review Physics Notes</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Your physics notes are ready for review. Generate flashcards?
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Generate Flashcards
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
