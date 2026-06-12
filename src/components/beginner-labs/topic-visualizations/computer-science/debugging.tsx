/**
 * =============================================================================
 * DebuggingViz — Computer Science > Debugging interactive visualization
 * =============================================================================
 *
 * A broken-program challenge where learners spot and fix a bug in a block-coding
 * turtle sequence. The program almost draws a square, but one turn angle is
 * wrong. Learners run the code, observe the broken output, select the buggy
 * block, and test their fix.
 *
 * Features:
 *   - Canvas-based turtle graphics with animated execution
 *   - Visual code blocks with selectable bug highlight
 *   - Progressive hint system (3 levels)
 *   - Run / Test Fix / Reset controls
 *   - Feedback metric (score, attempts, hints used)
 *   - Celebratory animation on correct fix
 *
 * Self-contained. No external dependencies beyond React.
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type BlockId =
  | "start"
  | "move-1"
  | "turn-1"
  | "move-2"
  | "turn-2"
  | "move-3"
  | "turn-bug"
  | "move-4"
  | "end";

type BlockKind = "start" | "end" | "move" | "turn";

type CodeBlock = {
  id: BlockId;
  kind: BlockKind;
  label: string;
  value: number; // pixels for move, degrees for turn
  isBug: boolean;
  fixedValue: number; // the correct value
};

type VizState =
  | { phase: "idle" }
  | { phase: "running"; stepIndex: number; startTime: number; isFixed: boolean }
  | { phase: "finished-run"; pathPoints: PathPoint[]; isFixed: boolean }
  | { phase: "selecting"; pathPoints: PathPoint[] }
  | { phase: "bug-selected"; selectedId: BlockId; pathPoints: PathPoint[] }
  | { phase: "fixed"; pathPoints: PathPoint[] };

type PathPoint = {
  x: number;
  y: number;
  angle: number;
  isTurnBug: boolean;
};

type Feedback = {
  score: number;
  attempts: number;
  hintsUsed: number;
  timeMs: number;
};

export type DebuggingVizProps = {
  interactive?: boolean;
};

export type DebuggingVizMetadata = {
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

const BLOCKS: readonly CodeBlock[] = [
  { id: "start", kind: "start", label: "Start", value: 0, isBug: false, fixedValue: 0 },
  { id: "move-1", kind: "move", label: "Move forward 50", value: 50, isBug: false, fixedValue: 50 },
  { id: "turn-1", kind: "turn", label: "Turn right 90°", value: 90, isBug: false, fixedValue: 90 },
  { id: "move-2", kind: "move", label: "Move forward 50", value: 50, isBug: false, fixedValue: 50 },
  { id: "turn-2", kind: "turn", label: "Turn right 90°", value: 90, isBug: false, fixedValue: 90 },
  { id: "move-3", kind: "move", label: "Move forward 50", value: 50, isBug: false, fixedValue: 50 },
  { id: "turn-bug", kind: "turn", label: "Turn right 80°", value: 80, isBug: true, fixedValue: 90 },
  { id: "move-4", kind: "move", label: "Move forward 50", value: 50, isBug: false, fixedValue: 50 },
  { id: "end", kind: "end", label: "End", value: 0, isBug: false, fixedValue: 0 },
];

const BUG_BLOCK_ID: BlockId = "turn-bug";

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
  blockMove: "#2dd4bf",
  blockTurn: "#a78bfa",
  blockStartEnd: "#64748b",
  turtle: "#fbbf24",
  trail: "#38bdf8",
  trailBug: "#f87171",
  mono: '"Consolas", "Monaco", monospace',
} as const;

const STEP_DELAY_MS = 700;
const CANVAS_H = 320;
const TURTLE_SIZE = 10;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getBlockColor(kind: BlockKind): string {
  switch (kind) {
    case "start":
    case "end":
      return COLORS.blockStartEnd;
    case "move":
      return COLORS.blockMove;
    case "turn":
      return COLORS.blockTurn;
  }
}

function computePath(isFixed: boolean): PathPoint[] {
  const points: PathPoint[] = [];
  let x = 0;
  let y = 0;
  let angle = -90; // facing up

  points.push({ x, y, angle, isTurnBug: false });

  for (const block of BLOCKS) {
    if (block.kind === "move") {
      const dist = block.value;
      const rad = (angle * Math.PI) / 180;
      x += Math.cos(rad) * dist;
      y += Math.sin(rad) * dist;
      points.push({ x, y, angle, isTurnBug: false });
    } else if (block.kind === "turn") {
      const turnValue = block.isBug && isFixed ? block.fixedValue : block.value;
      angle += turnValue;
      points.push({ x, y, angle, isTurnBug: block.isBug });
    }
  }

  return points;
}

function normalizePath(points: PathPoint[], width: number, height: number): PathPoint[] {
  const padding = 40;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const contentW = maxX - minX || 1;
  const contentH = maxY - minY || 1;

  const availableW = width - padding * 2;
  const availableH = height - padding * 2;
  const scale = Math.min(availableW / contentW, availableH / contentH, 2);

  const offsetX = (width - contentW * scale) / 2 - minX * scale;
  const offsetY = (height - contentH * scale) / 2 - minY * scale;

  return points.map((p) => ({
    x: p.x * scale + offsetX,
    y: p.y * scale + offsetY,
    angle: p.angle,
    isTurnBug: p.isTurnBug,
  }));
}

/* -------------------------------------------------------------------------- */
/* Canvas Drawing                                                             */
/* -------------------------------------------------------------------------- */

function drawScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  points: PathPoint[],
  stepIndex: number,
  progress: number,
  isFixed: boolean
) {
  ctx.clearRect(0, 0, width, height);

  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, width, height);

  // Grid dots
  ctx.fillStyle = "#1a2332";
  for (let gx = 0; gx < width; gx += 20) {
    for (let gy = 0; gy < height; gy += 20) {
      ctx.beginPath();
      ctx.arc(gx, gy, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const normPoints = normalizePath(points, width, height);

  // Draw full trail (faint)
  if (normPoints.length > 1) {
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 1; i < normPoints.length; i++) {
      const prev = normPoints[i - 1];
      const curr = normPoints[i];
      const isBugSegment = curr.isTurnBug && !isFixed;

      ctx.strokeStyle = isBugSegment
        ? `${COLORS.trailBug}44`
        : `${COLORS.trail}33`;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.stroke();
    }
  }

  // Draw executed trail (solid)
  const executedIndex = Math.min(stepIndex, normPoints.length - 1);
  for (let i = 1; i <= executedIndex; i++) {
    const prev = normPoints[i - 1];
    const curr = normPoints[i];
    const isBugSegment = curr.isTurnBug && !isFixed;

    ctx.strokeStyle = isBugSegment ? COLORS.trailBug : COLORS.trail;
    ctx.lineWidth = isBugSegment ? 3.5 : 2.5;
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(curr.x, curr.y);
    ctx.stroke();

    // Arrow head on last segment
    if (i === executedIndex && i > 0) {
      const angle = Math.atan2(curr.y - prev.y, curr.x - prev.x);
      const arrowLen = 8;
      ctx.fillStyle = isBugSegment ? COLORS.trailBug : COLORS.trail;
      ctx.beginPath();
      ctx.moveTo(curr.x, curr.y);
      ctx.lineTo(
        curr.x - arrowLen * Math.cos(angle - Math.PI / 6),
        curr.y - arrowLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        curr.x - arrowLen * Math.cos(angle + Math.PI / 6),
        curr.y - arrowLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();
    }
  }

  // Draw turtle at current position
  if (normPoints.length > 0 && stepIndex >= 0) {
    const currIdx = Math.min(stepIndex, normPoints.length - 1);
    const curr = normPoints[currIdx];
    const prev = currIdx > 0 ? normPoints[currIdx - 1] : curr;
    const moveAngle = Math.atan2(curr.y - prev.y, curr.x - prev.x);
    const displayAngle = stepIndex > 0 && progress > 0 ? moveAngle : (curr.angle * Math.PI) / 180;

    // Interpolate position during move
    let tx = curr.x;
    let ty = curr.y;
    if (stepIndex > 0 && progress > 0 && currIdx > 0) {
      const prevPoint = normPoints[currIdx - 1];
      tx = prevPoint.x + (curr.x - prevPoint.x) * progress;
      ty = prevPoint.y + (curr.y - prevPoint.y) * progress;
    }

    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(displayAngle + Math.PI / 2);

    // Turtle body
    ctx.fillStyle = COLORS.turtle;
    ctx.beginPath();
    ctx.moveTo(0, -TURTLE_SIZE);
    ctx.lineTo(-TURTLE_SIZE * 0.7, TURTLE_SIZE * 0.6);
    ctx.lineTo(TURTLE_SIZE * 0.7, TURTLE_SIZE * 0.6);
    ctx.closePath();
    ctx.fill();

    // Glow
    const glowColor = isFixed ? COLORS.success : COLORS.accent;
    ctx.strokeStyle = `${glowColor}88`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, TURTLE_SIZE + 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // Status label
  ctx.font = `12px ${COLORS.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = COLORS.muted;
  ctx.fillText("Turtle canvas", 12, 12);

  if (isFixed) {
    ctx.fillStyle = COLORS.success;
    ctx.fillText("✓ Bug fixed — perfect square!", 12, 30);
  } else if (stepIndex >= normPoints.length - 1) {
    ctx.fillStyle = COLORS.error;
    ctx.fillText("✗ Output looks wrong — find the bug!", 12, 30);
  }
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function DebuggingViz({ interactive = true }: DebuggingVizProps) {
  const [vizState, setVizState] = useState<VizState>({ phase: "idle" });
  const [selectedId, setSelectedId] = useState<BlockId | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isFixed, setIsFixed] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const execStartRef = useRef(0);

  const isRunning = vizState.phase === "running";
  const isFinished = vizState.phase === "finished-run" || vizState.phase === "selecting" || vizState.phase === "bug-selected";
  const canSelectBug = vizState.phase === "selecting" || vizState.phase === "bug-selected";
  const showFixed = vizState.phase === "fixed";

  const runProgram = useCallback(
    (fixed: boolean) => {
      if (isRunning) return;
      setIsFixed(fixed);
      setVizState({ phase: "running", stepIndex: 0, startTime: performance.now(), isFixed: fixed });
      execStartRef.current = performance.now();
    },
    [isRunning]
  );

  const selectBlock = useCallback(
    (id: BlockId) => {
      if (!canSelectBug || !interactive) return;
      setSelectedId(id);
      const points = computePath(isFixed);
      setVizState({ phase: "bug-selected", selectedId: id, pathPoints: points });
    },
    [canSelectBug, interactive, isFixed]
  );

  const testFix = useCallback(() => {
    if (!selectedId || vizState.phase !== "bug-selected") return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (selectedId === BUG_BLOCK_ID) {
      // Correct! Run the fixed version.
      const timeMs = Math.round(performance.now() - execStartRef.current);
      const score = Math.max(100 - hintsUsed * 25 - (newAttempts - 1) * 15, 10);
      setFeedback({ score, attempts: newAttempts, hintsUsed, timeMs });
      runProgram(true);
      setVizState({ phase: "fixed", pathPoints: computePath(true) });
    } else {
      // Wrong block selected
      const points = computePath(isFixed);
      setVizState({ phase: "bug-selected", selectedId, pathPoints: points });
      // Keep selecting state but flash error
    }
  }, [selectedId, vizState.phase, attempts, hintsUsed, isFixed, runProgram]);

  const showHint = useCallback(() => {
    if (hintsUsed >= 3) return;
    setHintsUsed((h) => h + 1);
  }, [hintsUsed]);

  const resetAll = useCallback(() => {
    setVizState({ phase: "idle" });
    setSelectedId(null);
    setHintsUsed(0);
    setAttempts(0);
    setFeedback(null);
    setIsFixed(false);
  }, []);

  /* ---- Animation loop ---- */

  useEffect(() => {
    if (vizState.phase !== "running") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = computePath(vizState.isFixed);

    const animate = () => {
      const now = performance.now();
      const elapsed = now - execStartRef.current;
      const rawIndex = Math.floor(elapsed / STEP_DELAY_MS);
      const stepIndex = Math.min(rawIndex, points.length - 1);
      const progress = Math.min((elapsed % STEP_DELAY_MS) / STEP_DELAY_MS, 1);

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      drawScene(ctx, rect.width, rect.height, points, stepIndex, progress, vizState.isFixed);

      if (rawIndex >= points.length) {
        if (vizState.isFixed) {
          setVizState({ phase: "fixed", pathPoints: points });
        } else {
          setVizState({ phase: "selecting", pathPoints: points });
        }
        return;
      }

      setVizState((prev) =>
        prev.phase === "running" ? { ...prev, stepIndex } : prev
      );

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [vizState.phase, isFixed]);

  /* ---- Static canvas draw when idle/finished ---- */

  useEffect(() => {
    if (vizState.phase === "running") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const points =
      vizState.phase === "idle"
        ? computePath(false)
        : "pathPoints" in vizState
        ? vizState.pathPoints
        : computePath(false);

    const finishedIndex =
      vizState.phase === "finished-run" || vizState.phase === "selecting" || vizState.phase === "bug-selected"
        ? points.length - 1
        : vizState.phase === "fixed"
        ? points.length - 1
        : -1;

    drawScene(ctx, rect.width, rect.height, points, finishedIndex, 0, isFixed);
  }, [vizState, isFixed]);

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

      const points =
        vizState.phase === "idle"
          ? computePath(false)
          : "pathPoints" in vizState
          ? vizState.pathPoints
          : computePath(false);
      const finishedIndex =
        vizState.phase === "finished-run" || vizState.phase === "selecting" || vizState.phase === "bug-selected" || vizState.phase === "fixed"
          ? points.length - 1
          : -1;
      drawScene(ctx, rect.width, rect.height, points, finishedIndex, 0, isFixed);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [vizState, isFixed]);

  /* ---- Render helpers ---- */

  const statusReadout = (() => {
    switch (vizState.phase) {
      case "idle":
        return "Ready — click Run to see the program in action";
      case "running":
        return `Step ${vizState.stepIndex + 1} of ${BLOCKS.length} — executing…`;
      case "finished-run":
        return "Program finished. The shape is wrong — find the bug!";
      case "selecting":
        return "Click the block you think has the bug, then press Test Fix.";
      case "bug-selected":
        return selectedId === BUG_BLOCK_ID
          ? "You found the suspicious block! Click Test Fix to verify."
          : `Selected: ${BLOCKS.find((b) => b.id === selectedId)?.label ?? ""}. Test your guess.`;
      case "fixed":
        return "Bug fixed! The program now draws a perfect square.";
    }
  })();

  const hintText = (() => {
    if (hintsUsed === 0) return null;
    if (hintsUsed === 1) return "Hint: Look closely at every turn angle. Are they all the same?";
    if (hintsUsed === 2) return "Hint: One turn is different from the others. Count the degrees.";
    return "Hint: The block 'Turn right 80°' should be 'Turn right 90°'.";
  })();

  return (
    <div
      className="debugging-viz-root"
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
          Debugging Lab
        </p>
        <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
          Bug Hunt: The Broken Square
        </h3>
        <p style={{ margin: "6px 0 0", fontSize: "0.9rem", color: COLORS.muted }}>
          Run the program, watch the turtle draw, then find and fix the buggy block.
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
          aria-label="Turtle graphics canvas showing program execution"
        />
      </div>

      {/* Status readout */}
      <div
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          background: COLORS.surface2,
          border: `1px solid ${COLORS.border}`,
          marginBottom: 16,
          fontFamily: COLORS.mono,
          fontSize: "0.85rem",
          color:
            vizState.phase === "running"
              ? COLORS.accent
              : vizState.phase === "fixed"
              ? COLORS.success
              : vizState.phase === "finished-run" || vizState.phase === "selecting"
              ? COLORS.error
              : COLORS.muted,
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
              vizState.phase === "running"
                ? COLORS.accent
                : vizState.phase === "fixed"
                ? COLORS.success
                : vizState.phase === "finished-run" || vizState.phase === "selecting"
                ? COLORS.error
                : COLORS.muted,
            display: "inline-block",
            flexShrink: 0,
            animation: vizState.phase === "running" ? "pulse 1s infinite" : undefined,
          }}
        />
        {statusReadout}
      </div>

      {/* Block list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {BLOCKS.map((block, index) => {
          const isActive =
            vizState.phase === "running" && vizState.stepIndex === index;
          const isSelected = selectedId === block.id;
          const isBugBlock = block.isBug;
          const showBugReveal = vizState.phase === "fixed" && isBugBlock;

          return (
            <div
              key={block.id}
              onClick={() => selectBlock(block.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                background: isActive
                  ? "rgba(56,189,248,0.08)"
                  : isSelected
                  ? "rgba(248,113,113,0.1)"
                  : COLORS.surface,
                border: `2px solid ${
                  showBugReveal
                    ? COLORS.success
                    : isSelected
                    ? COLORS.error
                    : isActive
                    ? COLORS.accent
                    : COLORS.border
                }`,
                transition: "all 0.2s",
                cursor: canSelectBug ? "pointer" : "default",
                opacity: isRunning && !isActive ? 0.6 : 1,
              }}
            >
              {/* Step number */}
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: isActive ? COLORS.accent : getBlockColor(block.kind),
                  color: isActive ? COLORS.bg : COLORS.bg,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </span>

              {/* Block kind badge */}
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: getBlockColor(block.kind),
                  flexShrink: 0,
                  minWidth: 48,
                }}
              >
                {block.kind}
              </span>

              {/* Label */}
              <span style={{ flex: 1, fontSize: "0.92rem" }}>
                {showBugReveal ? `Turn right 90°` : block.label}
                {showBugReveal && (
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: "0.75rem",
                      color: COLORS.success,
                      fontWeight: 700,
                    }}
                  >
                    (fixed!)
                  </span>
                )}
              </span>

              {/* Bug reveal indicator */}
              {showBugReveal && (
                <span style={{ fontSize: "1rem", color: COLORS.success }}>✓</span>
              )}

              {/* Selection indicator */}
              {isSelected && !showBugReveal && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: COLORS.error,
                  }}
                >
                  {selectedId === BUG_BLOCK_ID ? "🐛" : "?"}
                </span>
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
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {vizState.phase === "idle" && (
            <button
              onClick={() => runProgram(false)}
              disabled={isRunning}
              style={{
                padding: "10px 22px",
                borderRadius: 10,
                border: "none",
                background: COLORS.accent,
                color: COLORS.bg,
                fontWeight: 700,
                fontSize: "0.92rem",
                cursor: "pointer",
                transition: "opacity 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ▶ Run Program
            </button>
          )}

          {(vizState.phase === "finished-run" || vizState.phase === "selecting" || vizState.phase === "bug-selected") && (
            <>
              <button
                onClick={testFix}
                disabled={!selectedId || vizState.phase !== "bug-selected"}
                style={{
                  padding: "10px 22px",
                  borderRadius: 10,
                  border: "none",
                  background: selectedId ? COLORS.warning : COLORS.surface2,
                  color: selectedId ? COLORS.bg : COLORS.muted,
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  cursor: selectedId && vizState.phase === "bug-selected" ? "pointer" : "not-allowed",
                  opacity: selectedId && vizState.phase === "bug-selected" ? 1 : 0.5,
                  transition: "opacity 0.15s, transform 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (selectedId && vizState.phase === "bug-selected") {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                🧪 Test Fix
              </button>

              <button
                onClick={showHint}
                disabled={hintsUsed >= 3}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.surface2,
                  color: hintsUsed >= 3 ? COLORS.muted : COLORS.text,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: hintsUsed >= 3 ? "not-allowed" : "pointer",
                  opacity: hintsUsed >= 3 ? 0.5 : 1,
                }}
              >
                💡 Hint {hintsUsed > 0 ? `(${hintsUsed}/3)` : ""}
              </button>
            </>
          )}

          {vizState.phase === "fixed" && (
            <button
              onClick={resetAll}
              style={{
                padding: "10px 22px",
                borderRadius: 10,
                border: "none",
                background: COLORS.success,
                color: COLORS.bg,
                fontWeight: 700,
                fontSize: "0.92rem",
                cursor: "pointer",
                transition: "opacity 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ↺ Try Again
            </button>
          )}
        </div>

        {/* Feedback metric */}
        {feedback && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 16px",
              borderRadius: 10,
              background:
                feedback.score === 100
                  ? "rgba(52,211,153,0.1)"
                  : feedback.score >= 50
                  ? "rgba(251,191,36,0.1)"
                  : "rgba(248,113,113,0.1)",
              border: `1px solid ${
                feedback.score === 100
                  ? "rgba(52,211,153,0.3)"
                  : feedback.score >= 50
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
                    feedback.score === 100
                      ? COLORS.success
                      : feedback.score >= 50
                      ? COLORS.warning
                      : COLORS.error,
                }}
              >
                {feedback.score}%
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: COLORS.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Score
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: COLORS.border }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: COLORS.text }}>
                {feedback.attempts}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: COLORS.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Attempts
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: COLORS.border }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: COLORS.text }}>
                {feedback.hintsUsed}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: COLORS.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Hints
              </div>
            </div>
            {feedback.score === 100 && (
              <span style={{ fontSize: "1.4rem" }} role="img" aria-label="Perfect">
                🏆
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hint text */}
      {hintText && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            borderRadius: 8,
            background: "rgba(251,191,36,0.08)",
            border: `1px solid rgba(251,191,36,0.25)`,
            fontSize: "0.85rem",
            color: COLORS.warning,
          }}
        >
          {hintText}
        </div>
      )}

      {/* Wrong guess feedback */}
      {vizState.phase === "bug-selected" && selectedId && selectedId !== BUG_BLOCK_ID && attempts > 0 && (
        <p
          style={{
            margin: "12px 0 0",
            fontSize: "0.85rem",
            color: COLORS.error,
          }}
        >
          That block looks correct. Keep looking! {3 - attempts} attempt{3 - attempts !== 1 ? "s" : ""} left before the answer is revealed.
        </p>
      )}

      {/* Tip */}
      <p
        style={{
          margin: "12px 0 0",
          fontSize: "0.82rem",
          color: COLORS.muted,
          fontStyle: "italic",
        }}
      >
        Tip: Do not guess at random. Read the code carefully and test one change at a time.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Metadata export                                                            */
/* -------------------------------------------------------------------------- */

export const debuggingVizMetadata: DebuggingVizMetadata = {
  title: "Bug Hunt: The Broken Square",
  description:
    "An interactive debugging challenge where learners run a turtle-graphics program, observe the broken output, and identify the buggy code block to fix it.",
  subject: "computer-science",
  topic: "debugging",
  difficulty: "beginner",
  estimatedTimeMinutes: 5,
};
