import { describe, expect, it } from "vitest";
import { getPhysicsTopic, physicsTopics } from "./topics";
import type { PhysicsQuestion } from "./types";

const expectedSlugs = [
  "optics",
  "classical-mechanics",
  "motion",
  "forces",
  "gravity",
  "light",
  "mirrors-and-reflection",
  "electricity",
  "heat-temperature",
  "sound",
  "energy",
  "magnetism"
] as const;

const expectedPreviewsBySlug = {
  motion: "motion",
  forces: "forces",
  gravity: "gravity",
  light: "light",
  "mirrors-and-reflection": "mirror",
  electricity: "electricity",
  "heat-temperature": "heat",
  sound: "sound",
  energy: "energy",
  magnetism: "magnetism"
} as const;

const forbiddenQuestionFields = [
  "mode",
  "unit",
  "tolerance",
  "acceptedAnswers",
  "visualizations",
  "defaultAnswerMode",
  "subjectId",
  "previewVisualizationId"
] as const;

function expectNoForbiddenFields(question: PhysicsQuestion) {
  forbiddenQuestionFields.forEach((field) => {
    expect(Object.prototype.hasOwnProperty.call(question, field)).toBe(false);
  });
}

describe("physics topic registry", () => {
  it("registers every finished live physics topic in beginner order", () => {
    expect(physicsTopics.map((topic) => topic.meta.slug)).toEqual(expectedSlugs);

    expectedSlugs.forEach((slug) => {
      expect(getPhysicsTopic(slug)?.meta.slug).toBe(slug);
    });
  });

  it("uses the supported preview visualization ids for beginner topics", () => {
    Object.entries(expectedPreviewsBySlug).forEach(([slug, previewVisualization]) => {
      expect(getPhysicsTopic(slug)?.meta.previewVisualization).toBe(previewVisualization);
    });
  });

  it("provides complete learn, practice, and exam content with unique question ids", () => {
    physicsTopics.forEach((topic) => {
      const questions = [...topic.practiceQuestions, ...topic.examQuestions];
      const questionIds = questions.map((question) => question.id);

      expect(topic.learnSections.length).toBeGreaterThanOrEqual(3);
      expect(topic.practiceQuestions.length).toBeGreaterThanOrEqual(4);
      expect(topic.examQuestions.length).toBeGreaterThanOrEqual(5);
      expect(new Set(questionIds).size).toBe(questionIds.length);
      questions.forEach(expectNoForbiddenFields);
    });
  });
});
