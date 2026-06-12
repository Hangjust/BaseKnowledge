"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SoundWaveVizProps = {
  interactive?: boolean;
};

export default function SoundWaveViz({ interactive = false }: SoundWaveVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);

  const [frequency, setFrequency] = useState(3);
  const [amplitude, setAmplitude] = useState(40);
  const [sourceType, setSourceType] = useState<"string" | "drum">("string");

  const drawStringSource = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, amp: number, freq: number, t: number) => {
      // Guitar body outline
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 40, 30, 20, 0, 0, Math.PI * 2);
      ctx.stroke();

      // String anchor points
      const stringLeft = cx - 50;
      const stringRight = cx + 50;
      const stringY = cy;

      // Vibrating string
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(stringLeft, stringY);

      const segments = 40;
      for (let i = 0; i <= segments; i++) {
        const x = stringLeft + (stringRight - stringLeft) * (i / segments);
        const normalizedX = (i / segments) * Math.PI;
        const vibration = Math.sin(normalizedX * freq - t * 4) * amp * Math.sin(normalizedX);
        ctx.lineTo(x, stringY + vibration);
      }
      ctx.stroke();

      // String endpoints
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.arc(stringLeft, stringY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(stringRight, stringY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Guitar string", cx, cy + 72);
      ctx.textAlign = "left";
    },
    []
  );

  const drawDrumSource = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, amp: number, freq: number, t: number) => {
      // Drum body
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 36, 28, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Drum head vibration
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 1.5;
      const vibration = Math.sin(t * freq * 2) * amp * 0.3;
      ctx.beginPath();
      ctx.ellipse(cx, cy + vibration, 32, 24, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Drum head fill
      ctx.fillStyle = "rgba(251, 191, 36, 0.08)";
      ctx.beginPath();
      ctx.ellipse(cx, cy + vibration, 32, 24, 0, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Drum head", cx, cy + 44);
      ctx.textAlign = "left";
    },
    []
  );

  const drawWaves = useCallback(
    (ctx: CanvasRenderingContext2D, startX: number, cy: number, amp: number, freq: number, t: number, width: number) => {
      // Propagating wave lines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1.5;

      for (let wave = 0; wave < 3; wave++) {
        const waveOffset = wave * 20;
        ctx.beginPath();
        for (let x = 0; x < width - startX - 20; x += 2) {
          const worldX = startX + 20 + x;
          const phase = (x * 0.05 * freq) - t * 3 + wave * 1.5;
          const decay = Math.max(0, 1 - x / (width * 0.5));
          const y = cy + Math.sin(phase) * amp * decay * 0.6 + waveOffset * 0.3;
          if (x === 0) ctx.moveTo(worldX, y);
          else ctx.lineTo(worldX, y);
        }
        ctx.stroke();
      }

      // Wave front circles (expanding)
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const radius = 20 + i * 25 + Math.sin(t * 2 + i) * 5;
        ctx.beginPath();
        ctx.arc(startX, cy, radius, -0.3, 0.3);
        ctx.stroke();
      }
    },
    []
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, freq: number, amp: number, src: "string" | "drum", t: number) => {
      ctx.clearRect(0, 0, width, height);

      const sourceX = width * 0.22;
      const centerY = height * 0.5;

      // Background panel
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.roundRect(8, 8, width - 16, height - 16, 10);
      ctx.fill();

      // Source
      if (src === "string") {
        drawStringSource(ctx, sourceX, centerY, amp, freq, t);
      } else {
        drawDrumSource(ctx, sourceX, centerY, amp, freq, t);
      }

      // Waves
      drawWaves(ctx, sourceX, centerY, amp, freq, t, width);

      // Wave graph (bottom)
      const graphTop = height * 0.78;
      const graphH = height * 0.16;
      const graphLeft = width * 0.1;
      const graphRight = width * 0.9;

      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.roundRect(graphLeft, graphTop, graphRight - graphLeft, graphH, 6);
      ctx.fill();
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Graph axes
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(graphLeft, graphTop + graphH / 2);
      ctx.lineTo(graphRight, graphTop + graphH / 2);
      ctx.stroke();

      // Waveform on graph
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= graphRight - graphLeft; x += 2) {
        const phase = (x * 0.02 * freq) - t * 4;
        const y = graphTop + graphH / 2 + Math.sin(phase) * Math.min(amp * 0.4, graphH * 0.4);
        if (x === 0) ctx.moveTo(graphLeft + x, y);
        else ctx.lineTo(graphLeft + x, y);
      }
      ctx.stroke();

      // Graph labels
      ctx.fillStyle = "#64748b";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText("Amplitude", graphLeft + 4, graphTop + 12);
      ctx.fillText("Time →", graphRight - 36, graphTop + graphH - 4);

      // Info panel
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(`Frequency: ${freq.toFixed(1)}`, 14, 24);
      ctx.fillText(`Amplitude: ${amp.toFixed(0)}`, 14, 42);

      // Pitch / loudness labels
      const pitchLabel = freq < 2 ? "Low pitch" : freq < 5 ? "Medium pitch" : "High pitch";
      const loudLabel = amp < 25 ? "Quiet" : amp < 60 ? "Medium" : "Loud";

      ctx.fillStyle = "#fbbf24";
      ctx.fillText(pitchLabel, 14, 60);
      ctx.fillStyle = "#34d399";
      ctx.fillText(loudLabel, 14, 78);

      // Key concept
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Fast vibration = high pitch", width - 14, 24);
      ctx.fillText("Strong vibration = loud sound", width - 14, 42);
      ctx.textAlign = "left";
    },
    [drawStringSource, drawDrumSource, drawWaves]
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
      draw(ctx, rect.width, rect.height, frequency, amplitude, sourceType, timeRef.current);
    };

    resizeAndDraw();

    const animate = () => {
      timeRef.current += 0.016;
      const rect = canvas.getBoundingClientRect();
      draw(ctx, rect.width, rect.height, frequency, amplitude, sourceType, timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeAndDraw);
    return () => {
      window.removeEventListener("resize", resizeAndDraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, frequency, amplitude, sourceType]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: 340 }}
        aria-label="Sound wave visualization with vibrating source, propagating waves, and waveform graph"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Pitch (frequency)</span>
              <output>{frequency.toFixed(1)}</output>
            </label>
            <input
              type="range"
              min={1}
              max={8}
              step={0.5}
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
            />
          </div>

          <div className="physics-control-row">
            <label>
              <span>Loudness (amplitude)</span>
              <output>{amplitude.toFixed(0)}</output>
            </label>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
            />
          </div>

          <div className="physics-control-row">
            <label>
              <span>Sound source</span>
              <output>{sourceType === "string" ? "Guitar string" : "Drum"}</output>
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className={`physics-btn ${sourceType === "string" ? "physics-btn-primary" : "physics-btn-secondary"}`}
                onClick={() => setSourceType("string")}
                style={{ padding: "6px 14px", fontSize: "0.82rem" }}
              >
                Guitar string
              </button>
              <button
                type="button"
                className={`physics-btn ${sourceType === "drum" ? "physics-btn-primary" : "physics-btn-secondary"}`}
                onClick={() => setSourceType("drum")}
                style={{ padding: "6px 14px", fontSize: "0.82rem" }}
              >
                Drum
              </button>
            </div>
          </div>

          <p className="physics-play-hint">
            Change pitch to make the waves closer or farther apart. Change loudness to make the waves taller or shorter.
            Higher frequency = higher pitch. Larger amplitude = louder sound.
          </p>
        </div>
      )}
    </div>
  );
}
