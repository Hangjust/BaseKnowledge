/**
 * =============================================================================
 * EnergyFlowViz — energy transformation chain (learn + play)
 * =============================================================================
 *
 * Shows energy changing form through a source → device → output chain.
 * In play mode the user picks the source and device and watches the flow.
 *
 * Props:
 *   interactive — when true, shows source / device selectors (play mode)
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CANVAS_HEIGHT = 320;

type EnergySource = "battery" | "food" | "sun";
type EnergyDevice = "lamp" | "fan" | "motor";

const SOURCE_LABELS: Record<EnergySource, string> = {
  battery: "Battery",
  food: "Food",
  sun: "Sun"
};

const DEVICE_LABELS: Record<EnergyDevice, string> = {
  lamp: "Lamp",
  fan: "Fan",
  motor: "Motor"
};

const OUTPUTS: Record<EnergyDevice, { primary: string; secondary: string; waste: string }> = {
  lamp: { primary: "Light", secondary: "Heat", waste: "Wasted heat" },
  fan: { primary: "Motion", secondary: "Heat", waste: "Wasted heat" },
  motor: { primary: "Motion", secondary: "Heat", waste: "Wasted heat" }
};

type EnergyFlowVizProps = {
  interactive?: boolean;
};

export default function EnergyFlowViz({ interactive = false }: EnergyFlowVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);

  const [source, setSource] = useState<EnergySource>("battery");
  const [device, setDevice] = useState<EnergyDevice>("lamp");
  const [energyLevel, setEnergyLevel] = useState(80);

  const output = OUTPUTS[device];

  const drawSource = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, src: EnergySource) => {
      if (src === "battery") {
        // Battery body
        ctx.fillStyle = "#334155";
        ctx.fillRect(cx - 24, cy - 16, 48, 32);
        // Battery top
        ctx.fillStyle = "#475569";
        ctx.fillRect(cx - 8, cy - 22, 16, 6);
        // Positive terminal
        ctx.fillStyle = "#f87171";
        ctx.fillRect(cx + 10, cy - 20, 4, 4);
        // Charge bars
        ctx.fillStyle = "#34d399";
        ctx.fillRect(cx - 18, cy - 8, 10, 16);
        ctx.fillRect(cx - 4, cy - 8, 10, 16);
        ctx.fillRect(cx + 10, cy - 8, 8, 16);
      } else if (src === "food") {
        // Apple
        ctx.fillStyle = "#f87171";
        ctx.beginPath();
        ctx.arc(cx, cy + 4, 18, 0, Math.PI * 2);
        ctx.fill();
        // Leaf
        ctx.fillStyle = "#34d399";
        ctx.beginPath();
        ctx.ellipse(cx + 4, cy - 14, 8, 4, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        // Stem
        ctx.strokeStyle = "#8b9cb3";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 10);
        ctx.lineTo(cx + 2, cy - 18);
        ctx.stroke();
      } else {
        // Sun
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(cx, cy, 16, 0, Math.PI * 2);
        ctx.fill();
        // Rays
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx + 20 * Math.cos(angle), cy + 20 * Math.sin(angle));
          ctx.lineTo(cx + 28 * Math.cos(angle), cy + 28 * Math.sin(angle));
          ctx.stroke();
        }
      }

      // Label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(SOURCE_LABELS[src], cx, cy + 36);
      ctx.textAlign = "left";
    },
    []
  );

  const drawDevice = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, dev: EnergyDevice) => {
      if (dev === "lamp") {
        // Lamp base
        ctx.fillStyle = "#475569";
        ctx.beginPath();
        ctx.moveTo(cx - 12, cy + 14);
        ctx.lineTo(cx + 12, cy + 14);
        ctx.lineTo(cx + 8, cy + 4);
        ctx.lineTo(cx - 8, cy + 4);
        ctx.closePath();
        ctx.fill();
        // Bulb
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(cx, cy - 4, 14, 0, Math.PI * 2);
        ctx.fill();
        // Glow
        const glow = ctx.createRadialGradient(cx, cy - 4, 4, cx, cy - 4, 28);
        glow.addColorStop(0, "rgba(251, 191, 36, 0.3)");
        glow.addColorStop(1, "rgba(251, 191, 36, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy - 4, 28, 0, Math.PI * 2);
        ctx.fill();
      } else if (dev === "fan") {
        // Fan body
        ctx.fillStyle = "#475569";
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fill();
        // Blades (animated rotation)
        const bladeAngle = timeRef.current * 4;
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 3;
        for (let i = 0; i < 3; i++) {
          const angle = bladeAngle + (i / 3) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + 16 * Math.cos(angle), cy + 16 * Math.sin(angle));
          ctx.stroke();
        }
        // Center hub
        ctx.fillStyle = "#334155";
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Motor
        ctx.fillStyle = "#475569";
        ctx.fillRect(cx - 16, cy - 12, 32, 24);
        // Shaft
        ctx.fillStyle = "#94a3b8";
        ctx.fillRect(cx + 14, cy - 3, 10, 6);
        // Spinning wheel
        const wheelAngle = timeRef.current * 6;
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx + 28, cy, 8, 0, Math.PI * 2);
        ctx.stroke();
        // Spokes
        for (let i = 0; i < 4; i++) {
          const angle = wheelAngle + (i / 4) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx + 28, cy);
          ctx.lineTo(cx + 28 + 8 * Math.cos(angle), cy + 8 * Math.sin(angle));
          ctx.stroke();
        }
      }

      // Label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(DEVICE_LABELS[dev], cx, cy + 36);
      ctx.textAlign = "left";
    },
    []
  );

  const drawOutput = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      dev: EnergyDevice,
      level: number
    ) => {
      const intensity = level / 100;

      if (dev === "lamp") {
        // Light rays
        ctx.strokeStyle = `rgba(251, 191, 36, ${0.3 + intensity * 0.5})`;
        ctx.lineWidth = 2;
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.moveTo(cx, cy - 10);
          ctx.lineTo(cx + i * 18, cy - 40);
          ctx.stroke();
        }
        // Light pool
        const pool = ctx.createRadialGradient(cx, cy - 30, 2, cx, cy - 30, 30);
        pool.addColorStop(0, `rgba(251, 191, 36, ${intensity * 0.4})`);
        pool.addColorStop(1, "rgba(251, 191, 36, 0)");
        ctx.fillStyle = pool;
        ctx.beginPath();
        ctx.arc(cx, cy - 30, 30, 0, Math.PI * 2);
        ctx.fill();
      } else if (dev === "fan") {
        // Air motion lines
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 + intensity * 0.5})`;
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
          const yOffset = (i - 1.5) * 10;
          const wavePhase = timeRef.current * 3 + i;
          ctx.beginPath();
          ctx.moveTo(cx - 20, cy + yOffset);
          for (let x = -20; x <= 20; x += 4) {
            ctx.lineTo(cx + x, cy + yOffset + 4 * Math.sin((x + wavePhase * 10) * 0.15));
          }
          ctx.stroke();
        }
      } else {
        // Motion arrows
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 + intensity * 0.5})`;
        ctx.lineWidth = 2.5;
        for (let i = 0; i < 3; i++) {
          const yOffset = (i - 1) * 12;
          const xOffset = Math.sin(timeRef.current * 4 + i) * 6;
          ctx.beginPath();
          ctx.moveTo(cx - 15 + xOffset, cy + yOffset);
          ctx.lineTo(cx + 5 + xOffset, cy + yOffset);
          ctx.stroke();
          // Arrowhead
          ctx.save();
          ctx.translate(cx + 5 + xOffset, cy + yOffset);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-5, -3);
          ctx.lineTo(-5, 3);
          ctx.closePath();
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fill();
          ctx.restore();
        }
      }

      // Output labels
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(output.primary, cx, cy + 36);
      ctx.textAlign = "left";
    },
    [output]
  );

  const drawFlowParticles = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      fromX: number,
      toX: number,
      cy: number,
      t: number,
      color: string,
      count = 6
    ) => {
      ctx.fillStyle = color;
      for (let i = 0; i < count; i++) {
        const progress = ((t * 0.8 + i / count) % 1);
        const x = fromX + (toX - fromX) * progress;
        const y = cy + 4 * Math.sin(progress * Math.PI * 4 + i);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    []
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, src: EnergySource, dev: EnergyDevice, level: number, t: number) => {
      ctx.clearRect(0, 0, width, height);

      const sourceX = width * 0.18;
      const deviceX = width * 0.5;
      const outputX = width * 0.82;
      const centerY = height * 0.42;

      // Flow arrows (background)
      ctx.strokeStyle = "#1a2332";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sourceX + 30, centerY);
      ctx.lineTo(deviceX - 30, centerY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(deviceX + 30, centerY);
      ctx.lineTo(outputX - 30, centerY);
      ctx.stroke();

      // Source
      drawSource(ctx, sourceX, centerY, src);

      // Device
      drawDevice(ctx, deviceX, centerY, dev);

      // Output
      drawOutput(ctx, outputX, centerY, dev, level);

      // Animated energy particles: source → device
      drawFlowParticles(ctx, sourceX + 30, deviceX - 30, centerY, t, "#34d399", 5);

      // Animated energy particles: device → output
      drawFlowParticles(ctx, deviceX + 30, outputX - 30, centerY, t, "#fbbf24", 5);

      // Conservation metrics panel
      const useful = Math.round(level * 0.6);
      const waste = Math.round(level * 0.4);

      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(`Total energy in: ${level} units`, 12, height - 48);
      ctx.fillStyle = "#34d399";
      ctx.fillText(`Useful output: ${useful} units`, 12, height - 30);
      ctx.fillStyle = "#f87171";
      ctx.fillText(`Lost as heat: ${waste} units`, 12, height - 12);

      // Conservation reminder
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Energy is conserved — it changes form", width - 12, height - 12);
      ctx.textAlign = "left";
    },
    [drawSource, drawDevice, drawOutput, drawFlowParticles]
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
      draw(ctx, rect.width, rect.height, source, device, energyLevel, timeRef.current);
    };

    resizeAndDraw();

    const animate = () => {
      timeRef.current += 0.016;
      const rect = canvas.getBoundingClientRect();
      draw(ctx, rect.width, rect.height, source, device, energyLevel, timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeAndDraw);
    return () => {
      window.removeEventListener("resize", resizeAndDraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, source, device, energyLevel]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: CANVAS_HEIGHT }}
        aria-label="Energy flow and transformation diagram"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Energy source</span>
            </label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {(["battery", "food", "sun"] as EnergySource[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSource(s)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: source === s ? "#38bdf8" : "#2a3548",
                    background: source === s ? "rgba(56, 189, 248, 0.15)" : "#111827",
                    color: source === s ? "#38bdf8" : "#8b9cb3",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontFamily: "inherit"
                  }}
                >
                  {SOURCE_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          <div className="physics-control-row">
            <label>
              <span>Device</span>
            </label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {(["lamp", "fan", "motor"] as EnergyDevice[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDevice(d)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: device === d ? "#38bdf8" : "#2a3548",
                    background: device === d ? "rgba(56, 189, 248, 0.15)" : "#111827",
                    color: device === d ? "#38bdf8" : "#8b9cb3",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontFamily: "inherit"
                  }}
                >
                  {DEVICE_LABELS[d]}
                </button>
              ))}
            </div>
          </div>
          <div className="physics-control-row">
            <label>
              <span>Energy amount</span>
              <output>{energyLevel} units</output>
            </label>
            <input
              type="range"
              min={20}
              max={100}
              step={10}
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
            />
          </div>
          <p className="physics-play-hint">
            Pick a source and device — watch energy flow and change form. Notice some energy always becomes heat.
          </p>
        </div>
      )}
    </div>
  );
}
