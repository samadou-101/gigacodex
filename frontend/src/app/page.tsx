import {
  ArrowRight,
  Compass,
  MapPin,
  BookOpen,
  Target,
  Play,
  ChevronRight,
  Brain,
  Route,
  Zap,
  Navigation,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  Award,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";

export default function ModernGigaCodeX() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/20">
                  <Compass className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                  gigaCodeX
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Learning Companion
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {["Features", "How It Works", "Community", "Get Started"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item === "How It Works" ? "/how-it-works" : "#"}
                    className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  >
                    {item}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 dark:bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                  </Link>
                )
              )}

              <ThemeToggle />

              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300">
                  Sign In
                </button>
                <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30">
                  Start Learning
                </button>
              </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 via-pink-400/5 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center max-w-6xl relative">
          {/* Status Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-green-500/20 rounded-full text-green-700 dark:text-green-400 text-sm font-semibold mb-8 hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <Sparkles className="w-4 h-4 mr-2" />
            For Lost Developers • Find Your Direction
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="text-slate-900 dark:text-white">
              STOP DROWNING IN
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent relative">
              TUTORIALS
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-blue-700/20 to-blue-800/20 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            You&apos;re smart. You&apos;re motivated. But you&apos;re stuck in
            tutorial hell, jumping from course to course without real progress.
            gigaCodeX is your escape route—a learning compass that transforms
            confusion into confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/get-started"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-2xl font-semibold text-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-50 dark:opacity-20"></div>
              <div className="relative flex items-center">
                <Play className="mr-3 h-6 w-6" />
                Find Your Path Now
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
              </div>
            </Link>

            <Link
              href="/how-it-works"
              className="group px-8 py-4 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center">
                See How It Works
                <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-blue-950/30 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-950/50 rounded-full text-blue-700 dark:text-blue-400 font-semibold text-sm mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Why gigaCodeX is Different
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Beyond Traditional Learning
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience a revolutionary approach to learning that focuses on
              understanding and navigation rather than just information
              consumption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Navigation,
                title: "Navigation, Not Information",
                description:
                  "We don't flood you with more content. We help you navigate what already exists and make informed decisions about what to learn next.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Target,
                title: "Escape Tutorial Hell",
                description:
                  "Learn to think critically about your learning path. Build confidence in your decisions rather than endlessly consuming tutorials.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Brain,
                title: "Mental Models Over Memorization",
                description:
                  "Understand the 'why' behind computer science concepts. Build intuitive mental models that stick and guide your thinking.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Users,
                title: "Context-Driven Learning",
                description:
                  "Get personalized guidance based on your goals, current level, and where you want to go. No one-size-fits-all approach.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: TrendingUp,
                title: "Actionable Paths",
                description:
                  "Every interaction leads to clear next steps. Know exactly what to do and why it matters for your specific journey.",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: Shield,
                title: "Confidence Building",
                description:
                  "Develop the decision-making skills that separate confident developers from those stuck in perpetual learning mode.",
                color: "from-teal-500 to-blue-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl border border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20"
              >
                <div className="relative">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-blue-950/30 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-950/50 rounded-full text-blue-700 dark:text-blue-400 font-semibold text-sm mb-6">
              <Route className="w-4 h-4 mr-2" />
              Your Journey to Clarity
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              A clear path from confusion to confidence, designed to help you
              make informed decisions about your learning journey.
            </p>
          </div>

          <div className="relative">
            {/* Modern Connection Design */}
            <div className="absolute inset-0 hidden lg:block">
              {/* Vertical Gradient Line */}
              <div className="absolute h-full left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-blue-500/0 via-blue-600/50 to-blue-700/0"></div>

              {/* Horizontal Connectors */}
              {[0, 1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="absolute left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"
                  style={{
                    top: `${index * 384 + 40}px`,
                  }}
                >
                  {/* Glowing Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-600/20 to-blue-700/0 blur-sm"></div>
                </div>
              ))}
            </div>

            <div className="space-y-24 relative z-30">
              {[
                {
                  title: "Declare Your Position",
                  description:
                    "Tell us where you are now—beginner, self-taught, or experienced but confused. We meet you exactly where you are.",
                  features: [
                    "Current skill assessment",
                    "Learning style analysis",
                    "Goal alignment",
                  ],
                  position: "left",
                },
                {
                  title: "Guided Exploration",
                  description:
                    "Interactive articles and concept explainers help you understand what computer science and software development really are.",
                  features: [
                    "Interactive content",
                    "Concept explainers",
                    "Real-world context",
                  ],
                  position: "right",
                },
                {
                  title: "Build Your Compass",
                  description:
                    "Develop the mental models and decision-making frameworks that will guide you through any technical challenge.",
                  features: [
                    "Mental models",
                    "Decision frameworks",
                    "Critical thinking",
                  ],
                  position: "left",
                },
                {
                  title: "Choose Your Path",
                  description:
                    "With clarity and confidence, make informed decisions about what to learn next based on your goals and context.",
                  features: [
                    "Personalized roadmap",
                    "Clear next steps",
                    "Goal alignment",
                  ],
                  position: "right",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-start gap-16 relative ${
                    step.position === "right" ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 lg:max-w-lg relative z-10">
                    <div className="relative">
                      {/* Step Indicator */}
                      <div className="absolute -top-3 -left-3 flex items-center gap-2 group">
                        {/* Glowing Background */}
                        <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>

                        {/* Main Dot */}
                        <div className="relative w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all duration-500">
                          {/* Animated Rings */}
                          <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
                          <div className="absolute inset-1 border-2 border-white/20 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>

                          {/* Center Dot */}
                          <div className="w-2.5 h-2.5 bg-white rounded-full shadow-inner"></div>
                        </div>

                        {/* Connecting Line */}
                        <div className="relative h-px w-10">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent blur-sm"></div>
                        </div>
                      </div>

                      <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                          {step.description}
                        </p>
                        <div className="space-y-3">
                          {step.features.map((feature, fIndex) => (
                            <div
                              key={fIndex}
                              className="flex items-center text-slate-700 dark:text-slate-300"
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 lg:max-w-lg relative z-10 hidden lg:block">
                    <div className="relative h-80 bg-gradient-to-br from-slate-100/90 via-white/90 to-blue-50/70 dark:from-slate-800/90 dark:via-slate-900/90 dark:to-blue-950/70 backdrop-blur-sm rounded-3xl p-12 flex items-center justify-center shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                      <div
                        className={`w-32 h-32 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 rounded-full flex items-center justify-center shadow-2xl animate-pulse`}
                      >
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${
                            index === 0
                              ? "from-blue-500 to-cyan-500"
                              : index === 1
                              ? "from-indigo-500 to-blue-500"
                              : index === 2
                              ? "from-purple-500 to-indigo-500"
                              : "from-pink-500 to-purple-500"
                          } rounded-full flex items-center justify-center`}
                        >
                          {index === 0 && (
                            <Brain className="h-10 w-10 text-white" />
                          )}
                          {index === 1 && (
                            <MapPin className="h-10 w-10 text-white" />
                          )}
                          {index === 2 && (
                            <BookOpen className="h-10 w-10 text-white" />
                          )}
                          {index === 3 && (
                            <Award className="h-10 w-10 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-[slide_20s_linear_infinite]"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-2000"></div>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-semibold text-sm mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Ready to Find Your Direction?
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Transform Confusion
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent">
                Into Confidence
              </span>
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of developers who&apos;ve transformed confusion
              into confidence and scattered learning into strategic growth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group relative px-10 py-5 bg-white text-blue-600 hover:text-blue-700 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Link
                href={"/get-started"}
                className="relative flex items-center justify-center"
              >
                Start Your Journey
                <ArrowUpRight className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </button>

            {/* <button className="px-10 py-5 border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Schedule Demo
            </button> */}
          </div>

          <div className="text-center text-white/70 text-sm">
            <p>
              ✓ Personalized Learning Path ✓ Expert Guidance ✓ Real Progress
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 border-t border-slate-200 dark:border-slate-800 py-20 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-900/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Compass className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    gigaCodeX
                  </span>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Learning Companion
                  </div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-md">
                Empowering developers worldwide with AI-powered learning
                experiences that transform confusion into confidence.
              </p>
              <div className="flex space-x-4">
                {["twitter", "github", "linkedin", "discord"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-slate-200 dark:bg-slate-800 hover:bg-blue-500 dark:hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <div className="w-5 h-5 bg-slate-600 dark:bg-slate-400 group-hover:bg-white rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Platform",
                links: [
                  "Features",
                  "Pricing",
                  "Learning Paths",
                  "AI Tutor",
                  "Progress Tracking",
                ],
              },
              {
                title: "Resources",
                links: [
                  "Documentation",
                  "Blog",
                  "Case Studies",
                  "Webinars",
                  "Help Center",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Partners", "Contact"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 md:mb-0">
                © 2024 gigaCodeX. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
