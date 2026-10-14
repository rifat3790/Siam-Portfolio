"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Code2,
  Sparkles,
  Rocket,
  X,
} from "lucide-react";
import { TechIcon } from "./TechIcons";
import { GitHubIcon, LinkedInIcon, TwitterIcon, DribbbleIcon } from "./SocialIcons";

interface HeroSectionProps {
  hero: {
    greeting?: string;
    name?: string;
    highlightedName?: string;
    title?: string;
    bio?: string;
    yearsExperience?: string;
    projectsCompleted?: string;
    happyClients?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    dribbbleUrl?: string;
    introVideoUrl?: string;
    heroImage?: string;
    codeSnippet?: string;
  };
}

export function HeroSection({ hero }: HeroSectionProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const marqueeTechnologies = [
    { name: "Next.js", techKey: "nextjs" },
    { name: "React", techKey: "react" },
    { name: "Shopify", techKey: "shopify" },
    { name: "Tailwind CSS", techKey: "tailwindcss" },
    { name: "MongoDB", techKey: "mongodb" },
    { name: "Firebase", techKey: "firebase" },
  ];

  // Helper to parse video URL
  const getEmbedOrVideo = (url?: string) => {
    if (!url) return { type: "youtube", src: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1" };
    if (url.includes("/api/media/") || url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov")) {
      return { type: "direct", src: url };
    }
    // YouTube links
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return { type: "youtube", src: `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1` };
    }
    return { type: "youtube", src: url };
  };

  const videoData = getEmbedOrVideo(hero.introVideoUrl);

  return (
    <section id="home" className="relative pt-24 pb-10 sm:pt-32 sm:pb-14 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Intro & Info */}
          <div data-aos="fade-up" data-aos-duration="900" className="lg:col-span-7 space-y-7 text-left">
            {/* Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hero.greeting || "HELLO, I'M"}</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                {hero.name || "Siratul Islam"}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 drop-shadow-[0_0_35px_rgba(59,130,246,0.4)]">
                  {hero.highlightedName || "Siam"}
                </span>
                <br />
                <span className="text-slate-100 font-bold">{hero.title || "Web Developer"}</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed pt-2">
                {hero.bio ||
                  "I build modern, high-performance websites and web applications that help businesses grow. Clean code, creative design and a focus on real results."}
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-base font-medium text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md group"
              >
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch My Intro</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 tracking-tight">
                  {hero.yearsExperience || "3+"}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 tracking-tight">
                  {hero.projectsCompleted || "50+"}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 tracking-tight">
                  {hero.happyClients || "30+"}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Happy Clients</div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={hero.githubUrl || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500/50 transition-all"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={hero.linkedinUrl || "https://linkedin.com"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={hero.twitterUrl || "https://twitter.com"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={hero.dribbbleUrl || "https://dribbble.com"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/50 transition-all"
                aria-label="Dribbble"
              >
                <DribbbleIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Siam Portrait & Refined Floating Badges */}
          <div data-aos="fade-left" data-aos-duration="900" data-aos-delay="150" className="lg:col-span-5 relative flex justify-center items-center py-4 lg:py-0">
            {/* Multi-layer Ambient Backlight Glow */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-blue-600/35 via-cyan-500/25 to-indigo-600/20 rounded-[3rem] blur-3xl -z-10 animate-pulse-glow" />
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl -z-10 scale-90" />

            {/* Central Portrait Container */}
            <div className="relative w-[280px] h-[340px] sm:w-[360px] sm:h-[420px] lg:w-[420px] lg:h-[490px] xl:w-[450px] xl:h-[520px] rounded-[2.25rem] sm:rounded-[2.75rem] overflow-hidden p-2.5 sm:p-3 bg-gradient-to-b from-blue-500/30 via-white/[0.05] to-blue-950/20 border border-white/15 shadow-[0_25px_60px_-15px_rgba(59,130,246,0.35)] backdrop-blur-md">
              <div className="relative w-full h-full rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden bg-slate-900 border border-white/10">
                <Image
                  src={hero.heroImage || "/images/siam_portrait.jpg"}
                  alt={hero.name || "Siratul Islam Siam"}
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                {/* Soft gradient bottom shade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07090e]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Card: Clean Code (Top Left) */}
            <div className="absolute -top-3 -left-3 sm:-left-6 lg:-left-8 bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/15 p-3 sm:p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-float-slow">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-sm">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-wide">Clean Code</div>
                <div className="text-[11px] text-slate-400">Modern Solutions</div>
              </div>
            </div>

            {/* Floating Rocket Badge (Top Right) */}
            <div className="absolute top-4 -right-2 sm:-right-4 lg:-right-6 bg-[#0a0f1d]/90 backdrop-blur-xl border border-pink-500/30 p-2.5 sm:p-3 rounded-2xl shadow-2xl shadow-pink-500/10 flex items-center gap-2.5 animate-float-reverse">
              <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Rocket className="w-4 h-4" />
              </div>
              <div className="text-left text-xs font-semibold text-slate-200">
                Turning ideas <br />
                <span className="text-pink-400 font-bold">into reality</span>
              </div>
            </div>

            {/* Floating Badge: Available for Work (Middle/Bottom Right) */}
            <div className="absolute bottom-20 -right-2 sm:-right-5 lg:-right-7 bg-[#0a0f1d]/90 backdrop-blur-xl border border-emerald-500/30 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-300 shadow-2xl flex items-center gap-2 animate-float-slow hidden sm:flex">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              <span>Available for Hire</span>
            </div>

            {/* Floating Code Snippet Card (Bottom Left) */}
            <div className="absolute -bottom-6 -left-3 sm:-left-6 lg:-left-8 bg-[#070b14]/95 backdrop-blur-2xl border border-blue-500/30 p-3.5 sm:p-4 rounded-2xl shadow-2xl font-mono text-[11px] text-left max-w-[260px] sm:max-w-[280px] animate-float-slow z-20">
              <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/[0.08]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-[10px] text-slate-400 ml-1">developer.js</span>
              </div>
              <pre className="text-slate-300 leading-relaxed overflow-x-hidden whitespace-pre-wrap">
                {hero.codeSnippet || (
                  <>
                    <span className="text-blue-400">const</span> developer = {"{\n"}
                    {"  "}name: <span className="text-green-400">&quot;Siratul Islam Siam&quot;</span>,{"\n"}
                    {"  "}role: <span className="text-cyan-400">&quot;Web Developer&quot;</span>,{"\n"}
                    {"  "}passion: <span className="text-amber-300">&quot;Building for the web&quot;</span>{"\n"}
                    {"};"}
                  </>
                )}
              </pre>
            </div>
          </div>
        </div>

        {/* Tech Stack Infinite Continuous Marquee */}
        <div data-aos="fade-up" data-aos-delay="200" className="mt-14 sm:mt-18 pt-8 border-t border-white/[0.06] overflow-hidden">
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee flex items-center gap-4 sm:gap-6 py-2">
              {/* First Track */}
              {[...marqueeTechnologies, ...marqueeTechnologies, ...marqueeTechnologies].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 shrink-0 group shadow-md"
                >
                  <TechIcon name={tech.techKey} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Intro Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">
              {hero.name || "Siratul Islam Siam"} - Intro &amp; Highlights
            </h3>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
              {videoData.type === "direct" ? (
                <video
                  src={videoData.src}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  className="w-full h-full"
                  src={videoData.src}
                  title="Siam Intro Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
