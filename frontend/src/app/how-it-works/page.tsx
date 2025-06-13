import { Brain, Compass, Route, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 pt-32 pb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-950/50 rounded-full text-blue-700 dark:text-blue-400 font-semibold text-sm mb-6">
            <Route className="w-4 h-4 mr-2" />
            Our Learning Philosophy
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              GigaCodeX
            </span>{" "}
            Works
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover how our AI-powered platform guides you through your coding
            journey, helping you escape tutorial hell and build real confidence
            in your skills.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Compass,
              title: "Assessment & Direction",
              description:
                "We start by understanding your current skill level, goals, and learning style to create a personalized learning compass.",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Route,
              title: "Custom Learning Path",
              description:
                "Based on your profile, we craft a structured learning journey that combines the best resources and practical projects.",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Brain,
              title: "Active Learning Support",
              description:
                "Our AI companion provides real-time guidance, answers questions, and helps you build strong mental models.",
              color: "from-green-500 to-emerald-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="relative group p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              ></div>
              <div className="relative">
                <div
                  className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-3xl p-12 border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              What You&apos;ll Gain
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Transform your learning experience and achieve real progress in
              your coding journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Clear Direction",
                description:
                  "No more confusion about what to learn next or which resources to trust.",
              },
              {
                title: "Practical Skills",
                description:
                  "Build real-world projects that demonstrate your abilities to employers.",
              },
              {
                title: "Confidence Growth",
                description:
                  "Develop true understanding instead of just copying and pasting code.",
              },
              {
                title: "Efficient Learning",
                description:
                  "Save time by focusing on what matters most for your specific goals.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Link
            href="/get-started"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-2xl font-semibold text-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 overflow-hidden"
          >
            <div className="relative flex items-center">
              Start Your Journey
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
