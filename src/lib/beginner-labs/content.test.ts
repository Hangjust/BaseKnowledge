import { describe, expect, it } from "vitest";
import { beginnerLabSubjectIds } from "./types";
import { beginnerLabTopics, getBeginnerLabTopic, getBeginnerLabTopicsBySubject } from "./content";

describe("beginner lab content", () => {
  it("contains exactly three topics for each allowed subject", () => {
    expect(beginnerLabTopics).toHaveLength(beginnerLabSubjectIds.length * 3);

    beginnerLabSubjectIds.forEach((subjectId) => {
      const topics = getBeginnerLabTopicsBySubject(subjectId);
      expect(topics).toHaveLength(3);
      expect(topics.every((topic) => topic.meta.subjectId === subjectId)).toBe(true);
    });
  });

  it("provides complete learn, visualization, practice, and exam data", () => {
    beginnerLabTopics.forEach((topic) => {
      expect(topic.learnSections).toHaveLength(3);
      expect(topic.visualizations).toHaveLength(1);
      expect(topic.visualizations[0].id).toBe(`${topic.meta.subjectId}:${topic.meta.slug}`);
      expect(topic.practiceQuestions).toHaveLength(4);
      expect(topic.practiceQuestions.every((question) => question.mode === "practice")).toBe(true);
      expect(topic.practiceQuestions.every((question) => Boolean(question.hint))).toBe(true);
      expect(topic.examQuestions).toHaveLength(5);
      expect(topic.examQuestions.every((question) => question.mode === "exam")).toBe(true);
    });
  });

  it("looks up a topic by subject and slug", () => {
    expect(getBeginnerLabTopic("biology", "cells")?.meta.title).toBe("Cells");
    expect(getBeginnerLabTopic("physics", "magnetism")?.meta.title).toBe("Magnetism");
    expect(getBeginnerLabTopic("math", "missing-topic")).toBeUndefined();
  });
});
