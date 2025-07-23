import {
  Route,
  Brain,
  MapPin,
  BookOpen,
  Award,
  CheckCircle,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-blue-950/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-950/50 rounded-full text-blue-700 dark:text-blue-400 font-semibold text-sm mb-6">
            <Route className="w-4 h-4 mr-2" />
            Your Journey to Clarity
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A clear path from confusion to confidence, designed to help you make
            informed decisions about your learning journey.
          </p>
        </div>

        <div className="relative">
          {/* Modern Connection Design */}
          <div className="absolute inset-0 hidden lg:block">
            {/* Vertical Gradient Line */}
            <div className="absolute h-full left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-blue-500/0 via-blue-600/50 to-blue-700/0"></div>

            {/* Horizontal Connectors */}
            {[0, 1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="absolute left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"
                style={{
                  top: `${index * 384 + 40}px`,
                }}
              >
                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-600/20 to-blue-700/0 blur-sm"></div>
              </div>
            ))}
          </div>

          <div className="space-y-24 relative z-30">
            {[
              {
                title: "Declare Your Position",
                description:
                  "Tell us where you are now—beginner, self-taught, or experienced but confused. We meet you exactly where you are.",
                features: [
                  "Current skill assessment",
                  "Learning style analysis",
                  "Goal alignment",
                ],
                position: "left",
              },
              {
                title: "Guided Exploration",
                description:
                  "Interactive articles and concept explainers help you understand what computer science and software development really are.",
                features: [
                  "Interactive content",
                  "Concept explainers",
                  "Real-world context",
                ],
                position: "right",
              },
              {
                title: "Build Your Compass",
                description:
                  "Develop the mental models and decision-making frameworks that will guide you through any technical challenge.",
                features: [
                  "Mental models",
                  "Decision frameworks",
                  "Critical thinking",
                ],
                position: "left",
              },
              {
                title: "Choose Your Path",
                description:
                  "With clarity and confidence, make informed decisions about what to learn next based on your goals and context.",
                features: [
                  "Personalized roadmap",
                  "Clear next steps",
                  "Goal alignment",
                ],
                position: "right",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-start gap-16 relative ${
                  step.position === "right" ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 lg:max-w-lg relative z-10">
                  <div className="relative">
                    {/* Step Indicator */}
                    <div className="absolute -top-3 -left-3 flex items-center gap-2 group">
                      {/* Glowing Background */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>

                      {/* Main Dot */}
                      <div className="relative w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all duration-500">
                        {/* Animated Rings */}
                        <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
                        <div className="absolute inset-1 border-2 border-white/20 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>

                        {/* Center Dot */}
                        <div className="w-2.5 h-2.5 bg-white rounded-full shadow-inner"></div>
                      </div>

                      {/* Connecting Line */}
                      <div className="relative h-px w-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent blur-sm"></div>
                      </div>
                    </div>

                    <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                      <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="space-y-3">
                        {step.features.map((feature, fIndex) => (
                          <div
                            key={fIndex}
                            className="flex items-center text-slate-700 dark:text-slate-300"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 lg:max-w-lg relative z-10 hidden lg:block">
                  <div className="relative h-80 bg-gradient-to-br from-slate-100/90 via-white/90 to-blue-50/70 dark:from-slate-800/90 dark:via-slate-900/90 dark:to-blue-950/70 backdrop-blur-sm rounded-3xl p-12 flex items-center justify-center shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                    <div
                      className={`w-32 h-32 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 rounded-full flex items-center justify-center shadow-2xl animate-pulse`}
                    >
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${
                          index === 0
                            ? "from-blue-500 to-cyan-500"
                            : index === 1
                            ? "from-indigo-500 to-blue-500"
                            : index === 2
                            ? "from-purple-500 to-indigo-500"
                            : "from-pink-500 to-purple-500"
                        } rounded-full flex items-center justify-center`}
                      >
                        {index === 0 && (
                          <Brain className="h-10 w-10 text-white" />
                        )}
                        {index === 1 && (
                          <MapPin className="h-10 w-10 text-white" />
                        )}
                        {index === 2 && (
                          <BookOpen className="h-10 w-10 text-white" />
                        )}
                        {index === 3 && (
                          <Award className="h-10 w-10 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
