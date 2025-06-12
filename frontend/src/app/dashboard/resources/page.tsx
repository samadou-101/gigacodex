"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  BookOpen,
  Video,
  FileText,
  Globe,
  Book,
  Link,
  X,
  Trash2,
  ExternalLink,
} from "lucide-react";
import React from "react";

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  addedAt: string;
  status: "completed" | "in-progress" | "planned";
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { id: "books", name: "Books", icon: Book },
  { id: "courses", name: "Courses", icon: BookOpen },
  { id: "videos", name: "Videos", icon: Video },
  { id: "articles", name: "Articles", icon: FileText },
  { id: "docs", name: "Documentation", icon: Globe },
  { id: "other", name: "Other", icon: Link },
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      title: "React Documentation",
      description: "Official React documentation and guides",
      url: "https://react.dev",
      category: "docs",
      tags: ["react", "frontend", "javascript"],
      addedAt: "2024-03-15",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Node.js Crash Course",
      description: "Complete Node.js course for beginners",
      url: "https://youtube.com/playlist?list=example",
      category: "videos",
      tags: ["nodejs", "backend", "javascript"],
      addedAt: "2024-03-14",
      status: "planned",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    category: "other",
    status: "planned",
    tags: [],
  });

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddResource = () => {
    if (newResource.title && newResource.url) {
      setResources([
        ...resources,
        {
          id: Date.now().toString(),
          title: newResource.title,
          description: newResource.description || "",
          url: newResource.url,
          category: newResource.category || "other",
          tags: newResource.tags || [],
          addedAt: new Date().toISOString().split("T")[0],
          status: newResource.status || "planned",
        },
      ]);
      setNewResource({ category: "other", status: "planned", tags: [] });
      setIsAddingResource(false);
    }
  };

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Resources
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your learning resources
          </p>
        </div>
        <button
          onClick={() => setIsAddingResource(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Add Resource</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl border transition-all duration-300 ${
              !selectedCategory
                ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400"
                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add Resource Modal */}
      {isAddingResource && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Add New Resource
              </h2>
              <button
                onClick={() => setIsAddingResource(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newResource.title || ""}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Enter resource title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newResource.description || ""}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Enter resource description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={newResource.url || ""}
                  onChange={(e) =>
                    setNewResource({ ...newResource, url: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Enter resource URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newResource.category}
                  onChange={(e) =>
                    setNewResource({ ...newResource, category: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Status
                </label>
                <select
                  value={newResource.status}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      status: e.target.value as Resource["status"],
                    })
                  }
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsAddingResource(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddResource}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Add Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const categoryIcon = categories.find(
            (c) => c.id === resource.category
          )?.icon;
          return (
            <div
              key={resource.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {categoryIcon && (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                        {React.createElement(categoryIcon, {
                          className: "w-5 h-5 text-white",
                        })}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {
                          categories.find((c) => c.id === resource.category)
                            ?.name
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDeleteResource(resource.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {resource.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      resource.status === "completed"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : resource.status === "in-progress"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        : "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {resource.status.charAt(0).toUpperCase() +
                      resource.status.slice(1).replace("-", " ")}
                  </span>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
