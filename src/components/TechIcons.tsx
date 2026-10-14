import React from "react";

export function TechIcon({ name, className = "w-7 h-7" }: { name: string; className?: string }) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  switch (normalized) {
    case "html5":
    case "html":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 3l1.8 17.5L12 22l6.2-1.5L20 3H4z" fill="#E44D26" />
          <path d="M12 4.5v15.8l4.8-1.2L18.4 4.5H12z" fill="#F16529" />
          <path d="M8 7.5h8l-.3 3.2H8.3l.3 3.5h7l-.4 4.5-3.2.9-3.2-.9-.2-2H7l.3 3.2 4.7 1.3 4.7-1.3.7-7.9H8.1L8 7.5z" fill="#fff" />
        </svg>
      );

    case "css3":
    case "css":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 3l1.8 17.5L12 22l6.2-1.5L20 3H4z" fill="#1572B6" />
          <path d="M12 4.5v15.8l4.8-1.2L18.4 4.5H12z" fill="#33A9DC" />
          <path d="M12 7.5h4.2l-.3 3.2H12v-3.2zm0 6.4h2.4l-.2 2.3-2.2.6v2.1l4.2-1.1.6-6.8H12v2.9zm-4.2-6.4H12v3.2H9.9l.3 3.2H12v3.2l-4.2-1.1-.3-3.2h-.1L7 7.5h.8z" fill="#fff" />
        </svg>
      );

    case "javascript":
    case "js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M6.5 17.5l2-1.2c.4.7.8 1.2 1.5 1.2.8 0 1.3-.3 1.3-1.4v-6.3h2.6v6.3c0 2.4-1.4 3.5-3.6 3.5-1.9 0-3.1-.9-3.8-2.1zm8.3-.3l2-1.2c.5.9 1.3 1.6 2.4 1.6 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.9-1.6l-.7-.3c-1.9-.8-3.1-1.8-3.1-3.9 0-1.9 1.5-3.4 3.8-3.4 1.7 0 2.9.6 3.7 2.1l-1.9 1.2c-.4-.7-.9-1.1-1.8-1.1-.8 0-1.4.5-1.4 1.1 0 .7.6 1 1.7 1.5l.7.3c2.2.9 3.4 1.9 3.4 4.1 0 2.4-1.9 3.6-4.2 3.6-2.4 0-3.9-1.2-4.7-2.8z" fill="#000" />
        </svg>
      );

    case "typescript":
    case "ts":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M5 8.5h6.5v2H9v7.5H6.8v-7.5H5v-2zm8.5 7.7l1.8-1.2c.5.8 1.2 1.4 2.2 1.4.9 0 1.5-.4 1.5-1.1 0-.7-.6-1-1.7-1.5l-.6-.3c-1.8-.8-3-1.7-3-3.7 0-1.8 1.4-3.2 3.6-3.2 1.6 0 2.7.6 3.5 2l-1.7 1.1c-.4-.7-.8-1-1.7-1-.8 0-1.3.4-1.3 1 0 .6.5.9 1.5 1.4l.6.3c2.1.9 3.3 1.8 3.3 3.9 0 2.3-1.8 3.4-4 3.4-2.3 0-3.7-1.1-4.5-2.5z" fill="#fff" />
        </svg>
      );

    case "react":
    case "reactjs":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );

    case "nextjs":
    case "next":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10.5" fill="#000" stroke="#333" strokeWidth="1" />
          <path d="M8 8v8h2.2V9.8l5.8 6.2H18V8h-2.2v6.2L10 8H8z" fill="#fff" />
        </svg>
      );

    case "nodejs":
    case "node":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2.5l8 4.6v9.2l-8 4.6-8-4.6V7.1l8-4.6z" fill="#339933" />
          <path d="M12 5.5l5.5 3.2v6.4L12 18.3 6.5 15.1V8.7L12 5.5z" fill="#43853D" />
          <circle cx="12" cy="12" r="2.5" fill="#fff" />
        </svg>
      );

    case "express":
    case "expressjs":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#1e293b" />
          <text x="12" y="15" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace">ex</text>
        </svg>
      );

    case "mongodb":
    case "mongo":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2C12 2 6 7.5 6 13.5c0 3.3 2.7 6.5 6 8.5 3.3-2 6-5.2 6-8.5C18 7.5 12 2 12 2z" fill="#47A248" />
          <path d="M12 2v20c.3-.2.6-.4.9-.6 2.7-1.8 5.1-4.7 5.1-7.9 0-5.5-6-11.5-6-11.5z" fill="#499D4A" />
          <path d="M12 12.5v9.5c-.3-.2-.6-.4-.9-.6-2.7-1.8-5.1-4.7-5.1-7.9 0-2 .8-3.8 2.2-5.1l3.8 4.1z" fill="#3FA037" />
        </svg>
      );

    case "mysql":
    case "sql":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#00758F" />
          <path d="M6 16c2-4 5-6 9-6 1.5 0 2.5.4 3 1-.8-.8-2-1.3-3.5-1.3-4.5 0-7.5 3-8.5 6.3z" fill="#F29111" />
          <circle cx="15.5" cy="12.5" r="1" fill="#fff" />
        </svg>
      );

    case "firebase":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M5.5 18l3.2-13.8a.7.7 0 011.3-.2l2.3 4.3L5.5 18z" fill="#FFA000" />
          <path d="M15.5 8.5l-3.2-6a.7.7 0 00-1.3 0L5.5 18l10-9.5z" fill="#F57C00" />
          <path d="M18.5 18l-3-9.5-10 9.5L11.5 22a1.2 1.2 0 001.3 0L18.5 18z" fill="#FFCA28" />
        </svg>
      );

    case "tailwindcss":
    case "tailwind":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 6c-3.3 0-5.3 1.7-6 5 1.3-1.7 3-2.3 5-1.7 1.2.3 2 1.2 3 2.1 1.5 1.6 3.3 3.6 7 3.6 3.3 0 5.3-1.7 6-5-1.3 1.7-3 2.3-5 1.7-1.2-.3-2-1.2-3-2.1C17.5 8 15.7 6 12 6zM5 13c-3.3 0-5.3 1.7-6 5 1.3-1.7 3-2.3 5-1.7 1.2.3 2 1.2 3 2.1 1.5 1.6 3.3 3.6 7 3.6 3.3 0 5.3-1.7 6-5-1.3 1.7-3 2.3-5 1.7-1.2-.3-2-1.2-3-2.1C10.5 15 8.7 13 5 13z" fill="#06B6D4" />
        </svg>
      );

    case "shopify":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M19.5 7.5L16 6.8c-.2 0-.4 0-.5.2L13 10.5l-1.5-6c-.1-.3-.4-.5-.7-.5H8c-.3 0-.5.2-.5.5v1.2c.4 0 .8.1 1.1.3l2.8 11.2c.1.3.4.5.7.5h.3l5.5-2.1c.4-.2.7-.6.7-1.1l1.4-6.3c.1-.4-.2-.8-.5-.8z" fill="#95BF47" />
        </svg>
      );

    default:
      return (
        <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs uppercase">
          {name.slice(0, 2)}
        </div>
      );
  }
}
