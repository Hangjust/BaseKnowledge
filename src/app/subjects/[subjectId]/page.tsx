import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import SubjectIcon from "@/components/SubjectIcon";
import { getPublishedTopicsBySubject } from "@/lib/content-store";
import { getSubject } from "@/lib/subjects";
import { subjectIdSchema } from "@/lib/validation";

export default async function SubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const resolvedParams = await params;
  const parsedSubject = subjectIdSchema.safeParse(resolvedParams.subjectId);

  if (!parsedSubject.success) {
    notFound();
  }

  const subject = getSubject(parsedSubject.data);

  if (!subject) {
    notFound();
  }

  if (subject.id === "physics") {
    redirect("/physics");
  }

  const topics = await getPublishedTopicsBySubject(subject.id);

  return (
    <main className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{subject.name}</span>
      </nav>

      <section className="topic-header">
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <SubjectIcon accent={subject.accent} size="sm" subjectId={subject.id} />
          <p className="eyebrow" style={{ margin: 0 }}>
            Subject
          </p>
        </div>
        <h1>{subject.name}</h1>
        <p className="lead">{subject.description}</p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2 style={{ marginBottom: "20px" }}>Topics</h2>
        {topics.length ? (
          <div className="topic-grid">
            {topics.map((topic) => (
              <Link className="topic-card" href={`/subjects/${subject.id}/${topic.slug}`} key={topic.id}>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <div className="topic-tags">
                  {topic.subtopics.slice(0, 3).map((tag) => (
                    <span className="topic-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">Lessons for this subject are coming soon.</div>
        )}
      </section>
    </main>
  );
}
