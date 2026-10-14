"use client";

import React, { useState } from "react";
import { Layout, Code, Cpu, ArrowRight, CheckCircle2, X } from "lucide-react";

interface ServiceItem {
  _id?: string;
  title: string;
  description: string;
  icon?: string;
  linkText?: string;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  const displayServices =
    services && services.length > 0
      ? services
      : [
          {
            title: "Web Development",
            description:
              "Building modern, fast and fully responsive websites using Next.js, React, and Tailwind CSS. Clean, maintainable code tailored to your exact business goals.",
            icon: "layout",
            linkText: "Learn More",
          },
          {
            title: "Full-Stack Web Applications",
            description:
              "Developing scalable web applications with Node.js, Express, and MongoDB. Secure REST APIs, database design, and real-time interactive user interfaces.",
            icon: "code",
            linkText: "Learn More",
          },
          {
            title: "Performance & SEO Optimization",
            description:
              "Optimizing web vitals, page load speeds, SEO meta architecture, and mobile performance to help your product rank higher and convert more visitors.",
            icon: "cpu",
            linkText: "Learn More",
          },
        ];

  const getServiceIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case "code":
      case "terminal":
        return <Code className="w-6 h-6 text-cyan-400" />;
      case "cpu":
      case "api":
        return <Cpu className="w-6 h-6 text-indigo-400" />;
      case "layout":
      default:
        return <Layout className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="services" className="relative py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            <span>WHAT I DO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            My Services
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            I offer end-to-end web development services to help businesses build a strong online presence.
          </p>
        </div>

        {/* Services Grid */}
        <div data-aos="fade-up" data-aos-delay="100" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayServices.map((service, index) => (
            <div
              key={service._id || service.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative p-8 rounded-3xl bg-[#0d1322]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#12192b] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-5 text-left">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-105 transition-all">
                  {getServiceIcon(service.icon)}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <button
                  onClick={() => setActiveModal(service)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>{service.linkText || "Learn More"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-6">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                {getServiceIcon(activeModal.icon)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{activeModal.title}</h3>
                <span className="text-xs text-blue-400 font-medium">Professional Service by Siam</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{activeModal.description}</p>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                What&apos;s Included:
              </div>
              <ul className="space-y-2 text-sm text-slate-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Mobile & Tablet Responsive</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ultra-fast load speed & SEO Optimization</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Dynamic Content Management with MongoDB</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ongoing maintenance & free deployment support</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <a
                href="#contact"
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25"
              >
                Inquire About This Service
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
