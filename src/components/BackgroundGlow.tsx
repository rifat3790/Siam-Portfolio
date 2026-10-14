"use client";

import React from "react";

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Left Glowing Orb */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[130px] opacity-25 animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.6) 0%, rgba(6, 182, 212, 0.2) 60%, transparent 80%)",
        }}
      />

      {/* Center-Right Ambient Orb */}
      <div 
        className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-20 animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 80%)",
        }}
      />

      {/* Bottom Glowing Orb */}
      <div 
        className="absolute bottom-[5%] left-[20%] w-[45vw] h-[45vw] rounded-full blur-[120px] opacity-15 animate-float-reverse"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(37, 99, 235, 0.3) 60%, transparent 80%)",
        }}
      />
    </div>
  );
}
