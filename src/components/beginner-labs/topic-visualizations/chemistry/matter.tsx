"use client";

/**
 * =============================================================================
 * MatterViz — Chemistry > Matter particle sandbox
 * =============================================================================
 *
 * Self-contained canvas simulation for solid / liquid / gas states.
 * A temperature slider drives particle motion and spacing. The readout shows
 * the current state, average motion, and average particle spacing.
 *
 * EXPORT:
 *   - default React component
 *   - metadata object for beginner-labs registry
 * =============================================================================
 */

import { useCallback, useEffect, useRef, useState } from "react";

export type MatterState = "solid" | "liquid" | "gas";

export type TopicVisualizationMetadata = {
  id: string;
  subject: string;
  topic: string;
  title: string;
  description: string;
  dependencies: string[];
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX?: number;
  baseY?: number;
};

const PARTICLE_COUNT = 48;
const PARTICLE_RADIUS = 5;
const PADDING = 24;

export const metadata: TopicVisualizationMetadata = {
  id: "chemistry-matter",
  subject: "chemistry",
  topic: "matter",
  title: "States of Matter Sandbox",
  description:
    "Heat or cool a sample to watch particles settle into a lattice, flow like a liquid, or spread out as a gas.",
  dependencies: [],
};

function stateFromTemperature(temperature: number): MatterState {
  if (temperature < 33) return "solid";
  if (temperature < 66) return "liquid";
  return "gas";
}

function particleColor(state: MatterState): string {
  switch (state) {
    case "solid":
      return "#38bdf8"; // ice blue
    case "liquid":
      return "#22d3ee"; // water cyan
    case "gas":
      return "#f97316"; // steam amber
  }
}

function initParticles(state: MatterState, width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  const left = PADDING + PARTICLE_RADIUS;
  const right = width - PADDING - PARTICLE_RADIUS;
  const top = PADDING + PARTICLE_RADIUS;
  const bottom = height - PADDING - PARTICLE_RADIUS;

  if (state === "solid") {
    const cols = 8;
    const rows = Math.ceil(PARTICLE_COUNT / cols);
    const areaWidth = right - left;
    const areaHeight = (bottom - top) * 0.45;
    const startX = left + areaWidth * 0.2;
    const startY = top + areaHeight * 0.4;
    const stepX = areaWidth * 0.6 / cols;
    const stepY = areaHeight / rows;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * stepX + stepX / 2;
      const y = startY + row * stepY + stepY / 2;
      particles.push({ x, y, vx: 0, vy: 0, baseX: x, baseY: y });
    }
  } else if (state === "liquid") {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = left + Math.random() * (right - left);
      const y = top + (bottom - top) * 0.5 + Math.random() * ((bottom - top) * 0.4);
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }
  } else {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = left + Math.random() * (right - left);
      const y = top + Math.random() * (bottom - top);
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random();
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      });
    }
  }

  return particles;
}

function updateParticles(
  particles: Particle[],
  state: MatterState,
  temperature: number,
  width: number,
  height: number
) {
  const left = PADDING + PARTICLE_RADIUS;
  const right = width - PADDING - PARTICLE_RADIUS;
  const top = PADDING + PARTICLE_RADIUS;
  const bottom = height - PADDING - PARTICLE_RADIUS;

  if (state === "solid") {
    const jitter = 0.05 + temperature * 0.025;
    for (const p of particles) {
      const targetX = p.baseX ?? p.x;
      const targetY = p.baseY ?? p.y;
      p.vx += (targetX - p.x) * 0.06 + (Math.random() - 0.5) * jitter;
      p.vy += (targetY - p.y) * 0.06 + (Math.random() - 0.5) * jitter;
      p.vx *= 0.82;
      p.vy *= 0.82;
      p.x += p.vx;
      p.y += p.vy;
    }
  } else if (state === "liquid") {
    const speedBase = 0.3 + temperature * 0.06;
    const gravity = 0.04;
    for (const p of particles) {
      p.vy += gravity;
      p.vx += (Math.random() - 0.5) * 0.15;
      p.vy += (Math.random() - 0.5) * 0.1;

      const current = Math.hypot(p.vx, p.vy);
      if (current < speedBase * 0.4) {
        p.vx += (Math.random() - 0.5) * 0.3;
        p.vy += (Math.random() - 0.5) * 0.3;
      } else if (current > speedBase * 1.8) {
        p.vx *= 0.96;
        p.vy *= 0.96;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < left) {
        p.x = left;
        p.vx *= -0.7;
      } else if (p.x > right) {
        p.x = right;
        p.vx *= -0.7;
      }
      if (p.y > bottom) {
        p.y = bottom;
        p.vy *= -0.5;
      } else if (p.y < top) {
        p.y = top;
        p.vy *= -0.7;
      }
    }
  } else {
    const speedBase = 0.6 + temperature * 0.09;
    for (const p of particles) {
      const current = Math.hypot(p.vx, p.vy);
      if (current < speedBase * 0.5) {
        p.vx += (Math.random() - 0.5) * 0.4;
        p.vy += (Math.random() - 0.5) * 0.4;
      } else if (current > speedBase * 1.6) {
        p.vx *= 0.98;
        p.vy *= 0.98;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < left) {
        p.x = left;
        p.vx = Math.abs(p.vx) * 0.9;
      } else if (p.x > right) {
        p.x = right;
        p.vx = -Math.abs(p.vx) * 0.9;
      }
      if (p.y < top) {
        p.y = top;
        p.vy = Math.abs(p.vy) * 0.9;
      } else if (p.y > bottom) {
        p.y = bottom;
        p.vy = -Math.abs(p.vy) * 0.9;
      }
    }
  }
}

