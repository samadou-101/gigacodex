"use client";
import {
  Sparkles,
  ChevronRight,
  Brain,
  Compass,
  MessageSquare,
  BookOpen,
  BarChart,
  Home,
  Map,
  Book,
  Users,
  Menu,
  X,
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Navigation,
  Star,
  AlertCircle,
  Sun,
  Moon,
  Code2,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { name: "Home", icon: Home, active: true },
    { name: "My Roadmap", icon: Map },
    { name: "Ask Guide", icon: MessageSquare },
    { name: "Progress Check", icon: Target },
    { name: "Resources", icon: Book },
    { name: "Community", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        ) : (
          <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        )}
      </button>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="relative w-6 h-6">
            <Sun
              className={`w-6 h-6 text-yellow-500 transition-all duration-300 ${
                theme === "dark"
                  ? "opacity-0 rotate-90"
                  : "opacity-100 rotate-0"
              }`}
            />
            <Moon
              className={`w-6 h-6 text-blue-400 absolute top-0 left-0 transition-all duration-300 ${
                theme === "dark"
                  ? "opacity-100 rotate-0"
                  : "opacity-0 -rotate-90"
              }`}
            />
          </div>
          {isHovered && (
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-lg text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
              {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            </div>
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <Navigation className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              GigaCodeX
            </h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  item.active
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <div className="container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Your learning navigator is here to guide your journey
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Current Goal
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Full Stack Developer
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Ask Your Guide",
                description: "Get instant guidance",
                icon: MessageSquare,
                color: "from-blue-500 to-indigo-500",
                badge: "AI Ready",
              },
              {
                title: "Update Roadmap",
                description: "Adjust your path",
                icon: Compass,
                color: "from-purple-500 to-pink-500",
                badge: "3 Updates",
              },
              {
                title: "Progress Check",
                description: "Review your journey",
                icon: BarChart,
                color: "from-green-500 to-emerald-500",
                badge: "Weekly",
              },
              {
                title: "Find Resources",
                description: "Get recommendations",
                icon: BookOpen,
                color: "from-yellow-500 to-orange-500",
                badge: "Curated",
              },
            ].map((action) => (
              <div
                key={action.title}
                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full">
                    {action.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {action.description}
                </p>
              </div>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Current Focus & Recent Activity */}
            <div className="lg:col-span-8 space-y-6">
              {/* Current Learning Focus */}
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Current Learning Focus
                  </h2>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Guidance
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-3">
                      <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Currently Learning
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      React.js Fundamentals
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          On track
                        </span>
                      </div>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Week 3 of 6
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center mb-3">
                      <Target className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Next Milestone
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Build Todo App
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-1" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Due in 5 days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                        Guidance Suggestion
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Consider reviewing JavaScript ES6 features before diving
                        deeper into React hooks. This will strengthen your
                        foundation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Guidance Sessions */}
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Recent Guidance Sessions
                  </h2>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      question: "How to structure React components properly?",
                      time: "2 hours ago",
                      status: "Resolved",
                      type: "Architecture",
                    },
                    {
                      question: "Should I learn TypeScript now or later?",
                      time: "Yesterday",
                      status: "Ongoing",
                      type: "Roadmap",
                    },
                    {
                      question: "Best practices for state management",
                      time: "3 days ago",
                      status: "Resolved",
                      type: "Best Practices",
                    },
                  ].map((session) => (
                    <div
                      key={session.question}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                            {session.question}
                          </h3>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {session.time}
                            </span>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                              {session.type}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`flex items-center px-2 py-1 rounded-full text-xs ${
                            session.status === "Resolved"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {session.status === "Resolved" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {session.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - AI Guide & Quick Stats */}
            <div className="lg:col-span-4 space-y-6">
              {/* AI Guide Chat */}
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Your AI Guide
                  </h2>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Online
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Great progress on React! Ready to tackle state management
                      concepts? I can guide you through useState and useEffect.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask a Question
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-all duration-300">
                      <Brain className="w-4 h-4 mr-1 inline" />
                      Explain
                    </button>
                    <button className="px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-all duration-300">
                      <MapPin className="w-4 h-4 mr-1 inline" />
                      Guide Me
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Journey Progress
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Overall Progress
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        34%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 w-1/3 transition-all duration-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        27
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Days Learning
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        12
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Milestones
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        This Week
                      </span>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          +15%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Resources */}
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Recommended For You
                  </h2>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: "React State Management Guide",
                      type: "Article",
                      urgent: true,
                    },
                    {
                      title: "JavaScript Async/Await",
                      type: "Tutorial",
                      urgent: false,
                    },
                    {
                      title: "Component Design Patterns",
                      type: "Guide",
                      urgent: false,
                    },
                  ].map((resource) => (
                    <div
                      key={resource.title}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                            {resource.title}
                          </h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {resource.type}
                          </span>
                        </div>
                        {resource.urgent && (
                          <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
