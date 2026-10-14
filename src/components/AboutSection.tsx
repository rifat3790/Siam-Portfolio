"use client";

import React from "react";
import Image from "next/image";
import { Download, Code2, ShieldCheck, Clock, Zap } from "lucide-react";

interface AboutSectionProps {
  about: {
    badge?: string;
    heading?: string;
    highlightWord?: string;
    bio?: string;
    features?: Array<{ icon: string; title: string }>;
    cvUrl?: string;
    image?: string;
    highlightTag?: string;
  };
}

export function AboutSection({ about }: AboutSectionProps) {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case "shield":
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case "clock":
        return <Clock className="w-5 h-5 text-cyan-400" />;
      case "code":
      default:
        return <Code2 className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Image with floating badge */}
          <div data-aos="fade-right" data-aos-duration="900" className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden p-2.5 bg-gradient-to-tr from-blue-500/20 via-white/[0.04] to-cyan-500/20 border border-white/10 shadow-2xl">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={about.image || "/images/siam_working.jpg"}
                  alt="Siratul Islam Siam working"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Floating Badge on Image */}
            <div className="absolute -bottom-5 left-6 sm:left-10 bg-[#0d1322]/95 backdrop-blur-xl border border-white/15 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-wide">
                  {about.highlightTag || "A Problem Solver Who Loves to Build"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio and Highlights */}
          <div data-aos="fade-left" data-aos-duration="900" data-aos-delay="100" className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
              <span>{about.badge || "ABOUT ME"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {about.highlightWord && about.heading?.includes(about.highlightWord) ? (
                <>
                  {about.heading.split(about.highlightWord)[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {about.highlightWord}
                  </span>
                  {about.heading.split(about.highlightWord)[1]}
                </>
              ) : (
                about.heading || "Turning Ideas Into Digital Reality"
              )}
            </h2>


            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {about.bio ||
                "I'm Siratul Islam Siam, a passionate web developer with a strong focus on creating modern, responsive and user-friendly websites and web applications. I love turning ideas into real products that make an impact."}
            </p>

            {/* 3 Key Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {(about.features && about.features.length > 0
                ? about.features
                : [
                    { icon: "code", title: "Clean Code & Best Practices" },
                    { icon: "shield", title: "User Focused Design & UX" },
                    { icon: "clock", title: "On-Time Delivery" },
                  ]
              ).map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.06] transition-all flex flex-col gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center">
                    {getFeatureIcon(feature.icon)}
                  </div>
                  <span className="text-xs font-semibold text-slate-200 leading-snug">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions: Download CV & Decorative text */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <a
                href={about.cvUrl || "#"}
                download
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4" />
              </a>

              <div className="text-sm text-slate-400 font-medium italic flex items-center gap-2">
                <span className="text-blue-400 text-base">✦</span>
                <span>Let&apos;s build something amazing together!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
