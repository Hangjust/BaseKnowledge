/**
 * =============================================================================
 * LoopsViz — Computer Science > Loops interactive visualization
 * =============================================================================
 *
 * A loop-count visualization where a robot repeats a move-and-collect action.
 * Learners adjust the repeat count with a slider, then run the loop to watch
 * each iteration execute. A live code block and iteration counter reinforce
 * the concept of repetition.
 *
 * Features:
 *   - Repeat-count slider (1–10)
 *   - Canvas-based robot march with star collection
 *   - Step-by-step iteration counter
 *   - Code-block style readout
 *   - Reset for replayability
 *
 * Self-contained. No external dependencies beyond React.
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type ExecState =
  | { kind: "idle" }
  | { kind: "running"; iteration: number; startTime: number }
  | { kind: "finished"; timeMs: number };

export type LoopsVizProps = {
  interactive?: boolean;
};

export type LoopsVizMetadata = {
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

const STEP_DELAY_MS = 800;
const CANVAS_H = 260;
const MIN_COUNT = 1;
const MAX_COUNT = 10;

/* -------------------------------------------------------------------------- */
/* Canvas Drawing                                                             */
/* -------------------------------------------------------------------------- */

function drawScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  count: number,
  iteration: number,
  progress: number
) {
  ctx.clearRect(0, 0, width, height);

  const groundY = height * 0.72;
  const startX = width * 0.08;
  const endX = width * 0.92;
  const stepW = count > 0 ? (endX - startX) / count : 0;

  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = "rgba(42,53,72,0.35)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const x = startX + (endX - startX) * (i / 10);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, groundY);
    ctx.stroke();
  }
  for (let i = 0; i <= 5; i++) {
    const y = (groundY * i) / 5;
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }

  // Ground
  ctx.fillStyle = COLORS.surface2;
  ctx.fillRect(0, groundY, width, height - groundY);
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(width, groundY);
  ctx.stroke();

  // Start line + label
  ctx.strokeStyle = COLORS.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(startX, groundY - 40);
  ctx.lineTo(startX, groundY);
  ctx.stroke();

  ctx.fillStyle = COLORS.muted;
  ctx.font = `11px ${COLORS.mono}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("START", startX, groundY - 46);

  // Stars
  const starY = groundY - 20;
  for (let i = 0; i < count; i++) {
    const x = startX + (i + 1) * stepW;
    if (i > iteration) {
      ctx.font = "20px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = COLORS.warning;
      ctx.fillText("★", x, starY);
    } else if (i === iteration && progress < 1) {
      const scale = 1 - progress;
      ctx.save();
      ctx.translate(x, starY);
      ctx.scale(scale, scale);
      ctx.font = "20px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = COLORS.warning;
      ctx.fillText("★", 0, 0);
      ctx.restore();
    }
  }

  // Robot position
  const robotY = groundY - 24;
  let robotX = startX;
  if (iteration < count) {
    const fromX = startX + iteration * stepW;
    const toX = startX + (iteration + 1) * stepW;
    robotX = fromX + (toX - fromX) * progress;
  } else {
    robotX = startX + count * stepW;
  }

  // Robot bounce
  const bounce = Math.sin(progress * Math.PI) * 12;
  ctx.font = "28px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = COLORS.text;
  ctx.fillText("🤖", robotX, robotY - bounce);

  // Footprints
  for (let i = 0; i <= Math.min(iteration, count); i++) {
    const x = startX + i * stepW;
    ctx.fillStyle = "rgba(56,189,248,0.25)";
    ctx.beginPath();
    ctx.arc(x, groundY - 5, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Finish line
  if (iteration >= count) {
    const finishX = startX + count * stepW;
    ctx.strokeStyle = COLORS.success;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(finishX, groundY - 40);
    ctx.lineTo(finishX, groundY);
    ctx.stroke();

    ctx.fillStyle = COLORS.success;
    ctx.font = `11px ${COLORS.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("FINISH", finishX, groundY - 46);
  }
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function LoopsViz({ interactive = true }: LoopsVizProps) {
  const [count, setCount] = useState(4);
  const [exec, setExec] = useState<ExecState>({ kind: "idle" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const execStartRef = useRef(0);
  const execRef = useRef<ExecState>(exec);

  useEffect(() => {
    execRef.current = exec;
  }, [exec]);

  const isRunning = exec.kind === "running";
  const isFinished = exec.kind === "finished";

  const displayIteration = isRunning
    ? Math.min(exec.iteration + 1, count)
    : isFinished
    ? count
    : 0;

  /* ---- Controls ---- */

  const runLoop = useCallback(() => {
    if (isRunning) return;
    setExec({ kind: "running", iteration: 0, startTime: performance.now() });
    execStartRef.current = performance.now();
  }, [isRunning]);

  const resetLoop = useCallback(() => {
    if (isRunning) return;
    setExec({ kind: "idle" });
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
      const rawIndex = Math.floor(elapsed / STEP_DELAY_MS);
      const iteration = Math.min(rawIndex, count);
      const progress =
        iteration < count
          ? Math.min((elapsed % STEP_DELAY_MS) / STEP_DELAY_MS, 1)
          : 1;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (
        canvas.width !== rect.width * dpr ||
        canvas.height !== rect.height * dpr
      ) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      drawScene(ctx, rect.width, rect.height, count, iteration, progress);

      if (rawIndex >= count) {
        setExec({
          kind: "finished",
          timeMs: Math.round(now - execStartRef.current),
        });
        return;
      }

      setExec((prev) =>
        prev.kind === "running" ? { ...prev, iteration } : prev
      );

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [exec.kind, count]);

  /* ---- Static draw when idle / finished ---- */

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

    drawScene(ctx, rect.width, rect.height, count, isFinished ? count : 0, 0);
  }, [exec.kind, count, isFinished]);

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

      const current = execRef.current;
      const iteration =
        current.kind === "running"
          ? current.iteration
          : current.kind === "finished"
          ? count
          : 0;

      drawScene(ctx, rect.width, rect.height, count, iteration, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [count]);

  /* ---- Render ---- */

  return (
    <div
      className="loops-viz-root"
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
          Loop Lab
        </p>
        <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
          Robot March Loop
        </h3>
        <p
          style={{
            margin: "6px 0 0",
            fontSize: "0.9rem",
            color: COLORS.muted,
          }}
        >
          Adjust how many times the robot repeats its steps, then watch the loop
          run.
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
          aria-label="Robot loop march visualization"
        />
      </div>

      {/* Iteration counter */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: isRunning
              ? COLORS.accent
              : isFinished
              ? COLORS.success
              : COLORS.muted,
            lineHeight: 1,
          }}
        >
          {displayIteration}
        </span>
        <span style={{ fontSize: "0.9rem", color: COLORS.muted }}>
          / {count} iterations
        </span>
      </div>

      {/* Code-block readout */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          padding: "12px 14px",
          marginBottom: 16,
          fontFamily: COLORS.mono,
          fontSize: "0.85rem",
          lineHeight: 1.6,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {/* Line numbers */}
          <div
            style={{
              color: COLORS.muted,
              userSelect: "none",
              textAlign: "right",
              minWidth: 18,
            }}
          >
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
          {/* Code */}
          <div>
            <div>
              <span style={{ color: COLORS.accent }}>for</span>{" "}
              <span style={{ color: COLORS.text }}>i</span>{" "}
              <span style={{ color: COLORS.muted }}>=</span>{" "}
              <span style={{ color: COLORS.warning }}>1</span>{" "}
              <span style={{ color: COLORS.muted }}>to</span>{" "}
              <span style={{ color: COLORS.warning }}>{count}</span>:
            </div>
            <div
              style={{
                color: isRunning ? COLORS.accent : COLORS.text,
                transition: "color 0.2s",
              }}
            >
              {"  "}move_forward()
            </div>
            <div
              style={{
                color: isRunning ? COLORS.accent : COLORS.text,
                transition: "color 0.2s",
              }}
            >
              {"  "}collect_star()
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: 1,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: "0.9rem",
              color: COLORS.text,
              flex: 1,
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>Repeat count</span>
            <input
              type="range"
              min={MIN_COUNT}
              max={MAX_COUNT}
              value={count}
              disabled={isRunning}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCount(val);
                if (!isRunning) setExec({ kind: "idle" });
              }}
              style={{ flex: 1, cursor: isRunning ? "not-allowed" : "pointer" }}
            />
            <output
              style={{
                minWidth: 24,
                textAlign: "center",
                fontWeight: 700,
                color: COLORS.accent,
              }}
            >
              {count}
            </output>
          </label>
        </div>

        {interactive && (
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={runLoop}
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
              {isRunning ? "Running…" : "▶ Run Loop"}
            </button>

            <button
              onClick={resetLoop}
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
        Tip: Changing the repeat count is like changing the number in a loop. The
        robot does the same action each time.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Metadata export                                                            */
/* -------------------------------------------------------------------------- */

export const loopsVizMetadata: LoopsVizMetadata = {
  title: "Robot March Loop",
  description:
    "An interactive loop visualization where learners set a repeat count and watch a robot execute the same steps over and over.",
  subject: "computer-science",
  topic: "loops",
  difficulty: "beginner",
  estimatedTimeMinutes: 4,
};
