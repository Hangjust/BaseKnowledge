/**
 * =============================================================================
 * PHYSICS TOPIC REGISTRY
 * =============================================================================
 *
 * Central lookup table. All routes import from here — never hard-code topic
 * content inside page files.
 *
 * TO ADD A NEW TOPIC:
 *   1. Create `src/lib/physics/<slug>-content.ts`
 *   2. Import it below and append to `physicsTopics` array
 *   3. Extend `PhysicsTopicSlug` in types.ts if needed
 *   4. Add preview + play visualizations in components/physics/visualizations/
 *
 * Routes under `src/app/physics/` automatically work for any registered slug.
 * =============================================================================
 */

import { mechanicsContent } from "./mechanics-content";
import { opticsContent } from "./optics-content";
import type { PhysicsLearningMode, PhysicsTopicContent, PhysicsTopicSlug } from "./types";

/** All implemented physics topics, in display order on the hub page. */
export const physicsTopics: PhysicsTopicContent[] = [opticsContent, mechanicsContent];

/** Human-readable labels for the four learning modes (used in nav + cards). */
export const modeLabels: Record<PhysicsLearningMode, { title: string; description: string }> = {
  learn: {
    title: "Learn",
    description: "Read the chapter — textbook-style explanations with figures and key terms."
  },
  play: {
    title: "Visualization play",
    description: "Adjust parameters and watch physics happen in real time."
  },
  practice: {
    title: "Practice",
    description: "Easier problems — solve on paper or type answers and check your work."
  },
  exam: {
    title: "Exam",
    description: "Harder, exam-style questions. Same format as practice, higher difficulty."
  }
};

export function getAllPhysicsTopics(): PhysicsTopicContent[] {
  return physicsTopics;
}

export function getPhysicsTopic(slug: string): PhysicsTopicContent | undefined {
  return physicsTopics.find((topic) => topic.meta.slug === slug);
}

export function isValidPhysicsTopicSlug(slug: string): slug is PhysicsTopicSlug {
  return physicsTopics.some((topic) => topic.meta.slug === slug);
}

/** Build canonical path segments for a topic mode page. */
export function physicsTopicModePath(slug: PhysicsTopicSlug, mode: PhysicsLearningMode): string {
  return `/physics/${slug}/${mode}`;
}
