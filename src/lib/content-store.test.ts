import { describe, expect, it } from "vitest";
import {
  ContentWriteUnavailableError,
  createTopic,
  getLessonForDifficulty,
  getQuestionsForDifficulty
} from "./content-store";
import { seedTopics } from "./seed-data";

const thermodynamics = seedTopics.find((topic) => topic.id === "thermodynamics")!;

describe("content helpers", () => {
  it("selects a lesson by difficulty", () => {
    const lesson = getLessonForDifficulty(thermodynamics, "Advanced");
    expect(lesson?.id).toBe("thermo-advanced");
  });

  it("filters questions by difficulty", () => {
    const questions = getQuestionsForDifficulty(thermodynamics, "Intermediate");
    expect(questions).toHaveLength(2);
    expect(questions.every((question) => question.difficulty === "Intermediate")).toBe(true);
  });

  it.skipIf(Boolean(process.env.MONGODB_URI))("does not pretend admin writes are persistent without MongoDB", async () => {
    await expect(
      createTopic({
        subjectId: "physics",
        title: "Transient Topic",
        slug: "transient-topic",
        description: "This topic should not be accepted without persistent storage.",
        subtopics: [],
        isPublished: false
      })
    ).rejects.toBeInstanceOf(ContentWriteUnavailableError);
  });
});
