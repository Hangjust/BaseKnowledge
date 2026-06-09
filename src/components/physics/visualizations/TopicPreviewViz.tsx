/**
 * =============================================================================
 * TopicPreviewViz — miniature animation for physics hub topic cards
 * =============================================================================
 *
 * Maps topic.meta.previewVisualization → a lightweight canvas preview.
 * Add new cases when registering topics in topics.ts.
 * =============================================================================
 */

"use client";

import { useEffect, useRef } from "react";

type PreviewType = "mirror" | "projectile";

export default function TopicPreviewViz({ type }: { type: PreviewType }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId = 0;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (type === "mirror") {
        drawMirrorPreview(ctx, w, h, frame);
      } else {
        drawProjectilePreview(ctx, w, h, frame);
      }

      frame += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  );
}

function drawMirrorPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const mirrorY = h * 0.7;
  const angle = 25 + Math.sin(frame * 0.02) * 20;
  const rad = (angle * Math.PI) / 180;
  const cx = w * 0.5;
  const len = h * 0.35;

  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w * 0.2, mirrorY);
  ctx.lineTo(w * 0.8, mirrorY);
  ctx.stroke();

  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - len * Math.sin(rad), mirrorY - len * Math.cos(rad));
  ctx.lineTo(cx, mirrorY);
  ctx.stroke();

  ctx.strokeStyle = "#38bdf8";
  ctx.beginPath();
  ctx.moveTo(cx, mirrorY);
  ctx.lineTo(cx + len * Math.sin(rad), mirrorY - len * Math.cos(rad));
  ctx.stroke();
}

function drawProjectilePreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const groundY = h * 0.75;
  const t = (frame % 120) / 120;
  const angle = 45;
  const speed = 18;
  const rad = (angle * Math.PI) / 180;
  const vx = speed * Math.cos(rad);
  const vy = speed * Math.sin(rad);
  const g = 9.8;
  const totalT = (2 * vy) / g;
  const time = t * totalT;
  const xM = vx * time;
  const yM = vy * time - 0.5 * g * time * time;
  const scale = 5;
  const ox = w * 0.15;

  ctx.strokeStyle = "#334155";
  ctx.setLineDash([3, 5]);
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) {
    const tt = (i / 40) * totalT;
    const px = ox + vx * tt * scale;
    const py = groundY - (vy * tt - 0.5 * g * tt * tt) * scale;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.arc(ox + xM * scale, groundY - yM * scale, 6, 0, Math.PI * 2);
  ctx.fill();
}
