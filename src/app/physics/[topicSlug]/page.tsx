/**
 * =============================================================================
 * TOPIC HUB PAGE — /physics/[topicSlug]
 * =============================================================================
 *
 * Shows the four learning mode cards for a single topic (e.g. Optics).
 * Content comes from topics.ts registry; 404 if slug unknown.
 *
 * DUPLICATION: register topic in topics.ts — this page needs no edits.
 * =============================================================================
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import PhysicsShell from "@/components/physics/PhysicsShell";
import { getPhysicsTopic, isValidPhysicsTopicSlug, modeLabels, physicsTopicModePath } from "@/lib/physics/topics";
import type { PhysicsLearningMode, PhysicsTopicSlug } from "@/lib/physics/types";

const MODE_ICONS: Record<PhysicsLearningMode, string> = {
  learn: "📖",
  play: "🎮",
  practice: "✏️",
  exam: "📝"
};

const MODES: PhysicsLearningMode[] = ["learn", "play", "practice", "exam"];

type PageProps = {
  params: Promise<{ topicSlug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { topicSlug } = await params;
  const topic = getPhysicsTopic(topicSlug);
  if (!topic) return { title: "Topic not found" };
  return {
    title: `${topic.meta.title} — Physics Lab`,
    description: topic.meta.description
  };
}

export default async function PhysicsTopicHubPage({ params }: PageProps) {
  const { topicSlug } = await params;

  if (!isValidPhysicsTopicSlug(topicSlug)) {
    notFound();
  }

  const topic = getPhysicsTopic(topicSlug)!;
  const slug = topicSlug as PhysicsTopicSlug;

  return (
    <PhysicsShell
      accentColor={topic.meta.accentColor}
      breadcrumbs={[
        { label: "Physics", href: "/physics" },
        { label: topic.meta.title }
      ]}
    >
      <section className="physics-hero">
        <p className="physics-eyebrow">{topic.meta.title}</p>
        <h1>{topic.meta.title}</h1>
        <p className="lead">{topic.meta.description}</p>
      </section>

      <div className="physics-mode-grid">
        {MODES.map((mode) => (
          <Link
            key={mode}
            className="physics-mode-card"
            href={physicsTopicModePath(slug, mode)}
          >
            <span className="mode-icon" aria-hidden="true">
              {MODE_ICONS[mode]}
            </span>
            <h3>{modeLabels[mode].title}</h3>
            <p>{modeLabels[mode].description}</p>
          </Link>
        ))}
      </div>
    </PhysicsShell>
  );
}