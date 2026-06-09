import Link from "next/link";
import { notFound } from "next/navigation";
import AssistantPanel from "@/components/AssistantPanel";
import QuizClient from "@/components/QuizClient";
import TopicTabs from "@/components/TopicTabs";
import {
  getLessonForDifficulty,
  getQuestionsForDifficulty,
  getTopic
} from "@/lib/content-store";
import { getSubject } from "@/lib/subjects";
import { difficultyLevels, type Difficulty } from "@/lib/types";
import { difficultySchema, subjectIdSchema } from "@/lib/validation";

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

  const readContent = lesson ? (
    <article>
      <p className="eyebrow">{lesson.difficulty}</p>
      <h2 style={{ marginBottom: "8px" }}>{lesson.title}</h2>
      <p className="muted" style={{ marginBottom: "24px" }}>
        {lesson.summary}
      </p>

      {lesson.sections.map((section) => (
        <section className="lesson-section" key={section.heading}>
          <h3>{section.heading}</h3>
          <p style={{ margin: "8px 0 0", color: "var(--text-secondary)" }}>{section.body}</p>
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
          <a className="ghost-button" href={lesson.videoUrl}>
            Open video
          </a>
        </section>
      ) : null}
    </article>
  ) : (
    <div className="empty-state">
      Full lessons for this topic are coming soon. Try{" "}
      <Link href="/subjects/physics/thermodynamics">Physics → Thermodynamics</Link> for a complete
      example.
    </div>
  );

  const practiceContent =
    lesson && lesson.examples.length > 0 ? (
      <div>
        {lesson.examples.map((example) => (
          <section className="example-box" key={example.prompt}>
            <h3>Problem</h3>
            <p style={{ margin: "8px 0" }}>{example.prompt}</p>
            <h3 style={{ marginTop: "16px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Solution
            </h3>
            <p className="muted" style={{ margin: "4px 0 0" }}>
              {example.solution}
            </p>
          </section>
        ))}
      </div>
    ) : (
      <div className="empty-state">Practice problems for this topic are coming soon.</div>
    );

  const aiContent = (
    <div>
      <p className="muted" style={{ marginBottom: "20px" }}>
        Upload your notes or ask a question. The AI will explain concepts, generate practice
        questions, or create a quiz at your chosen difficulty.
      </p>
      <AssistantPanel
        compact
        defaultDifficulty={difficulty}
        defaultSubjectId={subject.id}
        defaultTopicSlug={topic.slug}
      />
    </div>
  );

  return (
    <main className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href={`/subjects/${subject.id}`}>{subject.name}</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{topic.title}</span>
      </nav>

      <section className="topic-header">
        <h1>{topic.title}</h1>
        <p className="lead">{topic.description}</p>
        <div className="difficulty-pills" aria-label="Difficulty">
          {difficultyLevels.map((level) => (
            <Link
              className={level === difficulty ? "difficulty-pill active" : "difficulty-pill"}
              href={`/subjects/${subject.id}/${topic.slug}?difficulty=${level}`}
              key={level}
            >
              {level}
            </Link>
          ))}
        </div>
      </section>

      <TopicTabs
        aiContent={aiContent}
        practiceContent={practiceContent}
        quizContent={<QuizClient questions={questions} />}
        readContent={readContent}
      />
    </main>
  );
}
