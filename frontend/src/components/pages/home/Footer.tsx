import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 border-t border-slate-200 dark:border-slate-800 py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-900/5 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Compass className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  GigaCodeX
                </span>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Learning Companion
                </div>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-md">
              Empowering developers worldwide with AI-powered learning
              experiences that transform confusion into confidence.
            </p>
            <div className="flex space-x-4">
              {["twitter", "github", "linkedin", "discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-slate-200 dark:bg-slate-800 hover:bg-blue-500 dark:hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <div className="w-5 h-5 bg-slate-600 dark:bg-slate-400 group-hover:bg-white rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Platform",
              links: [
                "Features",
                "Pricing",
                "Learning Paths",
                "AI Tutor",
                "Progress Tracking",
              ],
            },
            {
              title: "Resources",
              links: [
                "Documentation",
                "Blog",
                "Case Studies",
                "Webinars",
                "Help Center",
              ],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Press", "Partners", "Contact"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 GigaCodeX. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
