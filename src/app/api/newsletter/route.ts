import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettings } from "@/models";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await SiteSettings.findOneAndUpdate(
      {},
      {
        $addToSet: {
          subscribers: { email, date: new Date() },
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to Siam's newsletter!",
    });
  } catch (error: any) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}
