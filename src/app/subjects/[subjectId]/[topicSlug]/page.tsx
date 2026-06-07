import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLessonForDifficulty,
  getQuestionsForDifficulty,
  getSubject,
  getTopic
} from "@/lib/content-store";
import { difficultyLevels, type Difficulty } from "@/lib/types";
import { difficultySchema, subjectIdSchema } from "@/lib/validation";
import QuizClient from "@/components/QuizClient";
import AssistantPanel from "@/components/AssistantPanel";

export default async function TopicPage({
  params,
  searchParams
}: {
  params: Promise<{ subjectId: string; topicSlug: string }>;
  searchParams: Promise<{ difficulty?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const parsedSubject = subjectIdSchema.safeParse(resolvedParams.subjectId);

  if (!parsedSubject.success) {
    notFound();
  }

  const subject = getSubject(parsedSubject.data);
  const topic = await getTopic(parsedSubject.data, resolvedParams.topicSlug);

  if (!subject || !topic || !topic.isPublished) {
    notFound();
  }

  const parsedDifficulty = difficultySchema.safeParse(resolvedSearchParams.difficulty);
  const difficulty: Difficulty = parsedDifficulty.success ? parsedDifficulty.data : "Basic";
  const lesson = getLessonForDifficulty(topic, difficulty);
  const questions = getQuestionsForDifficulty(topic, difficulty);

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">
          {subject.name} / {topic.title}
        </p>
        <h1>{topic.title}</h1>
        <p className="lead">{topic.description}</p>
        <div className="tabs" aria-label="Difficulty">
          {difficultyLevels.map((level) => (
            <Link
              className={level === difficulty ? "tab active" : "tab"}
              href={`/subjects/${subject.id}/${topic.slug}?difficulty=${level}`}
              key={level}
            >
              {level}
            </Link>
          ))}
        </div>
      </section>

      <div className="topic-layout">
        <div>
          {lesson ? (
            <article className="lesson-panel">
              <div>
                <p className="eyebrow">{lesson.difficulty}</p>
                <h2>{lesson.title}</h2>
                <p className="muted">{lesson.summary}</p>
              </div>

              {lesson.sections.map((section) => (
                <section className="lesson-section" key={section.heading}>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                </section>
              ))}

              {lesson.diagram ? (
                <section className="diagram-box">
                  <h3>{lesson.diagram.title}</h3>
                  <p className="muted">{lesson.diagram.description}</p>
                </section>
              ) : null}

              {lesson.videoUrl ? (
                <section className="lesson-section">
                  <h3>Video lesson</h3>
                  <p>
                    <a className="ghost-button" href={lesson.videoUrl}>
                      Open video
                    </a>
                  </p>
                </section>
              ) : null}

              {lesson.examples.map((example) => (
                <section className="example-box" key={example.prompt}>
                  <h3>Example problem</h3>
                  <p>{example.prompt}</p>
                  <p className="muted">{example.solution}</p>
                </section>
              ))}
            </article>
          ) : (
            <div className="empty-state">
              Full lessons for this topic are coming soon. Try Physics Thermodynamics for the complete prototype slice.
            </div>
          )}

          <section className="section">
            <h2>Practice</h2>
            {questions.length ? (
              <QuizClient questions={questions} />
            ) : (
              <div className="empty-state">Practice questions for this topic are coming soon.</div>
            )}
          </section>
        </div>

        <aside className="side-panel">
          <h2>AI study help</h2>
          <p className="muted">
            Upload a textbook screenshot and ask for a simpler explanation or a generated quiz at this difficulty level.
          </p>
          <AssistantPanel
            defaultSubjectId={subject.id}
            defaultTopicSlug={topic.slug}
            defaultDifficulty={difficulty}
            compact
          />
        </aside>
      </div>
    </main>
  );
}
