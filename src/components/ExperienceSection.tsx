"use client";

import React from "react";
import { Briefcase, Calendar, Sparkles, Building2 } from "lucide-react";

interface ExperienceItem {
  _id?: string;
  period: string;
  role: string;
  company?: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const items =
    experience && experience.length > 0
      ? experience
      : [
          {
            period: "2024 - Present",
            role: "Full-Stack Web Developer",
            company: "Freelance & Global Contracts",
            description:
              "Building modern web applications using Next.js, React, TypeScript, and MongoDB. Delivering scalable, high-performance web products with clean code architecture.",
          },
          {
            period: "2023 - 2024",
            role: "Frontend Developer",
            company: "Digital Agency",
            description:
              "Specialized in responsive web interfaces, complex animations, state management, and modern UI/UX design systems with Tailwind CSS.",
          },
          {
            period: "2022 - 2023",
            role: "Junior Web Developer",
            company: "Tech Studio",
            description:
              "Contributed to dynamic website features, REST API integrations, cross-browser compatibility, and performance optimization.",
          },
        ];

  return (
    <section id="experience" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 space-y-14">
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            <span>CAREER PATHWAY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Work Experience Journey
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A chronological timeline of my professional growth, key technical milestones, and project deliveries.
          </p>
        </div>

        {/* Experience Timeline Grid / Flow */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/10 via-blue-500/50 to-blue-500/10 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {items.map((item, idx) => (
              <div
                key={item._id || idx}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className="group relative p-8 rounded-3xl bg-[#0d1322]/90 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#12192b] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-2xl"
              >
                {/* Node Top Icon with Year Badge */}
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shadow-blue-500/20">
                    {idx === 0 ? (
                      <Sparkles className="w-5 h-5" />
                    ) : (
                      <Briefcase className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-6 space-y-3 text-left">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {item.role}
                  </h3>

                  {item.company && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-semibold text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.company}</span>
                    </div>
                  )}

                  <p className="text-slate-300 text-sm leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
