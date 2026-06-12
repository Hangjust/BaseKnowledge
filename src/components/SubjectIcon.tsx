import type { SubjectId } from "@/lib/types";

const icons: Record<SubjectId, string> = {
  biology: "🧬",
  chemistry: "🧪",
  "computer-science": "💻",
  economics: "📈",
  english: "✎",
  history: "📜",
  math: "∑",
  physics: "⚛"
};

export default function SubjectIcon({
  subjectId,
  accent,
  size = "md"
}: {
  subjectId: SubjectId;
  accent: string;
  size?: "sm" | "md";
}) {
  const dimension = size === "sm" ? 36 : 40;

  return (
    <div
      className="subject-card-icon"
      style={{
        width: dimension,
        height: dimension,
        background: `${accent}18`,
        color: accent
      }}
    >
      {icons[subjectId]}
    </div>
  );
}
