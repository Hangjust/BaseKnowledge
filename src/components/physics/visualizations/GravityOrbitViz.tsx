/**
 * =============================================================================
 * GravityOrbitViz — gravity drop test + orbital motion (learn + play)
 * =============================================================================
 *
 * Simulates a falling object under adjustable gravity and a planet orbiting a
 * star. In play mode the user changes gravity strength and watches both the
 * drop time and the orbital period change.
 *
 * Props:
 *   interactive — when true, shows gravity-strength slider (play mode)
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const EARTH_GRAVITY = 9.8;
const CANVAS_HEIGHT = 320;

function formatNumber(n: number, digits = 1): string {
  return n.toFixed(digits);
}

type GravityOrbitVizProps = {
  interactive?: boolean;
};

export default function GravityOrbitViz({ interactive = false }: GravityOrbitVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);
  const dropTimeRef = useRef(0);
  const isDroppingRef = useRef(false);

  const [gravityMult, setGravityMult] = useState(1.0);
  const [dropTriggered, setDropTriggered] = useState(false);

  const gravity = EARTH_GRAVITY * gravityMult;

  const drawOrbit = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      orbitRadius: number,
      t: number,
      g: number
    ) => {
      // Orbit ring
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, orbitRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Star
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();

      // Star glow
      const glow = ctx.createRadialGradient(cx, cy, 4, cx, cy, 28);
      glow.addColorStop(0, "rgba(251, 191, 36, 0.35)");
      glow.addColorStop(1, "rgba(251, 191, 36, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fill();

      // Planet position — faster orbit when gravity is stronger
      const angularSpeed = 0.6 + (g / EARTH_GRAVITY) * 0.4;
      const angle = t * angularSpeed;
      const px = cx + orbitRadius * Math.cos(angle);
      const py = cy + orbitRadius * Math.sin(angle);

      // Gravity pull arrow (pointing toward star)
      const arrowLen = 18;
      const dx = cx - px;
      const dy = cy - py;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;

      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + nx * arrowLen, py + ny * arrowLen);
      ctx.stroke();

      // Arrowhead
      ctx.save();
      ctx.translate(px + nx * arrowLen, py + ny * arrowLen);
      ctx.rotate(Math.atan2(ny, nx));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-6, -4);
      ctx.lineTo(-6, 4);
      ctx.closePath();
      ctx.fillStyle = "#f87171";
      ctx.fill();
      ctx.restore();

      // Planet
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // Planet trail (last few positions)
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const trailAngle = angle - i * 0.08;
        const tx = cx + orbitRadius * Math.cos(trailAngle);
        const ty = cy + orbitRadius * Math.sin(trailAngle);
        if (i === 0) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);
      }
      ctx.stroke();
    },
    []
  );

  const drawDropTest = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      groundY: number,
      g: number,
      dropT: number,
      isDropping: boolean
    ) => {
      const dropX = width * 0.22;
      const dropHeight = groundY - 40;
      const startY = 40;

      // Drop tower / platform
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dropX - 24, startY);
      ctx.lineTo(dropX + 24, startY);
      ctx.stroke();

      // Platform support lines
      ctx.beginPath();
      ctx.moveTo(dropX - 20, startY);
      ctx.lineTo(dropX - 20, startY + 10);
      ctx.moveTo(dropX + 20, startY);
      ctx.lineTo(dropX + 20, startY + 10);
      ctx.stroke();

      // Ground
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width * 0.44, groundY);
      ctx.stroke();

      // Ground hatch
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      for (let x = 8; x < width * 0.42; x += 12) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x + 6, groundY + 8);
        ctx.stroke();
      }

      // Prediction dashed line (shown before drop starts)
      if (!isDropping) {
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "#8b9cb3";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(dropX, startY + 8);
        ctx.lineTo(dropX, groundY - 8);
        ctx.stroke();
        ctx.setLineDash([]);

        // Prediction label
        ctx.fillStyle = "#8b9cb3";
        ctx.font = "11px Inter, sans-serif";
        ctx.fillText("predicted path", dropX + 8, (startY + groundY) / 2);
      }

      // Falling object position
      let objectY: number;
      if (isDropping) {
        const fallDist = 0.5 * g * dropT * dropT * 12; // scale factor for visual
        objectY = Math.min(startY + 8 + fallDist, groundY - 8);
        if (objectY >= groundY - 8) {
          isDroppingRef.current = false;
        }
      } else {
        objectY = startY + 8;
      }

      // Object (apple)
      ctx.fillStyle = "#f87171";
      ctx.beginPath();
      ctx.arc(dropX, objectY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Apple stem
      ctx.strokeStyle = "#34d399";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(dropX, objectY - 8);
      ctx.lineTo(dropX + 2, objectY - 13);
      ctx.stroke();

      // Velocity arrow (grows as object falls)
      if (isDropping && dropT > 0.1) {
        const v = g * dropT;
        const arrowLen = Math.min(v * 3, 40);
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(dropX + 14, objectY);
        ctx.lineTo(dropX + 14, objectY + arrowLen);
        ctx.stroke();

        // Arrowhead
        ctx.save();
        ctx.translate(dropX + 14, objectY + arrowLen);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-5, -4);
        ctx.lineTo(-5, 4);
        ctx.closePath();
        ctx.fillStyle = "#fbbf24";
        ctx.fill();
        ctx.restore();
      }

      // Metrics panel
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(`g = ${formatNumber(g)} m/s²`, 12, 22);
      if (isDropping) {
        const v = g * dropT;
        const fallTime = dropT;
        ctx.fillText(`v = ${formatNumber(v)} m/s`, 12, 40);
        ctx.fillText(`t = ${formatNumber(fallTime, 2)} s`, 12, 58);
      } else {
        ctx.fillStyle = "#8b9cb3";
        ctx.fillText("Press ▶ Drop to start", 12, 40);
      }
    },
    []
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, g: number, t: number) => {
      ctx.clearRect(0, 0, width, height);
      const groundY = height * 0.82;

      // Divider line between drop test and orbit
      ctx.strokeStyle = "#1a2332";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width * 0.46, 16);
      ctx.lineTo(width * 0.46, height - 16);
      ctx.stroke();

      // Drop test (left side)
      drawDropTest(ctx, width * 0.46, groundY, g, dropTimeRef.current, isDroppingRef.current);

      // Orbit (right side)
      const orbitCx = width * 0.72;
      const orbitCy = height * 0.5;
      const orbitRadius = Math.min(width * 0.18, height * 0.32);
      drawOrbit(ctx, orbitCx, orbitCy, orbitRadius, t, g);

      // Orbit label
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Gravity keeps the planet in orbit", orbitCx - 70, orbitCy + orbitRadius + 24);
    },
    [drawDropTest, drawOrbit]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeAndDraw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, rect.width, rect.height, gravity, timeRef.current);
    };

    resizeAndDraw();

    const animate = () => {
      timeRef.current += 0.016;
      if (isDroppingRef.current) {
        dropTimeRef.current += 0.016;
      }
      const rect = canvas.getBoundingClientRect();
      draw(ctx, rect.width, rect.height, gravity, timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeAndDraw);
    return () => {
      window.removeEventListener("resize", resizeAndDraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, gravity]);

  const handleDrop = () => {
    dropTimeRef.current = 0;
    isDroppingRef.current = true;
    setDropTriggered((prev) => !prev); // force re-render to sync state if needed
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: CANVAS_HEIGHT }}
        aria-label="Gravity drop test and orbital motion diagram"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Gravity strength</span>
              <output>{gravityMult.toFixed(1)}× Earth</output>
            </label>
            <input
              type="range"
              min={0.5}
              max={3.0}
              step={0.1}
              value={gravityMult}
              onChange={(e) => setGravityMult(Number(e.target.value))}
            />
          </div>
          <div className="physics-control-row">
            <button
              type="button"
              onClick={handleDrop}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                border: "none",
                background: "#38bdf8",
                color: "#0a0e17",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              ▶ Drop
            </button>
          </div>
          <p className="physics-play-hint">
            Change gravity strength and press Drop — watch the fall speed and orbit speed change together.
            Higher gravity means faster falls and faster orbits.
          </p>
        </div>
      )}
    </div>
  );
}
