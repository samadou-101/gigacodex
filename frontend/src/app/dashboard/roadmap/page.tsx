/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Code2,
  Database,
  Globe,
  Layers,
  Lightbulb,
  Rocket,
  Server,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

type TopicStatus = "completed" | "in-progress" | "upcoming";

interface Topic {
  name: string;
  status: TopicStatus;
}

interface LearningPath {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  progress: number;
  topics: Topic[];
}

const learningPaths: LearningPath[] = [
  {
    title: "Frontend Development",
    description: "Master modern web development with React and Next.js",
    icon: Globe,
    color: "from-blue-500 to-indigo-500",
    badge: "Popular",
    progress: 65,
    topics: [
      { name: "HTML & CSS Fundamentals", status: "completed" },
      { name: "JavaScript Essentials", status: "completed" },
      { name: "React Basics", status: "in-progress" },
      { name: "Next.js & Server Components", status: "upcoming" },
      { name: "State Management", status: "upcoming" },
    ],
  },
  {
    title: "Backend Development",
    description: "Build robust server-side applications",
    icon: Server,
    color: "from-purple-500 to-pink-500",
    badge: "New",
    progress: 30,
    topics: [
      { name: "Node.js Fundamentals", status: "completed" },
      { name: "Express.js", status: "in-progress" },
      { name: "Database Design", status: "upcoming" },
      { name: "API Development", status: "upcoming" },
      { name: "Authentication", status: "upcoming" },
    ],
  },
  {
    title: "Full Stack Development",
    description: "Become a complete web developer",
    icon: Layers,
    color: "from-green-500 to-emerald-500",
    badge: "Advanced",
    progress: 15,
    topics: [
      { name: "System Design", status: "upcoming" },
      { name: "DevOps Basics", status: "upcoming" },
      { name: "Testing Strategies", status: "upcoming" },
      { name: "Performance Optimization", status: "upcoming" },
      { name: "Security Best Practices", status: "upcoming" },
    ],
  },
];

const statusColors: Record<TopicStatus, string> = {
  completed:
    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  "in-progress":
    "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  upcoming:
    "bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-400",
};

export default function Roadmap() {
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Mock data for demonstration
  const modules = [
    {
      id: "1",
      title: "Frontend Development",
      topics: [
        { id: "1-1", title: "HTML & CSS Basics", status: "completed" },
        { id: "1-2", title: "JavaScript Fundamentals", status: "in-progress" },
        { id: "1-3", title: "React.js", status: "not-started" },
      ],
    },
    {
      id: "2",
      title: "Backend Development",
      topics: [
        { id: "2-1", title: "Node.js Basics", status: "not-started" },
        { id: "2-2", title: "Express.js", status: "not-started" },
        { id: "2-3", title: "Database Design", status: "not-started" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Learning Roadmap
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Track your progress and plan your learning journey
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center space-x-2 transition-colors">
          <Sparkles className="w-4 h-4" />
          <span>Customize Path</span>
        </button>
      </div>

      {/* Learning Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {learningPaths.map((path, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Path Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center`}
                >
                  <path.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                  {path.badge}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {path.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {path.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Progress
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {path.progress}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Topics List */}
            <div className="border-t border-slate-200 dark:border-slate-700">
              {path.topics.map((topic, topicIndex) => (
                <div
                  key={topicIndex}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        statusColors[topic.status]
                      }`}
                    >
                      {topic.status === "completed" ? (
                        <Target className="w-4 h-4" />
                      ) : topic.status === "in-progress" ? (
                        <Zap className="w-4 h-4" />
                      ) : (
                        <Lightbulb className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {topic.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      statusColors[topic.status]
                    }`}
                  >
                    {topic.status === "completed"
                      ? "Completed"
                      : topic.status === "in-progress"
                      ? "In Progress"
                      : "Upcoming"}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <Link
                href={`/dashboard/roadmap/${path.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block w-full px-4 py-2 text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Streak</h3>
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold mb-2">7 Days</p>
          <p className="text-blue-100 text-sm">Keep up the good work!</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Topics Completed</h3>
            <Target className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold mb-2">24</p>
          <p className="text-purple-100 text-sm">Making great progress!</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Next Milestone</h3>
            <Rocket className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold mb-2">React Hooks</p>
          <p className="text-green-100 text-sm">2 topics away</p>
        </div>
      </div>
    </div>
  );
}
