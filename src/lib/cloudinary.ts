import { v2 as cloudinary } from "cloudinary";
import { env, getCloudinaryConfigIssue, hasCloudinaryConfig } from "./env";

if (hasCloudinaryConfig()) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
  });
}

export async function uploadImageToCloudinary(file: File, folder = "baseknowledge/uploads") {
  const configIssue = getCloudinaryConfigIssue();

  if (configIssue) {
    throw new Error(configIssue);
  }

  if (!hasCloudinaryConfig()) {
    return null;
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const dataUrl = `data:${file.type};base64,${bytes.toString("base64")}`;
  const result = await cloudinary.uploader.upload(dataUrl, {
    folder,
    resource_type: "image"
  });

  return {
    url: result.secure_url,
    publicId: result.public_id
  };
}

export async function fileToDataUrl(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${bytes.toString("base64")}`;
}
