/**
 * =============================================================================
 * BEGINNER SUBJECT LABS - CONTENT CONTRACT
 * =============================================================================
 *
 * This file defines the data shapes for beginner Learn, Play, Practice, and Exam
 * labs across the supported school subjects. It is intentionally UI-free:
 * content writers should be able to create lab data from these types without
 * editing React components, route files, visualizations, or CSS.
 *
 * To add content later:
 *   1. Create a subject/topic data file under `src/lib/beginner-labs/`.
 *   2. Export a constant that satisfies `BeginnerLabTopicContent`.
 *   3. Reference visualization ids as strings; implementation lives elsewhere.
 *   4. Keep prose and question content in data files, not UI components.
 * =============================================================================
 */

/** The exact subjects allowed to publish beginner labs. */
export const beginnerLabSubjectIds = [
  "biology",
  "chemistry",
  "computer-science",
  "economics",
  "english",
  "history",
  "math",
  "physics"
] as const;

export type BeginnerLabSubjectId = (typeof beginnerLabSubjectIds)[number];

/** The four learning modes every beginner lab topic must support. */
export const beginnerLabModes = ["learn", "play", "practice", "exam"] as const;

export type BeginnerLabMode = (typeof beginnerLabModes)[number];

/** How students answer Practice and Exam questions. */
export const beginnerLabAnswerModes = ["paper", "computer"] as const;

export type BeginnerLabAnswerMode = (typeof beginnerLabAnswerModes)[number];

/** Supported computer-graded question formats. */
export const beginnerLabQuestionTypes = ["multiple_choice", "numeric", "short_text"] as const;

export type BeginnerLabQuestionType = (typeof beginnerLabQuestionTypes)[number];

/** Stable id for a visualization requested by content. */
export type BeginnerLabVisualizationId = `${BeginnerLabSubjectId}:${string}`;

/** Small glossary entry rendered with a Learn section. */
export type BeginnerLabKeyTerm = {
  term: string;
  definition: string;
};

/** Chapter header for Learn mode. */
export type BeginnerLabLearnChapter = {
  number: number;
  title: string;
  introduction: string;
  figureCaption: string;
};

/** A numbered textbook-style section inside the Learn chapter. */
export type BeginnerLabLearnSection = {
  id: string;
  /** Display number, e.g. "1.1", "1.2". */
  sectionNumber: string;
  title: string;
  paragraphs: string[];
  keyTerms?: BeginnerLabKeyTerm[];
  /** Optional link from this section to a Play visualization. */
  visualizationId?: BeginnerLabVisualizationId;
};

/** Metadata for a visualization that the Play mode can resolve elsewhere. */
export type BeginnerLabVisualizationMeta = {
  id: BeginnerLabVisualizationId;
  title: string;
  description: string;
  /** Writer-facing notes for the intended interaction, not component code. */
  interactionSummary: string;
  /** Short labels for adjustable controls or visible model parts. */
  focusPoints: string[];
};

/** Topic card and lookup metadata for one beginner lab topic. */
export type BeginnerLabTopicMeta = {
  subjectId: BeginnerLabSubjectId;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  subtopics: string[];
  /** Identifier for the hub/card preview visualization. */
  previewVisualizationId: BeginnerLabVisualizationId;
};

type BeginnerLabBaseQuestion = {
  id: string;
  prompt: string;
  explanation: string;
  /** Optional scaffolding shown in practice; exam UIs may hide it until grading. */
  hint?: string;
};

export type BeginnerLabMultipleChoiceQuestion = BeginnerLabBaseQuestion & {
  type: "multiple_choice";
  choices: [string, string, ...string[]];
  /** Exact choice string, not an index. */
  correctAnswer: string;
};

export type BeginnerLabNumericQuestion = BeginnerLabBaseQuestion & {
  type: "numeric";
  /** Digits or decimal text; graders may strip units before comparing. */
  correctAnswer: string;
  /** Optional display unit, e.g. "m/s" or "%". */
  unit?: string;
  /** Optional absolute tolerance for computer grading. */
  tolerance?: number;
};

export type BeginnerLabShortTextQuestion = BeginnerLabBaseQuestion & {
  type: "short_text";
  /** Preferred lowercase answer for simple text comparison. */
  correctAnswer: string;
  /** Alternate accepted spellings or phrasings for computer grading. */
  acceptedAnswers?: string[];
};

/** A single assessable question for Practice or Exam mode. */
export type BeginnerLabQuestion =
  | BeginnerLabMultipleChoiceQuestion
  | BeginnerLabNumericQuestion
  | BeginnerLabShortTextQuestion;

export type BeginnerLabPracticeQuestion = BeginnerLabQuestion & {
  mode: "practice";
};

export type BeginnerLabExamQuestion = BeginnerLabQuestion & {
  mode: "exam";
};

/** Full content bundle for one beginner lab topic. */
export type BeginnerLabTopicContent = {
  meta: BeginnerLabTopicMeta;
  learnChapter: BeginnerLabLearnChapter;
  learnSections: BeginnerLabLearnSection[];
  visualizations: BeginnerLabVisualizationMeta[];
  defaultAnswerMode: BeginnerLabAnswerMode;
  practiceQuestions: BeginnerLabPracticeQuestion[];
  examQuestions: BeginnerLabExamQuestion[];
};

/** Props/data passed to future mode-specific surfaces without coupling to UI. */
export type BeginnerLabModeContext = {
  topic: BeginnerLabTopicContent;
  mode: BeginnerLabMode;
  answerMode?: BeginnerLabAnswerMode;
};
