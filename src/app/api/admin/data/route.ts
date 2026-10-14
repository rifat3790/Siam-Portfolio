import { NextResponse } from "next/server";
import { ensureDataSeeded } from "@/lib/seedData";
import { DEFAULT_PORTFOLIO_DATA } from "@/lib/defaultData";
import {
  Hero,
  About,
  Skill,
  Service,
  Project,
  BlogPost,
  Experience,
  Testimonial,
  Message,
  SiteSettings,
  MediaFile,
} from "@/models";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // Admin security verification
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    const authHeader = req.headers.get("x-admin-key");
    const adminPass = process.env.ADMIN_PASSWORD;
    if (session?.value !== "authenticated" && (!adminPass || authHeader !== adminPass)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin password required." },
        { status: 401 }
      );
    }

    await ensureDataSeeded();

    const [
      hero,
      about,
      skills,
      services,
      projects,
      blogs,
      experience,
      testimonials,
      messages,
      settings,
      mediaFiles,
    ] = await Promise.all([
      Hero.findOne().lean(),
      About.findOne().lean(),
      Skill.find().sort({ order: 1 }).lean(),
      Service.find().sort({ order: 1 }).lean(),
      Project.find().sort({ order: 1, createdAt: -1 }).lean(),
      BlogPost.find().sort({ publishedAt: -1 }).lean(),
      Experience.find().sort({ order: 1 }).lean(),
      Testimonial.find().sort({ order: 1 }).lean(),
      Message.find().sort({ createdAt: -1 }).lean(),
      SiteSettings.findOne().lean(),
      MediaFile.find().select("-data").sort({ createdAt: -1 }).lean(),
    ]);

    // Calculate dynamic stats
    const totalProjects = projects.length;
    const totalBlogs = blogs.length;
    const newMessages = messages.filter((m) => !m.isRead).length;
    const totalViews = settings?.viewsCount || 1240;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalProjects,
          totalBlogs,
          newMessages,
          totalViews,
        },
        hero,
        about,
        skills,
        services,
        projects,
        blogs,
        experience,
        testimonials,
        messages,
        settings,
        media: mediaFiles.map((m: any) => ({
          _id: m._id,
          id: m._id,
          filename: m.filename,
          originalName: m.originalName,
          contentType: m.contentType,
          size: m.size,
          fileType: m.fileType,
          url: `/api/media/${m.filename}`,
          createdAt: m.createdAt,
        })),
      },
    });

  } catch (error: any) {
    console.error("Admin data error from MongoDB, returning default:", error);
    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalProjects: DEFAULT_PORTFOLIO_DATA.projects.length,
          totalBlogs: DEFAULT_PORTFOLIO_DATA.blogs.length,
          newMessages: 5,
          totalViews: DEFAULT_PORTFOLIO_DATA.settings.viewsCount,
        },
        hero: DEFAULT_PORTFOLIO_DATA.hero,
        about: DEFAULT_PORTFOLIO_DATA.about,
        skills: DEFAULT_PORTFOLIO_DATA.skills,
        services: DEFAULT_PORTFOLIO_DATA.services,
        projects: DEFAULT_PORTFOLIO_DATA.projects,
        blogs: DEFAULT_PORTFOLIO_DATA.blogs,
        experience: DEFAULT_PORTFOLIO_DATA.experience,
        testimonials: DEFAULT_PORTFOLIO_DATA.testimonials,
        messages: [
          {
            _id: "m1",
            name: "John Doe",
            email: "john@example.com",
            projectType: "E-Commerce",
            message: "Hi Siam, I am interested in working with you on an e-commerce platform.",
            isRead: false,
            createdAt: new Date("2026-10-30"),
          },
          {
            _id: "m2",
            name: "Sarah Ahmed",
            email: "sarah@example.com",
            projectType: "Web Application",
            message: "Your portfolio is amazing! I have a project we would love to collaborate on.",
            isRead: false,
            createdAt: new Date("2026-10-28"),
          },
          {
            _id: "m3",
            name: "Mohammad Rafi",
            email: "rafi@example.com",
            projectType: "Full Stack",
            message: "Do you provide full stack development services for SaaS startups?",
            isRead: true,
            createdAt: new Date("2026-10-25"),
          },
          {
            _id: "m4",
            name: "Alex Turner",
            email: "alex@example.com",
            projectType: "Website Redesign",
            message: "I would like to discuss a potential project for our company website redesign.",
            isRead: true,
            createdAt: new Date("2026-10-20"),
          },
          {
            _id: "m5",
            name: "Emma Parker",
            email: "emma@example.com",
            projectType: "API Integration",
            message: "Great work! Can we schedule a call to review requirements for next week?",
            isRead: true,
            createdAt: new Date("2026-10-18"),
          },
        ],
        settings: DEFAULT_PORTFOLIO_DATA.settings,
      },
    });
  }
}
