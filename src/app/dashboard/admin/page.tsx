"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  DollarSign,
  Settings,
  Shield,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  UserCheck,
  UserX,
  CreditCard,
  Flag,
  Database
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
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
  const platformStats = {
    totalUsers: 15420,
    activeUsers: 8920,
    totalRevenue: 125000,
    monthlyGrowth: 12.5,
    pendingRefunds: 8,
    pendingTutorApplications: 23
  };

  const recentActivity = [
    {
      id: 1,
      type: "tutor_application",
      user: "Dr. Sarah Johnson",
      action: "Applied for tutor position",
      time: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      type: "refund_request",
      user: "Alex Smith",
      action: "Requested refund for session",
      time: "4 hours ago",
      status: "pending"
    },
    {
      id: 3,
      type: "payment_issue",
      user: "Maria Garcia",
      action: "Payment failed",
      time: "6 hours ago",
      status: "resolved"
    }
  ];

  const featureFlags = [
    {
      name: "ai_chat_beta",
      description: "New AI chat interface",
      enabled: true,
      users: "10%"
    },
    {
      name: "video_calling",
      description: "Integrated video calling",
      enabled: false,
      users: "0%"
    },
    {
      name: "advanced_analytics",
      description: "Enhanced analytics dashboard",
      enabled: true,
      users: "100%"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Preply</span>
              <Badge variant="secondary" className="ml-2">
                Admin
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </span>
              <Link href="/dashboard/admin/settings">
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
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {platformStats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    +{platformStats.monthlyGrowth}% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {platformStats.activeUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600">
                    This month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${platformStats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    +15.2% from last month
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
                  <p className="text-sm font-medium text-gray-600">Pending Actions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {platformStats.pendingRefunds + platformStats.pendingTutorApplications}
                  </p>
                  <p className="text-sm text-yellow-600">
                    Require attention
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/dashboard/admin/tutors">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                      <Users className="h-6 w-6" />
                      <span className="text-sm">Manage Tutors</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/plans">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                      <CreditCard className="h-6 w-6" />
                      <span className="text-sm">Plans & Pricing</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/refunds">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                      <DollarSign className="h-6 w-6" />
                      <span className="text-sm">Refunds</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/features">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                      <Flag className="h-6 w-6" />
                      <span className="text-sm">Feature Flags</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <Link href="/dashboard/admin/activity">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {activity.type === 'tutor_application' && <Users className="h-5 w-5 text-blue-600" />}
                          {activity.type === 'refund_request' && <DollarSign className="h-5 w-5 text-blue-600" />}
                          {activity.type === 'payment_issue' && <AlertTriangle className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{activity.user}</h4>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                        <Badge 
                          variant={activity.status === 'resolved' ? 'default' : 'secondary'}
                          className="mt-2"
                        >
                          {activity.status === 'resolved' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolved
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Pending
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
            {/* Pending Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Pending Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-900">Tutor Applications</p>
                      <p className="text-sm text-yellow-700">{platformStats.pendingTutorApplications} pending</p>
                    </div>
                    <Link href="/dashboard/admin/tutors/applications">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-900">Refund Requests</p>
                      <p className="text-sm text-red-700">{platformStats.pendingRefunds} pending</p>
                    </div>
                    <Link href="/dashboard/admin/refunds">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Flags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flag className="h-5 w-5" />
                  <span>Feature Flags</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureFlags.map((flag) => (
                    <div key={flag.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{flag.description}</p>
                        <p className="text-sm text-gray-600">{flag.users} of users</p>
                      </div>
                      <Badge variant={flag.enabled ? "default" : "secondary"}>
                        {flag.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  ))}
                  <Link href="/dashboard/admin/features">
                    <Button variant="outline" className="w-full">
                      Manage Features
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Status</span>
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payments</span>
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Services</span>
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Operational
                    </Badge>
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
