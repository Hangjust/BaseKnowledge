import { z } from "zod";

const serverEnvSchema = z.object({
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD_HASH: z.string().optional(),
  ADMIN_PASSWORD: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  MONGODB_DB: z.string().default("baseknowledge"),
  MONGODB_URI: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4.1-mini")
});

export const env = serverEnvSchema.parse(process.env);

function configuredValues(values: Array<string | undefined>) {
  return values.filter((value) => Boolean(value && value.trim().length > 0));
}

export function hasMongoConfig() {
  return Boolean(env.MONGODB_URI);
}

export function hasCloudinaryConfig() {
  return Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
}

export function getCloudinaryConfigIssue() {
  const values = [env.CLOUDINARY_CLOUD_NAME, env.CLOUDINARY_API_KEY, env.CLOUDINARY_API_SECRET];
  const configuredCount = configuredValues(values).length;

  if (configuredCount > 0 && configuredCount < values.length) {
    return "Cloudinary is partially configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.";
  }

  return null;
}

export function hasOpenAIConfig() {
  return Boolean(env.OPENAI_API_KEY);
}

export function getAdminAuthConfigIssue() {
  if (!env.ADMIN_EMAIL) {
    return "ADMIN_EMAIL is required for administrator sign-in.";
  }

  if (process.env.NODE_ENV === "production" && !env.NEXTAUTH_SECRET) {
    return "NEXTAUTH_SECRET is required in production.";
  }

  if (process.env.NODE_ENV === "production" && !env.ADMIN_PASSWORD_HASH) {
    return "ADMIN_PASSWORD_HASH is required in production. Plain ADMIN_PASSWORD is local-development only.";
  }

  if (process.env.NODE_ENV !== "production" && !env.ADMIN_PASSWORD_HASH && !env.ADMIN_PASSWORD) {
    return "Set ADMIN_PASSWORD_HASH or local-development ADMIN_PASSWORD for administrator sign-in.";
  }

  return null;
}
