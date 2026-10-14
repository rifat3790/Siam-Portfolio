"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { GitHubIcon } from "./SocialIcons";

interface ProjectItem {
  _id?: string;
  title: string;
  description?: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: string;
  featured?: boolean;
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Next.js", "React.js", "MongoDB", "Full Stack"];

  const displayProjects = projects && projects.length > 0 ? projects : [
    {
      title: "E-Commerce Website",
      description: "Full-featured online store with product catalog, cart, Stripe checkout and admin dashboard.",
      image: "/images/project_ecommerce.jpg",
      tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com",
      status: "Published",
    },
    {
      title: "Task Management App",
      description: "Interactive project management tool with Kanban boards, team workspaces and live updates.",
      image: "/images/project_taskapp.jpg",
      tags: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "https://github.com",
      status: "Published",
    },
    {
      title: "Portfolio Website",
      description: "Luxury personal portfolio & CMS with dynamic MongoDB content and responsive dark UI.",
      image: "/images/siam_portrait.jpg",
      tags: ["Next.js", "Tailwind CSS", "MongoDB", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "https://github.com",
      status: "Published",
    },
  ];

  const filteredProjects =
    filter === "All"
      ? displayProjects
      : displayProjects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase())));

  return (
    <section id="projects" className="relative py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
              <span>FEATURED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              My Recent Projects
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilter("All")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, index) => (
            <div
              key={project._id || project.title}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
              className="group relative rounded-3xl bg-[#0d1322]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#12192b] transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={project.image || "/images/project_ecommerce.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-transparent opacity-80" />

                {/* Status Badge - High contrast & clearly visible */}
                {project.status && (
                  <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-[#060a14]/95 border border-emerald-500/50 text-emerald-300 text-xs font-bold tracking-wide shadow-2xl backdrop-blur-xl flex items-center gap-1.5 z-10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                    <span>{project.status}</span>
                  </div>
                )}
              </div>


              {/* Card Body */}
              <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-3">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium text-slate-300 bg-white/[0.05] border border-white/[0.08] px-2.5 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <GitHubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-white/5 transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
              <Image
                src={selectedProject.image || "/images/project_ecommerce.jpg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>

              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed pt-2">
                {selectedProject.description ||
                  "A full-stack, responsive web application engineered with modern best practices, clean modular architecture, and high attention to UI/UX detail."}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-4">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
