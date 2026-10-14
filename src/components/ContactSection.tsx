"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ContactSectionProps {
  settings: {
    email?: string;
    phone?: string;
    location?: string;
  };
}

export function ContactSection({ settings }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedProjectType, setSelectedProjectType] = useState("Web Development");
  const [customProjectType, setCustomProjectType] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setResponseMsg("Please fill in all required fields.");
      return;
    }

    const finalProjectType =
      selectedProjectType === "Other"
        ? customProjectType.trim() || "Other Custom Project"
        : selectedProjectType;

    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          projectType: finalProjectType,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setResponseMsg("Thank you! Your message has been sent successfully to Siam.");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setSelectedProjectType("Web Development");
        setCustomProjectType("");
      } else {
        setStatus("error");
        setResponseMsg(data.message || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setResponseMsg("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Contact Info Cards */}
          <div data-aos="fade-right" data-aos-duration="800" className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Let&apos;s Work Together
              </h2>
              <p className="text-slate-300 text-base leading-relaxed pt-2">
                Have a project in mind or want to explore an idea? Feel free to reach out directly or send a message through the form.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href={`mailto:${settings?.email || "siamhossain@gmail.com"}`}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-[#0d1322]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#12192b] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Email</div>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {settings?.email || "siamhossain@gmail.com"}
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${settings?.phone || "+8801712345678"}`}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-[#0d1322]/80 backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#12192b] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Phone</div>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {settings?.phone || "+880 1712 345678"}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1322]/80 backdrop-blur-md border border-white/[0.08]">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Location</div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {settings?.location || "Dhaka, Bangladesh"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100" className="lg:col-span-7 bg-[#0d1322]/90 backdrop-blur-xl border border-white/10 p-7 sm:p-9 rounded-3xl shadow-2xl text-left">
            <h3 className="text-xl font-bold text-white mb-2">
              Have a project in mind? Let&apos;s discuss and turn your ideas into reality.
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Fill out the form below and I will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Siam"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="siam@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Type
                </label>
                <select
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#111726] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Web Development">Website Development</option>
                  <option value="Web Application">Full-Stack Web Application</option>
                  <option value="E-Commerce">E-Commerce Solution</option>
                  <option value="API Integration">API Integration / Backend</option>
                  <option value="Consultation">Consultation &amp; Architecture</option>
                  <option value="Other">Other (Type custom project)</option>
                </select>

                {/* If Other is selected, show custom input field */}
                {selectedProjectType === "Other" && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Specify your project type (e.g. Mobile App, Custom SaaS, Landing Page)..."
                      value={customProjectType}
                      onChange={(e) => setCustomProjectType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-blue-500/40 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                )}
              </div>


              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project goals, timeline, and requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all resize-none"
                />
              </div>

              {/* Status Message */}
              {status === "success" && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{responseMsg}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{responseMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending to MongoDB...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
