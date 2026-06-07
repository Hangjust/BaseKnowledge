"use client";

import { useState } from "react";
import { difficultyLevels, type Difficulty, type SubjectId } from "@/lib/types";

const subjects: { id: SubjectId; name: string }[] = [
  { id: "physics", name: "Physics" },
  { id: "biology", name: "Biology" },
  { id: "english", name: "English" },
  { id: "chemistry", name: "Chemistry" },
  { id: "economics", name: "Economics" }
];

export default function AssistantPanel({
  defaultSubjectId,
  defaultTopicSlug,
  defaultDifficulty,
  compact = false
}: {
  defaultSubjectId: SubjectId;
  defaultTopicSlug?: string;
  defaultDifficulty: Difficulty;
  compact?: boolean;
}) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnswer("");
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "The assistant could not analyze this image.");
      }

      setAnswer(payload.answer ?? "");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The assistant could not analyze this image.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="assistant-form" onSubmit={onSubmit}>
      <div className={compact ? "form-grid" : "grid"}>
        <div className="field">
          <label htmlFor="subjectId">Subject</label>
          <select defaultValue={defaultSubjectId} id="subjectId" name="subjectId">
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="difficulty">Difficulty</label>
          <select defaultValue={defaultDifficulty} id="difficulty" name="difficulty">
            {difficultyLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="mode">Mode</label>
          <select defaultValue="explain" id="mode" name="mode">
            <option value="explain">Explain simply</option>
            <option value="practice">Practice questions</option>
            <option value="quiz">Create quiz</option>
            <option value="qa">Answer my question</option>
          </select>
        </div>
      </div>

      <input name="topicSlug" type="hidden" value={defaultTopicSlug ?? ""} />

      <div className="field">
        <label htmlFor="image">Textbook screenshot</label>
        <input accept="image/png,image/jpeg,image/webp" id="image" name="image" required type="file" />
      </div>

      <div className="field">
        <label htmlFor="question">Question or focus</label>
        <textarea
          id="question"
          name="question"
          placeholder="Optional: ask what you want explained, or say what part is confusing."
        />
      </div>

      <button className="button" disabled={isLoading} type="submit">
        {isLoading ? "Analyzing..." : "Analyze screenshot"}
      </button>

      {error ? <div className="status error">{error}</div> : null}
      {answer ? <div className="assistant-result">{answer}</div> : null}
    </form>
  );
}
