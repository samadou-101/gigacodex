"use client";
import {
  Home,
  Map,
  MessageSquare,
  TrendingUp,
  BookOpen,
  Users,
  Menu,
  X,
  ChevronRight,
  PanelLeftClose,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleSidebar } from "@/store/sidebarSlice";

export function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: Home, href: "/dashboard" },
    { name: "Roadmap", icon: Map, href: "/dashboard/roadmap" },
    { name: "Ask Guide", icon: MessageSquare, href: "/dashboard/ask-guide" },
    { name: "Progress", icon: TrendingUp, href: "/dashboard/progress" },
    { name: "Resources", icon: BookOpen, href: "/dashboard/resources" },
    { name: "Community", icon: Users, href: "/dashboard/community" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 hover:scale-105 transition-all duration-300"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-slate-700 dark:text-slate-400" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700 dark:text-slate-400" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border-r border-slate-200 dark:border-slate-800/50 transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/20">
                <Map className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                GigaCodeX
              </h1>
            </div>
            {/* Desktop Toggle Button - ChatGPT Style */}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="hidden lg:flex items-center justify-center w-8 h-8 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300"
              title="Toggle Sidebar"
            >
              <PanelLeftClose className="w-5 h-5 text-slate-700 dark:text-slate-400" />
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm"
                      : "text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 border border-slate-200 dark:border-slate-700/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Show Sidebar Button when closed */}
      {!isSidebarOpen && (
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="fixed top-4 left-4 z-50 hidden lg:flex items-center justify-center w-8 h-8 bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 hover:scale-105 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-400" />
        </button>
      )}

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Main Content Wrapper */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      />
    </>
  );
}
