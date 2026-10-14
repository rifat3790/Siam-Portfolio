import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { connectToDatabase } from "@/lib/mongodb";
import { MediaFile } from "@/models";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// GET: List all media files stored in MongoDB
export async function GET() {
  try {
    await connectToDatabase();
    const mediaFiles = await MediaFile.find()
      .select("-data") // Exclude big base64 string for fast listing
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      media: mediaFiles.map((m: any) => ({
        id: m._id,
        filename: m.filename,
        originalName: m.originalName,
        contentType: m.contentType,
        size: m.size,
        fileType: m.fileType,
        url: `/api/media/${m.filename}`,
        createdAt: m.createdAt,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch media list" },
      { status: 500 }
    );
  }
}

// POST: Upload file directly to MongoDB and local filesystem fallback
export async function POST(req: Request) {
  try {
    // Check admin authentication session
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    const authHeader = req.headers.get("x-admin-key");
    const adminPass = process.env.ADMIN_PASSWORD;
    const isSessionValid = session?.value === "authenticated" || (!!adminPass && authHeader === adminPass);

    if (!isSessionValid) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin password required to upload." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file was uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString("base64");

    // Clean filename and make unique
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `${timestamp}_${cleanName}`;

    // Determine type
    let fileType: "image" | "pdf" | "video" | "document" | "other" = "other";
    const mime = file.type.toLowerCase();
    if (mime.startsWith("image/")) fileType = "image";
    else if (mime.includes("pdf")) fileType = "pdf";
    else if (mime.startsWith("video/")) fileType = "video";
    else if (mime.includes("text") || mime.includes("document") || mime.includes("msword")) fileType = "document";

    // 1. Save directly into MongoDB Database
    await connectToDatabase();
    await MediaFile.create({
      filename: uniqueFilename,
      originalName: file.name,
      contentType: file.type || "application/octet-stream",
      size: file.size,
      data: base64Data,
      fileType,
    });

    // 2. Best-effort write to public/uploads for local development speed
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueFilename);
      await writeFile(filePath, buffer);
    } catch (diskErr) {
      // Non-fatal on serverless (e.g., Vercel read-only filesystem)
      console.log("Filesystem write skipped (using database storage):", diskErr);
    }

    // Direct database serving URL
    const publicUrl = `/api/media/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      message: "File successfully saved directly to database!",
      url: publicUrl,
      filename: uniqueFilename,
      originalName: file.name,
      size: file.size,
      type: file.type,
      fileType,
    });
  } catch (error: any) {
    console.error("Direct DB upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to upload file to database" },
      { status: 500 }
    );
  }
}

// DELETE: Remove file from database
export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (session?.value !== "authenticated") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { filename, id } = await req.json();
    await connectToDatabase();

    if (id) {
      await MediaFile.findByIdAndDelete(id);
    } else if (filename) {
      await MediaFile.findOneAndDelete({ filename });
    }

    return NextResponse.json({ success: true, message: "File removed from database" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
