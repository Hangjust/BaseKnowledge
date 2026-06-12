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

type PreviewType =
  | "mirror"
  | "projectile"
  | "motion"
  | "forces"
  | "gravity"
  | "light"
  | "electricity"
  | "heat"
  | "sound"
  | "energy"
  | "magnetism";

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
      } else if (type === "projectile") {
        drawProjectilePreview(ctx, w, h, frame);
      } else if (type === "motion") {
        drawMotionPreview(ctx, w, h, frame);
      } else if (type === "forces") {
        drawForcesPreview(ctx, w, h, frame);
      } else if (type === "gravity") {
        drawGravityPreview(ctx, w, h, frame);
      } else if (type === "light") {
        drawLightPreview(ctx, w, h, frame);
      } else if (type === "electricity") {
        drawElectricityPreview(ctx, w, h, frame);
      } else if (type === "heat") {
        drawHeatPreview(ctx, w, h, frame);
      } else if (type === "sound") {
        drawSoundPreview(ctx, w, h, frame);
      } else if (type === "energy") {
        drawEnergyPreview(ctx, w, h, frame);
      } else if (type === "magnetism") {
        drawMagnetismPreview(ctx, w, h, frame);
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

function drawMotionPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const groundY = h * 0.6;
  const trackLeft = w * 0.1;
  const trackRight = w * 0.9;
  const t = (frame % 90) / 90;
  const ballX = trackLeft + t * (trackRight - trackLeft);

  // Track
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(trackLeft, groundY);
  ctx.lineTo(trackRight, groundY);
  ctx.stroke();

  // Start / finish
  ctx.fillStyle = "#34d399";
  ctx.fillRect(trackLeft - 2, groundY - 8, 4, 16);
  ctx.fillStyle = "#f87171";
  ctx.fillRect(trackRight - 2, groundY - 8, 4, 16);

  // Ball
  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.arc(ballX, groundY - 6, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawForcesPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const boxX = w * 0.45;
  const boxY = h * 0.5;
  const boxW = 28;
  const boxH = 20;

  // Box
  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(boxX, boxY, boxW, boxH);

  // Push arrow (oscillating)
  const pushLen = 16 + Math.sin(frame * 0.04) * 6;
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(boxX - 8, boxY + boxH / 2);
  ctx.lineTo(boxX - 8 - pushLen, boxY + boxH / 2);
  ctx.stroke();

  // Friction arrow
  ctx.strokeStyle = "#f87171";
  ctx.beginPath();
  ctx.moveTo(boxX + boxW + 8, boxY + boxH / 2);
  ctx.lineTo(boxX + boxW + 8 + 12, boxY + boxH / 2);
  ctx.stroke();
}

function drawGravityPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const orbitR = Math.min(w, h) * 0.28;
  const angle = frame * 0.03;

  // Orbit ring
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
  ctx.stroke();

  // Star
  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fill();

  // Planet
  const px = cx + orbitR * Math.cos(angle);
  const py = cy + orbitR * Math.sin(angle);
  ctx.fillStyle = "#38bdf8";
  ctx.beginPath();
  ctx.arc(px, py, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawLightPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const lampX = w * 0.2;
  const lampY = h * 0.3;
  const beamEndX = w * 0.85;
  const groundY = h * 0.75;

  // Lamp glow
  ctx.fillStyle = "rgba(251, 191, 36, 0.25)";
  ctx.beginPath();
  ctx.arc(lampX, lampY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Beam
  ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(lampX, lampY);
  ctx.lineTo(beamEndX, groundY - h * 0.15);
  ctx.stroke();

  // Object
  ctx.fillStyle = "#475569";
  ctx.fillRect(w * 0.55, groundY - h * 0.18, w * 0.08, h * 0.18);

  // Shadow
  ctx.fillStyle = "#1a2332";
  ctx.fillRect(w * 0.55 + w * 0.08, groundY - 2, w * 0.15, 4);
}

function drawElectricityPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const loopW = w * 0.35;
  const loopH = h * 0.35;

  // Circuit loop
  ctx.strokeStyle = "#34d399";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - loopW / 2, cy - loopH / 2);
  ctx.lineTo(cx + loopW / 2, cy - loopH / 2);
  ctx.lineTo(cx + loopW / 2, cy + loopH / 2);
  ctx.lineTo(cx - loopW / 2, cy + loopH / 2);
  ctx.closePath();
  ctx.stroke();

  // Battery
  ctx.fillStyle = "#fbbf24";
  ctx.fillRect(cx - loopW / 2 - 4, cy - 6, 8, 12);

  // Bulb
  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.arc(cx + loopW / 2 + 6, cy, 5, 0, Math.PI * 2);
  ctx.fill();

  // Animated current dot
  const t = (frame % 60) / 60;
  let dotX = cx - loopW / 2;
  let dotY = cy - loopH / 2;
  if (t < 0.25) {
    dotX = cx - loopW / 2 + t * 4 * loopW;
    dotY = cy - loopH / 2;
  } else if (t < 0.5) {
    dotX = cx + loopW / 2;
    dotY = cy - loopH / 2 + (t - 0.25) * 4 * loopH;
  } else if (t < 0.75) {
    dotX = cx + loopW / 2 - (t - 0.5) * 4 * loopW;
    dotY = cy + loopH / 2;
  } else {
    dotX = cx - loopW / 2;
    dotY = cy + loopH / 2 - (t - 0.75) * 4 * loopH;
  }
  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawHeatPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const hotX = w * 0.3;
  const coldX = w * 0.7;
  const cy = h * 0.5;

  // Hot object
  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.arc(hotX, cy, 14, 0, Math.PI * 2);
  ctx.fill();

  // Cold object
  ctx.fillStyle = "#38bdf8";
  ctx.beginPath();
  ctx.arc(coldX, cy, 14, 0, Math.PI * 2);
  ctx.fill();

  // Heat flow arrows (animated)
  const arrowOffset = (frame % 30) / 30;
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 3; i++) {
    const ax = hotX + 20 + (coldX - hotX - 40) * ((i + arrowOffset) / 3);
    if (ax > hotX + 20 && ax < coldX - 20) {
      ctx.beginPath();
      ctx.moveTo(ax - 4, cy - 6);
      ctx.lineTo(ax + 4, cy - 6);
      ctx.lineTo(ax, cy - 10);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function drawSoundPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const cx = w * 0.3;
  const cy = h * 0.5;

  // Source (speaker / string)
  ctx.fillStyle = "#475569";
  ctx.fillRect(cx - 8, cy - 10, 16, 20);

  // Sound waves
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 1.5;
  for (let i = 1; i <= 3; i++) {
    const r = 20 + i * 18 + Math.sin(frame * 0.05 + i) * 4;
    ctx.beginPath();
    ctx.arc(cx, cy, r, -0.4, 0.4);
    ctx.stroke();
  }

  // Wave line
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < w * 0.5; x += 2) {
    const y = cy + Math.sin((x + frame * 2) * 0.08) * 10;
    if (x === 0) ctx.moveTo(cx + 20 + x, y);
    else ctx.lineTo(cx + 20 + x, y);
  }
  ctx.stroke();
}

function drawEnergyPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const nodes = [
    { x: w * 0.2, y: h * 0.5, color: "#fbbf24" },
    { x: w * 0.5, y: h * 0.5, color: "#f97316" },
    { x: w * 0.8, y: h * 0.5, color: "#ef4444" }
  ];

  // Connections
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(nodes[0].x, nodes[0].y);
  ctx.lineTo(nodes[1].x, nodes[1].y);
  ctx.lineTo(nodes[2].x, nodes[2].y);
  ctx.stroke();

  // Animated dot
  const t = (frame % 60) / 60;
  const from = nodes[0];
  const to = nodes[1];
  const ex = from.x + (to.x - from.x) * t;
  const ey = from.y + (to.y - from.y) * t;
  ctx.fillStyle = "#34d399";
  ctx.beginPath();
  ctx.arc(ex, ey, 3, 0, Math.PI * 2);
  ctx.fill();

  // Nodes
  nodes.forEach((node) => {
    ctx.fillStyle = node.color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawMagnetismPreview(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const m1x = w * 0.3;
  const m2x = w * 0.7;
  const cy = h * 0.5;
  const barW = w * 0.18;
  const barH = h * 0.12;

  // Magnet 1 (N-S)
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(m1x - barW / 2, cy - barH / 2, barW / 2, barH);
  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(m1x, cy - barH / 2, barW / 2, barH);

  // Magnet 2 (S-N)
  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(m2x - barW / 2, cy - barH / 2, barW / 2, barH);
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(m2x, cy - barH / 2, barW / 2, barH);

  // Field lines
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 5]);
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(m1x + barW / 2, cy + i * h * 0.08);
    ctx.quadraticCurveTo((m1x + m2x) / 2, cy + i * h * 0.15, m2x - barW / 2, cy + i * h * 0.08);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}
