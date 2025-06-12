"use client";
import { useState } from "react";
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Wrench,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data for demonstration
  const categories = [
    { id: "all", name: "All Resources" },
    { id: "tutorials", name: "Tutorials" },
    { id: "documentation", name: "Documentation" },
    { id: "videos", name: "Video Courses" },
    { id: "tools", name: "Tools & References" },
  ];

  const resources = [
    {
      id: 1,
      title: "React Documentation",
      description: "Official React documentation and guides",
      category: "documentation",
      type: "documentation",
      url: "https://reactjs.org",
      icon: FileText,
      isBookmarked: true,
    },
    {
      id: 2,
      title: "JavaScript.info",
      description: "Modern JavaScript tutorial",
      category: "tutorials",
      type: "tutorial",
      url: "https://javascript.info",
      icon: BookOpen,
      isBookmarked: false,
    },
    {
      id: 3,
      title: "Frontend Masters",
      description: "Advanced JavaScript courses",
      category: "videos",
      type: "video",
      url: "https://frontendmasters.com",
      icon: Video,
      isBookmarked: true,
    },
    {
      id: 4,
      title: "VS Code",
      description: "Popular code editor with great extensions",
      category: "tools",
      type: "tool",
      url: "https://code.visualstudio.com",
      icon: Wrench,
      isBookmarked: false,
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Learning Resources
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Curated collection of learning materials and references
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    resource.isBookmarked
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      resource.isBookmarked ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {resource.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {resource.description}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Visit Resource
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
