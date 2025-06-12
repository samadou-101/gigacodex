"use client";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Brain,
  Puzzle,
  Target,
  Clock,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

type Question = {
  id: number;
  section: string;
  question: string;
  options: string[];
  type: "single" | "multiple";
  icon: LucideIcon;
};

const questions: Question[] = [
  {
    id: 1,
    section: "Coding Skill Level",
    question: "Which of these can you do confidently?",
    options: [
      "I can write a basic 'Hello World' program",
      "I can build a simple project (like a to-do list or calculator)",
      "I can use APIs, libraries, and frameworks",
      "I can build full apps with frontend and backend",
      "I'm not sure",
    ],
    type: "single",
    icon: Code2,
  },
  {
    id: 2,
    section: "Coding Skill Level",
    question: "Which language(s) have you tried or learned?",
    options: ["HTML / CSS", "JavaScript", "Python", "Java / C++", "None yet"],
    type: "multiple",
    icon: Code2,
  },
  {
    id: 3,
    section: "Computer Science Understanding",
    question:
      "What best describes your understanding of computer science concepts?",
    options: [
      "I don't know what CS concepts are",
      "I've heard of variables, loops, functions",
      "I understand things like data structures and algorithms",
      "I've studied systems like OS, memory, or networking",
      "I'm very confident in CS theory",
    ],
    type: "single",
    icon: Brain,
  },
  {
    id: 4,
    section: "Computer Science Understanding",
    question: "Have you heard of any of these concepts?",
    options: [
      "Arrays, Linked Lists",
      "Big O notation",
      "Recursion",
      "HTTP / TCP / DNS",
      "Virtual Memory, Threads",
    ],
    type: "multiple",
    icon: Brain,
  },
  {
    id: 5,
    section: "Problem-Solving and Tools",
    question:
      "Have you solved programming problems (like on LeetCode or similar)?",
    options: [
      "Never",
      "A few beginner problems",
      "I solve problems regularly",
      "I've done timed challenges",
    ],
    type: "single",
    icon: Puzzle,
  },
  {
    id: 6,
    section: "Problem-Solving and Tools",
    question: "Which of these tools have you used?",
    options: [
      "Code editor (VS Code, Sublime, etc.)",
      "Git / GitHub",
      "Browser DevTools",
      "Terminal or Command Line",
      "None",
    ],
    type: "multiple",
    icon: Puzzle,
  },
  {
    id: 7,
    section: "Learning Habits & Goals",
    question: "How many hours per week can you dedicate to learning?",
    options: [
      "Less than 3 hours",
      "3–5 hours",
      "6–10 hours",
      "More than 10 hours",
    ],
    type: "single",
    icon: Clock,
  },
  {
    id: 8,
    section: "Learning Habits & Goals",
    question: "What is your main goal right now?",
    options: [
      "Get my first job",
      "Start freelancing",
      "Learn by building projects",
      "Just exploring / not sure yet",
    ],
    type: "single",
    icon: Target,
  },
  {
    id: 9,
    section: "Self-Confidence Check",
    question: "On a scale of 1–5, how confident are you in your coding skills?",
    options: [
      "1 – I'm just starting",
      "2 – I know some basics",
      "3 – I can build simple projects",
      "4 – I can build apps with some help",
      "5 – I'm confident and self-directed",
    ],
    type: "single",
    icon: Sparkles,
  },
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [additionalInput, setAdditionalInput] = useState("");
  const maxCharacters = 500;

  const handleOptionSelect = (option: string) => {
    if (questions[currentQuestion].type === "single") {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    }
  };

  const handleNext = () => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: selectedOptions,
    }));
    setSelectedOptions([]);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
    setSelectedOptions(answers[questions[currentQuestion - 1].id] || []);
  };

  const handleSubmit = () => {
    // Here you would typically send the answers to your backend
    console.log("Final answers:", answers);
    console.log("Additional input:", additionalInput);
    // Navigate to results page
    window.location.href = "/get-started/results";
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentSection = questions[currentQuestion].section;
  const CurrentIcon = questions[currentQuestion].icon;

  // If we're at the last question, show the additional input section
  if (currentQuestion === questions.length - 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        <div className="container mx-auto max-w-3xl px-6 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Final Step
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                100%
              </span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Additional Input Section */}
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-950/50 rounded-full text-purple-700 dark:text-purple-400 font-semibold text-sm mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Personal Touch
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Help Us Understand You Better
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Share any additional thoughts, goals, or challenges you&apos;re
              facing. This helps our AI create a more personalized learning path
              just for you.
            </p>

            <div className="relative">
              <textarea
                value={additionalInput}
                onChange={(e) =>
                  setAdditionalInput(e.target.value.slice(0, maxCharacters))
                }
                placeholder="Tell us about your learning goals, challenges, or anything else you'd like us to know..."
                className="w-full h-48 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 resize-none text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500"
              />
              <div className="absolute bottom-4 right-4 text-sm text-slate-500 dark:text-slate-400">
                {additionalInput.length}/{maxCharacters} characters
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    Pro Tip
                  </h3>
                  <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                    The more you share, the better we can tailor your learning
                    experience. Consider mentioning:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-blue-600 dark:text-blue-400">
                    <li>• Specific areas you want to focus on</li>
                    <li>• Previous learning experiences</li>
                    <li>• Time constraints or preferences</li>
                    <li>• Career goals or aspirations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-50 dark:opacity-20"></div>
              <div className="relative flex items-center">
                <CheckCircle2 className="mr-3 h-6 w-6" />
                Get Your Personalized Path
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
              </div>
            </button>
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

      <div className="container mx-auto max-w-3xl px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-950/50 rounded-full text-blue-700 dark:text-blue-400 font-semibold text-sm mb-4">
            <CurrentIcon className="w-4 h-4 mr-2" />
            {currentSection}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {questions[currentQuestion].question}
          </h1>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${
                selectedOptions.includes(option)
                  ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800"
                  : "bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedOptions.includes(option)
                      ? "border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {selectedOptions.includes(option) && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <span
                  className={`${
                    selectedOptions.includes(option)
                      ? "text-blue-900 dark:text-blue-100"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          {currentQuestion > 0 ? (
            <button
              onClick={handlePrevious}
              className="flex items-center px-6 py-3 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl font-semibold transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Previous
            </button>
          ) : (
            <div />
          )}

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={selectedOptions.length === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedOptions.length > 0
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-105 shadow-lg shadow-blue-500/25"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
              }`}
            >
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={selectedOptions.length === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedOptions.length > 0
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105 shadow-lg shadow-green-500/25"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
              }`}
            >
              Submit Assessment
              <CheckCircle2 className="ml-2 h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
