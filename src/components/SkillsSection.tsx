"use client";

import React from "react";
import { TechIcon } from "./TechIcons";

interface SkillItem {
  _id?: string;
  name: string;
  category?: string;
  icon?: string;
  color?: string;
}

interface SkillsSectionProps {
  skills: SkillItem[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const displaySkills =
    skills && skills.length > 0
      ? skills
      : [
          { name: "Next.js", icon: "nextjs", color: "#3b82f6" },
          { name: "React", icon: "react", color: "#06b6d4" },
          { name: "TypeScript", icon: "typescript", color: "#3178c6" },
          { name: "Node.js", icon: "nodejs", color: "#22c55e" },
          { name: "Tailwind CSS", icon: "tailwindcss", color: "#38bdf8" },
          { name: "MongoDB", icon: "mongodb", color: "#10b981" },
          { name: "Shopify", icon: "shopify", color: "#95bf47" },
          { name: "Firebase", icon: "firebase", color: "#f59e0b" },
          { name: "GraphQL", icon: "graphql", color: "#e10098" },
          { name: "Docker", icon: "docker", color: "#2496ed" },
          { name: "PostgreSQL", icon: "postgresql", color: "#336791" },
          { name: "Figma", icon: "figma", color: "#f24e1e" },
        ];

  return (
    <section id="skills" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-12">
        {/* Section Header */}
        <div data-aos="fade-up" className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            <span>MY SKILLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Technologies I Work With
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            I work with modern technologies to build fast, scalable and secure web solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div data-aos="fade-up" data-aos-delay="100" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {displaySkills.map((skill, index) => (
            <div
              key={skill._id || skill.name}
              data-aos="zoom-in"
              data-aos-delay={(index % 6) * 60}
              className="group relative p-5 rounded-2xl bg-[#0d1322]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#131b2e] transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-blue-500/10"
            >
              {/* Subtle hover background glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-md"
                style={{ backgroundColor: skill.color || "#3b82f6" }}
              />

              {/* Icon Container */}
              <div className="relative w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                <TechIcon name={skill.icon || skill.name} className="w-7 h-7" />
              </div>

              {/* Skill Name */}
              <span className="relative text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
