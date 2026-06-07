import type { QuizQuestion } from "./types";

export type QuizAnswer = {
  questionId: string;
  selectedChoiceIndex: number;
};

export type QuizResult = {
  questionId: string;
  isCorrect: boolean;
  correctChoiceIndex: number;
  explanation: string;
};

export function scoreQuiz(questions: QuizQuestion[], answers: QuizAnswer[]) {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.selectedChoiceIndex]));
  const results: QuizResult[] = questions.map((question) => {
    const selectedChoiceIndex = answerMap.get(question.id);
    return {
      questionId: question.id,
      isCorrect: selectedChoiceIndex === question.correctChoiceIndex,
      correctChoiceIndex: question.correctChoiceIndex,
      explanation: question.explanation
    };
  });

  const correctCount = results.filter((result) => result.isCorrect).length;

  return {
    correctCount,
    totalCount: questions.length,
    results
  };
}
