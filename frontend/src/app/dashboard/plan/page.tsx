"use client";

import { useState } from "react";
import { Plus, Calendar, Clock, X, Trash2 } from "lucide-react";

interface StudyPlan {
  id: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  progress: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "completed" | "upcoming";
}

export default function StudyPlanPage() {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([
    {
      id: 1,
      title: "Frontend Development",
      description: "Master modern web development",
      duration: "3 months",
      topics: ["HTML/CSS", "JavaScript", "React", "TypeScript"],
      progress: 65,
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-06-01"),
      status: "active",
    },
    {
      id: 2,
      title: "Backend Development",
      description: "Learn server-side programming",
      duration: "2 months",
      topics: ["Node.js", "Express", "MongoDB", "REST APIs"],
      progress: 30,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-08-01"),
      status: "upcoming",
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<StudyPlan>>({
    title: "",
    description: "",
    duration: "",
    topics: [],
    startDate: new Date(),
    endDate: new Date(),
    status: "upcoming",
  });

  const handleCreatePlan = () => {
    if (newPlan.title && newPlan.description && newPlan.duration) {
      setStudyPlans([
        ...studyPlans,
        {
          id: studyPlans.length + 1,
          title: newPlan.title,
          description: newPlan.description,
          duration: newPlan.duration,
          topics: newPlan.topics || [],
          progress: 0,
          startDate: newPlan.startDate || new Date(),
          endDate: newPlan.endDate || new Date(),
          status: "upcoming",
        },
      ]);
      setIsCreating(false);
      setNewPlan({
        title: "",
        description: "",
        duration: "",
        topics: [],
        startDate: new Date(),
        endDate: new Date(),
        status: "upcoming",
      });
    }
  };

  const handleDeletePlan = (id: number) => {
    setStudyPlans(studyPlans.filter((plan) => plan.id !== id));
  };

  const getStatusColor = (status: StudyPlan["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "upcoming":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Study Plans
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Create and manage your learning goals
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>New Plan</span>
        </button>
      </div>

      {/* Create Plan Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Create New Study Plan
              </h2>
              <button
                onClick={() => setIsCreating(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newPlan.title}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter plan title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newPlan.description}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, description: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter plan description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newPlan.duration}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, duration: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 3 months"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Topics (comma-separated)
                  </label>
                  <input
                    type="text"
                    // value={newPlan.topics?.join(", ")}
                    value={"test"}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        topics: e.target.value.split(",").map((t) => t.trim()),
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., HTML, CSS, JavaScript"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newPlan.startDate?.toISOString().split("T")[0]}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        startDate: new Date(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newPlan.endDate?.toISOString().split("T")[0]}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        endDate: new Date(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlan}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
                >
                  Create Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Study Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-purple-200 dark:hover:border-purple-800 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {plan.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {plan.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                    plan.status
                  )}`}
                >
                  {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                </span>
                <button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {plan.startDate.toLocaleDateString()} -{" "}
                    {plan.endDate.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{plan.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {plan.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-2">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
