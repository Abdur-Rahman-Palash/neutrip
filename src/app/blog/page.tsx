"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Destinations to Visit in Bangladesh in 2024",
    excerpt: "Discover the most beautiful and culturally rich destinations across Bangladesh for your next adventure.",
    content: "Bangladesh offers a diverse range of destinations from the world's longest sea beach to the lush tea gardens of Sylhet...",
    author: "Sarah Rahman",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "destinations",
    image: "https://images.unsplash.com/photo-1559828264-a89e925953a3?w=800&h=400&fit=crop",
    tags: ["Bangladesh", "Travel Guide", "Destinations"],
    featured: true
  },
  {
    id: "2",
    title: "A Complete Guide to Dhaka's Street Food Scene",
    excerpt: "Explore the vibrant street food culture of Dhaka with our comprehensive guide to must-try local delicacies.",
    content: "Dhaka's street food scene is a paradise for food lovers. From the famous pithas to the spicy fuchka...",
    author: "Karim Ahmed",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "food",
    image: "https://images.unsplash.com/photo-1504674900247-8787e5f01c2f?w=800&h=400&fit=crop",
    tags: ["Dhaka", "Street Food", "Local Cuisine"],
    featured: true
  },
  {
    id: "3",
    title: "How to Pack Smart for Your Next Trip",
    excerpt: "Essential packing tips and tricks to make your travel experience smoother and more organized.",
    content: "Packing can be one of the most stressful parts of travel preparation. Here's how to do it right...",
    author: "Fatema Khatun",
    date: "2024-01-10",
    readTime: "5 min read",
    category: "tips",
    image: "https://images.unsplash.com/photo-1556075798-60212b619ac8?w=800&h=400&fit=crop",
    tags: ["Packing", "Travel Tips", "Organization"],
    featured: false
  },
  {
    id: "4",
    title: "Best Time to Visit Cox's Bazar",
    excerpt: "Plan your perfect beach getaway with our seasonal guide to Cox's Bazar.",
    content: "Cox's Bazar is beautiful year-round, but certain months offer better weather and fewer crowds...",
    author: "Rafiq Islam",
    date: "2024-01-08",
    readTime: "4 min read",
    category: "destinations",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop",
    tags: ["Cox's Bazar", "Beach", "Seasonal Guide"],
    featured: false
  },
  {
    id: "5",
    title: "Budget Travel: How to Save Money on Your Next Trip",
    excerpt: "Smart strategies to travel more while spending less without compromising on experience.",
    content: "Travel doesn't have to break the bank. Here are some proven ways to save money while still having an amazing time...",
    author: "Nusrat Jahan",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "tips",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
    tags: ["Budget Travel", "Money Saving", "Tips"],
    featured: false
  },
  {
    id: "6",
    title: "Sundarbans: A Complete Travel Guide",
    excerpt: "Everything you need to know about visiting the world's largest mangrove forest.",
    content: "The Sundarbans is a UNESCO World Heritage Site and home to the Royal Bengal Tiger. Here's your complete guide...",
    author: "Mahmud Hassan",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "destinations",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    tags: ["Sundarbans", "Wildlife", "Nature"],
    featured: true
  }
];

const categories = [
  { id: "all", name: "All Posts" },
  { id: "destinations", name: "Destinations" },
  { id: "tips", name: "Travel Tips" },
  { id: "food", name: "Food & Dining" },
  { id: "culture", name: "Culture" },
  { id: "adventure", name: "Adventure" }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Travel Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Travel tips, destination guides, and inspiring stories to help you plan your perfect journey.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
                <path d="M11 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0"/>
              </svg>
            </div>
          </div>

          {/* Featured Posts */}
          {selectedCategory === "all" && searchTerm === "" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                    {/* Post Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                {/* Post Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!post.featured && (
                    <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {post.category}
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Category and Read Time */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>

                  {/* Read More Button */}
                  <Button variant="outline" size="sm" className="w-full">
                    Read More
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-500 mb-4">No articles found matching your criteria</div>
              <Button variant="outline" onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
              }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Get the latest travel tips, destination guides, and exclusive offers delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
