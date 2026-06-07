import { describe, expect, it } from "vitest";
import { scoreQuiz } from "./quiz";
import type { QuizQuestion } from "./types";

const questions: QuizQuestion[] = [
  {
    id: "one",
    prompt: "First?",
    choices: ["A", "B", "C", "D"],
    correctChoiceIndex: 2,
    explanation: "C is correct.",
    difficulty: "Basic"
  },
  {
    id: "two",
    prompt: "Second?",
    choices: ["A", "B", "C", "D"],
    correctChoiceIndex: 0,
    explanation: "A is correct.",
    difficulty: "Basic"
  }
];

describe("scoreQuiz", () => {
  it("scores answers and returns explanations", () => {
    const result = scoreQuiz(questions, [
      { questionId: "one", selectedChoiceIndex: 2 },
      { questionId: "two", selectedChoiceIndex: 3 }
    ]);

    expect(result.correctCount).toBe(1);
    expect(result.totalCount).toBe(2);
    expect(result.results).toEqual([
      {
        questionId: "one",
        isCorrect: true,
        correctChoiceIndex: 2,
        explanation: "C is correct."
      },
      {
        questionId: "two",
        isCorrect: false,
        correctChoiceIndex: 0,
        explanation: "A is correct."
      }
    ]);
  });
});
