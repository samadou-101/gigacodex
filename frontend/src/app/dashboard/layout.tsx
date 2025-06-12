import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      <Sidebar />
      <main className="lg:ml-64 p-6">{children}</main>
    </div>
  );
}
