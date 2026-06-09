"use client";

import { useState, type ReactNode } from "react";

const tabs = [
  { id: "read", label: "Read" },
  { id: "quiz", label: "Quiz" },
  { id: "practice", label: "Practice" },
  { id: "ai", label: "AI Help" }
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function TopicTabs({
  readContent,
  quizContent,
  practiceContent,
  aiContent
}: {
  readContent: ReactNode;
  quizContent: ReactNode;
  practiceContent: ReactNode;
  aiContent: ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("read");

  const content: Record<TabId, ReactNode> = {
    read: readContent,
    quiz: quizContent,
    practice: practiceContent,
    ai: aiContent
  };

  return (
    <div>
      <div className="topic-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? "topic-tab active" : "topic-tab"}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="content-panel" role="tabpanel">
        {content[activeTab]}
      </div>
    </div>
  );
}