"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialItem {
  _id?: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  content: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items =
    testimonials && testimonials.length > 0
      ? testimonials
      : [
          {
            name: "David Miller",
            role: "CEO",
            company: "TechScale Solutions",
            avatar: "/images/siam_portrait.jpg",
            content:
              "Siam transformed our product vision into a lightning-fast, beautifully designed web app. His attention to detail, clean code, and quick turnaround exceeded all expectations.",
            rating: 5,
          },
          {
            name: "Sarah Jenkins",
            role: "Product Manager",
            company: "Digital Flow Co.",
            avatar: "/images/siam_working.jpg",
            content:
              "Working with Siratul Islam Siam was a breath of fresh air. He communicates proactively, solves complex UI/UX problems effortlessly, and delivers top-tier modern web experiences.",
            rating: 5,
          },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, items.length - 1) : prevIndex - 1));
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= items.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section id="testimonials" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header with Arrows */}
        <div data-aos="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
              <span>TESTIMONIALS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              What Clients Say
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Here&apos;s what some of my clients say about working with me.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div data-aos="fade-up" data-aos-delay="100" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div
              key={item._id || idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="group relative p-8 rounded-3xl bg-[#0d1322]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#12192b] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-xl text-left"
            >
              <div className="space-y-5">
                {/* 5 Stars Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-500/30" />
                </div>

                {/* Review Content */}
                <p className="text-slate-200 text-base leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-white/10">
                  <Image
                    src={item.avatar || "/images/siam_portrait.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{item.name}</h4>
                  <p className="text-xs text-blue-400 font-medium">
                    {item.role} {item.company ? `• ${item.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
