/**
 * =============================================================================
 * MirrorRayViz — Beginner ray-tracing: incident, normal, reflected (learn + play)
 * =============================================================================
 *
 * A friendly, labelled ray diagram for beginners. Shows the incident ray,
 * mirror line, normal line, reflected ray, and equal angle arcs.
 * In play mode, a slider changes the incidence angle and the reflected ray
 * updates automatically, reinforcing the law of reflection.
 *
 * Props:
 *   interactive — when true, shows a slider to change incidence angle
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef } from "react";

type MirrorRayVizProps = {
  interactive?: boolean;
};

export default function MirrorRayViz({ interactive = false }: MirrorRayVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(35);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, angleDeg: number) => {
      ctx.clearRect(0, 0, width, height);

      const mirrorY = height * 0.72;
      const hitX = width * 0.5;
      const rayLen = Math.min(width, height) * 0.38;
      const angleRad = (angleDeg * Math.PI) / 180;

      // Title / instruction banner at top
      ctx.fillStyle = "rgba(17, 24, 39, 0.7)";
      ctx.fillRect(10, 8, width - 20, 28);
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText("Law of Reflection: angle of incidence = angle of reflection", 18, 26);

      // Mirror surface with reflective backing
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width * 0.12, mirrorY);
      ctx.lineTo(width * 0.88, mirrorY);
      ctx.stroke();

      // Mirror hatch marks (backing)
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      for (let x = width * 0.14; x < width * 0.86; x += 14) {
        ctx.beginPath();
        ctx.moveTo(x, mirrorY);
        ctx.lineTo(x - 8, mirrorY + 10);
        ctx.stroke();
      }

      // Normal (dashed, perpendicular to mirror)
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(hitX, mirrorY - rayLen * 1.1);
      ctx.lineTo(hitX, mirrorY + 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Incident ray (from upper-left toward mirror)
      const incEndX = hitX - rayLen * Math.sin(angleRad);
      const incEndY = mirrorY - rayLen * Math.cos(angleRad);
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(incEndX, incEndY);
      ctx.lineTo(hitX, mirrorY);
      ctx.stroke();

      // Arrow on incident ray
      drawArrowhead(ctx, hitX - 14 * Math.sin(angleRad), mirrorY - 14 * Math.cos(angleRad), angleDeg + 180, "#fbbf24");

      // Reflected ray (symmetric about normal)
      const refEndX = hitX + rayLen * Math.sin(angleRad);
      const refEndY = mirrorY - rayLen * Math.cos(angleRad);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(hitX, mirrorY);
      ctx.lineTo(refEndX, refEndY);
      ctx.stroke();

      drawArrowhead(ctx, refEndX - 14 * Math.sin(angleRad), refEndY + 14 * Math.cos(angleRad), angleDeg, "#38bdf8");

      // Angle arcs with labels
      drawAngleArc(ctx, hitX, mirrorY, angleDeg, "left", "#fbbf24", "θi");
      drawAngleArc(ctx, hitX, mirrorY, angleDeg, "right", "#38bdf8", "θr");

      // Equal-angle badge
      ctx.fillStyle = "rgba(52, 211, 153, 0.12)";
      ctx.fillRect(hitX - 36, mirrorY - 58, 72, 22);
      ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(hitX - 36, mirrorY - 58, 72, 22);
      ctx.fillStyle = "#34d399";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`θi = θr = ${angleDeg}°`, hitX, mirrorY - 42);
      ctx.textAlign = "left";

      // Labels with leader lines for clarity
      ctx.fillStyle = "#fbbf24";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText("Incident ray", incEndX - 24, incEndY - 12);

      ctx.fillStyle = "#38bdf8";
      ctx.fillText("Reflected ray", refEndX + 6, refEndY - 12);

      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Normal", hitX + 10, mirrorY - rayLen * 0.55);

      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Mirror", width * 0.12, mirrorY + 28);

      // Matching-style callout boxes (beginner-friendly)
      ctx.fillStyle = "rgba(251, 191, 36, 0.08)";
      ctx.strokeStyle = "rgba(251, 191, 36, 0.3)";
      ctx.lineWidth = 1;
      ctx.fillRect(10, height - 70, 110, 26);
      ctx.strokeRect(10, height - 70, 110, 26);
      ctx.fillStyle = "#fbbf24";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText("1. Incident ray →", 16, height - 52);

      ctx.fillStyle = "rgba(148, 163, 184, 0.08)";
      ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
      ctx.fillRect(130, height - 70, 100, 26);
      ctx.strokeRect(130, height - 70, 100, 26);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("2. Normal line", 136, height - 52);

      ctx.fillStyle = "rgba(56, 189, 248, 0.08)";
      ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
      ctx.fillRect(240, height - 70, 120, 26);
      ctx.strokeRect(240, height - 70, 120, 26);
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("3. Reflected ray →", 246, height - 52);

      ctx.fillStyle = "rgba(52, 211, 153, 0.08)";
      ctx.strokeStyle = "rgba(52, 211, 153, 0.3)";
      ctx.fillRect(370, height - 70, 110, 26);
      ctx.strokeRect(370, height - 70, 110, 26);
      ctx.fillStyle = "#34d399";
      ctx.fillText("4. Equal angles!", 376, height - 52);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, rect.width, rect.height, angleRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: 340 }}
        aria-label="Mirror reflection ray diagram with incident ray, normal, reflected ray, and equal angles"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Angle of incidence (from normal)</span>
              <output>{angleRef.current}°</output>
            </label>
            <input
              type="range"
              min={5}
              max={80}
              value={angleRef.current}
              onChange={(e) => {
                const value = Number(e.target.value);
                angleRef.current = value;
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                const rect = canvas.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                draw(ctx, rect.width, rect.height, value);
              }}
            />
          </div>
          <p className="physics-play-hint">
            Drag the slider — the reflected ray always bounces at the same angle. θi always equals θr!
          </p>
        </div>
      )}
    </div>
  );
}

function drawArrowhead(ctx: CanvasRenderingContext2D, x: number, y: number, angleDeg: number, color: string) {
  const rad = (angleDeg * Math.PI) / 180;
  const size = 8;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rad);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-size, -size / 2);
  ctx.lineTo(-size, size / 2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawAngleArc(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  angleDeg: number,
  side: "left" | "right",
  color: string,
  label: string
) {
  const radius = 40;
  const start = -Math.PI / 2;
  const end =
    side === "left"
      ? -Math.PI / 2 + (angleDeg * Math.PI) / 180
      : -Math.PI / 2 - (angleDeg * Math.PI) / 180;

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, start, end, side === "right");
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.font = "12px Inter, sans-serif";
  const labelX = side === "left" ? cx - 32 : cx + 18;
  ctx.fillText(label, labelX, cy - radius - 8);
}
