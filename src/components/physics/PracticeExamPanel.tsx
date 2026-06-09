/**
 * =============================================================================
 * PracticeExamPanel — shared UI for Practice AND Exam modes
 * =============================================================================
 *
 * Same component, different question arrays passed from the page:
 *   - practice → topic.practiceQuestions (easier)
 *   - exam     → topic.examQuestions (harder)
 *
 * ANSWER MODES:
 *   paper    — student works offline; "Show Answers" reveals all solutions
 *   computer — student fills inputs; "Check Answers" grades each question
 *
 * TO EXTEND:
 *   - Add question types in types.ts + gradeAnswer() below
 *   - Questions live in <topic>-content.ts, never in this file
 * =============================================================================
 */

"use client";

import { useMemo, useState } from "react";
import type { AnswerMode, PhysicsQuestion } from "@/lib/physics/types";

type PracticeExamPanelProps = {
  questions: PhysicsQuestion[];
  modeLabel: "Practice" | "Exam";
  /** Practice shows hints; exam hides them until graded. */
  showHints: boolean;
};

type GradeResult = "ungraded" | "correct" | "wrong";

export default function PracticeExamPanel({ questions, modeLabel, showHints }: PracticeExamPanelProps) {
  const [answerMode, setAnswerMode] = useState<AnswerMode>("computer");
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [grades, setGrades] = useState<Record<string, GradeResult>>({});
  const [showPaperAnswers, setShowPaperAnswers] = useState(false);
  const [checked, setChecked] = useState(false);

  const score = useMemo(() => {
    if (!checked) return null;
    const correct = Object.values(grades).filter((g) => g === "correct").length;
    return { correct, total: questions.length };
  }, [checked, grades, questions.length]);

  function setResponse(questionId: string, value: string) {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleCheckAnswers() {
    const nextGrades: Record<string, GradeResult> = {};
    questions.forEach((q) => {
      const response = responses[q.id] ?? "";
      nextGrades[q.id] = gradeAnswer(q, response) ? "correct" : "wrong";
    });
    setGrades(nextGrades);
    setChecked(true);
  }

  function handleReset() {
    setResponses({});
    setGrades({});
    setChecked(false);
    setShowPaperAnswers(false);
  }

  return (
    <div>
      <div className="physics-assessment-header">
        <p className="physics-eyebrow" style={{ margin: 0 }}>
          {modeLabel} · {questions.length} questions
        </p>

        <div className="physics-answer-toggle" role="group" aria-label="Answer mode">
          <button
            type="button"
            className={answerMode === "paper" ? "active" : undefined}
            onClick={() => {
              setAnswerMode("paper");
              handleReset();
            }}
          >
            On paper
          </button>
          <button
            type="button"
            className={answerMode === "computer" ? "active" : undefined}
            onClick={() => {
              setAnswerMode("computer");
              handleReset();
            }}
          >
            On computer
          </button>
        </div>
      </div>

      {answerMode === "paper" && (
        <p style={{ color: "var(--phys-muted)", fontSize: "0.9rem", marginBottom: 20 }}>
          Work through each question on paper, then reveal answers when ready.
        </p>
      )}

      {answerMode === "computer" && checked && score && (
        <div className="physics-score-banner">
          You got <strong>{score.correct}</strong> out of <strong>{score.total}</strong> correct.
        </div>
      )}

      <div className="physics-question-list">
        {questions.map((question, index) => {
          const grade = grades[question.id] ?? "ungraded";
          const cardClass =
            checked && answerMode === "computer"
              ? grade === "correct"
                ? "answered-correct"
                : "answered-wrong"
              : "";

          return (
            <article className={`physics-question-card ${cardClass}`} key={question.id}>
              <div className="physics-question-number">
                Question {index + 1}
              </div>
              <p className="physics-question-prompt">{question.prompt}</p>

              {answerMode === "computer" && (
                <QuestionInput
                  question={question}
                  value={responses[question.id] ?? ""}
                  onChange={(v) => setResponse(question.id, v)}
                  disabled={checked}
                />
              )}

              {showHints && question.hint && answerMode === "computer" && !checked && (
                <p className="physics-hint">Hint: {question.hint}</p>
              )}

              {answerMode === "computer" && checked && (
                <div className={`physics-feedback ${grade === "correct" ? "correct" : "wrong"}`}>
                  {grade === "correct" ? "✓ Correct" : `✗ Incorrect — ${question.explanation}`}
                </div>
              )}

              {answerMode === "paper" && showPaperAnswers && (
                <div className="physics-answer-reveal">
                  <strong>Answer:</strong> {formatCorrectAnswer(question)}
                  <br />
                  <span style={{ color: "var(--phys-muted)" }}>{question.explanation}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="physics-action-bar">
        {answerMode === "paper" && (
          <button
            type="button"
            className="physics-btn physics-btn-primary"
            onClick={() => setShowPaperAnswers((v) => !v)}
          >
            {showPaperAnswers ? "Hide answers" : "Show answers"}
          </button>
        )}

        {answerMode === "computer" && !checked && (
          <button type="button" className="physics-btn physics-btn-primary" onClick={handleCheckAnswers}>
            Check answers
          </button>
        )}

        {answerMode === "computer" && checked && (
          <button type="button" className="physics-btn physics-btn-secondary" onClick={handleReset}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
  disabled
}: {
  question: PhysicsQuestion;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  if (question.type === "multiple_choice" && question.choices) {
    return (
      <div className="physics-choices">
        {question.choices.map((choice) => (
          <label className="physics-choice" key={choice}>
            <input
              type="radio"
              name={question.id}
              value={choice}
              checked={value === choice}
              onChange={() => onChange(choice)}
              disabled={disabled}
            />
            {choice}
          </label>
        ))}
      </div>
    );
  }

  return (
    <input
      className="physics-text-input"
      type="text"
      placeholder={question.type === "numeric" ? "Enter a number" : "Type your answer"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
}

/** Normalize and compare student response to correctAnswer. */
function gradeAnswer(question: PhysicsQuestion, response: string): boolean {
  const normalized = response.trim().toLowerCase();
  const expected = question.correctAnswer.trim().toLowerCase();

  if (!normalized) return false;

  if (question.type === "numeric") {
    const numResponse = parseFloat(normalized.replace(/[^0-9.-]/g, ""));
    const numExpected = parseFloat(expected);
    if (Number.isNaN(numResponse) || Number.isNaN(numExpected)) return false;
    return Math.abs(numResponse - numExpected) < 0.11;
  }

  return normalized === expected;
}

function formatCorrectAnswer(question: PhysicsQuestion): string {
  if (question.type === "multiple_choice") return question.correctAnswer;
  return question.correctAnswer;
}