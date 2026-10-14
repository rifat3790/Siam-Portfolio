import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
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

export async function POST(req: Request) {
  try {
    // Strict authentication check
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

    await connectToDatabase();
    const body = await req.json();
    const { section, action, data, id } = body;


    if (!section) {
      return NextResponse.json({ success: false, message: "Section is required" }, { status: 400 });
    }

    let result: any = null;

    switch (section) {
      case "hero":
        result = await Hero.findOneAndUpdate({}, { $set: data }, { new: true, upsert: true });
        break;

      case "about":
        result = await About.findOneAndUpdate({}, { $set: data }, { new: true, upsert: true });
        break;

      case "settings":
        result = await SiteSettings.findOneAndUpdate({}, { $set: data }, { new: true, upsert: true });
        break;

      case "skills":
        if (action === "create") {
          result = await Skill.create(data);
        } else if (action === "update" && id) {
          result = await Skill.findByIdAndUpdate(id, data, { new: true });
        } else if (action === "delete" && id) {
          result = await Skill.findByIdAndDelete(id);
        }
        break;

      case "services":
        if (action === "create") {
          result = await Service.create(data);
        } else if (action === "update" && id) {
          result = await Service.findByIdAndUpdate(id, data, { new: true });
        } else if (action === "delete" && id) {
          result = await Service.findByIdAndDelete(id);
        }
        break;

      case "projects":
        if (action === "create") {
          result = await Project.create(data);
        } else if (action === "update" && id) {
          result = await Project.findByIdAndUpdate(id, data, { new: true });
        } else if (action === "delete" && id) {
          result = await Project.findByIdAndDelete(id);
        }
        break;

      case "blogs":
        if (action === "create") {
          if (!data.slug && data.title) {
            data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
          }
          result = await BlogPost.create(data);
        } else if (action === "update" && id) {
          result = await BlogPost.findByIdAndUpdate(id, data, { new: true });
        } else if (action === "delete" && id) {
          result = await BlogPost.findByIdAndDelete(id);
        }
        break;

      case "experience":
        if (action === "create") {
          result = await Experience.create(data);
        } else if (action === "update" && id) {
          result = await Experience.findByIdAndUpdate(id, data, { new: true });
        } else if (action === "delete" && id) {
          result = await Experience.findByIdAndDelete(id);
        }
        break;

      case "testimonials":
        if (action === "create") {
          result = await Testimonial.create(data);
        } else if (action === "update" && id) {
          result = await Testimonial.findByIdAndUpdate(id, data, { new: true });
        } else if (action === "delete" && id) {
          result = await Testimonial.findByIdAndDelete(id);
        }
        break;

      case "messages":
        if (action === "markRead" && id) {
          result = await Message.findByIdAndUpdate(id, { isRead: true }, { new: true });
        } else if (action === "delete" && id) {
          result = await Message.findByIdAndDelete(id);
        }
        break;

      case "media":
        if (action === "delete" && id) {
          result = await MediaFile.findByIdAndDelete(id);
        }
        break;

      case "subscribers":
        if (action === "delete" && data?.email) {
          result = await SiteSettings.findOneAndUpdate(
            {},
            { $pull: { subscribers: { email: data.email } } },
            { new: true }
          );
        }
        break;

      default:
        return NextResponse.json({ success: false, message: `Unknown section: ${section}` }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `${section} updated successfully!`,
      data: result,
    });
  } catch (error: any) {
    console.error("Mutation error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update" },
      { status: 500 }
    );
  }
}