function computeMetrics(particles: Particle[]) {
  let totalSpeed = 0;
  let totalNearest = 0;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    totalSpeed += Math.hypot(p.vx, p.vy);

    let nearest = Infinity;
    for (let j = 0; j < particles.length; j++) {
      if (i === j) continue;
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);
      if (dist < nearest) nearest = dist;
    }
    if (nearest !== Infinity) totalNearest += nearest;
  }

  const motion = particles.length ? (totalSpeed / particles.length) * 60 : 0; // px/s
  const spacing = particles.length ? totalNearest / particles.length : 0;
  return { motion, spacing };
}

export default function MatterViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperature, setTemperature] = useState(50);
  const state = stateFromTemperature(temperature);

  const [motion, setMotion] = useState(0);
  const [spacing, setSpacing] = useState(0);

  const particlesRef = useRef<Particle[]>([]);
  const stateRef = useRef<MatterState>(state);
  const animRef = useRef(0);
  const frameCountRef = useRef(0);

  // Re-initialize particles when the matter state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (stateRef.current !== state || particlesRef.current.length === 0) {
      particlesRef.current = initParticles(state, rect.width, rect.height);
      stateRef.current = state;
    }
  }, [state]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = "#070b12";
      ctx.fillRect(0, 0, width, height);

      // Container outline
      ctx.strokeStyle = "#2a3548";
      ctx.lineWidth = 2;
      ctx.strokeRect(PADDING, PADDING, width - PADDING * 2, height - PADDING * 2);

      const particles = particlesRef.current;
      updateParticles(particles, state, temperature, width, height);

      const color = particleColor(state);

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Canvas overlay labels
      ctx.fillStyle = "#8b9cb3";
      ctx.font = '12px Inter, ui-sans-serif, system-ui, sans-serif';
      ctx.fillText("Particle view", PADDING + 12, PADDING + 22);
      ctx.fillText(`${temperature} K`, width - PADDING - 50, PADDING + 22);

      // Throttle metric updates to avoid React re-render every frame
      frameCountRef.current += 1;
      if (frameCountRef.current % 6 === 0) {
        const { motion: m, spacing: s } = computeMetrics(particles);
        setMotion(m);
        setSpacing(s);
      }
    },
    [state, temperature]
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
    };

    resize();

    const loop = () => {
      const rect = canvas.getBoundingClientRect();
      draw(ctx, rect.width, rect.height);
      animRef.current = requestAnimationFrame(loop);
    };

    loop();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <div className="matter-root">
      <div className="matter-panel">
        <canvas
          ref={canvasRef}
          className="matter-canvas"
          style={{ height: 320 }}
          aria-label="States of matter particle simulation"
        />

        <div className="matter-controls">
          <div className="matter-control-row">
            <label htmlFor="matter-temp">
              <span>Temperature</span>
              <output>{temperature} K</output>
            </label>
            <input
              id="matter-temp"
              type="range"
              min={0}
              max={100}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
            />
          </div>

          <div className="matter-readouts">
            <div className="matter-readout">
              <span className="matter-readout-label">State</span>
              <span className="matter-readout-value state">{state}</span>
            </div>
            <div className="matter-readout">
              <span className="matter-readout-label">Motion</span>
              <span className="matter-readout-value">{motion.toFixed(1)} px/s</span>
            </div>
            <div className="matter-readout">
              <span className="matter-readout-label">Spacing</span>
              <span className="matter-readout-value">{spacing.toFixed(1)} px</span>
            </div>
          </div>

          <p className="matter-hint">
            Drag the slider to heat or cool the sample. Watch the particles settle
            into a lattice, flow together, or fill the container.
          </p>
        </div>
      </div>

      <style jsx>{`
        .matter-root {
          --chem-bg: #0a0e17;
          --chem-surface: #111827;
          --chem-border: #2a3548;
          --chem-text: #e8edf5;
          --chem-muted: #8b9cb3;
          --chem-accent: #f59e0b;
          --chem-radius: 14px;
          --chem-mono: "Consolas", "Monaco", monospace;

          color: var(--chem-text);
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        .matter-panel {
          background: var(--chem-surface);
          border: 1px solid var(--chem-border);
          border-radius: var(--chem-radius);
          padding: 16px;
        }

        .matter-canvas {
          width: 100%;
          height: 320px;
          border-radius: 10px;
          background: #070b12;
          display: block;
        }

        .matter-controls {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }

        .matter-control-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .matter-control-row label {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--chem-muted);
          font-weight: 500;
        }

        .matter-control-row input[type="range"] {
          width: 100%;
          accent-color: var(--chem-accent);
        }

        .matter-control-row output {
          font-family: var(--chem-mono);
          color: var(--chem-accent);
          font-weight: 600;
        }

        .matter-readouts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .matter-readout {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: #070b12;
          border: 1px solid var(--chem-border);
          border-radius: 10px;
        }

        .matter-readout-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--chem-muted);
        }

        .matter-readout-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--chem-text);
        }

        .matter-readout-value.state {
          color: var(--chem-accent);
          text-transform: capitalize;
        }

        .matter-hint {
          margin: 0;
          font-size: 0.82rem;
          color: var(--chem-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
