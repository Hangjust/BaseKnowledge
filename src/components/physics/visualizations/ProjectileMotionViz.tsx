/**
 * =============================================================================
 * ProjectileMotionViz — classical mechanics trajectory (learn + play)
 * =============================================================================
 *
 * Simulates 2D projectile motion with constant g. User adjusts launch angle
 * and initial speed in play mode; learn mode uses fixed defaults.
 *
 * DUPLICATION GUIDE:
 *   Replace trajectory math for different physics (e.g. spring, pendulum).
 *   Keep the canvas + slider control pattern from MirrorReflectionViz.
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef } from "react";

const GRAVITY = 9.8;
const SCALE = 8; // pixels per meter (approximate)

type ProjectileMotionVizProps = {
  interactive?: boolean;
  launchAngle?: number;
  launchSpeed?: number;
  onAngleChange?: (angle: number) => void;
  onSpeedChange?: (speed: number) => void;
};

export default function ProjectileMotionViz({
  interactive = false,
  launchAngle: externalAngle = 45,
  launchSpeed: externalSpeed = 20,
  onAngleChange,
  onSpeedChange
}: ProjectileMotionVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);

  const computeTrajectory = useCallback((angleDeg: number, speed: number, width: number, groundY: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const vx = speed * Math.cos(angleRad);
    const vy = speed * Math.sin(angleRad);
    const totalTime = (2 * vy) / GRAVITY;
    const points: { x: number; y: number }[] = [];
    const originX = width * 0.12;
    const steps = 80;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * totalTime;
      const xMeters = vx * t;
      const yMeters = vy * t - 0.5 * GRAVITY * t * t;
      points.push({
        x: originX + xMeters * SCALE,
        y: groundY - yMeters * SCALE
      });
    }

    return { points, vx, vy, totalTime, originX };
  }, []);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, angle: number, speed: number, t: number) => {
      ctx.clearRect(0, 0, width, height);
      const groundY = height * 0.82;

      // Ground
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      ctx.fillStyle = "#64748b";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Ground", 8, groundY + 16);

      const { points, vx, vy, totalTime, originX } = computeTrajectory(angle, speed, width, groundY);

      // Full trajectory (dashed)
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();
      ctx.setLineDash([]);

      // Traveled portion (solid)
      const progress = interactive ? Math.min(t / totalTime, 1) : 1;
      const endIndex = Math.floor(progress * (points.length - 1));
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= endIndex; i++) {
        const p = points[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Ball position
      const ball = points[endIndex];
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 9, 0, Math.PI * 2);
      ctx.fill();

      // Launcher
      const launcherLen = 40;
      const angleRad = (angle * Math.PI) / 180;
      const lx = originX - launcherLen * Math.cos(angleRad);
      const ly = groundY - launcherLen * Math.sin(angleRad);
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(originX, groundY);
      ctx.lineTo(lx, ly);
      ctx.stroke();

      // Info panel
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(`v₀ = ${speed} m/s`, 12, 22);
      ctx.fillText(`θ = ${angle}°`, 12, 40);
      ctx.fillText(`vₓ = ${vx.toFixed(1)} m/s  (constant)`, 12, 58);
      ctx.fillText(`vᵧ₀ = ${vy.toFixed(1)} m/s`, 12, 76);
      ctx.fillText(`g = ${GRAVITY} m/s² ↓`, 12, 94);

      if (interactive && progress < 1) {
        ctx.fillStyle = "#38bdf8";
        ctx.fillText("▶ Flying…", width - 90, 22);
      }
    },
    [computeTrajectory, interactive]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { totalTime } = computeTrajectory(externalAngle, externalSpeed, 400, 320 * 0.82);

    const resizeAndDraw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, rect.width, rect.height, externalAngle, externalSpeed, timeRef.current);
    };

    resizeAndDraw();

    if (interactive) {
      timeRef.current = 0;
      const animate = () => {
        timeRef.current += 0.016;
        if (timeRef.current > totalTime + 0.5) timeRef.current = 0;
        const rect = canvas.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, externalAngle, externalSpeed, timeRef.current);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeAndDraw);
    return () => {
      window.removeEventListener("resize", resizeAndDraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, externalAngle, externalSpeed, interactive, computeTrajectory]);

  return (
    <div>
      <canvas ref={canvasRef} className="physics-canvas" style={{ height: 320 }} aria-label="Projectile motion diagram" />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Launch angle</span>
              <output>{externalAngle}°</output>
            </label>
            <input
              type="range"
              min={10}
              max={80}
              value={externalAngle}
              onChange={(e) => onAngleChange?.(Number(e.target.value))}
            />
          </div>
          <div className="physics-control-row">
            <label>
              <span>Launch speed (m/s)</span>
              <output>{externalSpeed} m/s</output>
            </label>
            <input
              type="range"
              min={5}
              max={40}
              value={externalSpeed}
              onChange={(e) => onSpeedChange?.(Number(e.target.value))}
            />
          </div>
          <p className="physics-play-hint">
            Adjust angle and speed — the ball relaunches automatically. Notice vₓ stays constant.
          </p>
        </div>
      )}
    </div>
  );
}