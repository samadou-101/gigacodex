"use client";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem("gigacodex-sidebar");
    if (savedState) {
      setIsSidebarOpen(JSON.parse(savedState));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      <Sidebar onStateChange={setIsSidebarOpen} />
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        } p-6`}
      >
        {children}
      </main>
    </div>
  );
}
