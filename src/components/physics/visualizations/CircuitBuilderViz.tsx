/**
 * =============================================================================
 * CircuitBuilderViz — simple electric circuit (learn + play modes)
 * =============================================================================
 *
 * Draws a battery, bulb, switch, and wire loop. In play mode the learner can
 * toggle the switch and introduce a wire gap to see when the bulb lights.
 *
 * Props:
 *   interactive — when true, shows switch toggle and fault toggle (play mode)
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CircuitBuilderVizProps = {
  interactive?: boolean;
};

export default function CircuitBuilderViz({ interactive = false }: CircuitBuilderVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);

  const [switchClosed, setSwitchClosed] = useState(true);
  const [hasGap, setHasGap] = useState(false);

  const circuitClosed = switchClosed && !hasGap;

  const drawBattery = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, height: number) => {
      const w = 28;
      const h = height;
      const halfW = w / 2;
      const halfH = h / 2;

      // Battery body
      ctx.fillStyle = "#1e293b";
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx - halfW, cy - halfH, w, h, 4);
      ctx.fill();
      ctx.stroke();

      // Positive terminal (long line)
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy - halfH - 8);
      ctx.lineTo(cx + 10, cy - halfH - 8);
      ctx.stroke();

      // Negative terminal (short line)
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy + halfH + 8);
      ctx.lineTo(cx + 6, cy + halfH + 8);
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#f87171";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText("+", cx - 18, cy - halfH - 4);
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("–", cx - 18, cy + halfH + 14);

      // Battery label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Battery", cx - 20, cy + halfH + 28);
    },
    []
  );

  const drawBulb = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, lit: boolean) => {
      const r = 22;

      // Glow when lit
      if (lit) {
        const glow = ctx.createRadialGradient(cx, cy, r, cx, cy, r * 2.8);
        glow.addColorStop(0, "rgba(251, 191, 36, 0.35)");
        glow.addColorStop(1, "rgba(251, 191, 36, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bulb glass
      ctx.fillStyle = lit ? "#fbbf24" : "#334155";
      ctx.strokeStyle = lit ? "#f59e0b" : "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Filament
      ctx.strokeStyle = lit ? "#fef3c7" : "#64748b";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy + 6);
      ctx.lineTo(cx - 4, cy - 4);
      ctx.lineTo(cx, cy + 2);
      ctx.lineTo(cx + 4, cy - 4);
      ctx.lineTo(cx + 8, cy + 6);
      ctx.stroke();

      // Base
      ctx.fillStyle = "#475569";
      ctx.fillRect(cx - 10, cy + r - 2, 20, 10);

      // Label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Bulb", cx - 14, cy + r + 22);
    },
    []
  );

  const drawSwitch = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, closed: boolean) => {
      const w = 40;

      // Terminals
      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.arc(cx - w / 2, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + w / 2, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Arm
      ctx.strokeStyle = closed ? "#94a3b8" : "#f87171";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - w / 2, cy);
      if (closed) {
        ctx.lineTo(cx + w / 2, cy);
      } else {
        ctx.lineTo(cx + w / 2 - 6, cy - 18);
      }
      ctx.stroke();

      // Label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Switch", cx - 18, cy + 22);
    },
    []
  );

  const drawWireLoop = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      batteryPos: { x: number; y: number },
      bulbPos: { x: number; y: number },
      switchPos: { x: number; y: number },
      gap: boolean,
      closed: boolean,
      t: number
    ) => {
      const pad = 40;
      const topY = pad;
      const bottomY = height - pad;
      const leftX = pad;
      const rightX = width - pad;

      // Wire path: battery bottom → bottom wire → bulb bottom → bulb top → top wire → switch → battery top
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Bottom segment (battery + to bulb bottom)
      ctx.strokeStyle = closed ? "#34d399" : "#475569";
      ctx.beginPath();
      ctx.moveTo(batteryPos.x, batteryPos.y + 34);
      ctx.lineTo(batteryPos.x, bottomY);
      ctx.lineTo(bulbPos.x, bottomY);
      ctx.lineTo(bulbPos.x, bulbPos.y + 20);
      ctx.stroke();

      // Top segment (bulb top → switch → battery top)
      if (gap) {
        // Wire with gap
        ctx.strokeStyle = "#475569";
        ctx.beginPath();
        ctx.moveTo(bulbPos.x, bulbPos.y - 22);
        ctx.lineTo(bulbPos.x, topY);
        ctx.lineTo(switchPos.x - 20, topY);
        ctx.stroke();

        // Gap indicator
        ctx.strokeStyle = "#f87171";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(switchPos.x - 20, topY);
        ctx.lineTo(switchPos.x + 20, topY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = "#475569";
        ctx.beginPath();
        ctx.moveTo(switchPos.x + 20, topY);
        ctx.lineTo(switchPos.x, topY);
        ctx.lineTo(switchPos.x, switchPos.y - 4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(switchPos.x, switchPos.y + 4);
        ctx.lineTo(switchPos.x, topY);
        ctx.lineTo(batteryPos.x, topY);
        ctx.lineTo(batteryPos.x, batteryPos.y - 34);
        ctx.stroke();
      } else {
        ctx.strokeStyle = closed ? "#34d399" : "#475569";
        ctx.beginPath();
        ctx.moveTo(bulbPos.x, bulbPos.y - 22);
        ctx.lineTo(bulbPos.x, topY);
        ctx.lineTo(switchPos.x, topY);
        ctx.lineTo(switchPos.x, switchPos.y - 4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(switchPos.x, switchPos.y + 4);
        ctx.lineTo(switchPos.x, topY);
        ctx.lineTo(batteryPos.x, topY);
        ctx.lineTo(batteryPos.x, batteryPos.y - 34);
        ctx.stroke();
      }

      // Current flow animation
      if (closed) {
        const speed = 1.2;
        const offset = (t * speed) % 20;
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 14]);
        ctx.lineDashOffset = -offset;

        // Bottom
        ctx.beginPath();
        ctx.moveTo(batteryPos.x, batteryPos.y + 34);
        ctx.lineTo(batteryPos.x, bottomY);
        ctx.lineTo(bulbPos.x, bottomY);
        ctx.lineTo(bulbPos.x, bulbPos.y + 20);
        ctx.stroke();

        // Top
        ctx.beginPath();
        ctx.moveTo(bulbPos.x, bulbPos.y - 22);
        ctx.lineTo(bulbPos.x, topY);
        ctx.lineTo(switchPos.x, topY);
        ctx.lineTo(switchPos.x, switchPos.y - 4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(switchPos.x, switchPos.y + 4);
        ctx.lineTo(switchPos.x, topY);
        ctx.lineTo(batteryPos.x, topY);
        ctx.lineTo(batteryPos.x, batteryPos.y - 34);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.lineDashOffset = 0;
      }
    },
    []
  );

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      closed: boolean,
      gap: boolean,
      t: number
    ) => {
      ctx.clearRect(0, 0, width, height);

      const batteryPos = { x: width * 0.22, y: height * 0.5 };
      const bulbPos = { x: width * 0.78, y: height * 0.5 };
      const switchPos = { x: width * 0.5, y: height * 0.18 };

      // Draw wire loop first (behind components)
      drawWireLoop(ctx, width, height, batteryPos, bulbPos, switchPos, gap, closed, t);

      // Components
      drawBattery(ctx, batteryPos.x, batteryPos.y, 52);
      drawBulb(ctx, bulbPos.x, bulbPos.y, closed);
      drawSwitch(ctx, switchPos.x, switchPos.y, closed && !gap);

      // Status panel
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(`Circuit: ${closed ? "Closed" : "Open"}`, 14, 22);
      ctx.fillText(`Current: ${closed ? "Flowing" : "Stopped"}`, 14, 40);
      ctx.fillText(`Bulb: ${closed ? "ON" : "OFF"}`, 14, 58);

      if (gap) {
        ctx.fillStyle = "#f87171";
        ctx.fillText("⚠ Gap in wire", 14, 76);
      } else if (!switchClosed) {
        ctx.fillStyle = "#fbbf24";
        ctx.fillText("⚠ Switch open", 14, 76);
      }

      // Metrics
      if (closed) {
        ctx.fillStyle = "#34d399";
        ctx.font = "11px Inter, sans-serif";
        ctx.fillText(`Path complete • Electrons moving`, width - 180, 22);
      } else {
        ctx.fillStyle = "#64748b";
        ctx.font = "11px Inter, sans-serif";
        ctx.fillText(`Path broken • No current`, width - 160, 22);
      }
    },
    [drawBattery, drawBulb, drawSwitch, drawWireLoop, switchClosed]
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
      draw(ctx, rect.width, rect.height, circuitClosed, hasGap, timeRef.current);
    };

    resizeAndDraw();

    if (interactive) {
      timeRef.current = 0;
      const animate = () => {
        timeRef.current += 0.05;
        const rect = canvas.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, circuitClosed, hasGap, timeRef.current);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeAndDraw);
    return () => {
      window.removeEventListener("resize", resizeAndDraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, circuitClosed, hasGap, interactive]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: 320 }}
        aria-label="Simple circuit with battery, bulb, switch, and wire loop"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Switch</span>
              <output>{switchClosed ? "Closed" : "Open"}</output>
            </label>
            <button
              type="button"
              className="physics-btn physics-btn-secondary"
              onClick={() => setSwitchClosed((s) => !s)}
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              {switchClosed ? "Open switch" : "Close switch"}
            </button>
          </div>
          <div className="physics-control-row">
            <label>
              <span>Wire gap (fault)</span>
              <output>{hasGap ? "Present" : "None"}</output>
            </label>
            <button
              type="button"
              className="physics-btn physics-btn-secondary"
              onClick={() => setHasGap((g) => !g)}
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              {hasGap ? "Repair wire" : "Break wire"}
            </button>
          </div>
          <p className="physics-play-hint">
            Toggle the switch or break the wire — the bulb only lights when the loop is complete.
          </p>
        </div>
      )}
    </div>
  );
}
