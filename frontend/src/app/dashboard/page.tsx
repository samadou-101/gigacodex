"use client";
import {
  Sparkles,
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
  Navigation,
  Sun,
  Moon,
  Code2,
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
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Ask Your Guide",
                description: "Get instant guidance",
                icon: MessageSquare,
                color: "from-blue-500 via-blue-600 to-indigo-500",
                badge: "AI Ready",
              },
              {
                title: "Update Roadmap",
                description: "Adjust your path",
                icon: Compass,
                color: "from-purple-500 via-purple-600 to-pink-500",
                badge: "3 Updates",
              },
              {
                title: "Progress Check",
                description: "Review your journey",
                icon: BarChart,
                color: "from-green-500 via-emerald-500 to-teal-500",
                badge: "Weekly",
              },
              {
                title: "Find Resources",
                description: "Get recommendations",
                icon: BookOpen,
                color: "from-yellow-500 via-orange-500 to-red-500",
                badge: "Curated",
              },
            ].map((action) => (
              <div
                key={action.title}
                className="bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700/80 backdrop-blur-sm text-slate-700 dark:text-slate-400 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-600/50">
                    {action.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
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
              <div className="bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                    Current Learning Focus
                  </h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white rounded-xl font-medium transition-all duration-300 flex items-center shadow-lg shadow-blue-500/20 hover:scale-105">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Guidance
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm">
                    <div className="flex items-center mb-3">
                      <Code2 className="w-5 h-5 text-blue-700 dark:text-blue-400 mr-2" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                        Currently Learning
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                      React.js Fundamentals
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          On track
                        </span>
                      </div>
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                        Week 3 of 6
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
