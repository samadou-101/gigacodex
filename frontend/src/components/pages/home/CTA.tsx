import { Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-[slide_20s_linear_infinite]"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-2000"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl text-center relative">
        <div className="mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-semibold text-sm mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Find Your Direction?
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Transform Confusion
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent">
              Into Confidence
            </span>
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who&apos;ve transformed confusion into
            confidence and scattered learning into strategic growth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button className="group relative px-10 py-5 bg-white text-blue-600 hover:text-blue-700 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Link
              href={"/get-started"}
              className="relative flex items-center justify-center"
            >
              Start Your Journey
              <ArrowUpRight className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </button>
        </div>

        <div className="text-center text-white/70 text-sm">
          <p>✓ Personalized Learning Path ✓ Expert Guidance ✓ Real Progress</p>
        </div>
      </div>
    </section>
  );
}
