"use client";
import { Map, Brain, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Dashboard() {
  // Mock progress value for demonstration
  const progress = 45;

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back!
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Your self-learning journey continues
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Roadmap Progress
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {progress}%
            </span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Action Button */}
        <div className="mb-10 flex justify-center">
          <Link
            href="/dashboard/roadmap"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
          >
            Continue Roadmap
          </Link>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {/* Roadmap */}
          <Link
            href="/dashboard/roadmap"
            className="group bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Map className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-lg font-semibold text-slate-800 dark:text-white">
                Roadmap
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              View and update your learning path
            </p>
          </Link>

          {/* AI Guide */}
          <Link
            href="/dashboard/ask-guide"
            className="group bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-lg font-semibold text-slate-800 dark:text-white">
                AI Guide
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get personalized guidance and answers
            </p>
          </Link>

          {/* Blog */}
          <Link
            href="/dashboard/blog"
            className="group bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-lg font-semibold text-slate-800 dark:text-white">
                Blog
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Read curated articles and resources
            </p>
          </Link>

          {/* Community */}
          <Link
            href="/dashboard/community"
            className="group bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20 overflow-hidden"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-lg font-semibold text-slate-800 dark:text-white">
                Community
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Connect with other developers
            </p>
          </Link>
        </div>

        {/* Motivational Tip */}
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-100 via-blue-50 to-purple-100 dark:from-blue-900/30 dark:via-blue-950/30 dark:to-purple-900/30 rounded-full text-blue-700 dark:text-blue-200 text-sm font-medium shadow-sm">
            💡 Learning is a journey, not a race.
          </div>
        </div>
      </div>
    </div>
  );
}
