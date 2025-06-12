"use client";
import {
  Trophy,
  Clock,
  Target,
  CheckCircle2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Progress() {
  // Mock data for demonstration
  const progressData = {
    overallProgress: 65,
    learningStreak: 7,
    totalHours: 42,
    completedTopics: 12,
    recentAchievements: [
      {
        title: "JavaScript Fundamentals",
        description: "Completed all basic JavaScript concepts",
        date: "2 days ago",
      },
      {
        title: "React Basics",
        description: "Finished React components and hooks",
        date: "5 days ago",
      },
      {
        title: "First Project",
        description: "Built and deployed your first web app",
        date: "1 week ago",
      },
    ],
    recentActivity: [
      {
        title: "Advanced React Patterns",
        duration: "2 hours",
        date: "Today",
        status: "in-progress",
      },
      {
        title: "State Management",
        duration: "1.5 hours",
        date: "Yesterday",
        status: "completed",
      },
      {
        title: "API Integration",
        duration: "3 hours",
        date: "2 days ago",
        status: "completed",
      },
    ],
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Your Progress
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Track your learning journey and achievements
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {progressData.overallProgress}%
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Overall Progress
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your learning journey progress
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {progressData.learningStreak}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Learning Streak
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Days of consistent learning
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {progressData.totalHours}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Total Hours
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Time spent learning
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {progressData.completedTopics}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Topics Completed
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Learning milestones achieved
            </p>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Recent Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {progressData.recentAchievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {achievement.description}
                </p>
                <div className="flex items-center text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {progressData.recentActivity.map((activity, index) => (
              <div
                key={index}
                className={`p-6 ${
                  index !== progressData.recentActivity.length - 1
                    ? "border-b border-slate-200 dark:border-slate-700"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                      {activity.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.duration}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {activity.date}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activity.status === "completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {activity.status === "completed"
                      ? "Completed"
                      : "In Progress"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
