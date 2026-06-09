/**
 * =============================================================================
 * TopicLearnView — "Learn" mode (textbook-style chapter)
 * =============================================================================
 *
 * Renders a single readable chapter: opening prose, a labeled figure, then
 * numbered sections with paragraphs and optional key-term definition boxes.
 *
 * TO ADD A NEW TOPIC:
 *   1. Fill in learnChapter + learnSections in <topic>-content.ts
 *   2. Add a case in resolveVisualization() for the chapter figure
 * =============================================================================
 */

"use client";

import MirrorReflectionViz from "@/components/physics/visualizations/MirrorReflectionViz";
import ProjectileMotionViz from "@/components/physics/visualizations/ProjectileMotionViz";
import type { PhysicsTopicContent } from "@/lib/physics/types";

export default function TopicLearnView({ topic }: { topic: PhysicsTopicContent }) {
  const { learnChapter, learnSections, meta } = topic;
  const viz = resolveVisualization(meta.slug);

  return (
    <article className="physics-textbook">
      <header className="physics-chapter-header">
        <p className="physics-chapter-eyebrow">
          {meta.title} · Chapter {learnChapter.number}
        </p>
        <h2 className="physics-chapter-title">{learnChapter.title}</h2>
        <p className="physics-chapter-intro">{learnChapter.introduction}</p>
      </header>

      <figure className="physics-figure">
        <div className="physics-figure-frame">{viz}</div>
        <figcaption>
          <span className="physics-figure-label">Figure {learnChapter.number}.1</span>
          {learnChapter.figureCaption}
        </figcaption>
      </figure>

      <div className="physics-textbook-body">
        {learnSections.map((section) => (
          <section className="physics-textbook-section" key={section.id} id={section.id}>
            <h3 className="physics-section-heading">
              <span className="physics-section-number">{section.sectionNumber}</span>
              {section.title}
            </h3>

            {section.paragraphs.map((paragraph, index) => (
              <p className="physics-textbook-paragraph" key={index}>
                {paragraph}
              </p>
            ))}

            {section.keyTerms && section.keyTerms.length > 0 && (
              <aside className="physics-key-terms" aria-label="Key terms">
                <p className="physics-key-terms-label">Key terms</p>
                <dl>
                  {section.keyTerms.map((item) => (
                    <div className="physics-key-term-row" key={item.term}>
                      <dt>{item.term}</dt>
                      <dd>{item.definition}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

function resolveVisualization(slug: string) {
  switch (slug) {
    case "optics":
      return <MirrorReflectionViz incidenceAngle={35} />;
    case "classical-mechanics":
      return <ProjectileMotionViz launchAngle={45} launchSpeed={20} />;
    default:
      return <p className="physics-textbook-paragraph">Figure not configured for this topic.</p>;
  }
}
