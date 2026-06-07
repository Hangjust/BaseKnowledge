"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { createTopic, deleteTopic, getTopicById, upsertTopic } from "@/lib/content-store";
import type { Lesson, QuizQuestion } from "@/lib/types";
import { lessonInputSchema, questionInputSchema, topicInputSchema } from "@/lib/validation";

function sectionFromBody(body: string) {
  const [firstLine, ...rest] = body.split("\n").map((line) => line.trim());
  const heading = firstLine.length > 0 && firstLine.length <= 80 ? firstLine : "Explanation";
  const content = rest.length > 0 ? rest.join("\n").trim() : body;

  return {
    heading,
    body: content
  };
}

export async function createTopicAction(formData: FormData) {
  await requireAdmin();
  const parsed = topicInputSchema.safeParse({
    subjectId: formData.get("subjectId"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    subtopics: formData.get("subtopics"),
    isPublished: formData.get("isPublished") === "on"
  });

  if (!parsed.success) {
    throw new Error("Topic form is invalid.");
  }

  const topic = await createTopic(parsed.data);
  revalidatePath("/");
  revalidatePath(`/subjects/${topic.subjectId}`);
  revalidatePath("/admin");
  redirect(`/admin/topics/${topic.id}`);
}

export async function updateTopicAction(topicId: string, formData: FormData) {
  await requireAdmin();
  const topic = await getTopicById(topicId);

  if (!topic) {
    throw new Error("Topic not found.");
  }

  const parsed = topicInputSchema.safeParse({
    subjectId: formData.get("subjectId"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    subtopics: formData.get("subtopics"),
    isPublished: formData.get("isPublished") === "on"
  });

  if (!parsed.success) {
    throw new Error("Topic form is invalid.");
  }

  const previousPublicPath = `/subjects/${topic.subjectId}/${topic.slug}`;
  const updatedTopic = await upsertTopic({
    ...topic,
    ...parsed.data
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/topics/${topicId}`);
  revalidatePath(`/subjects/${topic.subjectId}`);
  revalidatePath(`/subjects/${updatedTopic.subjectId}`);
  revalidatePath(previousPublicPath);
  revalidatePath(`/subjects/${updatedTopic.subjectId}/${updatedTopic.slug}`);
}

export async function deleteTopicAction(topicId: string) {
  await requireAdmin();
  await deleteTopic(topicId);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function addLessonAction(formData: FormData) {
  await requireAdmin();
  const parsed = lessonInputSchema.safeParse({
    topicId: formData.get("topicId"),
    title: formData.get("title"),
    difficulty: formData.get("difficulty"),
    summary: formData.get("summary"),
    body: formData.get("body"),
    examplePrompt: formData.get("examplePrompt"),
    exampleSolution: formData.get("exampleSolution"),
    videoUrl: formData.get("videoUrl")
  });

  if (!parsed.success) {
    throw new Error("Lesson form is invalid.");
  }

  const topic = await getTopicById(parsed.data.topicId);

  if (!topic) {
    throw new Error("Topic not found.");
  }

  const lesson: Lesson = {
    id: `${topic.id}-lesson-${Date.now()}`,
    title: parsed.data.title,
    difficulty: parsed.data.difficulty,
    summary: parsed.data.summary,
    sections: [sectionFromBody(parsed.data.body)],
    videoUrl: parsed.data.videoUrl,
    examples: [
      {
        prompt: parsed.data.examplePrompt,
        solution: parsed.data.exampleSolution
      }
    ]
  };

  await upsertTopic({
    ...topic,
    lessons: [...topic.lessons, lesson]
  });

  revalidatePath(`/admin/topics/${topic.id}`);
  revalidatePath(`/subjects/${topic.subjectId}/${topic.slug}`);
}

export async function addQuestionAction(formData: FormData) {
  await requireAdmin();
  const parsed = questionInputSchema.safeParse({
    topicId: formData.get("topicId"),
    prompt: formData.get("prompt"),
    difficulty: formData.get("difficulty"),
    choices: [formData.get("choice0"), formData.get("choice1"), formData.get("choice2"), formData.get("choice3")],
    correctChoiceIndex: formData.get("correctChoiceIndex"),
    explanation: formData.get("explanation")
  });

  if (!parsed.success) {
    throw new Error("Question form is invalid.");
  }

  const topic = await getTopicById(parsed.data.topicId);

  if (!topic) {
    throw new Error("Topic not found.");
  }

  const question: QuizQuestion = {
    id: `${topic.id}-question-${Date.now()}`,
    prompt: parsed.data.prompt,
    difficulty: parsed.data.difficulty,
    choices: parsed.data.choices,
    correctChoiceIndex: parsed.data.correctChoiceIndex,
    explanation: parsed.data.explanation
  };

  await upsertTopic({
    ...topic,
    questions: [...topic.questions, question]
  });

  revalidatePath(`/admin/topics/${topic.id}`);
  revalidatePath(`/subjects/${topic.subjectId}/${topic.slug}`);
}
