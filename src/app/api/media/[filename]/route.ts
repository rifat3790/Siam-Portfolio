import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { MediaFile } from "@/models";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename) {
      return new NextResponse("Filename is required", { status: 400 });
    }

    await connectToDatabase();
    const media = await MediaFile.findOne({ filename }).lean();

    if (!media || !media.data) {
      return new NextResponse("Media file not found in database", { status: 404 });
    }

    // data is stored as a base64 string (either with or without data: URI prefix)
    let base64String = media.data;
    if (base64String.includes(",")) {
      base64String = base64String.split(",")[1];
    }

    const buffer = Buffer.from(base64String, "base64");

    const contentType = media.contentType || "application/octet-stream";
    const isPdf = contentType.includes("pdf");
    const isImage = contentType.startsWith("image/");
    const isVideo = contentType.startsWith("video/");

    // Set appropriate disposition and caching
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Length", buffer.length.toString());
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    // Inline display for images, PDFs, and videos so browser displays them directly
    if (isPdf || isImage || isVideo) {
      headers.set("Content-Disposition", `inline; filename="${media.originalName || filename}"`);
    } else {
      headers.set("Content-Disposition", `attachment; filename="${media.originalName || filename}"`);
    }

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("Error retrieving media from database:", error);
    return new NextResponse("Error retrieving file: " + error.message, { status: 500 });
  }
}
