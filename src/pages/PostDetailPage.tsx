import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import type { Post } from "../types";
import { ShareButtons } from "../components/ShareButtons";

export function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          profiles:author_id (
            email,
            display_name,
            full_name
          )
        `
        )
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (!error && data) {
        setPost({
          ...data,
          createdAt: data.created_at,
        });
      }
      setIsLoading(false);
    }

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Post not found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate read time
  const readTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 200)
  );
  const authorInitial =
    post.profiles?.display_name?.[0]?.toUpperCase() ||
    post.profiles?.full_name?.[0]?.toUpperCase() ||
    post.profiles?.email?.[0]?.toUpperCase() ||
    "A";
  const currentUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Share Buttons */}
      <ShareButtons url={currentUrl} title={post.title} />

      {/* Hero Section */}
      <div className="relative bg-gray-900 dark:bg-black">
        <div className="absolute inset-0">
          {post.image_url && (
            <>
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>
            </>
          )}
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to blog
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/90 text-white">
                <Tag className="w-4 h-4 mr-1.5" />
                Technology
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-medium mr-3">
                  {authorInitial}
                </div>
                <div>
                  <div className="font-medium text-white">
                    {post.profiles?.display_name ||
                      post.profiles?.full_name ||
                      post.profiles?.email}
                  </div>
                  <div className="text-sm">Author</div>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div
              className="prose dark:prose-invert prose-lg max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-600 dark:prose-p:text-gray-300
                prose-a:text-blue-500 hover:prose-a:text-blue-600
                prose-img:rounded-xl prose-img:shadow-lg
                prose-code:text-blue-500 dark:prose-code:text-blue-400
                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Author Section */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-medium">
                {authorInitial}
              </div>
              <div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {post.profiles?.display_name ||
                    post.profiles?.full_name ||
                    post.profiles?.email}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Technical Writer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
