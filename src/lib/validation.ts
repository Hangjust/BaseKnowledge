import { z } from "zod";
import { difficultyLevels } from "./types";

export const subjectIdSchema = z.enum(["biology", "english", "physics", "chemistry", "economics"]);
export const difficultySchema = z.enum(difficultyLevels);

export const topicInputSchema = z.object({
  subjectId: subjectIdSchema,
  title: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  description: z.string().trim().min(10).max(600),
  subtopics: z.string().transform((value) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
  ),
  isPublished: z.coerce.boolean().default(false)
});

export const lessonInputSchema = z.object({
  topicId: z.string().min(1),
  title: z.string().trim().min(2).max(120),
  difficulty: difficultySchema,
  summary: z.string().trim().min(10).max(500),
  body: z.string().trim().min(20).max(4000),
  examplePrompt: z.string().trim().min(5).max(1000),
  exampleSolution: z.string().trim().min(5).max(1500),
  videoUrl: z
    .string()
    .trim()
    .url()
    .optional()
    .or(z.literal("").transform(() => undefined))
});

export const questionInputSchema = z.object({
  topicId: z.string().min(1),
  prompt: z.string().trim().min(5).max(1000),
  difficulty: difficultySchema,
  choices: z.array(z.string().trim().min(1).max(300)).length(4),
  correctChoiceIndex: z.coerce.number().int().min(0).max(3),
  explanation: z.string().trim().min(5).max(1200)
});

export const assistantFormSchema = z.object({
  subjectId: subjectIdSchema,
  topicSlug: z.string().optional(),
  difficulty: difficultySchema,
  mode: z.enum(["explain", "practice", "quiz", "qa"]),
  question: z.string().trim().max(1000).optional()
});

export function formDataString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}
