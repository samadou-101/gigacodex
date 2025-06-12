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
    // Navigate to results page
    window.location.href = "/get-started/results";
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentSection = questions[currentQuestion].section;
  const CurrentIcon = questions[currentQuestion].icon;

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
