"use client";
import { useState } from "react";
import {
  Search,
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  Clock,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data for demonstration
  const categories = [
    { id: "all", name: "All Discussions" },
    { id: "help", name: "Help & Support" },
    { id: "showcase", name: "Project Showcase" },
    { id: "resources", name: "Resource Sharing" },
    { id: "general", name: "General Discussion" },
  ];

  const discussions = [
    {
      id: 1,
      title: "Need help with React hooks",
      content: "I'm trying to understand useEffect and useState...",
      category: "help",
      author: {
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
        role: "Learner",
      },
      stats: {
        replies: 5,
        likes: 12,
        views: 45,
      },
      tags: ["react", "javascript", "help"],
      timestamp: "2 hours ago",
      isBookmarked: true,
    },
    {
      id: 2,
      title: "My first React project",
      content: "Just completed my first React project using hooks...",
      category: "showcase",
      author: {
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
        role: "Developer",
      },
      stats: {
        replies: 8,
        likes: 24,
        views: 89,
      },
      tags: ["react", "project", "showcase"],
      timestamp: "5 hours ago",
      isBookmarked: false,
    },
    {
      id: 3,
      title: "Great JavaScript resources",
      content: "Here are some amazing resources I found...",
      category: "resources",
      author: {
        name: "Mike Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
        role: "Mentor",
      },
      stats: {
        replies: 3,
        likes: 15,
        views: 67,
      },
      tags: ["javascript", "resources", "learning"],
      timestamp: "1 day ago",
      isBookmarked: true,
    },
  ];

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Community
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Connect with other learners and share knowledge
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
                placeholder="Search discussions..."
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

        {/* Discussions List */}
        <div className="space-y-6">
          {filteredDiscussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={discussion.author.avatar}
                    alt={discussion.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {discussion.author.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {discussion.author.role}
                    </p>
                  </div>
                </div>
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    discussion.isBookmarked
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      discussion.isBookmarked ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {discussion.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {discussion.content}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <MessageSquare className="w-5 h-5" />
                    <span>{discussion.stats.replies}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <ThumbsUp className="w-5 h-5" />
                    <span>{discussion.stats.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{discussion.timestamp}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {discussion.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
