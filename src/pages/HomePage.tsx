import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Zap } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Post } from "../types";
import { PostCard } from "../components/PostCard";
import { NewsletterForm } from "../components/NewsletterForm";

export function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          profiles:author_id (
            email
          )
        `
        )
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error && data) {
        setFeaturedPosts(
          data.map((post) => ({
            ...post,
            author: post.profiles.email,
            createdAt: post.created_at,
          }))
        );
      }
      setIsLoading(false);
    }

    fetchFeaturedPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0  bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-multiply"></div>
        </div>
        <div className="relative">
          <div className="container mx-auto px-4 py-24 sm:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold dark:text-white text-gray-900 mb-6 leading-tight">
                Where Technology
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Meets Innovation
                </span>
              </h1>
              <p className="text-xl dark:text-gray-300 text-gray-900 mb-8 leading-relaxed">
                Dive into the latest tech insights, tutorials, and industry
                trends. Written by developers, for developers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200 group"
                >
                  Explore Articles
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors duration-200"
                >
                  Featured Posts
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Posts Section */}
      <div id="featured" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <Layers className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hand-picked articles that showcase the best of our technical
              content
            </p>
          </div>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : featuredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-lg mx-auto">
                <Zap className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Check back soon for exciting new content!
                </p>
              </div>
            </div>
          )}
          {featuredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium group"
              >
                <span>View all articles</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8">
              Get notified about the latest tech articles and tutorials
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
