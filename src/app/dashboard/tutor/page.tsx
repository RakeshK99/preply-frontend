"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign,
  Settings,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  BarChart3,
  MessageSquare,
  FileText,
  Video
} from "lucide-react";
import Link from "next/link";

export default function TutorDashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
      student: "Alex Johnson",
      subject: "Advanced Calculus",
      date: "2024-01-15",
      time: "14:00",
      duration: "60 min",
      status: "confirmed",
      rate: 75
    },
    {
      id: 2,
      student: "Maria Garcia",
      subject: "Physics",
      date: "2024-01-17",
      time: "10:00",
      duration: "45 min",
      status: "pending",
      rate: 60
    }
  ];

  const earnings = {
    thisMonth: 1250,
    lastMonth: 980,
    totalSessions: 18,
    averageRating: 4.8,
    totalStudents: 12
  };

  const availability = {
    monday: { "9:00": true, "10:00": true, "14:00": true, "15:00": true },
    tuesday: { "9:00": true, "10:00": false, "14:00": true, "15:00": true },
    wednesday: { "9:00": false, "10:00": true, "14:00": true, "15:00": false },
    thursday: { "9:00": true, "10:00": true, "14:00": false, "15:00": true },
    friday: { "9:00": true, "10:00": true, "14:00": true, "15:00": true }
  };

  const timeSlots = ["9:00", "10:00", "14:00", "15:00"];
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

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
              <Link href="/dashboard/tutor/settings">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${earnings.thisMonth}
                  </p>
                  <p className="text-sm text-green-600">
                    +${earnings.thisMonth - earnings.lastMonth} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {earnings.totalSessions}
                  </p>
                  <p className="text-sm text-blue-600">
                    This month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {earnings.averageRating}
                  </p>
                  <p className="text-sm text-yellow-600">
                    ★★★★★
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {earnings.totalStudents}
                  </p>
                  <p className="text-sm text-purple-600">
                    Active students
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Availability Editor */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Weekly Availability</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 font-medium text-gray-600">Time</th>
                        {days.map((day) => (
                          <th key={day} className="text-center p-2 font-medium text-gray-600 capitalize">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((time) => (
                        <tr key={time}>
                          <td className="p-2 text-sm font-medium text-gray-900">{time}</td>
                          {days.map((day) => (
                            <td key={`${day}-${time}`} className="p-2">
                              <Button
                                variant={availability[day as keyof typeof availability]?.[time as keyof typeof availability.monday] ? "default" : "outline"}
                                size="sm"
                                className="w-full h-8"
                              >
                                {availability[day as keyof typeof availability]?.[time as keyof typeof availability.monday] ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Minus className="h-4 w-4" />
                                )}
                              </Button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Upcoming Sessions</span>
                  </CardTitle>
                  <Link href="/dashboard/tutor/sessions">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Users className="h-4 w-4 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{session.student}</h4>
                            <p className="text-sm text-gray-600">{session.subject}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${session.rate}</p>
                          <p className="text-sm text-gray-500">{session.duration}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-3">
                        <span>{session.date} at {session.time}</span>
                        <Badge 
                          variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                        >
                          {session.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4 mr-2" />
                          Join
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="ghost">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/dashboard/tutor/availability">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Manage Availability
                    </Button>
                  </Link>
                  <Link href="/dashboard/tutor/sessions">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="h-4 w-4 mr-2" />
                      View Sessions
                    </Button>
                  </Link>
                  <Link href="/dashboard/tutor/earnings">
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Earnings Report
                    </Button>
                  </Link>
                  <Link href="/dashboard/tutor/students">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      My Students
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Session completed</p>
                      <p className="text-xs text-gray-500">Calculus with Alex - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-xs text-gray-500">$75 from Maria - 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New student</p>
                      <p className="text-xs text-gray-500">Sarah booked first session - 2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Student Context</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Alex Johnson</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Next session: Advanced Calculus - Derivatives
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        View Notes
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Progress
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Maria Garcia</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Recent focus: Physics - Mechanics
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        View Notes
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Progress
                      </Button>
                    </div>
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
