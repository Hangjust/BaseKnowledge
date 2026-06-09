/**
 * =============================================================================
 * PhysicsTopicCard — hub page card linking to a topic's mode selector
 * =============================================================================
 */

import Link from "next/link";
import type { CSSProperties } from "react";
import TopicPreviewViz from "@/components/physics/visualizations/TopicPreviewViz";
import type { PhysicsTopicContent } from "@/lib/physics/types";

export default function PhysicsTopicCard({ topic }: { topic: PhysicsTopicContent }) {
  const { meta } = topic;

  return (
    <Link
      className="physics-topic-card"
      href={`/physics/${meta.slug}`}
      style={{ "--topic-accent": meta.accentColor } as CSSProperties}
    >
      <div className="physics-topic-preview">
        <TopicPreviewViz type={meta.previewVisualization} />
      </div>
      <div className="physics-topic-card-body">
        <h3>{meta.title}</h3>
        <p>{meta.tagline}</p>
        <div className="physics-chip-row">
          {meta.subtopics.map((chip) => (
            <span className="physics-chip" key={chip}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}