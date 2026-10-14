import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettings } from "@/models";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Fetch current settings
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({
        siteName: "Siam.",
        viewsCount: 1240,
        analyticsHistory: [],
      });
    }

    // Check if entry for today exists
    const history = settings.analyticsHistory || [];
    const todayIndex = history.findIndex((item) => item.date === today);

    if (todayIndex >= 0) {
      history[todayIndex].views = (history[todayIndex].views || 0) + 1;
      // Increment visitors occasionally or keep proportional
      if (Math.random() > 0.3) {
        history[todayIndex].visitors = (history[todayIndex].visitors || 0) + 1;
      }
    } else {
      history.push({
        date: today,
        views: 1,
        visitors: 1,
      });
    }

    // Keep only last 120 days of analytics to prevent document bloat
    if (history.length > 120) {
      history.splice(0, history.length - 120);
    }

    settings.viewsCount = (settings.viewsCount || 0) + 1;
    settings.analyticsHistory = history;
    await settings.save();

    return NextResponse.json({
      success: true,
      viewsCount: settings.viewsCount,
    });
  } catch (error: any) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
