import { Question } from "@/features/assessment/types";
import {
  Code2,
  Brain,
  Puzzle,
  Target,
  Clock,
  Sparkles,
  BookOpen,
  Rocket,
} from "lucide-react";

export const questions: Question[] = [
  // SECTION: Coding Skill Level
  {
    id: "codingConfidence",
    section: "Coding Skill Level",
    question: "What can you confidently do in programming?",
    options: [
      "hello_world",
      "simple_projects",
      "use_apis",
      "full_apps",
      "not_sure",
    ],
    type: "single",
    icon: Code2,
  },
  {
    id: "programmingLanguages",
    section: "Coding Skill Level",
    question: "Which programming languages have you used or learned?",
    options: ["html_css", "javascript", "python", "java_cpp", "none"],
    type: "multiple",
    icon: Code2,
  },

  // SECTION: Computer Science Concepts
  {
    id: "csUnderstanding",
    section: "Computer Science Understanding",
    question: "How would you describe your understanding of core CS concepts?",
    options: [
      "not_familiar",
      "basics",
      "ds_algo",
      "systems",
      "theory_confident",
    ],
    type: "single",
    icon: Brain,
  },
  {
    id: "csTopics",
    section: "Computer Science Understanding",
    question: "Which of these have you heard of or learned?",
    options: [
      "arrays_lists",
      "big_o",
      "recursion",
      "http_tcp_dns",
      "memory_threads",
      "none",
    ],
    type: "multiple",
    icon: Brain,
  },

  // SECTION: Problem-Solving and Tools
  {
    id: "problemSolving",
    section: "Problem-Solving",
    question: "Have you practiced coding problems or challenges?",
    options: ["not_yet", "few_problems", "regular", "timed_challenges"],
    type: "single",
    icon: Puzzle,
  },
  {
    id: "tools",
    section: "Development Tools",
    question: "Which of these tools have you used before?",
    options: ["editors", "git", "browser_devtools", "terminal", "none"],
    type: "multiple",
    icon: Puzzle,
  },

  // SECTION: Learning Habits & Goals
  {
    id: "weeklyCommitment",
    section: "Time Commitment",
    question: "How much time can you dedicate to learning each week?",
    options: ["lt3", "3_5", "6_10", "gt10"],
    type: "single",
    icon: Clock,
  },
  {
    id: "mainGoal",
    section: "Main Goal",
    question: "What's your main goal right now?",
    options: ["get_job", "freelance", "projects", "exploring"],
    type: "single",
    icon: Target,
  },
  {
    id: "confidence",
    section: "Confidence Check",
    question: "On a scale of 1–5, how confident are you in your coding skills?",
    options: [
      "getting_started",
      "few_basics",
      "simple_projects",
      "full_apps_help",
      "confident",
    ],
    type: "single",
    icon: Sparkles,
  },

  // SECTION: Interests & Style (Optional but Valuable)
  {
    id: "interests",
    section: "Tech Interests",
    question: "What areas are you most interested in exploring?",
    options: ["web", "mobile", "game", "data_ai", "not_sure"],
    type: "multiple",
    icon: Rocket,
  },
  {
    id: "learningStyle",
    section: "Learning Style",
    question: "Which learning methods work best for you?",
    options: ["video", "reading", "projects", "help_when_stuck", "mix"],
    type: "multiple",
    icon: BookOpen,
  },
];
