"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Sparkles,
  User,
  Layers,
  Shield,
  FolderGit2,
  FileText,
  MessageSquare,
  Briefcase,
  Mail,
  Settings,
  Globe,
  Image as ImageIcon,
  Users,
  ExternalLink,
  Search,
  Bell,
  Moon,
  ChevronRight,
  TrendingUp,
  Plus,
  PenSquare,
  X,
  Check,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  ArrowUpRight,
  Upload,
  Lock,
  LogOut,
  FileUp,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Play,
  Send,
  Copy,
  CheckCheck,
} from "lucide-react";

export default function AdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalItem, setModalItem] = useState<any>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedEmails, setCopiedEmails] = useState<boolean>(false);

  // Check login session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedAuth = localStorage.getItem("siam_admin_auth");
        if (storedAuth === "true") {
          setIsAuthenticated(true);
          await fetchData();
        } else {
          const res = await fetch("/api/admin/login");
          const json = await res.json();
          if (json.authenticated) {
            setIsAuthenticated(true);
            localStorage.setItem("siam_admin_auth", "true");
            await fetchData();
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setAuthChecking(false);
      }
    };
    checkAuth();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput) {
      setLoginError("Please enter your admin password.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const result = await res.json();

      if (result.success) {
        setIsAuthenticated(true);
        localStorage.setItem("siam_admin_auth", "true");
        setPasswordInput("");
        showToast("Welcome back, Siam! Access granted.");
        await fetchData();
      } else {
        setLoginError(result.message || "Invalid password. Access denied.");
      }
    } catch (err: any) {
      setLoginError("Connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out from Siam Portfolio Admin?")) {
      await fetch("/api/admin/logout", { method: "POST" });
      localStorage.removeItem("siam_admin_auth");
      setIsAuthenticated(false);
      showToast("Logged out successfully.");
    }
  };

  // Handle File Upload to /api/upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        setModalItem((prev: any) => ({
          ...prev,
          [targetField]: result.url,
        }));
        showToast(`File uploaded directly to database: ${result.filename}`);
        await fetchData();
      } else {
        alert(result.message || "Upload failed");
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle Section CRUD Mutation
  const handleSave = async (section: string, action: string, payload: any, id?: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/mutate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, action, data: payload, id }),
      });
      const result = await res.json();
      if (result.success) {
        showToast(result.message || "Database updated successfully!");
        setActiveModal(null);
        setModalItem(null);
        await fetchData();
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err: any) {
      alert("Error saving: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Render Authentication Lock Screen if not logged in
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#060911] flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-sm text-slate-400 font-medium">Verifying Admin Security...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050811] text-slate-100 flex items-center justify-center p-5 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0c1222]/90 backdrop-blur-2xl border border-white/10 shadow-2xl text-center space-y-6">
          {/* Lock icon header */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400 shadow-xl shadow-blue-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-black tracking-tight text-white">
              Siam<span className="text-blue-500">.</span> Admin Portal
            </h1>
            <p className="text-xs text-slate-400">
              Enter your secret password to manage portfolio content.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Unlock Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1"
            >
              <span>← Return to Public Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalProjects: data?.projects?.length || 12,
    totalBlogs: data?.blogs?.length || 8,
    newMessages: data?.messages?.filter((m: any) => !m.isRead)?.length || 0,
    totalViews: data?.settings?.viewsCount || 1240,
  };

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl bg-emerald-500/90 text-white font-medium text-sm shadow-2xl backdrop-blur-md flex items-center gap-2 border border-emerald-400/30">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className="w-full md:w-64 bg-[#0a0f1d] border-r border-white/[0.06] flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Subtitle */}
          <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <Link href="/admin" className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white">
                  Siam<span className="text-blue-500">.</span>
                </span>
              </Link>
              <div className="text-[11px] font-semibold tracking-wider text-blue-400/80 uppercase pt-1">
                Portfolio Admin
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Log Out"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/[0.04] rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setModalItem(data?.hero);
                setActiveModal("hero");
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hero Section</span>
            </button>

            <button
              onClick={() => {
                setModalItem(data?.about);
                setActiveModal("about");
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <User className="w-4 h-4" />
              <span>About Section</span>
            </button>

            <button
              onClick={() => setActiveModal("skills_manager")}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Skills</span>
            </button>

            <button
              onClick={() => setActiveModal("services_manager")}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <Shield className="w-4 h-4" />
              <span>Services</span>
            </button>

            <button
              onClick={() => setActiveModal("projects_manager")}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => setActiveModal("blogs_manager")}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Blog Posts</span>
            </button>

            <button
              onClick={() => setActiveModal("testimonials_manager")}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Testimonials</span>
            </button>

            <button
              onClick={() => setActiveModal("experience_manager")}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </button>

            <button
              onClick={() => setActiveModal("messages_manager")}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Contact Messages</span>
              </div>
              {stats.newMessages > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  {stats.newMessages}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveModal("subscribers_manager")}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-3">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Newsletter Subscribers</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {data?.settings?.subscribers?.length || 0}
              </span>
            </button>

            <button
              onClick={() => {
                setModalItem(data?.settings);
                setActiveModal("settings");
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <Settings className="w-4 h-4" />
              <span>Site Settings</span>
            </button>

            <button
              onClick={() => {
                setModalItem(data?.settings);
                setActiveModal("settings");
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>SEO &amp; Meta</span>
            </button>

            <button
              onClick={() => setActiveModal("media_library")}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar: View Website & Admin Avatar */}
        <div className="p-4 border-t border-white/[0.06] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Website</span>
          </Link>

          <div className="flex items-center justify-between p-2 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-800 border border-white/10">
                <Image
                  src={data?.hero?.heroImage || "/images/siam_portrait.jpg"}
                  alt="Siratul Islam Siam"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-tight">Siratul Islam Siam</div>
                <div className="text-[10px] text-slate-400 font-medium">Super Admin</div>
              </div>
            </div>
            <button onClick={handleLogout} title="Logout" className="text-slate-500 hover:text-rose-400 p-1">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 px-6 sm:px-8 border-b border-white/[0.06] bg-[#080d1a] flex items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search anything... (Ctrl + K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModal("messages_manager")}
              className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {stats.newMessages > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              )}
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-white/[0.08]">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-800">
                <Image
                  src={data?.hero?.heroImage || "/images/siam_portrait.jpg"}
                  alt="Admin"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block text-left text-xs font-semibold text-white">
                Siratul Islam Siam
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
          {/* Welcome Greeting Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Welcome back, Siam!</span>
                <span className="text-xl">👋</span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm pt-1">
                Manage your portfolio content, track performance and keep everything up to date.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-semibold text-slate-300">
              <span>Oct 1, 2026 - Oct 31, 2026</span>
            </div>
          </div>

          {/* Key Metric Cards (4 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Total Projects */}
            <div
              onClick={() => setActiveModal("projects_manager")}
              className="cursor-pointer group p-5 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-blue-500/30 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="pt-4 text-left">
                <div className="text-xs text-slate-400 font-medium">Total Projects</div>
                <div className="text-2xl font-black text-white pt-1">{stats.totalProjects}</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 pt-1 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>2 this month</span>
                </div>
              </div>
            </div>

            {/* 2. Total Blog Posts */}
            <div
              onClick={() => setActiveModal("blogs_manager")}
              className="cursor-pointer group p-5 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="pt-4 text-left">
                <div className="text-xs text-slate-400 font-medium">Total Blog Posts</div>
                <div className="text-2xl font-black text-white pt-1">{stats.totalBlogs}</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 pt-1 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>1 this month</span>
                </div>
              </div>
            </div>

            {/* 3. New Messages */}
            <div
              onClick={() => setActiveModal("messages_manager")}
              className="cursor-pointer group p-5 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-pink-500/30 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
              </div>
              <div className="pt-4 text-left">
                <div className="text-xs text-slate-400 font-medium">New Messages</div>
                <div className="text-2xl font-black text-white pt-1">{stats.newMessages}</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 pt-1 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>Real-time DB synced</span>
                </div>
              </div>
            </div>

            {/* 4. Total Views */}
            <div className="group p-5 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="pt-4 text-left">
                <div className="text-xs text-slate-400 font-medium">Total Views</div>
                <div className="text-2xl font-black text-white pt-1">{stats.totalViews}</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 pt-1 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>18% from last month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Chart & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 cols: Website Overview Chart */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0a0f1d] border border-white/[0.06] space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Website Overview</h3>
                  <p className="text-xs text-slate-400">Visitor and engagement statistics</p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-slate-300">Visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="text-slate-300">Page Views</span>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300 text-xs">
                    Last 30 Days
                  </div>
                </div>
              </div>

              {/* Area SVG Chart */}
              <div className="relative w-full h-52">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200">
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                  <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                  <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

                  {/* Page Views Path (Cyan) */}
                  <path
                    d="M 0,160 Q 100,140 200,120 T 400,60 T 600,80 L 600,200 L 0,200 Z"
                    fill="url(#cyanGradient)"
                  />
                  <path
                    d="M 0,160 Q 100,140 200,120 T 400,60 T 600,80"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                  />

                  {/* Visitors Path (Blue) */}
                  <path
                    d="M 0,180 Q 100,150 200,135 T 400,90 T 600,110 L 600,200 L 0,200 Z"
                    fill="url(#blueGradient)"
                  />
                  <path
                    d="M 0,180 Q 100,150 200,135 T 400,90 T 600,110"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />
                </svg>

                <div className="flex justify-between text-[11px] text-slate-500 pt-3">
                  <span>Oct 1</span>
                  <span>Oct 5</span>
                  <span>Oct 10</span>
                  <span>Oct 15</span>
                  <span>Oct 20</span>
                  <span>Oct 25</span>
                  <span>Oct 31</span>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Quick Actions */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0a0f1d] border border-white/[0.06] space-y-4 text-left">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Quick Actions</h3>
                <p className="text-xs text-slate-400">Add or edit content quickly</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    setModalItem(data?.hero);
                    setActiveModal("hero");
                  }}
                  className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <PenSquare className="w-5 h-5" />
                  <span>Edit Hero Section</span>
                </button>

                <button
                  onClick={() => {
                    setModalItem({
                      title: "",
                      description: "",
                      tags: ["Next.js", "Tailwind CSS"],
                      image: "/images/project_ecommerce.jpg",
                      liveUrl: "https://",
                      githubUrl: "https://",
                      status: "Published",
                      featured: true,
                    });
                    setActiveModal("edit_project");
                  }}
                  className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Project</span>
                </button>

                <button
                  onClick={() => {
                    setModalItem({
                      title: "",
                      excerpt: "",
                      content: "",
                      coverImage: "/images/project_ecommerce.jpg",
                      tags: ["Tech"],
                      status: "Published",
                      readTime: "5 min read",
                    });
                    setActiveModal("edit_blog");
                  }}
                  className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-400 text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <FileText className="w-5 h-5" />
                  <span>Write Blog Post</span>
                </button>

                <button
                  onClick={() => setActiveModal("skills_manager")}
                  className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <Layers className="w-5 h-5" />
                  <span>Update Skills</span>
                </button>

                <button
                  onClick={() => setActiveModal("services_manager")}
                  className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-400 text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <Shield className="w-5 h-5" />
                  <span>Manage Services</span>
                </button>

                <button
                  onClick={() => setActiveModal("messages_manager")}
                  className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20 text-pink-400 text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  <span>View Messages</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Rows: Recent Projects, Recent Blogs, Recent Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {/* 1. Recent Projects */}
            <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white tracking-tight">Recent Projects</h3>
                <button
                  onClick={() => setActiveModal("projects_manager")}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-3">
                {data?.projects?.slice(0, 5).map((project: any) => (
                  <div
                    key={project._id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-800">
                        <Image
                          src={project.image || "/images/project_ecommerce.jpg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white line-clamp-1">
                          {project.title}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-medium">
                          {project.status || "Published"}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setModalItem(project);
                        setActiveModal("edit_project");
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Recent Blog Posts */}
            <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white tracking-tight">Recent Blog Posts</h3>
                <button
                  onClick={() => setActiveModal("blogs_manager")}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-3">
                {data?.blogs?.slice(0, 5).map((blog: any) => (
                  <div
                    key={blog._id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-800">
                        <Image
                          src={blog.coverImage || "/images/project_ecommerce.jpg"}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white line-clamp-1">{blog.title}</div>
                        <div className="text-[10px] text-emerald-400 font-medium">Published</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setModalItem(blog);
                        setActiveModal("edit_blog");
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Recent Messages */}
            <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white tracking-tight">Recent Messages</h3>
                <button
                  onClick={() => setActiveModal("messages_manager")}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-3">
                {data?.messages
                  ?.slice()
                  ?.sort(
                    (a: any, b: any) =>
                      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
                  )
                  ?.slice(0, 5)
                  ?.map((msg: any) => (
                    <div
                      key={msg._id}
                      className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                        msg.isRead
                          ? "bg-white/[0.01] border-white/[0.04]"
                          : "bg-blue-500/[0.08] border-blue-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                          {msg.name?.slice(0, 2) || "U"}
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                            <span>{msg.name}</span>
                            {!msg.isRead && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {msg.message}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSave("messages", "markRead", {}, msg._id)}
                        title="Mark as read"
                        className="p-1 text-slate-400 hover:text-emerald-400 shrink-0"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid: Site Content Management (10 Cards from Screenshot 2) */}
          <div className="space-y-4 text-left">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Site Content Management
              </h3>
              <p className="text-xs text-slate-400">
                Manage all sections of your portfolio website from one place. Everything updates directly in MongoDB Atlas.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
              {/* 1. Hero */}
              <button
                onClick={() => {
                  setModalItem(data?.hero);
                  setActiveModal("hero");
                }}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-blue-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Hero Section</div>
                <span className="text-[10px] text-slate-400">Edit content &gt;</span>
              </button>

              {/* 2. About */}
              <button
                onClick={() => {
                  setModalItem(data?.about);
                  setActiveModal("about");
                }}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-emerald-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">About Section</div>
                <span className="text-[10px] text-slate-400">Edit content &gt;</span>
              </button>

              {/* 3. Skills */}
              <button
                onClick={() => setActiveModal("skills_manager")}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-amber-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Skills</div>
                <span className="text-[10px] text-slate-400">Manage skills &gt;</span>
              </button>

              {/* 4. Services */}
              <button
                onClick={() => setActiveModal("services_manager")}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-purple-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Services</div>
                <span className="text-[10px] text-slate-400">Manage services &gt;</span>
              </button>

              {/* 5. Projects */}
              <button
                onClick={() => setActiveModal("projects_manager")}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Projects</div>
                <span className="text-[10px] text-slate-400">Manage projects &gt;</span>
              </button>

              {/* 6. Blog */}
              <button
                onClick={() => setActiveModal("blogs_manager")}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-emerald-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Blog</div>
                <span className="text-[10px] text-slate-400">Manage posts &gt;</span>
              </button>

              {/* 7. Testimonials */}
              <button
                onClick={() => setActiveModal("testimonials_manager")}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-pink-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Testimonials</div>
                <span className="text-[10px] text-slate-400">Edit testimonials &gt;</span>
              </button>

              {/* 8. Work Experience */}
              <button
                onClick={() => setActiveModal("experience_manager")}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-indigo-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Work Experience</div>
                <span className="text-[10px] text-slate-400">Manage timeline &gt;</span>
              </button>

              {/* 9. Contact Info */}
              <button
                onClick={() => {
                  setModalItem(data?.settings);
                  setActiveModal("settings");
                }}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Contact Info</div>
                <span className="text-[10px] text-slate-400">Edit details &gt;</span>
              </button>

              {/* 10. Site Settings */}
              <button
                onClick={() => {
                  setModalItem(data?.settings);
                  setActiveModal("settings");
                }}
                className="p-4 rounded-2xl bg-[#0a0f1d] border border-white/[0.06] hover:border-blue-500/40 hover:bg-[#12192b] transition-all flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Settings className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Site Settings</div>
                <span className="text-[10px] text-slate-400">General settings &gt;</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ================= MODALS & EDITORS ================= */}

      {/* 1. Hero Editor Modal with Direct Image / Media Upload */}
      {activeModal === "hero" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Edit Hero Section (Direct Uploads)</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Image Upload Field */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-5">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-white/10">
                <Image
                  src={modalItem?.heroImage || "/images/siam_portrait.jpg"}
                  alt="Hero Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 flex-1">
                <div className="text-xs font-bold text-white">Hero Portrait Image</div>
                <p className="text-[11px] text-slate-400">Upload high-res photo from your device directly</p>
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-blue-400 text-xs font-semibold transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? "Uploading..." : "Upload New Photo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "heroImage")}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={modalItem?.name || ""}
                  onChange={(e) => setModalItem({ ...modalItem, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Highlighted Name (Blue Gradient)
                </label>
                <input
                  type="text"
                  value={modalItem?.highlightedName || ""}
                  onChange={(e) =>
                    setModalItem({ ...modalItem, highlightedName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={modalItem?.title || ""}
                  onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    Intro Video (YouTube or MP4 Video)
                  </label>
                  <label className="cursor-pointer text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>{uploading ? "Uploading Video..." : "Direct Video Upload"}</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "introVideoUrl")}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Paste YouTube link or upload MP4 above"
                  value={modalItem?.introVideoUrl || ""}
                  onChange={(e) =>
                    setModalItem({ ...modalItem, introVideoUrl: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>


              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Years Experience
                </label>
                <input
                  type="text"
                  value={modalItem?.yearsExperience || ""}
                  onChange={(e) =>
                    setModalItem({ ...modalItem, yearsExperience: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Projects Completed
                </label>
                <input
                  type="text"
                  value={modalItem?.projectsCompleted || ""}
                  onChange={(e) =>
                    setModalItem({ ...modalItem, projectsCompleted: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Happy Clients
                </label>
                <input
                  type="text"
                  value={modalItem?.happyClients || ""}
                  onChange={(e) =>
                    setModalItem({ ...modalItem, happyClients: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  GitHub Profile Link
                </label>
                <input
                  type="text"
                  value={modalItem?.githubUrl || ""}
                  onChange={(e) => setModalItem({ ...modalItem, githubUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Bio Description
              </label>
              <textarea
                rows={3}
                value={modalItem?.bio || ""}
                onChange={(e) => setModalItem({ ...modalItem, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={saving || uploading}
                onClick={() => handleSave("hero", "update", modalItem)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save to MongoDB</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. About Editor Modal with Direct Photo & CV PDF Upload */}
      {activeModal === "about" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Edit About Section</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Uploads Row: Photo and CV */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Working Photo */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="text-xs font-bold text-white">About Section Photo</div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                  <Image
                    src={modalItem?.image || "/images/siam_working.jpg"}
                    alt="About Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <label className="cursor-pointer flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-blue-400 text-xs font-semibold transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? "Uploading..." : "Upload New Photo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "image")}
                  />
                </label>
              </div>

              {/* CV / Resume PDF Upload */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Curriculum Vitae (PDF)</div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Directly upload your updated resume PDF for visitors to download.
                  </p>
                  <div className="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 break-all font-mono">
                    {modalItem?.cvUrl || "No file uploaded yet"}
                  </div>
                </div>

                <label className="cursor-pointer flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all">
                  <FileUp className="w-3.5 h-3.5" />
                  <span>{uploading ? "Uploading..." : "Upload Resume PDF"}</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "cvUrl")}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Heading</label>
              <input
                type="text"
                value={modalItem?.heading || ""}
                onChange={(e) => setModalItem({ ...modalItem, heading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Bio Description
              </label>
              <textarea
                rows={4}
                value={modalItem?.bio || ""}
                onChange={(e) => setModalItem({ ...modalItem, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Floating Highlight Badge
              </label>
              <input
                type="text"
                value={modalItem?.highlightTag || ""}
                onChange={(e) => setModalItem({ ...modalItem, highlightTag: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={saving || uploading}
                onClick={() => handleSave("about", "update", modalItem)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save to MongoDB</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Projects Manager Modal with Direct Upload & CRUD */}
      {activeModal === "projects_manager" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Manage Projects</h3>
                <p className="text-xs text-slate-400">Add, edit, or delete portfolio projects</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setModalItem({
                      title: "",
                      description: "",
                      tags: ["Next.js", "Tailwind CSS"],
                      image: "/images/project_ecommerce.jpg",
                      liveUrl: "https://",
                      githubUrl: "https://",
                      status: "Published",
                      featured: true,
                    });
                    setActiveModal("edit_project");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Project</span>
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.projects?.map((proj: any) => (
                <div
                  key={proj._id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800">
                      <Image
                        src={proj.image || "/images/project_ecommerce.jpg"}
                        alt={proj.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{proj.title}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">
                        {proj.tags?.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setModalItem(proj);
                        setActiveModal("edit_project");
                      }}
                      className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          handleSave("projects", "delete", {}, proj._id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit / Create Project with Direct Image Upload */}
      {activeModal === "edit_project" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {modalItem?._id ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setActiveModal("projects_manager")}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Thumbnail Upload */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-4">
              <div className="relative w-20 aspect-video rounded-xl overflow-hidden bg-slate-800 shrink-0">
                <Image
                  src={modalItem?.image || "/images/project_ecommerce.jpg"}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-xs font-bold text-white">Project Thumbnail</div>
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-blue-400 text-xs font-semibold transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? "Uploading..." : "Upload Project Image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "image")}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={modalItem?.title || ""}
                onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={Array.isArray(modalItem?.tags) ? modalItem.tags.join(", ") : modalItem?.tags || ""}
                onChange={(e) =>
                  setModalItem({
                    ...modalItem,
                    tags: e.target.value.split(",").map((s: string) => s.trim()),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Live Preview URL
                </label>
                <input
                  type="text"
                  value={modalItem?.liveUrl || ""}
                  onChange={(e) => setModalItem({ ...modalItem, liveUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  GitHub URL
                </label>
                <input
                  type="text"
                  value={modalItem?.githubUrl || ""}
                  onChange={(e) => setModalItem({ ...modalItem, githubUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={modalItem?.status || "Published"}
                  onChange={(e) => setModalItem({ ...modalItem, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#101726] border border-white/10 text-xs text-white"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Featured</label>
                <select
                  value={modalItem?.featured ? "true" : "false"}
                  onChange={(e) =>
                    setModalItem({ ...modalItem, featured: e.target.value === "true" })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#101726] border border-white/10 text-xs text-white"
                >
                  <option value="true">Yes (Show on Homepage)</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={modalItem?.description || ""}
                onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setActiveModal("projects_manager")}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                disabled={saving || uploading}
                onClick={() =>
                  handleSave(
                    "projects",
                    modalItem?._id ? "update" : "create",
                    modalItem,
                    modalItem?._id
                  )
                }
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Project</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Blog Posts Manager Modal */}
      {activeModal === "blogs_manager" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Manage Blog Posts</h3>
                <p className="text-xs text-slate-400">Publish, edit, or delete articles</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setModalItem({
                      title: "",
                      excerpt: "",
                      content: "",
                      coverImage: "/images/project_ecommerce.jpg",
                      tags: ["Web Dev"],
                      status: "Published",
                      readTime: "5 min read",
                    });
                    setActiveModal("edit_blog");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write Post</span>
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.blogs?.map((blog: any) => (
                <div
                  key={blog._id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800">
                      <Image
                        src={blog.coverImage || "/images/project_ecommerce.jpg"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{blog.title}</div>
                      <div className="text-[10px] text-slate-400">{blog.readTime || "5 min read"}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setModalItem(blog);
                        setActiveModal("edit_blog");
                      }}
                      className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete blog "${blog.title}"?`)) {
                          handleSave("blogs", "delete", {}, blog._id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Edit / Create Blog Post with Cover Upload */}
      {activeModal === "edit_blog" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {modalItem?._id ? "Edit Blog Post" : "Write Blog Post"}
              </h3>
              <button
                onClick={() => setActiveModal("blogs_manager")}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cover Upload */}
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-4">
              <div className="relative w-20 aspect-video rounded-xl overflow-hidden bg-slate-800 shrink-0">
                <Image
                  src={modalItem?.coverImage || "/images/project_ecommerce.jpg"}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-xs font-bold text-white">Article Cover Image</div>
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 text-purple-400 text-xs font-semibold transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? "Uploading..." : "Upload Cover Image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "coverImage")}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Post Title *
              </label>
              <input
                type="text"
                value={modalItem?.title || ""}
                onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Read Time</label>
                <input
                  type="text"
                  value={modalItem?.readTime || "5 min read"}
                  onChange={(e) => setModalItem({ ...modalItem, readTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={modalItem?.status || "Published"}
                  onChange={(e) => setModalItem({ ...modalItem, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#101726] border border-white/10 text-xs text-white"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Excerpt (Short summary)
              </label>
              <textarea
                rows={2}
                value={modalItem?.excerpt || ""}
                onChange={(e) => setModalItem({ ...modalItem, excerpt: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Article Content
              </label>
              <textarea
                rows={5}
                value={modalItem?.content || ""}
                onChange={(e) => setModalItem({ ...modalItem, content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setActiveModal("blogs_manager")}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                disabled={saving || uploading}
                onClick={() =>
                  handleSave(
                    "blogs",
                    modalItem?._id ? "update" : "create",
                    modalItem,
                    modalItem?._id
                  )
                }
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Article</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Work Experience Manager Modal */}
      {activeModal === "experience_manager" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Work Experience Journey</h3>
                <p className="text-xs text-slate-400">Manage professional timeline entries</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {data?.experience?.map((exp: any) => (
                <div
                  key={exp._id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{exp.role}</span>
                      <span className="text-blue-400">({exp.period})</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{exp.company}</div>
                    <p className="text-xs text-slate-300 pt-1">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Delete timeline item "${exp.role}"?`)) {
                        handleSave("experience", "delete", {}, exp._id);
                      }
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new experience */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="text-xs font-bold text-white">Add New Experience Node</div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  id="newExpPeriod"
                  type="text"
                  placeholder="Period (e.g. 2024 - Present)"
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
                <input
                  id="newExpRole"
                  type="text"
                  placeholder="Role (e.g. Senior Frontend Dev)"
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>
              <input
                id="newExpCompany"
                type="text"
                placeholder="Company / Client (e.g. Remote Agency)"
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
              <textarea
                id="newExpDesc"
                rows={2}
                placeholder="Description of responsibilities and achievements..."
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white resize-none"
              />
              <button
                onClick={() => {
                  const period = (document.getElementById("newExpPeriod") as HTMLInputElement)?.value;
                  const role = (document.getElementById("newExpRole") as HTMLInputElement)?.value;
                  const company = (document.getElementById("newExpCompany") as HTMLInputElement)?.value;
                  const description = (document.getElementById("newExpDesc") as HTMLTextAreaElement)?.value;
                  if (period && role && description) {
                    handleSave("experience", "create", { period, role, company, description });
                  } else {
                    alert("Please fill in Period, Role, and Description");
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
              >
                Add to Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Testimonials Manager Modal with Avatar Upload */}
      {activeModal === "testimonials_manager" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Client Testimonials</h3>
                <p className="text-xs text-slate-400">Manage client reviews and star ratings</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {data?.testimonials?.map((t: any) => (
                <div
                  key={t._id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                      <Image src={t.avatar || "/images/siam_portrait.jpg"} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{t.name} ({t.role})</div>
                      <div className="text-[11px] text-slate-400 italic">&ldquo;{t.content}&rdquo;</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Delete testimonial from "${t.name}"?`)) {
                        handleSave("testimonials", "delete", {}, t._id);
                      }
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new testimonial */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="text-xs font-bold text-white">Add New Client Testimonial</div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  id="newTestName"
                  type="text"
                  placeholder="Client Name (e.g. David Miller)"
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
                <input
                  id="newTestRole"
                  type="text"
                  placeholder="Role (e.g. CEO, TechCorp)"
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="newTestAvatar"
                  type="text"
                  placeholder="Avatar URL (or upload image to right)"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
                <label className="cursor-pointer px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-blue-400 text-xs font-semibold flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Avatar</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const form = new FormData();
                      form.append("file", file);
                      const res = await fetch("/api/upload", { method: "POST", body: form });
                      const d = await res.json();
                      if (d.success) {
                        const input = document.getElementById("newTestAvatar") as HTMLInputElement;
                        if (input) input.value = d.url;
                        showToast("Client avatar uploaded to database!");
                      }
                    }}
                  />
                </label>
              </div>
              <textarea
                id="newTestContent"
                rows={2}
                placeholder="Client quote / review message..."
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white resize-none"
              />
              <button
                onClick={() => {
                  const name = (document.getElementById("newTestName") as HTMLInputElement)?.value;
                  const role = (document.getElementById("newTestRole") as HTMLInputElement)?.value;
                  const content = (document.getElementById("newTestContent") as HTMLTextAreaElement)?.value;
                  const avatar = (document.getElementById("newTestAvatar") as HTMLInputElement)?.value;
                  if (name && content) {
                    handleSave("testimonials", "create", {
                      name,
                      role: role || "Client",
                      content,
                      rating: 5,
                      avatar: avatar || "/images/siam_portrait.jpg",
                    });
                  } else {
                    alert("Please provide client name and review content");
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold"
              >
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Services Manager Modal */}
      {activeModal === "services_manager" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Manage Services</h3>
                <p className="text-xs text-slate-400">Offerings shown in the services section</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {data?.services?.map((svc: any) => (
                <div
                  key={svc._id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{svc.title}</div>
                    <div className="text-[11px] text-slate-400">{svc.description}</div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Delete service "${svc.title}"?`)) {
                        handleSave("services", "delete", {}, svc._id);
                      }
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Service */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="text-xs font-bold text-white">Add New Service Offering</div>
              <input
                id="newSvcTitle"
                type="text"
                placeholder="Service Title (e.g. Cloud Architecture)"
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
              <textarea
                id="newSvcDesc"
                rows={2}
                placeholder="Short description of the service..."
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white resize-none"
              />
              <button
                onClick={() => {
                  const title = (document.getElementById("newSvcTitle") as HTMLInputElement)?.value;
                  const description = (document.getElementById("newSvcDesc") as HTMLTextAreaElement)?.value;
                  if (title && description) {
                    handleSave("services", "create", { title, description, icon: "layout", linkText: "Learn More" });
                  } else {
                    alert("Please provide title and description");
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. Skills Manager Modal */}
      {activeModal === "skills_manager" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Manage Skills (MongoDB)</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {data?.skills?.map((skill: any) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="text-xs font-bold text-white">{skill.name}</span>
                  <button
                    onClick={() => {
                      if (confirm(`Delete skill "${skill.name}"?`)) {
                        handleSave("skills", "delete", {}, skill._id);
                      }
                    }}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-2">
              <input
                id="newSkillName"
                type="text"
                placeholder="New skill name (e.g. Next.js, GraphQL, Docker)"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
              <button
                onClick={() => {
                  const input = document.getElementById("newSkillName") as HTMLInputElement;
                  if (input && input.value) {
                    handleSave("skills", "create", {
                      name: input.value,
                      category: "Frontend",
                      icon: input.value.toLowerCase(),
                      color: "#3b82f6",
                    });
                    input.value = "";
                  }
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. Messages Manager Modal */}
      {activeModal === "messages_manager" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Contact Inquiries</h3>
                <p className="text-xs text-slate-400">Live messages from your portfolio contact form</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {data?.messages
                ?.slice()
                ?.sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
                )
                ?.map((msg: any) => (
                  <div
                    key={msg._id}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      msg.isRead
                        ? "bg-white/[0.02] border-white/[0.05]"
                        : "bg-blue-500/[0.08] border-blue-500/30"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/[0.06] gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-white">{msg.name}</span>
                          <span className="text-xs text-slate-400">({msg.email})</span>
                          {!msg.isRead && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              NEW
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-cyan-400 px-2 py-0.5 rounded-md bg-cyan-500/10">
                            {msg.projectType}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 pt-1">
                          Received: {msg.createdAt ? new Date(msg.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recent"}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {!msg.isRead && (
                          <button
                            onClick={() => handleSave("messages", "markRead", {}, msg._id)}
                            className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Read</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm("Delete this message?")) {
                              handleSave("messages", "delete", {}, msg._id);
                            }
                          }}
                          className="text-slate-400 hover:text-rose-400 p-1 rounded-lg hover:bg-white/[0.05]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  <p className="text-xs text-slate-300 pt-3 leading-relaxed whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 11.5 Newsletter Subscribers Manager Modal */}
      {activeModal === "subscribers_manager" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-cyan-400" />
                  <span>Newsletter Subscribers</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Total Subscribers: {data?.settings?.subscribers?.length || 0}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {data?.settings?.subscribers && data.settings.subscribers.length > 0 && (
                  <button
                    onClick={() => {
                      const emails = data.settings.subscribers.map((s: any) => s.email).join(", ");
                      navigator.clipboard.writeText(emails);
                      setCopiedEmails(true);
                      showToast("All subscriber emails copied to clipboard!");
                      setTimeout(() => setCopiedEmails(false), 2500);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/25 text-cyan-400 text-xs font-semibold transition-all"
                  >
                    {copiedEmails ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Subscribers List */}
            <div className="space-y-3">
              {(!data?.settings?.subscribers || data.settings.subscribers.length === 0) ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                    <Send className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-300">No subscribers yet</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When visitors submit the newsletter form in the footer, their email address will appear here.
                  </p>
                </div>
              ) : (
                data.settings.subscribers
                  .slice()
                  .reverse()
                  .map((sub: any, idx: number) => (
                    <div
                      key={sub.email || idx}
                      className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white tracking-wide">{sub.email}</div>
                          <div className="text-[10px] text-slate-400">
                            Subscribed:{" "}
                            {sub.date
                              ? new Date(sub.date).toLocaleString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Recently"}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Remove subscriber "${sub.email}"?`)) {
                            handleSave("subscribers", "delete", { email: sub.email });
                          }
                        }}
                        className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors"
                        title="Delete Subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 12. Site Settings & SEO Modal */}
      {activeModal === "settings" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">General &amp; SEO Settings</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Site Name / Brand
              </label>
              <input
                type="text"
                value={modalItem?.siteName || ""}
                onChange={(e) => setModalItem({ ...modalItem, siteName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                <input
                  type="text"
                  value={modalItem?.email || ""}
                  onChange={(e) => setModalItem({ ...modalItem, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                <input
                  type="text"
                  value={modalItem?.phone || ""}
                  onChange={(e) => setModalItem({ ...modalItem, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={modalItem?.location || ""}
                onChange={(e) => setModalItem({ ...modalItem, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={modalItem?.metaTitle || ""}
                onChange={(e) => setModalItem({ ...modalItem, metaTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                SEO Meta Description
              </label>
              <textarea
                rows={3}
                value={modalItem?.metaDescription || ""}
                onChange={(e) =>
                  setModalItem({ ...modalItem, metaDescription: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={modalItem?.copyrightText || ""}
                onChange={(e) =>
                  setModalItem({ ...modalItem, copyrightText: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                onClick={() => handleSave("settings", "update", modalItem)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 13. Media Library Modal with Direct Upload */}
      {activeModal === "media_library" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#0d1322] border border-white/10 rounded-3xl p-7 shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Media Library &amp; Direct Upload</h3>
                <p className="text-xs text-slate-400">Upload and manage images, PDFs, and video assets</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Media Upload Bar */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-white">Upload Any Media Asset</div>
                <div className="text-[11px] text-slate-400">PNG, JPG, WEBP, SVG, PDF (CV), MP4 (Videos)</div>
              </div>

              <label className="cursor-pointer px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <Upload className="w-4 h-4" />
                <span>{uploading ? "Uploading..." : "Upload File"}</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    const form = new FormData();
                    form.append("file", file);
                    try {
                      const res = await fetch("/api/upload", { method: "POST", body: form });
                      const d = await res.json();
                      if (d.success) {
                        navigator.clipboard.writeText(d.url);
                        showToast(`Uploaded directly to database & copied URL: ${d.url}`);
                        await fetchData();
                      } else {
                        alert(d.message);
                      }
                    } catch (err: any) {
                      alert(err.message);
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
              </label>
            </div>

            {/* Uploaded Media from MongoDB */}
            {data?.media && data.media.length > 0 ? (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400">
                  Files Stored in MongoDB ({data.media.length})
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {data.media.map((item: any) => {
                    const isImg = item.fileType === "image" || item.contentType?.startsWith("image/");
                    const isPdf = item.fileType === "pdf" || item.contentType?.includes("pdf");
                    const isVid = item.fileType === "video" || item.contentType?.startsWith("video/");
                    const sizeKb = Math.round((item.size || 0) / 1024);

                    return (
                      <div
                        key={item._id || item.id}
                        className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-2 group"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/5 flex items-center justify-center">
                          {isImg ? (
                            <Image src={item.url} alt={item.originalName || item.filename} fill className="object-cover" />
                          ) : isPdf ? (
                            <div className="flex flex-col items-center gap-1 text-rose-400">
                              <FileText className="w-8 h-8" />
                              <span className="text-[10px] font-bold">PDF Document</span>
                            </div>
                          ) : isVid ? (
                            <div className="flex flex-col items-center gap-1 text-purple-400">
                              <Play className="w-8 h-8" />
                              <span className="text-[10px] font-bold">Video File</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1 text-cyan-400">
                              <FileUp className="w-8 h-8" />
                              <span className="text-[10px] font-bold">Asset</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-white truncate" title={item.originalName || item.filename}>
                            {item.originalName || item.filename}
                          </div>
                          <div className="text-[10px] text-slate-400">{sizeKb} KB • Stored in DB</div>
                        </div>

                        <div className="flex items-center gap-1.5 pt-1">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.url);
                              showToast(`Copied ${item.url} to clipboard!`);
                            }}
                            className="flex-1 py-1.5 text-[11px] rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-semibold transition-colors"
                          >
                            Copy URL
                          </button>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 hover:text-white"
                            title="Open in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={async () => {
                              if (confirm(`Delete "${item.originalName || item.filename}" from MongoDB?`)) {
                                await handleSave("media", "delete", {}, item._id || item.id);
                                await fetchData();
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Starter sample gallery if no database files uploaded yet */
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400">Starter Assets Gallery</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: "Siam Hero Portrait", path: "/images/siam_portrait.jpg" },
                    { name: "Siam Working Laptop", path: "/images/siam_working.jpg" },
                    { name: "E-Commerce Mockup", path: "/images/project_ecommerce.jpg" },
                    { name: "Task App Mockup", path: "/images/project_taskapp.jpg" },
                  ].map((img, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                        <Image src={img.path} alt={img.name} fill className="object-cover" />
                      </div>
                      <div className="text-[11px] font-bold text-white truncate">{img.name}</div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(img.path);
                          showToast(`Copied ${img.path} to clipboard!`);
                        }}
                        className="w-full py-1 text-[10px] rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-blue-400 font-semibold"
                      >
                        Copy Path
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
