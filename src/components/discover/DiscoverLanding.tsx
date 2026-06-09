"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { subjects } from "@/lib/seed-data";
import { useInView } from "@/hooks/useInView";

const icons: Record<string, string> = {
  physics: "⚛",
  chemistry: "🧪",
  biology: "🧬",
  math: "∑",
  english: "✎",
  economics: "📈"
};

const features = [
  {
    icon: "📖",
    title: "Read at your level",
    description:
      "Every topic comes in Basic, Intermediate, and Advanced — pick the depth that fits you, not someone else's syllabus."
  },
  {
    icon: "⚡",
    title: "Instant feedback",
    description:
      "Quizzes tell you right away if you're right, with a clear explanation. No waiting, no account."
  },
  {
    icon: "🤖",
    title: "AI on your material",
    description:
      "Upload your notes or screenshots. The AI explains, quizzes, and practices using what you actually study."
  }
];

const chatMessages = [
  { role: "user" as const, text: "Can you explain Q = mcΔT in simpler terms?" },
  {
    role: "ai" as const,
    text: "Think of Q as the energy bill for heating something up. m is how much stuff you have, c is how stubborn that material is about changing temperature, and ΔT is the temperature change you want."
  },
  { role: "user" as const, text: "Give me a practice problem." },
  {
    role: "ai" as const,
    text: "How much energy is needed to heat 2 kg of water from 20°C to 30°C? (c = 4200 J/kg·°C)"
  }
];

