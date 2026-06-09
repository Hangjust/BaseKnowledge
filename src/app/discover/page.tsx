import type { Metadata } from "next";
import DiscoverLanding from "@/components/discover/DiscoverLanding";
import "./discover.css";

export const metadata: Metadata = {
  title: "Discover BaseKnowledge — Free learning for everyone",
  description:
    "Explore free lessons in physics, math, chemistry, biology, and more. Instant quizzes and an AI tutor — no sign-up required."
};

export default function DiscoverPage() {
  return <DiscoverLanding />;
}