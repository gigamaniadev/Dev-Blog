import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // Calculate read time based on content length (rough estimate)
  const readTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 200)
  );

  return (
    <article className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_0_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_50px_0_rgba(0,0,0,0.3)]">
      <Link
        to={`/blog/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-hidden="true"
      />

      {post.image_url && (
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" />
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute bottom-4 left-4 right-4 z-[2]">
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4"></div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 mb-3">
          {post.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-6">
          {post.excerpt}
        </p>

        <div className="relative z-20 flex items-center justify-between">
          <div className="h-px flex-1 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent" />
          <span className="mx-4 inline-flex items-center text-sm font-medium text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300">
            Read article
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/5" />
      </div>
    </article>
  );
}
