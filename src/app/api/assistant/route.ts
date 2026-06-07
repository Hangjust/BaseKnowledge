import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { analyzeStudyImage } from "@/lib/openai-assistant";
import { assistantFormSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { fileToDataUrl, uploadImageToCloudinary } from "@/lib/cloudinary";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_MULTIPART_BYTES = MAX_UPLOAD_BYTES + 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

export async function POST(request: Request) {
  const headersList = await headers();
  const contentLength = Number(headersList.get("content-length") ?? 0);

  if (contentLength > MAX_MULTIPART_BYTES) {
    return NextResponse.json({ error: "Upload payload must be smaller than 9 MB." }, { status: 413 });
  }

  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "anonymous";
  const rateLimit = await checkRateLimit(`assistant:${ip}`, 8, 60 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many assistant requests. Try again later." }, { status: 429 });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Upload a valid multipart form." }, { status: 400 });
  }

  const image = formData.get("image");

  if (!(image instanceof File)) {
    return NextResponse.json({ error: "Upload an image file." }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
    return NextResponse.json({ error: "Use a PNG, JPEG, or WebP image." }, { status: 400 });
  }

  if (image.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "Image must be smaller than 8 MB." }, { status: 400 });
  }

  const parsed = assistantFormSchema.safeParse({
    subjectId: formData.get("subjectId"),
    topicSlug: formData.get("topicSlug") || undefined,
    difficulty: formData.get("difficulty"),
    mode: formData.get("mode"),
    question: formData.get("question") || undefined
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Assistant request is invalid." }, { status: 400 });
  }

  try {
    const imageDataUrl = await fileToDataUrl(image);
    const upload = await uploadImageToCloudinary(image);
    const answer = await analyzeStudyImage({
      ...parsed.data,
      imageDataUrl
    });

    return NextResponse.json({
      answer,
      imageUrl: upload?.url ?? null
    });
  } catch (caught) {
    const message =
      caught instanceof Error && caught.message.includes("Cloudinary")
        ? caught.message
        : "The assistant service could not process this image right now.";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
