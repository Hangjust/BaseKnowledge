/**
 * =============================================================================
 * MirrorReflectionViz — optics ray diagram (learn + play modes)
 * =============================================================================
 *
 * Draws a flat mirror, incident ray, normal, and reflected ray.
 * Law of reflection: angle of incidence = angle of reflection (from normal).
 *
 * Props:
 *   interactive — when true, shows slider to change incidence angle (play mode)
 *   incidenceAngle — degrees from normal (0–80); controlled externally in play mode
 *   onAngleChange — callback when user moves slider (play mode only)
 *
 * DUPLICATION GUIDE for new optics viz:
 *   Copy this file, rename, change draw() physics math, keep canvas resize pattern.
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef } from "react";

type MirrorReflectionVizProps = {
  interactive?: boolean;
  incidenceAngle?: number;
  onAngleChange?: (angle: number) => void;
};

export default function MirrorReflectionViz({
  interactive = false,
  incidenceAngle: externalAngle,
  onAngleChange
}: MirrorReflectionVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const internalAngleRef = useRef(35);

  const incidenceAngle = externalAngle ?? internalAngleRef.current;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, angleDeg: number) => {
      ctx.clearRect(0, 0, width, height);

      const mirrorY = height * 0.72;
      const hitX = width * 0.5;
      const rayLen = Math.min(width, height) * 0.38;
      const angleRad = (angleDeg * Math.PI) / 180;

      // Mirror surface
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width * 0.12, mirrorY);
      ctx.lineTo(width * 0.88, mirrorY);
      ctx.stroke();

      // Mirror hatch marks
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      for (let x = width * 0.14; x < width * 0.86; x += 14) {
        ctx.beginPath();
        ctx.moveTo(x, mirrorY);
        ctx.lineTo(x - 8, mirrorY + 10);
        ctx.stroke();
      }

      // Normal (dashed)
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
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(incEndX, incEndY);
      ctx.lineTo(hitX, mirrorY);
      ctx.stroke();

      // Arrow on incident ray
      drawArrowhead(ctx, hitX - 12 * Math.sin(angleRad), mirrorY - 12 * Math.cos(angleRad), angleDeg + 180);

      // Reflected ray (symmetric about normal)
      const refEndX = hitX + rayLen * Math.sin(angleRad);
      const refEndY = mirrorY - rayLen * Math.cos(angleRad);
      ctx.strokeStyle = "#38bdf8";
      ctx.beginPath();
      ctx.moveTo(hitX, mirrorY);
      ctx.lineTo(refEndX, refEndY);
      ctx.stroke();

      drawArrowhead(ctx, refEndX - 12 * Math.sin(angleRad), refEndY + 12 * Math.cos(angleRad), angleDeg);

      // Angle arcs
      drawAngleArc(ctx, hitX, mirrorY, angleDeg, "left", "#fbbf24", "θᵢ");
      drawAngleArc(ctx, hitX, mirrorY, angleDeg, "right", "#38bdf8", "θᵣ");

      // Labels
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText("Incident ray", incEndX - 20, incEndY - 8);
      ctx.fillText("Reflected ray", refEndX + 4, refEndY - 8);
      ctx.fillText("Normal", hitX + 8, mirrorY - rayLen * 0.55);
      ctx.fillText("Mirror", width * 0.12, mirrorY + 28);
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
      draw(ctx, rect.width, rect.height, incidenceAngle);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw, incidenceAngle]);

  return (
    <div>
      <canvas ref={canvasRef} className="physics-canvas" style={{ height: 320 }} aria-label="Mirror reflection ray diagram" />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Angle of incidence (from normal)</span>
              <output>{incidenceAngle}°</output>
            </label>
            <input
              type="range"
              min={5}
              max={80}
              value={incidenceAngle}
              onChange={(e) => {
                const value = Number(e.target.value);
                internalAngleRef.current = value;
                onAngleChange?.(value);
              }}
            />
          </div>
          <p className="physics-play-hint">
            Drag the slider — watch the reflected ray stay symmetric. θᵢ always equals θᵣ.
          </p>
        </div>
      )}
    </div>
  );
}

function drawArrowhead(ctx: CanvasRenderingContext2D, x: number, y: number, angleDeg: number) {
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
  ctx.fillStyle = ctx.strokeStyle as string;
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
  const radius = 36;
  const start = side === "left" ? -Math.PI / 2 : -Math.PI / 2;
  const end =
    side === "left" ? -Math.PI / 2 + (angleDeg * Math.PI) / 180 : -Math.PI / 2 - (angleDeg * Math.PI) / 180;

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, start, end, side === "right");
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.font = "11px Inter, sans-serif";
  const labelX = side === "left" ? cx - 28 : cx + 14;
  ctx.fillText(label, labelX, cy - radius - 6);
}