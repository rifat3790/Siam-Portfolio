"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  ArrowUp,
  CheckCircle2,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Code2,
  ExternalLink,
  Heart,
  Globe2,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon, TwitterIcon, YouTubeIcon, DribbbleIcon } from "./SocialIcons";

interface FooterProps {
  settings: {
    siteName?: string;
    ownerName?: string;
    ownerRole?: string;
    email?: string;
    phone?: string;
    location?: string;
    copyrightText?: string;
  };
  hero?: {
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    dribbbleUrl?: string;
    heroImage?: string;
  };
}

export function Footer({ settings, hero }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#03060c] pt-20 pb-12 overflow-hidden text-left">
      {/* Ambient Gradient Flares */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 right-1/4 w-[400px] h-[250px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16 relative z-10">
        {/* ================= ULTRA-PREMIUM CTA BANNER ================= */}
        <div
          data-aos="fade-up"
          data-aos-duration="900"
          className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-[#0c1324] via-[#090e1b] to-[#080d18] border border-blue-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
        >
          {/* Subtle inner grid glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Worldwide Contracts &amp; Freelance</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Have a vision? Let&apos;s turn it into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                  reality.
                </span>
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Ready to take your project to the next level? Get in touch and let&apos;s build an extraordinary, high-performance web experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full sm:w-auto">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start a Project</span>
              </a>

              <a
                href={`mailto:${settings?.email || "siamhossain@gmail.com"}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all backdrop-blur-md"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Send Quick Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= 4-COLUMN LUXURY CONTENT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pt-4">
          {/* Column 1: Brand & Identity (4 Cols) */}
          <div data-aos="fade-up" data-aos-delay="50" className="lg:col-span-4 space-y-5">
            <div className="space-y-2">
              <Link href="#home" className="inline-block text-2xl sm:text-3xl font-black tracking-tight text-white group">
                {settings?.siteName || "Siam"}
                <span className="text-blue-500 group-hover:text-cyan-400 transition-colors">.</span>
              </Link>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                {settings?.ownerRole || "Web Developer & Problem Solver"}
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Crafting modern, responsive, and performance-obsessed digital solutions with clean code, creative UI design, and scalable databases.
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{settings?.location || "Dhaka, Bangladesh"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Working with clients worldwide (GMT+6)</span>
              </div>
            </div>

            {/* Social Icons with Luxury Hover Glow */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={hero?.githubUrl || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/[0.03] hover:bg-blue-600/20 border border-white/[0.08] hover:border-blue-500/40 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 group shadow-lg"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={hero?.linkedinUrl || "https://linkedin.com"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/[0.03] hover:bg-blue-600/20 border border-white/[0.08] hover:border-blue-500/40 flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all duration-300 group shadow-lg"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={hero?.twitterUrl || "https://twitter.com"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/[0.03] hover:bg-cyan-600/20 border border-white/[0.08] hover:border-cyan-500/40 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all duration-300 group shadow-lg"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={hero?.dribbbleUrl || "https://dribbble.com"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/[0.03] hover:bg-pink-600/20 border border-white/[0.08] hover:border-pink-500/40 flex items-center justify-center text-slate-300 hover:text-pink-400 transition-all duration-300 group shadow-lg"
                aria-label="Dribbble"
              >
                <DribbbleIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-white/[0.03] hover:bg-red-600/20 border border-white/[0.08] hover:border-red-500/40 flex items-center justify-center text-slate-300 hover:text-red-400 transition-all duration-300 group shadow-lg"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (2.5 Cols) */}
          <div data-aos="fade-up" data-aos-delay="100" className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Navigation</span>
            </div>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-medium text-slate-400">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-400 transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-blue-400 transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-blue-400 transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-blue-400 transition-colors">
                  Articles
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-blue-400/80 hover:text-blue-400 transition-colors font-semibold">
                  Admin CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Ecosystem (2.5 Cols) */}
          <div data-aos="fade-up" data-aos-delay="150" className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span>Core Stack</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Next.js 16 (App Router)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>React 19 &amp; TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>MongoDB &amp; Mongoose</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Tailwind CSS v4</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Vercel Edge Cloud</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Direct Line (3 Cols) */}
          <div data-aos="fade-up" data-aos-delay="200" className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Stay Updated</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Get notified when new case studies, tutorials, and tech experiments are released.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-2xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Thank you for connecting.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-all pr-11"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all disabled:opacity-50 shadow-md shadow-blue-500/20"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                Direct email:{" "}
                <a
                  href={`mailto:${settings?.email || "siamhossain@gmail.com"}`}
                  className="text-blue-400 hover:underline"
                >
                  {settings?.email || "siamhossain@gmail.com"}
                </a>
              </div>
              <div>
                Call/WhatsApp:{" "}
                <a
                  href={`tel:${settings?.phone || "+8801712345678"}`}
                  className="text-cyan-400 hover:underline"
                >
                  {settings?.phone || "+880 1712 345678"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-center sm:text-left">
            <span>{settings?.copyrightText || `© ${currentYear} Siratul Islam Siam. All rights reserved.`}</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/[0.04]"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
