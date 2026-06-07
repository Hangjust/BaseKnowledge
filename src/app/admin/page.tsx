import Link from "next/link";
import AdminSignOut from "@/components/AdminSignOut";
import { createTopicAction } from "./actions";
import { requireAdmin } from "@/lib/admin";
import { getSubjects, getTopics } from "@/lib/content-store";
import { hasMongoConfig } from "@/lib/env";
import { formatDate } from "@/lib/format";

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  const topics = await getTopics();
  const subjects = getSubjects();
  const canWriteContent = hasMongoConfig();

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Admin dashboard</p>
        <h1>Manage BaseKnowledge content.</h1>
        <div className="toolbar">
          <span className="muted">{session.user?.email}</span>
          <AdminSignOut />
        </div>
      </section>

      <div className="admin-layout">
        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="/admin">Topics</Link>
          <Link href="/admin/media">Media</Link>
          <Link href="/">Public site</Link>
          <Link href="/assistant">AI assistant</Link>
        </nav>

        <div className="form-grid">
          {!canWriteContent ? (
            <div className="status error">
              MongoDB is not configured. Seed content is readable, but admin content changes are disabled until MONGODB_URI is set.
            </div>
          ) : null}

          <section className="admin-panel">
            <h2>Topics</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id}>
                    <td>
                      <strong>{topic.title}</strong>
                      <p className="muted">{topic.description}</p>
                    </td>
                    <td>{subjects.find((subject) => subject.id === topic.subjectId)?.name ?? topic.subjectId}</td>
                    <td>{topic.isPublished ? "Published" : "Draft"}</td>
                    <td>{formatDate(topic.updatedAt)}</td>
                    <td>
                      <div className="inline-actions">
                        <Link className="ghost-button" href={`/admin/topics/${topic.id}`}>
                          Edit
                        </Link>
                        <Link className="ghost-button" href={`/subjects/${topic.subjectId}/${topic.slug}`}>
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="admin-panel">
            <h2>Create topic</h2>
            <form action={createTopicAction} className="form-grid">
              <fieldset className="form-grid" disabled={!canWriteContent}>
                <div className="grid">
                  <div className="field">
                    <label htmlFor="subjectId">Subject</label>
                    <select id="subjectId" name="subjectId">
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" placeholder="Acoustics" required />
                  </div>
                  <div className="field">
                    <label htmlFor="slug">Slug</label>
                    <input id="slug" name="slug" placeholder="acoustics" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" name="description" required />
                </div>
                <div className="field">
                  <label htmlFor="subtopics">Subtopics</label>
                  <textarea id="subtopics" name="subtopics" placeholder={"One subtopic per line"} />
                </div>
                <label>
                  <input name="isPublished" type="checkbox" /> Publish topic
                </label>
                <button className="button" type="submit">
                  Create topic
                </button>
              </fieldset>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
