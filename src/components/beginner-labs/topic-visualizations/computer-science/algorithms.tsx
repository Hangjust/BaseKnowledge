/**
 * =============================================================================
 * AlgorithmsViz — Computer Science > Algorithms interactive visualization
 * =============================================================================
 *
 * A reorderable recipe-step puzzle that teaches algorithmic thinking.
 * Learners arrange steps to make a sandwich, then run the sequence to
 * watch it execute. Correct order = success. Wrong order = visual feedback.
 *
 * Features:
 *   - Drag-style reordering (up/down buttons for accessibility)
 *   - Canvas-based kitchen visualization with animated ingredient stacking
 *   - Step-through execution with current-step readout
 *   - Success metric (steps in correct position + execution score)
 *   - Reset and shuffle for replayability
 *
 * Self-contained. No external dependencies beyond React.
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type StepId =
  | "bread-bottom"
  | "butter"
  | "cheese"
  | "tomato"
  | "lettuce"
  | "top-bread"
  | "cut";

type RecipeStep = {
  id: StepId;
  label: string;
  emoji: string;
  correctIndex: number;
};

type ExecutionState =
  | { kind: "idle" }
  | { kind: "running"; stepIndex: number; startTime: number }
  | { kind: "finished"; correctCount: number; score: number; timeMs: number };

export type AlgorithmsVizProps = {
  interactive?: boolean;
};

export type AlgorithmsVizMetadata = {
  title: string;
  description: string;
  subject: string;
  topic: string;
  difficulty: "beginner";
  estimatedTimeMinutes: number;
};

/* -------------------------------------------------------------------------- */
/* Constants & Design Tokens                                                  */
/* -------------------------------------------------------------------------- */

const STEPS: readonly RecipeStep[] = [
  { id: "bread-bottom", label: "Place bottom bread", emoji: "🍞", correctIndex: 0 },
  { id: "butter", label: "Spread butter", emoji: "🧈", correctIndex: 1 },
  { id: "cheese", label: "Add cheese slice", emoji: "🧀", correctIndex: 2 },
  { id: "tomato", label: "Add tomato slices", emoji: "🍅", correctIndex: 3 },
  { id: "lettuce", label: "Add lettuce", emoji: "🥬", correctIndex: 4 },
  { id: "top-bread", label: "Place top bread", emoji: "🍞", correctIndex: 5 },
  { id: "cut", label: "Cut in half", emoji: "🔪", correctIndex: 6 },
];

const COLORS = {
  bg: "#0a0e17",
  surface: "#111827",
  surface2: "#1a2332",
  border: "#2a3548",
  text: "#e8edf5",
  muted: "#8b9cb3",
  accent: "#38bdf8",
  success: "#34d399",
  error: "#f87171",
  warning: "#fbbf24",
  mono: '"Consolas", "Monaco", monospace',
} as const;

const STEP_DELAY_MS = 900;
const CANVAS_H = 280;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function countCorrect(order: RecipeStep[]): number {
  return order.filter((s, i) => s.correctIndex === i).length;
}

/* -------------------------------------------------------------------------- */
/* Canvas Drawing                                                             */
/* -------------------------------------------------------------------------- */

