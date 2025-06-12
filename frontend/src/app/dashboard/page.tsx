"use client";
import {
  MessageSquare,
  BookOpen,
  Home,
  Map,
  Book,
  Users,
  Menu,
  X,
  Target,
  Navigation,
  Sun,
  Moon,
  Brain,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: Home, href: "/dashboard" },
    { name: "Roadmap", icon: Map, href: "/dashboard/roadmap" },
    { name: "Ask Guide", icon: MessageSquare, href: "/dashboard/ask-guide" },
    { name: "Progress", icon: Target, href: "/dashboard/progress" },
    { name: "Resources", icon: Book, href: "/dashboard/resources" },
    { name: "Community", icon: Users, href: "/dashboard/community" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 hover:scale-105 transition-all duration-300"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-slate-700 dark:text-slate-400" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700 dark:text-slate-400" />
        )}
      </button>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 transition-all duration-300 hover:scale-105"
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
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap border border-slate-200/50 dark:border-slate-700/50">
              {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            </div>
          )}
        </button>
      </div>

      {/* Left Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border-r border-slate-200 dark:border-slate-800/50 transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center mb-8 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/20">
              <Navigation className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
              GigaCodeX
            </h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm"
                      : "text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 border border-slate-200 dark:border-slate-700/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
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
                  Welcome back!
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Ready to continue your learning journey?
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400 mr-2" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Last active: 2h ago
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Build/Update Roadmap */}
            <Link
              href="/dashboard/roadmap"
              className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                      Customizable
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  Build Your Roadmap
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Create or update your personalized learning path
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Ask AI */}
            <Link
              href="/dashboard/ask-guide"
              className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                      AI Powered
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  Ask AI Guide
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Get personalized guidance and answers
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Start Chat
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Find Resources */}
            <Link
              href="/dashboard/resources"
              className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                      Curated
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  Find Resources
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Discover learning materials and tools
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Browse Resources
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Get Help */}
            <Link
              href="/dashboard/help"
              className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                      24/7 Support
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  Get Help
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Find answers to your stuck questions
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Ask Question
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Community */}
            <Link
              href="/dashboard/community"
              className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  Community
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Connect with other learners
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Join Discussion
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Learning Streak</h3>
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold mb-2">5 Days</p>
              <p className="text-blue-100 text-sm">Keep it up!</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Topics Completed</h3>
                <Target className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold mb-2">12</p>
              <p className="text-purple-100 text-sm">Making progress!</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Time Spent</h3>
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold mb-2">24h</p>
              <p className="text-green-100 text-sm">This week</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
