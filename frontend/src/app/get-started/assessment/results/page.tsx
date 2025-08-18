"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Brain,
  Code2,
  Target,
  Sparkles,
  Clock,
  AlertCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  AssessmentService,
  AssessmentResultData,
} from "@/features/assessment/services";
import ResultCard from "@/features/assessment/components/result/ResultCard";
import Insights from "@/features/assessment/components/result/Insights";
import RoadmapList from "@/features/assessment/components/result/RoadmapList";
import CTA from "@/features/assessment/components/result/CTA";

export default function AssessmentResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [directResults, setDirectResults] =
    useState<AssessmentResultData | null>(null);

  // Get assessment ID from sessionStorage and check for direct results
  useEffect(() => {
    const currentAssessmentId = sessionStorage.getItem("currentAssessmentId");
    if (currentAssessmentId) {
      setAssessmentId(currentAssessmentId);
    } else {
      const assessmentIdFromParams = searchParams.get("assessmentId");
      if (assessmentIdFromParams) {
        setAssessmentId(assessmentIdFromParams);
      }
    }

    // Check if we have direct results from the submission
    const directResultsData = localStorage.getItem("assessmentResults");
    if (directResultsData) {
      try {
        const parsed = JSON.parse(directResultsData);
        setDirectResults(parsed);
        // Don't clear session storage immediately - keep it for potential refresh
      } catch (error) {
        console.error("Error parsing direct results:", error);
      }
    }
  }, [searchParams]);

  // Fetch assessment results using TanStack Query
  const {
    data: fetchedResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assessmentResults", assessmentId],
    queryFn: async () => {
      if (!assessmentId) {
        throw new Error("No assessment ID found");
      }
      const response = await AssessmentService.getAssessmentResults(
        assessmentId
      );
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch assessment results");
      }
      return response.data;
    },
    enabled: !!assessmentId && !directResults,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Use direct results if available, otherwise use fetched results
  const results = directResults || fetchedResults;

  // Extract the actual data from the response structure
  // The backend returns {success: true, data: {...}}, but direct results might be just the data
  const assessmentData =
    results && typeof results === "object" && "data" in results
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (results as any).data
      : (results as AssessmentResultData);

  // Debug: Log the results data
  useEffect(() => {
    if (results) {
      console.log("Assessment Results Data:", results);
      console.log("Extracted Assessment Data:", assessmentData);
      console.log("Skill Level:", assessmentData?.skillLevel);
      console.log("Learning Style:", assessmentData?.learningStyle);
      console.log("Insights:", assessmentData?.insights);
      console.log("Roadmap:", assessmentData?.roadmap);
    }
  }, [results, assessmentData]);

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  const handleRetakeAssessment = () => {
    router.push("/get-started/assessment");
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <div className="text-center">
            <div className="w-32 h-32 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Assessment Results Not Found
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              {error.message ||
                "No assessment results found. Please complete the assessment first."}
            </p>
            <div className="space-y-4">
              <button
                onClick={handleRetakeAssessment}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-300 mr-4"
              >
                Take Assessment Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors duration-300"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while results are being loaded
  if (isLoading || !results) {
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
            {!assessmentId && (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                No assessment ID found. Please complete the assessment first.
              </p>
            )}
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
          <ResultCard
            title="Current Skill Level"
            icon={<Code2 className="h-6 w-6 text-white" />}
            iconBg="from-blue-500 to-cyan-500"
            skillLevel={assessmentData?.skillLevel}
            notes={assessmentData?.preferredLanguages || ["programming"]}
          />

          <ResultCard
            title="Learning Style"
            icon={<Brain className="h-6 w-6 text-white" />}
            iconBg="from-purple-500 to-pink-500"
            skillLevel={assessmentData?.learningStyle}
            notes={[
              "Hands-on approach preferred",
              "Learn by building real projects",
            ]}
          />

          <ResultCard
            title="Time Commitment"
            icon={<Clock className="h-6 w-6 text-white" />}
            iconBg="from-green-500 to-emerald-500"
            skillLevel={assessmentData?.timeCommitment}
            notes={["Consistent weekly schedule", "Good for steady progress"]}
          />

          <ResultCard
            title="Goal Clarity"
            icon={<Target className="h-6 w-6 text-white" />}
            iconBg="from-orange-500 to-red-500"
            skillLevel={assessmentData?.goalClarity}
            notes={["Clear career direction", "Specific learning objectives"]}
          />
        </div>

        {/* Personalized Insights */}
        <Insights insights={assessmentData?.insights} />

        {/* Learning Roadmap */}
        <RoadmapList steps={assessmentData?.roadmap} />
        {/* CTA Button */}
        <CTA handleDashboardClick={handleDashboardClick} />
      </div>
    </div>
  );
}
