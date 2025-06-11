"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-20 left-4 right-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl z-50">
          <div className="space-y-3">
            {["Features", "How It Works", "Community", "Get Started"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-xl transition-all duration-300 font-medium"
                >
                  {item}
                </a>
              )
            )}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mt-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105">
                Find Your Path Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
