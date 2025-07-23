import {
  Navigation,
  Target,
  Brain,
  Users,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-blue-950/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-950/50 rounded-full text-blue-700 dark:text-blue-400 font-semibold text-sm mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Why GigaCodeX is Different
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Beyond Traditional Learning
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience a revolutionary approach to learning that focuses on
            understanding and navigation rather than just information
            consumption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Navigation,
              title: "Navigation, Not Information",
              description:
                "We don't flood you with more content. We help you navigate what already exists and make informed decisions about what to learn next.",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Target,
              title: "Escape Tutorial Hell",
              description:
                "Learn to think critically about your learning path. Build confidence in your decisions rather than endlessly consuming tutorials.",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Brain,
              title: "Mental Models Over Memorization",
              description:
                "Understand the 'why' behind computer science concepts. Build intuitive mental models that stick and guide your thinking.",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Users,
              title: "Context-Driven Learning",
              description:
                "Get personalized guidance based on your goals, current level, and where you want to go. No one-size-fits-all approach.",
              color: "from-orange-500 to-red-500",
            },
            {
              icon: TrendingUp,
              title: "Actionable Paths",
              description:
                "Every interaction leads to clear next steps. Know exactly what to do and why it matters for your specific journey.",
              color: "from-indigo-500 to-purple-500",
            },
            {
              icon: Shield,
              title: "Confidence Building",
              description:
                "Develop the decision-making skills that separate confident developers from those stuck in perpetual learning mode.",
              color: "from-teal-500 to-blue-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl border border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-slate-800/20"
            >
              <div className="relative">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
