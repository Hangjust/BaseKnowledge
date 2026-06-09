"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { seedTopics, subjects } from "@/lib/seed-data";

const quickTopics = [
  { label: "Thermodynamics", href: "/subjects/physics/thermodynamics" },
  { label: "Cells", href: "/subjects/biology/cells" },
  { label: "Algebra", href: "/subjects/math/algebra-basics" },
  { label: "Atomic Structure", href: "/subjects/chemistry/atomic-structure" }
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return seedTopics
      .filter(
        (topic) =>
          topic.isPublished &&
          (topic.title.toLowerCase().includes(normalized) ||
            topic.description.toLowerCase().includes(normalized) ||
            topic.subtopics.some((tag) => tag.toLowerCase().includes(normalized)))
      )
      .slice(0, 6)
      .map((topic) => ({
        ...topic,
        subjectName: subjects.find((s) => s.id === topic.subjectId)?.name ?? topic.subjectId
      }));
  }, [query]);

  return (
    <div className="hero-search">
      <div className="search-card">
        <div className="search-input-row" style={{ borderBottom: "none" }}>
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            className="search-input"
            onBlur={() => setTimeout(() => setShowResults(false), 150)}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Search topics — thermodynamics, cells, algebra..."
            type="search"
            value={query}
          />
        </div>
      </div>

      {showResults && query.trim() && results.length > 0 ? (
        <div className="search-results" role="listbox">
          {results.map((result) => (
            <Link
              className="search-result-item"
              href={`/subjects/${result.subjectId}/${result.slug}`}
              key={result.id}
              role="option"
            >
              <div className="search-result-subject">{result.subjectName}</div>
              <div className="search-result-title">{result.title}</div>
            </Link>
          ))}
        </div>
      ) : null}

      {showResults && query.trim() && results.length === 0 ? (
        <div className="search-results">
          <div className="search-result-item" style={{ cursor: "default" }}>
            <div className="muted">No topics found. Try a different search or pick a topic below.</div>
          </div>
        </div>
      ) : null}

      <div className="quick-topics">
        <span className="quick-topics-label">Popular topics</span>
        <div className="quick-topics-list">
          {quickTopics.map((topic) => (
            <Link className="quick-topic-chip" href={topic.href} key={topic.href}>
              {topic.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
