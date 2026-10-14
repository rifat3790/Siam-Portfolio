import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Message } from "@/models";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, email, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      name,
      email,
      projectType: projectType || "Web Development",
      message,
      isRead: false,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! Siam will get back to you soon.",
      data: newMessage,
    });
  } catch (error: any) {
    console.error("Error creating contact message:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send message" },
      { status: 500 }
    );
  }
}
