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
  SiteSettings,
} from "@/models";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureDataSeeded();

    const [hero, about, skills, services, projects, blogs, experience, testimonials, settings] =
      await Promise.all([
        Hero.findOne().lean(),
        About.findOne().lean(),
        Skill.find().sort({ order: 1 }).lean(),
        Service.find().sort({ order: 1 }).lean(),
        Project.find({ status: "Published" }).sort({ order: 1 }).lean(),
        BlogPost.find({ status: "Published" }).sort({ publishedAt: -1 }).lean(),
        Experience.find().sort({ order: 1 }).lean(),
        Testimonial.find().sort({ order: 1 }).lean(),
        SiteSettings.findOneAndUpdate({}, { $inc: { viewsCount: 1 } }, { new: true, upsert: true }).lean(),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        hero,
        about,
        skills,
        services,
        projects,
        blogs,
        experience,
        testimonials,
        settings,
      },
    });
  } catch (error: any) {
    console.error("Error fetching portfolio content from MongoDB, returning default:", error);
    return NextResponse.json({
      success: true,
      data: DEFAULT_PORTFOLIO_DATA,
    });
  }
}
