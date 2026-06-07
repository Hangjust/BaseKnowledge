import { describe, expect, it } from "vitest";
import { lessonInputSchema } from "./validation";

const baseLessonInput = {
  topicId: "thermodynamics",
  title: "Energy transfers",
  difficulty: "Basic",
  summary: "A short lesson about energy moving between warmer and cooler objects.",
  body: "Heat flow\nEnergy moves from hot objects to cooler objects until equilibrium.",
  examplePrompt: "Why does a warm cup cool on a desk?",
  exampleSolution: "Thermal energy moves from the warmer cup to the cooler air and desk."
};

describe("lessonInputSchema", () => {
  it("normalizes an empty optional video URL", () => {
    const parsed = lessonInputSchema.parse({
      ...baseLessonInput,
      videoUrl: ""
    });

    expect(parsed.videoUrl).toBeUndefined();
  });

  it("rejects invalid video URLs", () => {
    expect(() =>
      lessonInputSchema.parse({
        ...baseLessonInput,
        videoUrl: "not-a-url"
      })
    ).toThrow();
  });
});
