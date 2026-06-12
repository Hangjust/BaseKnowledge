/**
 * =============================================================================
 * PHYSICS TOPIC TEMPLATE — TYPE DEFINITIONS
 * =============================================================================
 *
 * This file defines the data shapes used across the entire physics learning
 * template. When duplicating this template for a NEW topic (e.g. "Waves"):
 *
 *   1. Copy this file unchanged (types are shared).
 *   2. Create a new content file: `src/lib/physics/waves-content.ts`
 *   3. Register the topic in `src/lib/physics/topics.ts`
 *   4. Create visualization components in `src/components/physics/visualizations/`
 *   5. Add route pages under `src/app/physics/[topicSlug]/` — they read from
 *      the registry automatically; no route changes needed if slug matches.
 *
 * Every interface is documented so another AI (or human) can extend the system
 * without reading every component file first.
 * =============================================================================
 */

/** Slugs for physics topics that have been fully implemented. */
export type PhysicsTopicSlug =
  | "optics"
  | "classical-mechanics"
  | "motion"
  | "forces"
  | "gravity"
  | "light"
  | "mirrors-and-reflection"
  | "electricity"
  | "heat-temperature"
  | "sound"
  | "energy"
  | "magnetism";

/**
 * The four learning modes every topic must support.
 * - learn:  Textbook-style reading with figures and numbered sections.
 * - play:   Interactive sandbox — user adjusts parameters and sees physics live.
 * - practice: Easier questions; paper mode OR typed answers with grading.
 * - exam:     Harder questions; same UI as practice but stricter content.
 */
export type PhysicsLearningMode = "learn" | "play" | "practice" | "exam";

/**
 * How the student answers questions in Practice / Exam mode.
 * - paper:    Questions displayed for handwritten work; "Show Answers" reveals solutions.
 * - computer: Student types/selects answers on-site; "Check Answers" grades at the end.
 */
export type AnswerMode = "paper" | "computer";

/**
 * Question formats supported by PracticeExamPanel.
 * Add new types here AND in PracticeExamPanel's grader when extending.
 */
export type PhysicsQuestionType = "multiple_choice" | "numeric" | "short_text";

/**
 * A single assessable question.
 *
 * DUPLICATION CHECKLIST for new questions:
 *   - `id` must be unique within the topic + mode (practice vs exam).
 *   - `correctAnswer` for multiple_choice: exact choice string (not index).
 *   - `correctAnswer` for numeric: digits only, e.g. "30" (grader strips units).
 *   - `correctAnswer` for short_text: lowercase comparison; keep answers short.
 */
export type PhysicsQuestion = {
  id: string;
  prompt: string;
  type: PhysicsQuestionType;
  /** Required when type === "multiple_choice". */
  choices?: string[];
  correctAnswer: string;
  explanation: string;
  /** Optional scaffolding shown in practice (hidden in exam until graded). */
  hint?: string;
};

/**
 * Chapter header for the Learn mode — renders like a textbook opening.
 * DUPLICATION: set number/title/intro/figureCaption per topic chapter.
 */
export type LearnChapter = {
  number: number;
  title: string;
  introduction: string;
  figureCaption: string;
};

/**
 * A numbered textbook section inside the Learn chapter.
 * Use `paragraphs` for multi-paragraph prose (not a single blurb).
 * Optional `keyTerms` render as a definition box at the end of the section.
 */
export type LearnSection = {
  id: string;
  /** Display number, e.g. "1.1", "1.2" */
  sectionNumber: string;
  title: string;
  paragraphs: string[];
  keyTerms?: { term: string; definition: string }[];
  /** Reserved for per-section figures in future topics. */
  visualizationId: string;
};

/**
 * Metadata for rendering a topic card on the physics hub page.
 * `previewVisualization` is a React component id string resolved in TopicPreview.
 */
export type PhysicsTopicMeta = {
  slug: PhysicsTopicSlug;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  /** Short labels shown as chips on the topic card. */
  subtopics: string[];
  /** Identifier for the mini preview animation on the hub grid. */
  previewVisualization:
    | "mirror"
    | "projectile"
    | "motion"
    | "forces"
    | "gravity"
    | "light"
    | "electricity"
    | "heat"
    | "sound"
    | "energy"
    | "magnetism";
};

/**
 * Full content bundle for one physics topic.
 * Each topic gets ONE file exporting a constant matching this shape.
 *
 * Example: `export const opticsContent: PhysicsTopicContent = { ... }`
 */
export type PhysicsTopicContent = {
  meta: PhysicsTopicMeta;
  learnChapter: LearnChapter;
  learnSections: LearnSection[];
  practiceQuestions: PhysicsQuestion[];
  examQuestions: PhysicsQuestion[];
};

/**
 * Props passed into shared mode pages so they stay topic-agnostic.
 */
export type PhysicsModePageProps = {
  topic: PhysicsTopicContent;
  mode: PhysicsLearningMode;
};
