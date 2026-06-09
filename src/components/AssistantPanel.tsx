"use client";

import { useState } from "react";
import { difficultyLevels, type Difficulty, type SubjectId } from "@/lib/types";

const subjectOptions: { id: SubjectId; name: string }[] = [
  { id: "physics", name: "Physics" },
  { id: "math", name: "Math" },
  { id: "chemistry", name: "Chemistry" },
  { id: "biology", name: "Biology" },
  { id: "english", name: "English" },
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
  const [fileName, setFileName] = useState("");

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
        throw new Error(payload.error ?? "The assistant is not available yet.");
      }

      setAnswer(payload.answer ?? "");
    } catch {
      const question = formData.get("question");
      const mode = formData.get("mode");
      const subject = formData.get("subjectId");

      setAnswer(
        `AI preview (backend coming soon)\n\nSubject: ${subject}\nMode: ${mode}\n${fileName ? `File: ${fileName}\n` : ""}${question ? `Question: ${question}\n` : ""}\nOnce your GPT backend is connected, the assistant will analyze uploaded material and respond here with explanations, practice questions, or custom quizzes.`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="assistant-form" onSubmit={onSubmit}>
      <div className={compact ? "form-grid" : "form-grid"}>
        <div className="field">
          <label htmlFor="subjectId">Subject</label>
          <select defaultValue={defaultSubjectId} id="subjectId" name="subjectId">
            {subjectOptions.map((subject) => (
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
        <label htmlFor="image">Upload notes, screenshots, or PDFs</label>
        <input
          accept="image/png,image/jpeg,image/webp,.pdf,.txt"
          id="image"
          name="image"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
          type="file"
        />
      </div>

      <div className="field">
        <label htmlFor="question">Your question</label>
        <textarea
          id="question"
          name="question"
          placeholder="What would you like explained? Ask about a concept, problem, or uploaded material."
        />
      </div>

      <button className="button" disabled={isLoading} type="submit">
        {isLoading ? "Thinking..." : "Ask AI"}
      </button>

      {error ? <div className="status error">{error}</div> : null}
      {answer ? <div className="assistant-result">{answer}</div> : null}
    </form>
  );
}
