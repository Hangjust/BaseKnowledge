/**
 * =============================================================================
 * PHYSICS HUB PAGE — /physics
 * =============================================================================
 *
 * Entry point when user clicks "Physics". Lists all registered topics from
 * topics.ts with animated preview visualizations.
 *
 * No topic-specific logic here — purely driven by the registry.
 * =============================================================================
 */

import PhysicsShell from "@/components/physics/PhysicsShell";
import PhysicsTopicCard from "@/components/physics/PhysicsTopicCard";
import { getAllPhysicsTopics } from "@/lib/physics/topics";

export const metadata = {
  title: "Physics Lab — BaseKnowledge",
  description: "Interactive physics topics with visualizations, practice, and exams."
};

export default function PhysicsHubPage() {
  const topics = getAllPhysicsTopics();

  return (
    <PhysicsShell breadcrumbs={[{ label: "Physics" }]}>
      <section className="physics-hero">
        <p className="physics-eyebrow">Interactive learning</p>
        <h1>Physics Lab</h1>
        <p className="lead">
          Pick a topic to read the chapter, play in the sandbox, practice problems, or take an exam.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "1.1rem", marginBottom: 16, color: "var(--phys-muted)" }}>All topics</h2>
        <div className="physics-topic-grid">
          {topics.map((topic) => (
            <PhysicsTopicCard key={topic.meta.slug} topic={topic} />
          ))}
        </div>
      </section>
    </PhysicsShell>
  );
}