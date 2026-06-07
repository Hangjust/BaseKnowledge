import Link from "next/link";
import { getSubjects } from "@/lib/content-store";

export default function HomePage() {
  const subjects = getSubjects();

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">No student accounts required</p>
          <h1>Study, practice, and get AI help from your textbook screenshots.</h1>
          <p className="lead">
            Browse high school subjects, choose a difficulty level, learn from clear explanations,
            complete practice questions, and ask an AI tutor to explain uploaded study material.
          </p>
          <div className="toolbar">
            <Link className="button" href="/subjects/physics/thermodynamics">
              Start Thermodynamics
            </Link>
            <Link className="ghost-button" href="/assistant">
              Upload a Screenshot
            </Link>
          </div>
        </div>
        <div className="hero-panel" aria-label="Thermodynamics visual">
          <div className="molecule one" />
          <div className="molecule two" />
          <div className="molecule three" />
          <div className="formula-strip">
            <div className="formula-line">
              <span>Q = mc Delta T</span>
              <span>Specific heat</span>
            </div>
            <div className="formula-line">
              <span>Delta U = Q - W</span>
              <span>Energy accounting</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="subjects">
        <h2>Choose a subject</h2>
        <div className="grid subject-grid">
          {subjects.map((subject) => (
            <Link className="card card-link" href={`/subjects/${subject.id}`} key={subject.id}>
              <div className="subject-accent" style={{ backgroundColor: subject.accent }} />
              <h3>{subject.name}</h3>
              <p className="muted">{subject.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>What works in the prototype</h2>
        <div className="grid">
          <div className="card">
            <h3>Public lessons</h3>
            <p className="muted">
              Students can read seeded topic content and change between Basic, Intermediate, and Advanced explanations.
            </p>
          </div>
          <div className="card">
            <h3>Instant practice</h3>
            <p className="muted">
              Quizzes give immediate answer feedback with explanations, without requiring sign-in.
            </p>
          </div>
          <div className="card">
            <h3>Admin-managed content</h3>
            <p className="muted">
              Administrators can add topics, lessons, and questions through protected dashboard screens.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
