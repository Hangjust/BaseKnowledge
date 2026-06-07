import Link from "next/link";
import { notFound } from "next/navigation";
import {
  addLessonAction,
  addQuestionAction,
  deleteTopicAction,
  updateTopicAction
} from "../../actions";
import AdminSignOut from "@/components/AdminSignOut";
import { requireAdmin } from "@/lib/admin";
import { getSubjects, getTopicById } from "@/lib/content-store";
import { hasMongoConfig } from "@/lib/env";
import { difficultyLevels } from "@/lib/types";

export default async function AdminTopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  await requireAdmin();
  const resolvedParams = await params;
  const topic = await getTopicById(resolvedParams.topicId);
  const subjects = getSubjects();
  const canWriteContent = hasMongoConfig();

  if (!topic) {
    notFound();
  }

  const updateTopic = updateTopicAction.bind(null, topic.id);
  const deleteTopic = deleteTopicAction.bind(null, topic.id);

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Admin / Topic</p>
        <h1>{topic.title}</h1>
        <div className="toolbar">
          <Link className="ghost-button" href="/admin">
            Back to dashboard
          </Link>
          <Link className="ghost-button" href={`/subjects/${topic.subjectId}/${topic.slug}`}>
            View public page
          </Link>
          <AdminSignOut />
        </div>
      </section>

      <div className="admin-layout">
        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="#details">Details</Link>
          <Link href="#lessons">Lessons</Link>
          <Link href="#questions">Questions</Link>
          <Link href="/admin/media">Media</Link>
        </nav>

        <div className="form-grid">
          {!canWriteContent ? (
            <div className="status error">
              MongoDB is not configured. This topic is readable, but admin content changes are disabled until MONGODB_URI is set.
            </div>
          ) : null}

          <section className="admin-panel" id="details">
            <h2>Topic details</h2>
            <form action={updateTopic} className="form-grid">
              <fieldset className="form-grid" disabled={!canWriteContent}>
                <div className="grid">
                  <div className="field">
                    <label htmlFor="subjectId">Subject</label>
                    <select defaultValue={topic.subjectId} id="subjectId" name="subjectId">
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="title">Title</label>
                    <input defaultValue={topic.title} id="title" name="title" required />
                  </div>
                  <div className="field">
                    <label htmlFor="slug">Slug</label>
                    <input defaultValue={topic.slug} id="slug" name="slug" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="description">Description</label>
                  <textarea defaultValue={topic.description} id="description" name="description" required />
                </div>
                <div className="field">
                  <label htmlFor="subtopics">Subtopics</label>
                  <textarea defaultValue={topic.subtopics.join("\n")} id="subtopics" name="subtopics" />
                </div>
                <label>
                  <input defaultChecked={topic.isPublished} name="isPublished" type="checkbox" /> Published
                </label>
                <div className="inline-actions">
                  <button className="button" type="submit">
                    Save details
                  </button>
                </div>
              </fieldset>
            </form>
            <form action={deleteTopic}>
              <button className="danger-button" disabled={!canWriteContent} type="submit">
                Delete topic
              </button>
            </form>
          </section>

          <section className="admin-panel" id="lessons">
            <h2>Lessons</h2>
            {topic.lessons.length ? (
              <div className="form-grid">
                {topic.lessons.map((lesson) => (
                  <div className="card" key={lesson.id}>
                    <p className="eyebrow">{lesson.difficulty}</p>
                    <h3>{lesson.title}</h3>
                    <p className="muted">{lesson.summary}</p>
                    {lesson.videoUrl ? <p className="muted">Video: {lesson.videoUrl}</p> : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">No lessons yet.</div>
            )}

            <h3>Add lesson</h3>
            <form action={addLessonAction} className="form-grid">
              <fieldset className="form-grid" disabled={!canWriteContent}>
                <input name="topicId" type="hidden" value={topic.id} />
                <div className="grid">
                  <div className="field">
                    <label htmlFor="lesson-title">Title</label>
                    <input id="lesson-title" name="title" required />
                  </div>
                  <div className="field">
                    <label htmlFor="lesson-difficulty">Difficulty</label>
                    <select id="lesson-difficulty" name="difficulty">
                      {difficultyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="summary">Summary</label>
                  <textarea id="summary" name="summary" required />
                </div>
                <div className="field">
                  <label htmlFor="body">Lesson body</label>
                  <textarea id="body" name="body" placeholder={"Optional first line becomes the section heading."} required />
                </div>
                <div className="field">
                  <label htmlFor="videoUrl">Video URL</label>
                  <input id="videoUrl" name="videoUrl" placeholder="https://..." type="url" />
                </div>
                <div className="field">
                  <label htmlFor="examplePrompt">Example problem</label>
                  <textarea id="examplePrompt" name="examplePrompt" required />
                </div>
                <div className="field">
                  <label htmlFor="exampleSolution">Example solution</label>
                  <textarea id="exampleSolution" name="exampleSolution" required />
                </div>
                <button className="button" type="submit">
                  Add lesson
                </button>
              </fieldset>
            </form>
          </section>

          <section className="admin-panel" id="questions">
            <h2>Practice questions</h2>
            {topic.questions.length ? (
              <div className="form-grid">
                {topic.questions.map((question) => (
                  <div className="card" key={question.id}>
                    <p className="eyebrow">{question.difficulty}</p>
                    <h3>{question.prompt}</h3>
                    <p className="muted">{question.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">No questions yet.</div>
            )}

            <h3>Add question</h3>
            <form action={addQuestionAction} className="form-grid">
              <fieldset className="form-grid" disabled={!canWriteContent}>
                <input name="topicId" type="hidden" value={topic.id} />
                <div className="field">
                  <label htmlFor="prompt">Prompt</label>
                  <textarea id="prompt" name="prompt" required />
                </div>
                <div className="grid">
                  <div className="field">
                    <label htmlFor="question-difficulty">Difficulty</label>
                    <select id="question-difficulty" name="difficulty">
                      {difficultyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="correctChoiceIndex">Correct choice</label>
                    <select id="correctChoiceIndex" name="correctChoiceIndex">
                      <option value="0">Choice 1</option>
                      <option value="1">Choice 2</option>
                      <option value="2">Choice 3</option>
                      <option value="3">Choice 4</option>
                    </select>
                  </div>
                </div>
                {[0, 1, 2, 3].map((index) => (
                  <div className="field" key={index}>
                    <label htmlFor={`choice${index}`}>Choice {index + 1}</label>
                    <input id={`choice${index}`} name={`choice${index}`} required />
                  </div>
                ))}
                <div className="field">
                  <label htmlFor="explanation">Explanation</label>
                  <textarea id="explanation" name="explanation" required />
                </div>
                <button className="button" type="submit">
                  Add question
                </button>
              </fieldset>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
