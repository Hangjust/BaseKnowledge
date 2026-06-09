import AssistantPanel from "@/components/AssistantPanel";

export default function AssistantPage() {
  return (
    <main className="page">
      <section className="topic-header">
        <p className="eyebrow">AI learning assistant</p>
        <h1>Your personal study tutor</h1>
        <p className="lead">
          Upload notes, screenshots, or PDFs and ask the AI to explain concepts, generate practice
          questions, or create custom quizzes — all tailored to your material.
        </p>
      </section>

      <section className="content-panel">
        <AssistantPanel defaultDifficulty="Basic" defaultSubjectId="physics" defaultTopicSlug="" />
      </section>
    </main>
  );
}