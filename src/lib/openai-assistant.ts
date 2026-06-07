import OpenAI from "openai";
import { env, hasOpenAIConfig } from "./env";
import type { AssistantMode, Difficulty, SubjectId } from "./types";

function buildPrompt(input: {
  subjectId: SubjectId;
  topicSlug?: string;
  difficulty: Difficulty;
  mode: AssistantMode;
  question?: string;
}) {
  const topicText = input.topicSlug ? `Topic: ${input.topicSlug}.` : "Topic: learner-uploaded material.";
  const taskByMode: Record<AssistantMode, string> = {
    explain:
      "Explain the uploaded study material in simpler terms. Use a clear structure, define key terms, and point out likely misconceptions.",
    practice:
      "Generate five practice questions from the uploaded material. Include answers and short explanations.",
    quiz:
      "Create a short four-question quiz from the uploaded material. Use multiple-choice questions and include the answer key with explanations.",
    qa:
      "Answer the learner's question using the uploaded material as context. If the image is unclear, say what is missing and explain what can still be inferred."
  };

  return [
    "You are an educational tutor for high school learners.",
    `Subject: ${input.subjectId}. ${topicText}`,
    `Difficulty: ${input.difficulty}. Adapt vocabulary, formulas, and examples to this level.`,
    taskByMode[input.mode],
    input.question ? `Learner question: ${input.question}` : "",
    "Do not claim certainty when the screenshot is unreadable. Keep the answer study-focused and age-appropriate."
  ]
    .filter(Boolean)
    .join("\n");
}

function mockedAssistantResponse(input: {
  subjectId: SubjectId;
  topicSlug?: string;
  difficulty: Difficulty;
  mode: AssistantMode;
  question?: string;
}) {
  const topic = input.topicSlug ?? input.subjectId;

  if (input.mode === "quiz") {
    return `Mock quiz for ${topic} (${input.difficulty}):\n\n1. What is the main idea shown in the uploaded material?\nA. A definition\nB. A worked example\nC. A comparison\nD. A diagram label\n\nAnswer: Review the uploaded page and match the question to the highlighted concept.\n\nConfigure OPENAI_API_KEY to enable live screenshot analysis.`;
  }

  if (input.mode === "practice") {
    return `Mock practice set for ${topic} (${input.difficulty}):\n\n1. Restate the main concept in one sentence.\n2. Identify two key terms from the image.\n3. Create one example that uses the concept.\n4. Explain one common mistake.\n5. Solve the smallest calculation or reasoning step shown.\n\nConfigure OPENAI_API_KEY to enable live generation from the uploaded image.`;
  }

  return `Mock explanation for ${topic} (${input.difficulty}): the assistant will read the uploaded screenshot, identify the concept, simplify the explanation, and answer follow-up questions. Configure OPENAI_API_KEY to enable live multimodal analysis.`;
}

export async function analyzeStudyImage(input: {
  subjectId: SubjectId;
  topicSlug?: string;
  difficulty: Difficulty;
  mode: AssistantMode;
  question?: string;
  imageDataUrl: string;
}) {
  if (!hasOpenAIConfig()) {
    return mockedAssistantResponse(input);
  }

  const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: env.OPENAI_MODEL,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: buildPrompt(input)
          },
          {
            type: "input_image",
            image_url: input.imageDataUrl,
            detail: "auto"
          }
        ]
      }
    ]
  });

  return response.output_text.trim() || "I could not extract a useful answer from this image. Try a clearer screenshot.";
}
