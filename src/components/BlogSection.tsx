"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, X } from "lucide-react";

interface BlogPostItem {
  _id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  tags?: string[];
  readTime?: string;
  publishedAt?: string | Date;
}

interface BlogSectionProps {
  blogs: BlogPostItem[];
}

export function BlogSection({ blogs }: BlogSectionProps) {
  const [activePost, setActivePost] = useState<BlogPostItem | null>(null);

  const displayBlogs =
    blogs && blogs.length > 0
      ? blogs
      : [
          {
            title: "10 Tips for Modern Web Design & Performance",
            excerpt: "Explore key design patterns, responsive layouts, and performance tips for modern applications.",
            coverImage: "/images/project_ecommerce.jpg",
            readTime: "5 min read",
            publishedAt: new Date(),
          },
          {
            title: "My Journey as a Full-Stack Web Developer",
            excerpt: "Reflecting on continuous learning, building real-world projects, and mastering Next.js & React.",
            coverImage: "/images/siam_working.jpg",
            readTime: "7 min read",
            publishedAt: new Date(),
          },
          {
            title: "Best Developer Productivity Tools in 2026",
            excerpt: "A curated collection of tools, IDE extensions, and workflows that supercharge developer speed.",
            coverImage: "/images/project_taskapp.jpg",
            readTime: "4 min read",
            publishedAt: new Date(),
          },
        ];

  const formatDate = (dateValue?: string | Date) => {
    if (!dateValue) return "Oct 20, 2026";
    const d = new Date(dateValue);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <section id="blog" className="relative py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
              <span>LATEST BLOGS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              My Recent Articles
            </h2>
          </div>

          <a
            href="#blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all self-start sm:self-auto"
          >
            <span>View All Posts</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div data-aos="fade-up" data-aos-delay="100" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayBlogs.slice(0, 3).map((post, index) => (
            <div
              key={post._id || post.title}
              data-aos="fade-up"

              data-aos-delay={index * 150}
              className="group relative rounded-3xl bg-[#0d1322]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#12192b] transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between shadow-xl text-left"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={post.coverImage || "/images/project_ecommerce.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {post.readTime || "5 min read"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => setActivePost(post)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
              <Image
                src={activePost.coverImage || "/images/project_ecommerce.jpg"}
                alt={activePost.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-blue-400">
                <span>{formatDate(activePost.publishedAt)}</span>
                <span>•</span>
                <span>{activePost.readTime || "5 min read"}</span>
              </div>

              <h3 className="text-2xl font-bold text-white">{activePost.title}</h3>

              <div className="prose prose-invert text-slate-300 text-sm leading-relaxed whitespace-pre-line pt-2">
                {activePost.content || activePost.excerpt}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
