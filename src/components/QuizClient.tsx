"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/lib/types";

export default function QuizClient({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    return questions.reduce((count, question) => {
      return answers[question.id] === question.correctChoiceIndex ? count + 1 : count;
    }, 0);
  }, [answers, questions]);

  if (!questions.length) {
    return <div className="empty-state">Practice questions for this topic are coming soon.</div>;
  }

  return (
    <div className="quiz">
      {questions.map((question, index) => {
        const selected = answers[question.id];
        const hasAnswered = selected !== undefined;

        return (
          <div className="question" key={question.id}>
            <h3>
              {index + 1}. {question.prompt}
            </h3>
            <div className="choices">
              {question.choices.map((choice, choiceIndex) => {
                const isCorrect = choiceIndex === question.correctChoiceIndex;
                const isSelected = selected === choiceIndex;
                const className = [
                  "choice",
                  hasAnswered && isCorrect ? "correct" : "",
                  hasAnswered && isSelected && !isCorrect ? "incorrect" : ""
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <button
                    className={className}
                    disabled={hasAnswered}
                    key={choice}
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: choiceIndex }))}
                    type="button"
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            {hasAnswered ? (
              <div className="feedback">
                <strong>{selected === question.correctChoiceIndex ? "Correct." : "Review this."}</strong>{" "}
                {question.explanation}
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="quiz-summary">
        <div>
          <h3>
            Score: {score}/{questions.length}
          </h3>
          <p className="muted" style={{ margin: "4px 0 0" }}>
            {answeredCount === questions.length
              ? "Quiz complete. Review any explanation that felt unfamiliar."
              : `${questions.length - answeredCount} question${questions.length - answeredCount === 1 ? "" : "s"} remaining.`}
          </p>
        </div>
        <button className="ghost-button" onClick={() => setAnswers({})} type="button">
          Reset quiz
        </button>
      </div>
    </div>
  );
}