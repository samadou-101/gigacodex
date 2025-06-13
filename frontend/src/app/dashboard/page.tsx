"use client";
import {
  BookOpen,
  Map,
  Users,
  Brain,
  ArrowRight,
  Bookmark,
  MessageSquare,
  TrendingUp,
  Search,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome back!
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Your self-learning journey continues
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Blog & Articles */}
          <Link
            href="/dashboard/blog"
            className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                Learning Blog
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Discover curated articles and learning resources
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                Read Articles
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          {/* AI Guide */}
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
                Get personalized guidance and answers to your questions
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                Start Chat
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          {/* Roadmap */}
          <Link
            href="/dashboard/roadmap"
            className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                    Customizable
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                Your Roadmap
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Update and customize your learning path
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                View Roadmap
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          {/* Resources */}
          <Link
            href="/dashboard/resources"
            className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Bookmark className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full">
                    Organized
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                Learning Resources
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Organize and manage your learning materials
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                Manage Resources
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          {/* Community */}
          <Link
            href="/dashboard/community"
            className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                Community
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Connect with other self-taught developers
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                Join Discussion
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          {/* Search */}
          <Link
            href="/dashboard/search"
            className="group relative bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">
                    Quick Access
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                Search Everything
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Find articles, resources, and community posts
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                Start Searching
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Access Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Articles */}
          <div className="bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Recent Articles
              </h3>
              <Link
                href="/dashboard/blog"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-medium text-slate-800 dark:text-white mb-1">
                  Understanding React Hooks
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  A comprehensive guide to React Hooks and their use cases
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-medium text-slate-800 dark:text-white mb-1">
                  TypeScript Best Practices
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Learn how to write better TypeScript code
                </p>
              </div>
            </div>
          </div>

          {/* Community Activity */}
          <div className="bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Community Activity
              </h3>
              <Link
                href="/dashboard/community"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-slate-800 dark:text-white">
                    New Discussion
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  &ldquo;Best practices for learning web development&rdquo;
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-slate-800 dark:text-white">
                    Trending Topic
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  &ldquo;Career transition into tech&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
