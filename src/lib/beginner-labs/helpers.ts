import {
  beginnerLabAnswerModes,
  beginnerLabModes,
  beginnerLabQuestionTypes,
  beginnerLabSubjectIds,
  type BeginnerLabAnswerMode,
  type BeginnerLabMode,
  type BeginnerLabQuestionType,
  type BeginnerLabSubjectId,
  type BeginnerLabTopicContent
} from "./types";

export const beginnerLabSubjectNames: Record<BeginnerLabSubjectId, string> = {
  biology: "Biology",
  chemistry: "Chemistry",
  "computer-science": "Computer Science",
  economics: "Economics",
  english: "English",
  history: "History",
  math: "Math",
  physics: "Physics"
};

export const beginnerLabModeLabels: Record<BeginnerLabMode, { title: string; description: string }> = {
  learn: {
    title: "Learn",
    description: "Read a structured beginner chapter with sections, figures, and key terms."
  },
  play: {
    title: "Play",
    description: "Use a visualization identified by lab data and implemented outside the contract."
  },
  practice: {
    title: "Practice",
    description: "Answer easier questions with optional hints and explanations."
  },
  exam: {
    title: "Exam",
    description: "Answer stricter exam-style questions using the same supported answer formats."
  }
};

export function isBeginnerLabSubjectId(value: string): value is BeginnerLabSubjectId {
  return beginnerLabSubjectIds.some((subjectId) => subjectId === value);
}

export function isBeginnerLabMode(value: string): value is BeginnerLabMode {
  return beginnerLabModes.some((mode) => mode === value);
}

export function isBeginnerLabAnswerMode(value: string): value is BeginnerLabAnswerMode {
  return beginnerLabAnswerModes.some((mode) => mode === value);
}

export function isBeginnerLabQuestionType(value: string): value is BeginnerLabQuestionType {
  return beginnerLabQuestionTypes.some((questionType) => questionType === value);
}

export function defineBeginnerLabTopic<const Topic extends BeginnerLabTopicContent>(
  topic: Topic
): Topic {
  return topic;
}

export function defineBeginnerLabTopics<const Topics extends readonly BeginnerLabTopicContent[]>(
  topics: Topics
): Topics {
  return topics;
}

export function findBeginnerLabTopic(
  topics: readonly BeginnerLabTopicContent[],
  subjectId: BeginnerLabSubjectId,
  slug: string
): BeginnerLabTopicContent | undefined {
  return topics.find((topic) => topic.meta.subjectId === subjectId && topic.meta.slug === slug);
}