function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      className={`discover-reveal ${isInView ? "in-view" : ""} ${className}`}
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const { ref, isInView } = useInView<HTMLSpanElement>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span className="discover-stat-value" ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function BentoCard({
  subject,
  large = false
}: {
  subject: (typeof subjects)[number];
  large?: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMove = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
    card.style.setProperty("--accent-glow", `${subject.accent}22`);
  }, [subject.accent]);

  return (
    <Link
      className={`discover-bento-card ${large ? "large" : ""}`}
      href={`/subjects/${subject.id}`}
      onMouseMove={handleMove}
      ref={cardRef}
      style={{ "--accent": subject.accent } as React.CSSProperties}
    >
      <div
        className="discover-bento-icon"
        style={{ background: `${subject.accent}18`, color: subject.accent }}
      >
        {icons[subject.id]}
      </div>
      <h3>{subject.name}</h3>
      <p>{subject.description}</p>
      <span className="discover-bento-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default function DiscoverLanding() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (visibleCount >= chatMessages.length) {
      const reset = setTimeout(() => setVisibleCount(0), 4500);
      return () => clearTimeout(reset);
    }

    const next = chatMessages[visibleCount];

    if (next.role === "ai") {
      setShowTyping(true);
      const typing = setTimeout(() => {
        setShowTyping(false);
        setVisibleCount((c) => c + 1);
      }, 1000);
      return () => clearTimeout(typing);
    }

    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 700);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  const marqueeItems = [...subjects, ...subjects];

  return (
    <div className="discover">
      {/* Hero */}
      <section className="discover-hero">
        <div className="discover-hero-bg" aria-hidden="true">
          <div className="discover-orb discover-orb-1" />
          <div className="discover-orb discover-orb-2" />
          <div className="discover-orb discover-orb-3" />
          <div className="discover-grid-lines" />
        </div>

        <div className="discover-hero-inner">
          <div className="discover-hero-copy">
            <div className="discover-badge">
              <span className="discover-badge-dot" />
              Free forever · No sign-up
            </div>

            <h1 className="discover-headline">
              Knowledge for
              <br />
              <span className="discover-headline-gradient">every curious mind</span>
            </h1>

            <p className="discover-subhead">
              BaseKnowledge gives you structured lessons, instant quizzes, and an AI tutor — all
              completely free. Learn physics, math, chemistry, and more at your own pace.
            </p>

            <div className="discover-cta-row">
              <Link className="discover-cta-primary" href="/">
                Start learning
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link className="discover-cta-secondary" href="/assistant">
                Try AI tutor
              </Link>
            </div>
          </div>

          <div className="discover-hero-visual">
            <div className="discover-orbit-wrap" aria-hidden="true">
              {subjects.slice(0, 4).map((s) => (
                <div
                  className="discover-orbit-icon"
                  key={s.id}
                  style={{ color: s.accent }}
                >
                  {icons[s.id]}
                </div>
              ))}
            </div>

            <div className="discover-float-card quiz">✓ Quiz passed</div>
            <div className="discover-float-card ai">✦ AI explained</div>

            <div className="discover-preview-card">
              <div className="discover-preview-header">
                <span className="discover-preview-dot" style={{ background: "#f87171" }} />
                <span className="discover-preview-dot" style={{ background: "#fbbf24" }} />
                <span className="discover-preview-dot" style={{ background: "#34d399" }} />
              </div>
              <div className="discover-preview-tabs">
                <span className="discover-preview-tab active">Read</span>
                <span className="discover-preview-tab">Quiz</span>
                <span className="discover-preview-tab">Practice</span>
                <span className="discover-preview-tab">AI Help</span>
              </div>
              <div className="discover-preview-line" />
              <div className="discover-preview-line medium" />
              <div className="discover-preview-line short" />
              <div className="discover-preview-formula">Q = mcΔT</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="discover-marquee-section" aria-label="Subjects offered">
        <div className="discover-marquee-track">
          {marqueeItems.map((subject, i) => (
            <div className="discover-marquee-item" key={`${subject.id}-${i}`}>
              <span
                className="discover-marquee-icon"
                style={{ background: `${subject.accent}18`, color: subject.accent }}
              >
                {icons[subject.id]}
              </span>
              {subject.name}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="discover-section">
        <Reveal>
          <p className="discover-section-label">Why BaseKnowledge</p>
          <h2 className="discover-section-title">Learning that actually works</h2>
          <p className="discover-section-desc">
            No paywalls, no complexity. Just clear content, real practice, and AI help when you need
            it.
          </p>
        </Reveal>

        <div className="discover-features">
          {features.map((feature, i) => (
            <Reveal delay={i * 120} key={feature.title}>
              <div className="discover-feature">
                <div className="discover-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Subject bento */}
      <section className="discover-section">
        <Reveal>
          <p className="discover-section-label">Explore</p>
          <h2 className="discover-section-title">Every subject, one place</h2>
          <p className="discover-section-desc">
            From thermodynamics to algebra — pick a subject and dive in. More topics added all the
            time.
          </p>
        </Reveal>

        <div className="discover-bento">
          {subjects.map((subject, i) => (
            <Reveal delay={i * 80} key={subject.id}>
              <BentoCard large={i === 0} subject={subject} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* AI demo */}
      <section className="discover-section">
        <div className="discover-ai-section">
          <Reveal>
            <p className="discover-section-label">AI tutor</p>
            <h2 className="discover-section-title">Ask anything. Upload anything.</h2>
            <p className="discover-section-desc" style={{ marginBottom: 0 }}>
              Stuck on a textbook problem? Upload a screenshot. The AI reads your material and
              explains it in plain language, generates practice questions, or builds a custom quiz.
            </p>
            <div className="discover-cta-row" style={{ marginTop: "28px" }}>
              <Link className="discover-cta-primary" href="/assistant">
                Open AI assistant
              </Link>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="discover-ai-chat">
              {chatMessages.slice(0, visibleCount).map((msg, i) => (
                <div
                  className={`discover-chat-bubble ${msg.role}`}
                  key={i}
                  style={{ animation: "discover-fade-up 0.4s ease both" }}
                >
                  {msg.text}
                </div>
              ))}
              {showTyping ? (
                <div className="discover-chat-typing">
                  <span />
                  <span />
                  <span />
                </div>
              ) : null}
              <div className="discover-upload-demo">
                <span className="discover-upload-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </span>
                thermodynamics-notes.png uploaded
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="discover-section" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="discover-stats">
            <div className="discover-stat">
              <AnimatedCounter target={6} />
              <div className="discover-stat-label">Subjects</div>
            </div>
            <div className="discover-stat">
              <AnimatedCounter suffix="+" target={10} />
              <div className="discover-stat-label">Topics</div>
            </div>
            <div className="discover-stat">
              <AnimatedCounter suffix="%" target={100} />
              <div className="discover-stat-label">Free</div>
            </div>
            <div className="discover-stat">
              <AnimatedCounter suffix="ms" target={0} />
              <div className="discover-stat-label">Sign-up required</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="discover-section" style={{ paddingTop: 0, paddingBottom: 120 }}>
        <Reveal>
          <div className="discover-final-cta">
            <h2>Ready to learn something new?</h2>
            <p>
              Jump into any subject right now. No account, no credit card — just curiosity.
            </p>
            <div className="discover-cta-row">
              <Link className="discover-cta-primary" href="/">
                Go to BaseKnowledge
              </Link>
              <Link className="discover-cta-secondary" href="/subjects/physics/thermodynamics">
                Try Thermodynamics
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