function drawKitchen(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  currentStep: RecipeStep | null,
  stepIndex: number,
  isCorrect: boolean,
  progress: number // 0–1 within the current step
) {
  ctx.clearRect(0, 0, width, height);

  const cx = width * 0.5;
  const cy = height * 0.72;
  const plateW = 160;
  const plateH = 14;

  // Background surface
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, width, height);

  // Countertop
  ctx.fillStyle = COLORS.surface2;
  ctx.fillRect(0, cy + 10, width, height - cy - 10);

  // Plate
  ctx.fillStyle = "#334155";
  ctx.beginPath();
  ctx.ellipse(cx, cy + 6, plateW * 0.5, plateH, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw stacked ingredients based on steps completed so far
  const stackBaseY = cy - 4;
  const ingredientH = 10;
  const spacing = 8;

  for (let i = 0; i <= stepIndex; i++) {
    const y = stackBaseY - i * spacing;
    const w = plateW * 0.7 - i * 4;

    ctx.save();
    ctx.translate(cx, y);

    // Ingredient shadow
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(2, 4, w * 0.5, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ingredient body
    const hue = (i * 55) % 360;
    ctx.fillStyle = `hsl(${hue}, 70%, ${55 + (i % 3) * 8}%)`;
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.5, ingredientH, 0, 0, Math.PI * 2);
    ctx.fill();

    // Stroke
    ctx.strokeStyle = `hsl(${hue}, 60%, 40%)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }

  // Current step action animation
  if (currentStep && progress > 0) {
    const handX = cx + Math.sin(progress * Math.PI * 2) * 30;
    const handY = stackBaseY - stepIndex * spacing - 40 - progress * 20;

    // Hand / tool indicator
    ctx.font = "24px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentStep.emoji, handX, handY);

    // Glow ring
    const ringAlpha = 0.4 * (1 - progress);
    ctx.strokeStyle = isCorrect
      ? `rgba(52, 211, 153, ${ringAlpha})`
      : `rgba(248, 113, 113, ${ringAlpha})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(handX, handY, 20 + progress * 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Status text
  ctx.font = `12px ${COLORS.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = COLORS.muted;
  ctx.fillText("Kitchen view", 12, 12);

  if (currentStep) {
    ctx.fillStyle = isCorrect ? COLORS.success : COLORS.error;
    ctx.fillText(
      isCorrect ? "Step OK" : "Out of order!",
      12,
      30
    );
  }
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function AlgorithmsViz({ interactive = true }: AlgorithmsVizProps) {
  const [steps, setSteps] = useState<RecipeStep[]>(() => shuffleArray([...STEPS]));
  const [exec, setExec] = useState<ExecutionState>({ kind: "idle" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const execStartRef = useRef(0);

  const isRunning = exec.kind === "running";
  const isFinished = exec.kind === "finished";

  /* ---- Reordering ---- */

  const moveStep = useCallback((index: number, direction: -1 | 1) => {
    if (isRunning) return;
    setSteps((prev) => {
      const next = [...prev];
      const swapIndex = index + direction;
      if (swapIndex < 0 || swapIndex >= next.length) return prev;
      [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
      return next;
    });
    setExec({ kind: "idle" });
  }, [isRunning]);

  const shuffleSteps = useCallback(() => {
    if (isRunning) return;
    setSteps(shuffleArray([...STEPS]));
    setExec({ kind: "idle" });
  }, [isRunning]);

  const resetOrder = useCallback(() => {
    if (isRunning) return;
    setSteps([...STEPS]);
    setExec({ kind: "idle" });
  }, [isRunning]);

  /* ---- Execution ---- */

  const runAlgorithm = useCallback(() => {
    if (isRunning) return;
    setExec({ kind: "running", stepIndex: 0, startTime: performance.now() });
    execStartRef.current = performance.now();
  }, [isRunning]);

  /* ---- Animation loop ---- */

  useEffect(() => {
    if (exec.kind !== "running") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const now = performance.now();
      const elapsed = now - execStartRef.current;
      const totalSteps = steps.length;
      const rawIndex = Math.floor(elapsed / STEP_DELAY_MS);
      const stepIndex = Math.min(rawIndex, totalSteps - 1);
      const progress = Math.min((elapsed % STEP_DELAY_MS) / STEP_DELAY_MS, 1);

      const currentStep = steps[stepIndex];
      const isCorrect = currentStep ? currentStep.correctIndex === stepIndex : true;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      drawKitchen(ctx, rect.width, rect.height, currentStep ?? null, stepIndex, isCorrect, progress);

      if (rawIndex >= totalSteps) {
        const correctCount = countCorrect(steps);
        const score = Math.round((correctCount / totalSteps) * 100);
        setExec({
          kind: "finished",
          correctCount,
          score,
          timeMs: Math.round(now - execStartRef.current),
        });
        return;
      }

      setExec((prev) =>
        prev.kind === "running" ? { ...prev, stepIndex } : prev
      );

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [exec.kind, steps]);

  /* ---- Static canvas draw when idle/finished ---- */

  useEffect(() => {
    if (exec.kind === "running") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const finishedIndex = exec.kind === "finished" ? steps.length - 1 : -1;
    drawKitchen(ctx, rect.width, rect.height, null, finishedIndex, true, 0);
  }, [exec.kind, steps]);

  /* ---- Resize handler ---- */

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const finishedIndex = exec.kind === "finished" ? steps.length - 1 : -1;
      drawKitchen(ctx, rect.width, rect.height, null, finishedIndex, true, 0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [exec.kind]);

  /* ---- Render ---- */

  const currentStepReadout =
    exec.kind === "running"
      ? `Step ${exec.stepIndex + 1} of ${steps.length}: ${steps[exec.stepIndex]?.label ?? ""}`
      : exec.kind === "finished"
      ? `Finished in ${exec.timeMs}ms`
      : "Ready to run";

  return (
    <div
      className="algorithms-viz-root"
      style={{
        fontFamily: '"Inter", system-ui, sans-serif',
        color: COLORS.text,
        background: COLORS.bg,
        borderRadius: 14,
        border: `1px solid ${COLORS.border}`,
        padding: 20,
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <p
          style={{
            margin: "0 0 6px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: COLORS.accent,
          }}
        >
          Algorithm Lab
        </p>
        <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
          Recipe Sequence Puzzle
        </h3>
        <p style={{ margin: "6px 0 0", fontSize: "0.9rem", color: COLORS.muted }}>
          Reorder the steps to make a sandwich, then run the algorithm to test it.
        </p>
      </div>

      {/* Canvas */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: CANVAS_H, display: "block" }}
          aria-label="Sandwich-making algorithm visualization"
        />
      </div>

      {/* Current step readout */}
      <div
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          background: COLORS.surface2,
          border: `1px solid ${COLORS.border}`,
          marginBottom: 16,
          fontFamily: COLORS.mono,
          fontSize: "0.85rem",
          color: exec.kind === "running" ? COLORS.accent : COLORS.muted,
          minHeight: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background:
              exec.kind === "running"
                ? COLORS.accent
                : exec.kind === "finished"
                ? COLORS.success
                : COLORS.muted,
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        {currentStepReadout}
      </div>

      {/* Step list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {steps.map((step, index) => {
          const isActive = exec.kind === "running" && exec.stepIndex === index;
          const isCorrect = step.correctIndex === index;
          const showCorrectness = exec.kind === "finished";

          return (
            <div
              key={step.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                background: isActive ? "rgba(56,189,248,0.08)" : COLORS.surface,
                border: `1px solid ${
                  isActive
                    ? COLORS.accent
                    : showCorrectness
                    ? isCorrect
                      ? "rgba(52,211,153,0.4)"
                      : "rgba(248,113,113,0.4)"
                    : COLORS.border
                }`,
                transition: "all 0.2s",
              }}
            >
              {/* Step number */}
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: isActive ? COLORS.accent : COLORS.surface2,
                  color: isActive ? COLORS.bg : COLORS.muted,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </span>

              {/* Emoji */}
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{step.emoji}</span>

              {/* Label */}
              <span style={{ flex: 1, fontSize: "0.92rem" }}>{step.label}</span>

              {/* Correctness indicator */}
              {showCorrectness && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: isCorrect ? COLORS.success : COLORS.error,
                  }}
                >
                  {isCorrect ? "✓" : "✗"}
                </span>
              )}

              {/* Reorder buttons */}
              {interactive && (
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  <button
                    onClick={() => moveStep(index, -1)}
                    disabled={isRunning || index === 0}
                    aria-label={`Move ${step.label} up`}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: `1px solid ${COLORS.border}`,
                      background: COLORS.surface2,
                      color: COLORS.text,
                      fontSize: "0.8rem",
                      cursor: isRunning || index === 0 ? "not-allowed" : "pointer",
                      opacity: isRunning || index === 0 ? 0.4 : 1,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveStep(index, 1)}
                    disabled={isRunning || index === steps.length - 1}
                    aria-label={`Move ${step.label} down`}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: `1px solid ${COLORS.border}`,
                      background: COLORS.surface2,
                      color: COLORS.text,
                      fontSize: "0.8rem",
                      cursor: isRunning || index === steps.length - 1 ? "not-allowed" : "pointer",
                      opacity: isRunning || index === steps.length - 1 ? 0.4 : 1,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    ↓
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={runAlgorithm}
            disabled={isRunning}
            style={{
              padding: "10px 22px",
              borderRadius: 10,
              border: "none",
              background: COLORS.accent,
              color: COLORS.bg,
              fontWeight: 700,
              fontSize: "0.92rem",
              cursor: isRunning ? "not-allowed" : "pointer",
              opacity: isRunning ? 0.6 : 1,
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!isRunning) {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {isRunning ? "Running…" : "▶ Run Algorithm"}
          </button>

          <button
            onClick={shuffleSteps}
            disabled={isRunning}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.surface2,
              color: COLORS.text,
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: isRunning ? "not-allowed" : "pointer",
              opacity: isRunning ? 0.6 : 1,
            }}
          >
            🔀 Shuffle
          </button>

          <button
            onClick={resetOrder}
            disabled={isRunning}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.surface2,
              color: COLORS.text,
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: isRunning ? "not-allowed" : "pointer",
              opacity: isRunning ? 0.6 : 1,
            }}
          >
            ↺ Reset
          </button>
        </div>

        {/* Success metric */}
        {isFinished && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 16px",
              borderRadius: 10,
              background:
                exec.score === 100
                  ? "rgba(52,211,153,0.1)"
                  : exec.score >= 50
                  ? "rgba(251,191,36,0.1)"
                  : "rgba(248,113,113,0.1)",
              border: `1px solid ${
                exec.score === 100
                  ? "rgba(52,211,153,0.3)"
                  : exec.score >= 50
                  ? "rgba(251,191,36,0.3)"
                  : "rgba(248,113,113,0.3)"
              }`,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color:
                    exec.score === 100
                      ? COLORS.success
                      : exec.score >= 50
                      ? COLORS.warning
                      : COLORS.error,
                }}
              >
                {exec.score}%
              </div>
              <div style={{ fontSize: "0.7rem", color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Score
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: COLORS.border }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: COLORS.text }}>
                {exec.correctCount}/{steps.length}
              </div>
              <div style={{ fontSize: "0.7rem", color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Correct
              </div>
            </div>
            {exec.score === 100 && (
              <span style={{ fontSize: "1.4rem" }} role="img" aria-label="Perfect">
                🏆
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hint */}
      <p
        style={{
          margin: "12px 0 0",
          fontSize: "0.82rem",
          color: COLORS.muted,
          fontStyle: "italic",
        }}
      >
        Tip: An algorithm must follow a clear order. You can not add lettuce before placing the bread!
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Metadata export                                                            */
/* -------------------------------------------------------------------------- */

export const algorithmsVizMetadata: AlgorithmsVizMetadata = {
  title: "Recipe Sequence Algorithm",
  description:
    "An interactive step-ordering puzzle where learners arrange recipe steps to understand that algorithms require precise sequencing.",
  subject: "computer-science",
  topic: "algorithms",
  difficulty: "beginner",
  estimatedTimeMinutes: 5,
};
