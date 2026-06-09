/**
 * =============================================================================
 * PhysicsModeNav — tab bar linking the four learning modes for a topic
 * =============================================================================
 *
 * Rendered on learn / play / practice / exam pages so users can switch modes
 * without returning to the topic hub.
 *
 * TO USE: pass topicSlug + currentMode; component reads labels from topics.ts.
 * =============================================================================
 */

import Link from "next/link";
import { modeLabels, physicsTopicModePath } from "@/lib/physics/topics";
import type { PhysicsLearningMode, PhysicsTopicSlug } from "@/lib/physics/types";

const MODES: PhysicsLearningMode[] = ["learn", "play", "practice", "exam"];

type PhysicsModeNavProps = {
  topicSlug: PhysicsTopicSlug;
  currentMode: PhysicsLearningMode;
};

export default function PhysicsModeNav({ topicSlug, currentMode }: PhysicsModeNavProps) {
  return (
    <nav className="physics-mode-nav" aria-label="Learning modes">
      {MODES.map((mode) => (
        <Link
          key={mode}
          href={physicsTopicModePath(topicSlug, mode)}
          className={currentMode === mode ? "active" : undefined}
        >
          {modeLabels[mode].title}
        </Link>
      ))}
    </nav>
  );
}