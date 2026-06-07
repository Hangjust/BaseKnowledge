import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedTopicsBySubject, getSubject } from "@/lib/content-store";
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

  const topics = await getPublishedTopicsBySubject(subject.id);

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Subject</p>
        <h1>{subject.name}</h1>
        <p className="lead">{subject.description}</p>
      </section>

      <section className="section">
        <h2>Topics</h2>
        {topics.length ? (
          <div className="grid">
            {topics.map((topic) => (
              <Link className="card card-link" href={`/subjects/${subject.id}/${topic.slug}`} key={topic.id}>
                <h3>{topic.title}</h3>
                <p className="muted">{topic.description}</p>
                <p className="muted">{topic.subtopics.slice(0, 3).join(" • ")}</p>
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
