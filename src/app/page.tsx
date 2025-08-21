"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Brain,
  MessageSquare,
  Calendar,
  Upload,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles,
  BookOpen,
  Clock,
} from "lucide-react"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/50 pt-16 pb-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Learning Platform
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-wide leading-tight">
              Ace your classes with an{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                AI + human tutor
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Upload your materials, get instant AI summaries and flashcards, then book sessions with expert tutors to
              master any subject.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="lg" className="px-8 py-6 text-lg font-semibold rounded-2xl" asChild>
                <Link href="/auth/signup">
                  Try the AI Tutor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-2xl bg-transparent" asChild>
                <Link href="/tutors">Book a Session</Link>
              </Button>
            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">Trusted by students at</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-2xl font-bold">Harvard</div>
                <div className="text-2xl font-bold">MIT</div>
                <div className="text-2xl font-bold">Stanford</div>
                <div className="text-2xl font-bold">Berkeley</div>
                <div className="text-2xl font-bold">Yale</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide">How it works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your learning experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload",
                description: "Drop your notes, textbooks, or assignments. Our AI processes any format instantly.",
                step: "01",
              },
              {
                icon: Brain,
                title: "Learn",
                description: "Get AI-generated summaries, flashcards, and quizzes tailored to your materials.",
                step: "02",
              },
              {
                icon: Users,
                title: "Book",
                description: "Schedule sessions with expert tutors who understand your specific learning needs.",
                step: "03",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="relative h-full p-8 rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-muted-foreground/20">{item.step}</div>
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide">Powerful AI features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to excel in your studies, powered by cutting-edge AI
            </p>
          </motion.div>

          <div className="space-y-24">
            {/* AI Workspace */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <Badge variant="secondary" className="px-3 py-1">
                  <Zap className="w-4 h-4 mr-2" />
                  AI Workspace
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold">Instant summaries, flashcards & quizzes</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Upload any document and watch our AI transform it into personalized study materials. Get concise
                  summaries, interactive flashcards, and practice quizzes in seconds.
                </p>
                <ul className="space-y-3">
                  {[
                    "Smart content extraction from PDFs, images, and text",
                    "Adaptive flashcards that focus on your weak areas",
                    "Timed quizzes with detailed explanations",
                    "Export to Anki, CSV, or print-friendly formats",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="bg-card rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-6 h-6 text-blue-500" />
                      <span className="font-semibold">Calculus Notes Summary</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="bg-muted rounded-lg p-3">
                        <strong>Key Concept:</strong> Derivatives represent the rate of change...
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <strong>Formula:</strong> d/dx[x²] = 2x
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <strong>Application:</strong> Used in optimization problems...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RAG Chat */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="lg:order-2 space-y-6">
                <Badge variant="secondary" className="px-3 py-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Smart Chat
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold">Chat with your study materials</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ask questions about your uploaded content and get instant, contextual answers. Our RAG-powered AI
                  references your specific materials to provide accurate, relevant responses.
                </p>
                <ul className="space-y-3">
                  {[
                    "Ask questions in natural language",
                    "Get answers with source citations",
                    "Cross-reference multiple documents",
                    "Save important conversations",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:order-1 relative">
                <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="bg-card rounded-xl p-6 shadow-lg">
                    <div className="space-y-4">
                      <div className="bg-primary/10 rounded-lg p-3 ml-8">
                        <p className="text-sm">What's the difference between derivatives and integrals?</p>
                      </div>
                      <div className="bg-muted rounded-lg p-3 mr-8">
                        <p className="text-sm">
                          Based on your calculus notes, derivatives measure rates of change while integrals calculate
                          areas under curves...
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">Source: calculus-chapter-3.pdf</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scheduling */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <Badge variant="secondary" className="px-3 py-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Smart Scheduling
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold">Seamless tutor booking</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Connect with expert tutors who understand your learning materials. Our smart matching system pairs you
                  with tutors based on your subjects and learning style.
                </p>
                <ul className="space-y-3">
                  {[
                    "Google Calendar integration",
                    "Automatic timezone handling",
                    "Instant video meeting links",
                    "Tutor matching based on your materials",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="bg-card rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-6 h-6 text-purple-500" />
                      <span className="font-semibold">Upcoming Session</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                        <div>
                          <p className="font-medium">Dr. Sarah Chen</p>
                          <p className="text-sm text-muted-foreground">Mathematics • 4.9★</p>
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Tomorrow, 2:00 PM - 3:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your learning needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$9",
                description: "Perfect for trying out AI features",
                features: ["50 AI generations/month", "2 tutor sessions", "Basic chat support"],
                popular: false,
              },
              {
                name: "Pro",
                price: "$29",
                description: "Best for regular students",
                features: ["500 AI generations/month", "8 tutor sessions", "Priority chat support", "Export features"],
                popular: true,
              },
              {
                name: "Team",
                price: "$99",
                description: "For study groups and classes",
                features: ["Unlimited AI generations", "25 tutor sessions", "Team collaboration", "Admin dashboard"],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`relative h-full p-8 rounded-2xl ${
                    plan.popular ? "border-primary shadow-lg scale-105" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1">Best Value</Badge>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold">
                        {plan.price}
                        <span className="text-lg text-muted-foreground">/month</span>
                      </div>
                      <CardDescription className="text-base">{plan.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full rounded-xl ${plan.popular ? "bg-primary" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/auth/signup">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing">
              <Button variant="ghost" className="text-lg">
                View detailed pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide">Frequently asked questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Preply AI Study Assistant
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How does the AI tutor work?",
                  answer:
                    "Our AI analyzes your uploaded materials using advanced natural language processing to create personalized summaries, flashcards, and quizzes. It can also answer questions about your content with source citations.",
                },
                {
                  question: "What file formats are supported?",
                  answer:
                    "We support PDFs, Word documents, PowerPoint presentations, images (JPG, PNG), and plain text files. Our AI can extract and process content from all these formats.",
                },
                {
                  question: "How are tutors selected and vetted?",
                  answer:
                    "All tutors go through a rigorous screening process including background checks, subject matter expertise verification, and teaching ability assessments. We only accept the top 5% of applicants.",
                },
                {
                  question: "Can I cancel my subscription anytime?",
                  answer:
                    "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan features until the end of your current billing period.",
                },
                {
                  question: "Is my data secure and private?",
                  answer:
                    "Absolutely. We use enterprise-grade encryption and never share your personal data or study materials with third parties. Your privacy and security are our top priorities.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
              Ready to transform your learning?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join thousands of students who are already acing their classes with AI-powered study assistance and expert
              tutoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-semibold rounded-2xl" asChild>
                <Link href="/auth/signup">
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="px-8 py-6 text-lg text-white hover:bg-white/10 rounded-2xl"
                asChild
              >
                <Link href="/tutors">Browse Tutors</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
