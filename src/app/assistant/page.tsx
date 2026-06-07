import AssistantPanel from "@/components/AssistantPanel";

export default function AssistantPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">AI learning assistant</p>
        <h1>Upload a textbook screenshot and study from it.</h1>
        <p className="lead">
          The assistant can explain concepts in simpler terms, generate practice questions, create quizzes,
          and answer questions about the uploaded material.
        </p>
      </section>

      <section className="lesson-panel">
        <AssistantPanel defaultSubjectId="physics" defaultTopicSlug="thermodynamics" defaultDifficulty="Basic" />
      </section>
    </main>
  );
}
