import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import SubjectIcon from "@/components/SubjectIcon";
import { getSubjects } from "@/lib/subjects";
import { seedTopics } from "@/lib/seed-data";

export default function HomePage() {
  const subjects = getSubjects();

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">100% free · No account required</p>
        <h1>Learn anything. Practice everything.</h1>
        <p className="lead">
          Explore science, math, and more with clear lessons and instant quizzes — free, at your own
          pace, no account needed.
        </p>
        <HeroSearch />
      </section>

      <section className="section" id="subjects">
        <div className="section-header">
          <h2>Explore subjects</h2>
          <Link className="ghost-button" href="/physics">
            View all
          </Link>
        </div>
        <div className="subject-grid">
          {subjects.map((subject) => {
            const topicCount = seedTopics.filter(
              (topic) => topic.subjectId === subject.id && topic.isPublished
            ).length;

            return (
              <Link
                className="subject-card"
                href={subject.id === "physics" ? "/physics" : `/subjects/${subject.id}`}
                key={subject.id}
              >
                <SubjectIcon accent={subject.accent} subjectId={subject.id} />
                <h3>{subject.name}</h3>
                <p>{subject.description}</p>
                <span className="subject-card-meta">
                  {topicCount} topic{topicCount === 1 ? "" : "s"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2 style={{ marginBottom: "24px" }}>How it works</h2>
        <div className="features-row">
          <div className="feature-card">
            <h3>Read & learn</h3>
            <p className="muted">
              Clear explanations at Basic, Intermediate, and Advanced levels — written for everyone,
              not just experts.
            </p>
          </div>
          <div className="feature-card">
            <h3>Practice instantly</h3>
            <p className="muted">
              Quizzes give immediate feedback with explanations. No sign-up, no paywall.
            </p>
          </div>
          <div className="feature-card">
            <h3>Choose your level</h3>
            <p className="muted">
              Every topic has Basic, Intermediate, and Advanced explanations — start where you are
              comfortable and go deeper when you are ready.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
