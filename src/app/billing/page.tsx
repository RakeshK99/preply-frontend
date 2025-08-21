"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  DollarSign,
  Calendar,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Settings,
  Zap,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  BookOpen,
  Plus
} from "lucide-react";
import Link from "next/link";

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  amount: number;
  currency: string;
  interval: string;
}

interface Usage {
  qa: number;
  qaLimit: number;
  summaries: number;
  summariesLimit: number;
  flashcards: number;
  flashcardsLimit: number;
  quizzes: number;
  quizzesLimit: number;
  credits: number;
  totalCredits: number;
}

export default function BillingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>({
    id: 'sub_123',
    plan: 'Pro',
    status: 'active',
    currentPeriodStart: new Date('2024-01-01'),
    currentPeriodEnd: new Date('2024-02-01'),
    amount: 3999,
    currency: 'usd',
    interval: 'month'
  });
  const [usage, setUsage] = useState<Usage>({
    qa: 45,
    qaLimit: 200,
    summaries: 8,
    summariesLimit: 25,
    flashcards: 3,
    flashcardsLimit: 15,
    quizzes: 2,
    quizzesLimit: 10,
    credits: 3,
    totalCredits: 5
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/auth/sign-in");
      return;
    }
  }, [isLoaded, isSignedIn, router]);

  const handleManageBilling = () => {
    // In real app, this would redirect to Stripe Customer Portal
    window.open('https://billing.stripe.com/session/test', '_blank');
  };

  const handleUpgrade = () => {
    // In real app, this would redirect to Stripe Checkout
    router.push('/billing/upgrade');
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Billing & Usage</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Current Plan</span>
                  </CardTitle>
                  <Badge 
                    variant={subscription?.status === 'active' ? 'default' : 'secondary'}
                  >
                    {subscription?.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {subscription ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{subscription.plan} Plan</h3>
                        <p className="text-gray-600">
                          {formatCurrency(subscription.amount, subscription.currency)}/{subscription.interval}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Next billing date</p>
                        <p className="font-medium">{subscription.currentPeriodEnd.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleManageBilling} variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Billing
                      </Button>
                      <Button onClick={handleUpgrade}>
                        <Zap className="h-4 w-4 mr-2" />
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No active subscription</h3>
                    <p className="text-gray-600 mb-4">Upgrade to unlock premium features</p>
                    <Button onClick={handleUpgrade}>
                      <Zap className="h-4 w-4 mr-2" />
                      Choose a Plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Usage This Month</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Session Credits */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Session Credits</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {usage.credits}/{usage.totalCredits} used
                      </span>
                    </div>
                    <Progress value={(usage.credits / usage.totalCredits) * 100} />
                  </div>

                  {/* AI Q&A */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                        <span className="font-medium">AI Q&A Requests</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {usage.qa}/{usage.qaLimit} used
                      </span>
                    </div>
                    <Progress value={(usage.qa / usage.qaLimit) * 100} />
                  </div>

                  {/* Document Summaries */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Document Summaries</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {usage.summaries}/{usage.summariesLimit} used
                      </span>
                    </div>
                    <Progress value={(usage.summaries / usage.summariesLimit) * 100} />
                  </div>

                  {/* Flashcards */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Flashcard Sets</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {usage.flashcards}/{usage.flashcardsLimit} used
                      </span>
                    </div>
                    <Progress value={(usage.flashcards / usage.flashcardsLimit) * 100} />
                  </div>

                  {/* Quizzes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-red-600" />
                        <span className="font-medium">Quiz Generations</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {usage.quizzes}/{usage.quizzesLimit} used
                      </span>
                    </div>
                    <Progress value={(usage.quizzes / usage.quizzesLimit) * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Billing History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Pro Plan - Monthly</p>
                      <p className="text-sm text-gray-600">January 1, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$39.99</p>
                      <Badge variant="default" className="mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Pro Plan - Monthly</p>
                      <p className="text-sm text-gray-600">December 1, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$39.99</p>
                      <Badge variant="default" className="mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Starter Plan - Monthly</p>
                      <p className="text-sm text-gray-600">November 1, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$19.99</p>
                      <Badge variant="default" className="mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download All Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Plan Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Available Plans</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Starter</h4>
                        <p className="text-sm text-gray-600">$19.99/month</p>
                      </div>
                      {subscription?.plan === 'Starter' && (
                        <Badge variant="default">Current</Badge>
                      )}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 2 tutoring sessions</li>
                      <li>• 50 AI Q&A requests</li>
                      <li>• 10 summaries</li>
                      <li>• Basic support</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Pro</h4>
                        <p className="text-sm text-gray-600">$39.99/month</p>
                      </div>
                      {subscription?.plan === 'Pro' && (
                        <Badge variant="default">Current</Badge>
                      )}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 5 tutoring sessions</li>
                      <li>• 200 AI Q&A requests</li>
                      <li>• 25 summaries</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Premium</h4>
                        <p className="text-sm text-gray-600">$79.99/month</p>
                      </div>
                      {subscription?.plan === 'Premium' && (
                        <Badge variant="default">Current</Badge>
                      )}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 10 tutoring sessions</li>
                      <li>• Unlimited AI Q&A</li>
                      <li>• Unlimited summaries</li>
                      <li>• Premium support</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge variant="default">Default</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Billing FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
