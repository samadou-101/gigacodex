"use client";
import {
  BookOpen,
  Map,
  Users,
  Target,
  Brain,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
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
              <ThemeToggle />
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
    </div>
  );
}
