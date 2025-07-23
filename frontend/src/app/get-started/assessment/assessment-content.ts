import {
  Code2,
  Brain,
  Puzzle,
  Target,
  Clock,
  Sparkles,
  LucideIcon,
  BookOpen,
  Rocket,
} from "lucide-react";
type Question = {
  id: number;
  section: string;
  question: string;
  options: string[];
  type: "single" | "multiple";
  icon: LucideIcon;
};
export const questions: Question[] = [
  // SECTION: Coding Skill Level
  {
    id: 1,
    section: "Coding Skill Level",
    question: "What can you confidently do in programming?",
    options: [
      "Write a basic 'Hello World' program",
      "Build simple projects (e.g., calculator, to-do list)",
      "Use APIs, libraries, or frameworks",
      "Build full apps with both frontend and backend",
      "I'm not sure yet",
    ],
    type: "single",
    icon: Code2,
  },
  {
    id: 2,
    section: "Coding Skill Level",
    question: "Which programming languages have you used or learned?",
    options: ["HTML / CSS", "JavaScript", "Python", "Java / C++", "None yet"],
    type: "multiple",
    icon: Code2,
  },

  // SECTION: Computer Science Concepts
  {
    id: 3,
    section: "Computer Science Understanding",
    question: "How would you describe your understanding of core CS concepts?",
    options: [
      "I’m not familiar with computer science concepts",
      "I’ve used programming basics (variables, loops, functions)",
      "I know data structures and algorithms",
      "I’ve studied systems (OS, memory, networking)",
      "I'm confident in computer science theory",
    ],
    type: "single",
    icon: Brain,
  },
  {
    id: 4,
    section: "Computer Science Understanding",
    question: "Which of these have you heard of or learned?",
    options: [
      "Arrays, Linked Lists",
      "Big O Notation",
      "Recursion",
      "HTTP / TCP / DNS",
      "Virtual Memory, Threads",
      "None of these",
    ],
    type: "multiple",
    icon: Brain,
  },

  // SECTION: Problem-Solving and Tools
  {
    id: 5,
    section: "Problem-Solving",
    question: "Have you practiced coding problems or challenges?",
    options: [
      "Not yet",
      "Solved a few beginner-level problems",
      "I solve problems regularly",
      "I’ve done timed or competitive challenges",
    ],
    type: "single",
    icon: Puzzle,
  },
  {
    id: 6,
    section: "Development Tools",
    question: "Which of these tools have you used before?",
    options: [
      "Code editors (VS Code, Sublime, etc.)",
      "Git / GitHub",
      "Browser DevTools",
      "Terminal / Command Line",
      "None of these",
    ],
    type: "multiple",
    icon: Puzzle,
  },

  // SECTION: Learning Habits & Goals
  {
    id: 7,
    section: "Time Commitment",
    question: "How much time can you dedicate to learning each week?",
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
    section: "Main Goal",
    question: "What’s your main goal right now?",
    options: [
      "Get my first job",
      "Start freelancing",
      "Learn by building real projects",
      "Just exploring / not sure yet",
    ],
    type: "single",
    icon: Target,
  },
  {
    id: 9,
    section: "Confidence Check",
    question: "On a scale of 1–5, how confident are you in your coding skills?",
    options: [
      "I'm just getting started",
      "I know a few basics",
      "I can build simple projects",
      "I can build full apps with some help",
      "I’m confident and self-directed",
    ],
    type: "single",
    icon: Sparkles,
  },

  // SECTION: Interests & Style (Optional but Valuable)
  {
    id: 10,
    section: "Tech Interests",
    question: "What areas are you most interested in exploring?",
    options: [
      "Web Development",
      "Mobile Apps",
      "Game Development",
      "Data Science / AI",
      "Not sure yet",
    ],
    type: "multiple",
    icon: Rocket,
  },
  {
    id: 11,
    section: "Learning Style",
    question: "Which learning methods work best for you?",
    options: [
      "Watching video tutorials",
      "Reading articles or books",
      "Building real-world projects",
      "Getting help when I’m stuck",
      "A mix of all",
    ],
    type: "multiple",
    icon: BookOpen,
  },
];
