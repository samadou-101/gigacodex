"use client";

import { useState } from "react";
import {
  Search,
  BookOpen,
  Clock,
  User,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageSquare,
  Code2,
  Database,
  Globe,
  Layers,
  Lightbulb,
  Rocket,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  image: string;
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "All", icon: BookOpen },
    { name: "Programming", icon: Code2 },
    { name: "Database", icon: Database },
    { name: "Web Development", icon: Globe },
    { name: "System Design", icon: Layers },
    { name: "Best Practices", icon: Lightbulb },
    { name: "Career Growth", icon: Rocket },
    { name: "Backend", icon: Server },
    { name: "Frontend", icon: Sparkles },
    { name: "Performance", icon: Zap },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding React Hooks: A Comprehensive Guide",
      excerpt:
        "Learn everything you need to know about React Hooks, from basic concepts to advanced patterns.",
      content: "",
      author: "John Doe",
      date: "2024-03-15",
      readTime: "10 min read",
      category: "Programming",
      tags: ["React", "JavaScript", "Web Development"],
      likes: 245,
      comments: 32,
      image: "/blog/react-hooks.jpg",
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js and Express",
      excerpt:
        "A detailed guide on creating robust and scalable REST APIs using Node.js and Express.",
      content: "",
      author: "Jane Smith",
      date: "2024-03-14",
      readTime: "15 min read",
      category: "Backend",
      tags: ["Node.js", "Express", "API Design"],
      likes: 189,
      comments: 24,
      image: "/blog/node-express.jpg",
    },
    {
      id: 3,
      title: "Mastering TypeScript: Advanced Types and Patterns",
      excerpt:
        "Deep dive into TypeScript's advanced type system and common design patterns.",
      content: "",
      author: "Mike Johnson",
      date: "2024-03-13",
      readTime: "12 min read",
      category: "Programming",
      tags: ["TypeScript", "JavaScript", "Best Practices"],
      likes: 156,
      comments: 18,
      image: "/blog/typescript.jpg",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Blog
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Explore articles, guides, and insights
          </p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 px-4 py-2 pl-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() =>
              setSelectedCategory(
                category.name === "All" ? null : category.name
              )
            }
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === category.name ||
              (category.name === "All" && !selectedCategory)
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                : "bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-2.5 py-0.5 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full">
                Featured
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {filteredPosts[0].category}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {filteredPosts[0].title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {filteredPosts[0].excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <User className="w-4 h-4" />
                  <span>{filteredPosts[0].author}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{filteredPosts[0].readTime}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.slice(1).map((post) => (
          <div
            key={post.id}
            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700/50 p-6 hover:border-purple-200 dark:hover:border-purple-800 transition-colors"
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-full">
                {post.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
