/**
 * =============================================================================
 * MODE PAGE — /physics/[topicSlug]/[mode]
 * =============================================================================
 *
 * Renders one of the four learning modes:
 *   learn    → TopicLearnView
 *   play     → TopicPlayView
 *   practice → PracticeExamPanel (practiceQuestions)
 *   exam     → PracticeExamPanel (examQuestions)
 *
 * This file is topic-agnostic. All content lives in lib/physics/*-content.ts.
 * =============================================================================
 */

import { notFound } from "next/navigation";
import PhysicsModeNav from "@/components/physics/PhysicsModeNav";
import PhysicsShell from "@/components/physics/PhysicsShell";
import PracticeExamPanel from "@/components/physics/PracticeExamPanel";
import TopicLearnView from "@/components/physics/TopicLearnView";
import TopicPlayView from "@/components/physics/TopicPlayView";
import { getPhysicsTopic, isValidPhysicsTopicSlug, modeLabels } from "@/lib/physics/topics";
import type { PhysicsLearningMode, PhysicsTopicSlug } from "@/lib/physics/types";

const VALID_MODES: PhysicsLearningMode[] = ["learn", "play", "practice", "exam"];

function isValidMode(mode: string): mode is PhysicsLearningMode {
  return VALID_MODES.includes(mode as PhysicsLearningMode);
}

type PageProps = {
  params: Promise<{ topicSlug: string; mode: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { topicSlug, mode } = await params;
  const topic = getPhysicsTopic(topicSlug);
  if (!topic || !isValidMode(mode)) return { title: "Not found" };
  return {
    title: `${topic.meta.title} — ${modeLabels[mode].title}`,
    description: modeLabels[mode].description
  };
}

export default async function PhysicsModePage({ params }: PageProps) {
  const { topicSlug, mode } = await params;

  if (!isValidPhysicsTopicSlug(topicSlug) || !isValidMode(mode)) {
    notFound();
  }

  const topic = getPhysicsTopic(topicSlug)!;
  const slug = topicSlug as PhysicsTopicSlug;
  const modeInfo = modeLabels[mode];

  return (
    <PhysicsShell
      accentColor={topic.meta.accentColor}
      breadcrumbs={[
        { label: "Physics", href: "/physics" },
        { label: topic.meta.title, href: `/physics/${slug}` },
        { label: modeInfo.title }
      ]}
    >
      <section className="physics-hero" style={{ marginBottom: 24 }}>
        <p className="physics-eyebrow">{topic.meta.title}</p>
        <h1>{modeInfo.title}</h1>
        <p className="lead">{modeInfo.description}</p>
      </section>

      <PhysicsModeNav topicSlug={slug} currentMode={mode} />

      {mode === "learn" && <TopicLearnView topic={topic} />}
      {mode === "play" && <TopicPlayView topic={topic} />}
      {mode === "practice" && (
        <PracticeExamPanel
          questions={topic.practiceQuestions}
          modeLabel="Practice"
          showHints
        />
      )}
      {mode === "exam" && (
        <PracticeExamPanel
          questions={topic.examQuestions}
          modeLabel="Exam"
          showHints={false}
        />
      )}
    </PhysicsShell>
  );
}