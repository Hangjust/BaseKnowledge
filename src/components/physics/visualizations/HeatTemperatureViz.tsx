"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type HeatTemperatureVizProps = {
  interactive?: boolean;
};

export default function HeatTemperatureViz({ interactive = false }: HeatTemperatureVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);

  const [hotTemp, setHotTemp] = useState(80);
  const [coldTemp, setColdTemp] = useState(20);
  const [showCompare, setShowCompare] = useState(false);

  const drawThermometer = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, temp: number, label: string, color: string) => {
      const tubeW = 14;
      const tubeH = 120;
      const bulbR = 12;

      // Tube background
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.roundRect(x - tubeW / 2, y - tubeH, tubeW, tubeH, 4);
      ctx.fill();
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Mercury / liquid
      const fillRatio = Math.max(0, Math.min(1, temp / 100));
      const fillH = tubeH * fillRatio;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x - tubeW / 2 + 2, y - fillH, tubeW - 4, fillH, 3);
      ctx.fill();

      // Bulb
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y + bulbR - 2, bulbR, 0, Math.PI * 2);
      ctx.fill();

      // Ticks
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const tickY = y - (i / 5) * tubeH;
        ctx.beginPath();
        ctx.moveTo(x + tubeW / 2, tickY);
        ctx.lineTo(x + tubeW / 2 + 6, tickY);
        ctx.stroke();
        ctx.fillStyle = "#8b9cb3";
        ctx.font = "9px Inter, sans-serif";
        ctx.fillText(`${i * 20}°`, x + tubeW / 2 + 10, tickY + 3);
      }

      // Label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + bulbR + 16);
      ctx.fillText(`${temp}°C`, x, y + bulbR + 30);
      ctx.textAlign = "left";
    },
    []
  );

  const drawObject = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, temp: number, label: string) => {
      const r = 28;
      const intensity = temp / 100;

      // Glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.8);
      if (temp > 50) {
        glow.addColorStop(0, `rgba(249, 115, 22, ${0.2 + intensity * 0.3})`);
        glow.addColorStop(1, "rgba(249, 115, 22, 0)");
      } else {
        glow.addColorStop(0, `rgba(56, 189, 248, ${0.2 + (1 - intensity) * 0.3})`);
        glow.addColorStop(1, "rgba(56, 189, 248, 0)");
      }
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = temp > 50 ? `rgba(249, 115, 22, ${0.4 + intensity * 0.4})` : `rgba(56, 189, 248, ${0.4 + (1 - intensity) * 0.4})`;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = temp > 50 ? "#f97316" : "#38bdf8";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Particles (faster = hotter)
      const particleCount = Math.floor(4 + intensity * 8);
      const speed = 0.5 + intensity * 2;
      ctx.fillStyle = temp > 50 ? "rgba(251, 191, 36, 0.6)" : "rgba(56, 189, 248, 0.5)";
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + timeRef.current * speed * (i % 2 === 0 ? 1 : -1);
        const dist = r * 0.3 + Math.sin(timeRef.current * speed + i) * r * 0.25;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, cx, cy + r + 16);
      ctx.textAlign = "left";
    },
    []
  );

  const drawHeatArrows = useCallback(
    (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, tempDiff: number) => {
      if (tempDiff <= 0) return;

      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;
      const arrowCount = Math.min(5, Math.max(1, Math.floor(tempDiff / 15)));
      const alpha = Math.min(1, tempDiff / 60);

      ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`;
      ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
      ctx.lineWidth = 2;

      for (let i = 0; i < arrowCount; i++) {
        const offset = (i - (arrowCount - 1) / 2) * 10;
        const ay = midY + offset;
        const progress = (timeRef.current * 0.8 + i / arrowCount) % 1;
        const ax = fromX + 30 + (toX - fromX - 60) * progress;

        if (ax > fromX + 30 && ax < toX - 30) {
          // Arrow body
          ctx.beginPath();
          ctx.moveTo(ax - 6, ay);
          ctx.lineTo(ax + 2, ay);
          ctx.stroke();

          // Arrowhead
          ctx.beginPath();
          ctx.moveTo(ax + 2, ay);
          ctx.lineTo(ax - 2, ay - 3);
          ctx.lineTo(ax - 2, ay + 3);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Label
      ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
      ctx.font = "10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Heat flows", midX, midY - 18);
      ctx.fillText("hot → cold", midX, midY - 6);
      ctx.textAlign = "left";
    },
    []
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, hot: number, cold: number, compare: boolean) => {
      ctx.clearRect(0, 0, width, height);

      const hotX = width * 0.22;
      const coldX = width * 0.78;
      const objY = height * 0.38;
      const thermY = height * 0.82;

      // Background panel
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.roundRect(8, 8, width - 16, height - 16, 10);
      ctx.fill();

      // Objects
      drawObject(ctx, hotX, objY, hot, "Hot object");
      drawObject(ctx, coldX, objY, cold, "Cold object");

      // Heat flow arrows
      const tempDiff = hot - cold;
      drawHeatArrows(ctx, hotX, objY, coldX, objY, tempDiff);

      // Thermometers
      drawThermometer(ctx, hotX, thermY, hot, "Hot", "#f97316");
      drawThermometer(ctx, coldX, thermY, cold, "Cold", "#38bdf8");

      // Center thermometer (ambient / mixed)
      if (compare) {
        const mixedTemp = Math.round((hot + cold) / 2);
        drawThermometer(ctx, width * 0.5, thermY, mixedTemp, "Mixed", "#94a3b8");
      }

      // Info panel
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(`ΔT = ${tempDiff}°C`, 14, 24);
      if (tempDiff > 0) {
        ctx.fillStyle = "#fbbf24";
        ctx.fillText("Heat energy moving", 14, 42);
      } else if (tempDiff === 0) {
        ctx.fillStyle = "#34d399";
        ctx.fillText("Thermal equilibrium", 14, 42);
      } else {
        ctx.fillStyle = "#38bdf8";
        ctx.fillText("Heat would flow the other way", 14, 42);
      }

      // Key concept
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Temperature ≠ Heat energy", width - 14, 24);
      ctx.fillText("Heat flows from warm to cool", width - 14, 42);
      ctx.textAlign = "left";
    },
    [drawObject, drawThermometer, drawHeatArrows]
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
      draw(ctx, rect.width, rect.height, hotTemp, coldTemp, showCompare);
    };

    resizeAndDraw();

    const animate = () => {
      timeRef.current += 0.016;
      const rect = canvas.getBoundingClientRect();
      draw(ctx, rect.width, rect.height, hotTemp, coldTemp, showCompare);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeAndDraw);
    return () => {
      window.removeEventListener("resize", resizeAndDraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, hotTemp, coldTemp, showCompare]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: 340 }}
        aria-label="Heat and temperature visualization with hot and cold objects, thermometers, and heat flow arrows"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Hot object temperature</span>
              <output>{hotTemp}°C</output>
            </label>
            <input
              type="range"
              min={30}
              max={100}
              value={hotTemp}
              onChange={(e) => setHotTemp(Number(e.target.value))}
            />
          </div>

          <div className="physics-control-row">
            <label>
              <span>Cold object temperature</span>
              <output>{coldTemp}°C</output>
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={coldTemp}
              onChange={(e) => setColdTemp(Number(e.target.value))}
            />
          </div>

          <div className="physics-control-row">
            <label>
              <span>Show mixed temperature</span>
              <output>{showCompare ? "On" : "Off"}</output>
            </label>
            <button
              type="button"
              className={`physics-btn ${showCompare ? "physics-btn-primary" : "physics-btn-secondary"}`}
              onClick={() => setShowCompare((s) => !s)}
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              {showCompare ? "Hide mix" : "Show mix"}
            </button>
          </div>

          <p className="physics-play-hint">
            Slide the temperatures — watch the heat flow arrows appear when there is a difference.
            Higher temperature means faster particle motion. Toggle Show mix to see the average.
          </p>
        </div>
      )}
    </div>
  );
}
