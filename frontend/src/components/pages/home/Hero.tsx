import { Play, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 via-pink-400/5 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto text-center max-w-6xl relative">
        {/* Status Badge */}
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-green-500/20 rounded-full text-green-700 dark:text-green-400 text-sm font-semibold mb-8 hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          <Sparkles className="w-4 h-4 mr-2" />
          For Lost Developers • Find Your Direction
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
          <span className="text-slate-900 dark:text-white">
            STOP DROWNING IN
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent relative">
            TUTORIALS
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-blue-700/20 to-blue-800/20 blur-2xl -z-10 animate-pulse"></div>
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
          You&apos;re smart. You&apos;re motivated. But you&apos;re stuck in
          tutorial hell, jumping from course to course without real progress.
          GigaCodeX is your escape route—a learning compass that transforms
          confusion into confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            href="/get-started"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-2xl font-semibold text-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-50 dark:opacity-20"></div>
            <div className="relative flex items-center">
              <Play className="mr-3 h-6 w-6" />
              Find Your Path Now
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
            </div>
          </Link>

          <Link
            href="/how-it-works"
            className="group px-8 py-4 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center">
              See How It Works
              <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
