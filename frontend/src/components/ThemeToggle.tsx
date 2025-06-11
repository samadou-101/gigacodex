"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
    >
      <Sun className="h-5 w-5 text-yellow-500 dark:hidden" />
      <Moon className="h-5 w-5 text-slate-600 hidden dark:block" />
    </button>
  );
}
