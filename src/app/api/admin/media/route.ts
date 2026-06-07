import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getCloudinaryConfigIssue, hasCloudinaryConfig } from "@/lib/env";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const MAX_MEDIA_BYTES = 8 * 1024 * 1024;
const ALLOWED_MEDIA_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Admin sign-in is required." }, { status: 401 });
  }

  const configIssue = getCloudinaryConfigIssue();

  if (configIssue) {
    return NextResponse.json({ error: configIssue }, { status: 500 });
  }

  if (!hasCloudinaryConfig()) {
    return NextResponse.json({ error: "Cloudinary is not configured for media uploads." }, { status: 503 });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Upload a valid multipart form." }, { status: 400 });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Upload an image file." }, { status: 400 });
  }

  if (!ALLOWED_MEDIA_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Use a PNG, JPEG, or WebP image." }, { status: 400 });
  }

  if (file.size > MAX_MEDIA_BYTES) {
    return NextResponse.json({ error: "Image must be smaller than 8 MB." }, { status: 400 });
  }

  try {
    const upload = await uploadImageToCloudinary(file, "baseknowledge/admin-media");

    return NextResponse.json({
      url: upload?.url,
      publicId: upload?.publicId
    });
  } catch {
    return NextResponse.json({ error: "Media upload failed." }, { status: 502 });
  }
}
