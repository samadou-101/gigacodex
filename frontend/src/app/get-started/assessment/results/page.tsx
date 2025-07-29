"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Brain,
  Code2,
  Compass,
  Target,
  Sparkles,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

// Get assessment results from localStorage or use mock data as fallback
const getAssessmentResults = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("assessmentResults");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing assessment results:", error);
      }
    }
  }

  // Fallback to mock results
  return {
    skillLevel: "Intermediate",
    learningStyle: "Project-Based",
    goalClarity: "Clear",
    timeCommitment: "6-10 hours/week",
    preferredLanguages: ["JavaScript", "Python"],
    interests: ["Backend Development", "Database Design"],
    confidenceLevel: 3,
    insights: [
      "You have a solid foundation in programming basics",
      "You're particularly interested in backend development",
      "You prefer learning through practical projects",
      "You have good problem-solving skills",
    ],
  };
};

export default function AssessmentResults() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState("Become a Backend Developer");
  const [results, setResults] = useState<{
    skillLevel: string;
    learningStyle: string;
    goalClarity: string;
    timeCommitment: string;
    preferredLanguages: string[];
    interests: string[];
    confidenceLevel: number;
    insights: string[];
  } | null>(null);

  // Use useEffect to update results after hydration
  useEffect(() => {
    setResults(getAssessmentResults());
  }, []);

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  // Show loading state while results are being loaded
  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Loading your results...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-green-500/20 rounded-full text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <Sparkles className="w-4 h-4 mr-2" />
            Assessment Complete
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
            Your Learning
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent relative">
              {" "}
              Path Awaits
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            We&apos;ve analyzed your responses and created a personalized
            roadmap
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Skill Level Card */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Current Skill Level
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {results.skillLevel}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                <span>Strong in {results.preferredLanguages?.join(", ")}</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                <span>Ready for advanced concepts</span>
              </div>
            </div>
          </div>

          {/* Learning Style Card */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Learning Style
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium">
                  {results.learningStyle}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                <span>Hands-on approach preferred</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                <span>Learn by building real projects</span>
              </div>
            </div>
          </div>

          {/* Time Commitment Card */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Time Commitment
                </h3>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  {results.timeCommitment}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                <span>Consistent weekly schedule</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                <span>Good for steady progress</span>
              </div>
            </div>
          </div>

          {/* Goal Clarity Card */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Goal Clarity
                </h3>
                <p className="text-orange-600 dark:text-orange-400 font-medium">
                  {results.goalClarity}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                <span>Clear career direction</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                <span>Specific learning objectives</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Insights */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Personalized Insights
            </h2>
          </div>
          <div className="space-y-4">
            {results.insights?.map((insight: string, index: number) => (
              <div
                key={index}
                className="flex items-start p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-700 dark:text-slate-300">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Goal Confirmation */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Your Learning Goal
              </h2>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedGoal}
              onChange={(e) => setEditedGoal(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-white/60 dark:bg-slate-800/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 text-slate-700 dark:text-slate-300"
            />
          ) : (
            <p className="text-xl text-slate-700 dark:text-slate-300">
              {editedGoal}
            </p>
          )}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleDashboardClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-50 dark:opacity-20"></div>
            <div className="relative flex items-center">
              <Zap className="mr-3 h-6 w-6" />
              Go to My Dashboard
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
