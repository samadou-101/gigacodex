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
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Your Learning Path
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Track and manage your learning journey
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAddingTopic(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Topic
            </button>
            <ThemeToggle />
          </div>
        </div>

        <div className="space-y-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <button
                onClick={() =>
                  setSelectedModule(
                    selectedModule === module.id ? null : module.id
                  )
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {module.title}
                </h3>
                {selectedModule === module.id ? (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {selectedModule === module.id && (
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="space-y-3">
                    {module.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {topic.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : topic.status === "in-progress" ? (
                            <Clock className="w-5 h-5 text-blue-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400" />
                          )}
                          <span className="text-slate-900 dark:text-white">
                            {topic.title}
                          </span>
                        </div>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            topic.status === "completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : topic.status === "in-progress"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400"
                          }`}
                        >
                          {topic.status === "completed"
                            ? "Completed"
                            : topic.status === "in-progress"
                            ? "In Progress"
                            : "Not Started"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
