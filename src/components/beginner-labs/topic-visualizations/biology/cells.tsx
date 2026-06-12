/**
 * =============================================================================
 * CellsViz — Biology > Cells interactive diagram (learn + play)
 * =============================================================================
 *
 * Self-contained React visualization for the Cells topic. Renders a stylised
 * animal/plant cell with clickable organelle hotspots. In play mode, learners
 * toggle plant features and adjust metabolic activity; the readout responds in
 * real time and organelles pulse to match the activity level.
 *
 * DUPLICATION GUIDE:
 *   Keep the SVG + token + control pattern. Replace organelle data and the
 *   diagram geometry for other biology topics.
 * =============================================================================
 */

"use client";

import { useEffect, useMemo, useState } from "react";

const T = {
  bg: "#0a0e17",
  surface: "#111827",
  surface2: "#1a2332",
  border: "#2a3548",
  text: "#e8edf5",
  muted: "#8b9cb3",
  accent: "#2dd4bf",
  accent2: "#f472b6",
  warning: "#fbbf24",
  plant: "#a3e635",
  radius: 14,
  space1: 4,
  space2: 8,
  space3: 12,
  space4: 16,
  space5: 20,
  font: 'Inter, system-ui, sans-serif',
  mono: 'Consolas, Monaco, monospace',
} as const;

type Organelle = {
  id: string;
  label: string;
  short: string;
  metric: string;
  x: number;
  y: number;
  r: number;
  color: string;
};

const MEMBRANE = {
  id: "membrane",
  label: "Cell membrane",
  short: "Controls what enters and leaves the cell.",
  metric: "Permeability",
  cx: 300,
  cy: 200,
  rx: 170,
  ry: 115,
  color: T.accent,
} as const;

const CELL_WALL = {
  id: "cell-wall",
  label: "Cell wall",
  short: "Rigid outer layer that protects and supports plant cells.",
  metric: "Integrity",
  x: 80,
  y: 50,
  width: 440,
  height: 300,
  rx: 60,
  color: T.plant,
} as const;

const CENTRAL_VACUOLE = {
  id: "central-vacuole",
  label: "Central vacuole",
  short: "Large storage sac that helps keep plant cells rigid.",
  metric: "Turgor pressure",
  x: 300,
  y: 200,
  r: 75,
  color: T.accent,
} as const;

const ANIMAL_ORGANELLES: readonly Organelle[] = [
  {
    id: "nucleus",
    label: "Nucleus",
    short: "Holds the cell’s instructions (DNA).",
    metric: "DNA stability",
    x: 300,
    y: 200,
    r: 38,
    color: "#fbbf24",
  },
  {
    id: "mitochondrion-a",
    label: "Mitochondrion",
    short: "Powerhouse: turns nutrients into ATP.",
    metric: "ATP output",
    x: 380,
    y: 140,
    r: 22,
    color: "#f472b6",
  },
  {
    id: "mitochondrion-b",
    label: "Mitochondrion",
    short: "Powerhouse: turns nutrients into ATP.",
    metric: "ATP output",
    x: 220,
    y: 260,
    r: 22,
    color: "#f472b6",
  },
  {
    id: "er",
    label: "Endoplasmic reticulum",
    short: "Transport network for proteins and lipids.",
    metric: "Protein traffic",
    x: 370,
    y: 245,
    r: 28,
    color: "#a78bfa",
  },
  {
    id: "golgi",
    label: "Golgi apparatus",
    short: "Packages and ships cell materials.",
    metric: "Packaging rate",
    x: 215,
    y: 155,
    r: 24,
    color: "#fb923c",
  },
  {
    id: "lysosome",
    label: "Lysosome",
    short: "Breaks down waste and old cell parts.",
    metric: "Recycling rate",
    x: 255,
    y: 110,
    r: 12,
    color: "#f87171",
  },
  {
    id: "vacuole",
    label: "Vacuole",
    short: "Stores water, nutrients, and waste.",
    metric: "Storage level",
    x: 405,
    y: 275,
    r: 18,
    color: "#34d399",
  },
  {
    id: "ribosomes",
    label: "Ribosomes",
    short: "Tiny builders that make proteins.",
    metric: "Protein synthesis",
    x: 335,
    y: 145,
    r: 10,
    color: "#c084fc",
  },
];

const PLANT_ORGANELLES: readonly Organelle[] = [
  {
    id: "chloroplast-a",
    label: "Chloroplast",
    short: "Uses light to make sugar for the plant.",
    metric: "Glucose production",
    x: 160,
    y: 120,
    r: 20,
    color: T.plant,
  },
  {
    id: "chloroplast-b",
    label: "Chloroplast",
    short: "Uses light to make sugar for the plant.",
    metric: "Glucose production",
    x: 440,
    y: 280,
    r: 20,
    color: T.plant,
  },
];

export const cellsVizMeta = {
  id: "cells",
  subject: "biology",
  topic: "Cells",
  title: "Cell Explorer",
  description:
    "Explore an animal or plant cell by tapping organelle hotspots. Adjust metabolic activity to see organelles pulse and watch ATP output change in real time.",
  modes: ["learn", "play"] as const,
  accentColor: T.accent,
};

export type CellsVizProps = {
  interactive?: boolean;
};

export default function CellsViz({ interactive = false }: CellsVizProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [plantMode, setPlantMode] = useState(false);
  const [activity, setActivity] = useState(45);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setTime((t) => t + dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const visibleOrganelles = useMemo(
    () => (plantMode ? [...ANIMAL_ORGANELLES, ...PLANT_ORGANELLES] : ANIMAL_ORGANELLES),
    [plantMode]
  );

  const pulseFor = (r: number) => {
    const speed = 0.5 + (activity / 100) * 3;
    const amp = (activity / 100) * 5;
    return Math.sin(time * speed) * amp;
  };

  const readout = useMemo(() => {
    if (!activeId) {
      return {
        label: "No organelle selected",
        short: "Tap or hover a hotspot on the diagram to inspect it.",
        metricLabel: "Baseline activity",
        metricValue: `${activity}%`,
      };
    }

    if (activeId === MEMBRANE.id) {
      return {
        label: MEMBRANE.label,
        short: MEMBRANE.short,
        metricLabel: MEMBRANE.metric,
        metricValue: `${Math.round(40 + activity * 0.6)}%`,
      };
    }

    if (activeId === CELL_WALL.id) {
      return {
        label: CELL_WALL.label,
        short: CELL_WALL.short,
        metricLabel: CELL_WALL.metric,
        metricValue: "100%",
      };
    }

    if (activeId === CENTRAL_VACUOLE.id) {
      return {
        label: CENTRAL_VACUOLE.label,
        short: CENTRAL_VACUOLE.short,
        metricLabel: CENTRAL_VACUOLE.metric,
        metricValue: `${Math.round(50 + activity * 0.5)}%`,
      };
    }

    const org = visibleOrganelles.find((o) => o.id === activeId);
    if (!org) {
      return {
        label: "Unknown",
        short: "",
        metricLabel: "Activity",
        metricValue: `${activity}%`,
      };
    }

    let metricValue = `${activity}%`;
    if (activeId.startsWith("mitochondrion")) {
      metricValue = `${Math.round(activity * 1.5 + 20)} ATP/s`;
    } else if (activeId.startsWith("chloroplast")) {
      metricValue = `${Math.round(activity * 0.8)} glucose/s`;
    } else if (activeId === "ribosomes") {
      metricValue = `${Math.round(activity * 1.2)} units/s`;
    } else if (activeId === "lysosome") {
      metricValue = `${Math.round(activity)}%`;
    } else if (activeId === "nucleus") {
      metricValue = "Stable";
    }

    return {
      label: org.label,
      short: org.short,
      metricLabel: org.metric,
      metricValue,
    };
  }, [activeId, activity, visibleOrganelles]);

  const cellTypeLabel = plantMode ? "Plant cell" : "Animal cell";
  const atpReadout = `${Math.round(activity * 1.5 + 20)} ATP/s`;

  const panelBase: React.CSSProperties = {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    padding: T.space4,
  };

  const labelText: React.CSSProperties = {
    fontSize: "0.82rem",
    color: T.muted,
    marginBottom: T.space1,
  };

  const valueText: React.CSSProperties = {
    fontFamily: T.mono,
    color: T.accent,
    fontSize: "1.05rem",
    fontWeight: 600,
  };

  return (
    <div
      style={{
        fontFamily: T.font,
        color: T.text,
        background: T.bg,
        borderRadius: T.radius,
        border: `1px solid ${T.border}`,
        padding: T.space4,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: T.space4,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            flex: "1 1 360px",
            minWidth: 280,
            borderRadius: T.radius,
            border: `1px solid ${T.border}`,
            background: T.surface,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <svg
            viewBox="0 0 600 400"
            role="img"
            aria-label={`Interactive ${cellTypeLabel} diagram with organelle hotspots`}
            style={{ display: "block", width: "100%", height: "auto" }}
          >
            <defs>
              <filter id="cell-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x={0} y={0} width={600} height={400} fill={T.surface} />

            {plantMode && (
              <>
                <rect
                  x={CELL_WALL.x}
                  y={CELL_WALL.y}
                  width={CELL_WALL.width}
                  height={CELL_WALL.height}
                  rx={CELL_WALL.rx}
                  fill="none"
                  stroke={CELL_WALL.color}
                  strokeWidth={3 + pulseFor(8) * 0.2}
                  style={{ cursor: "pointer", transition: "stroke-width 0.1s" }}
                  onClick={() => setActiveId(CELL_WALL.id)}
                  onMouseEnter={() => setHoveredId(CELL_WALL.id)}
                  onMouseLeave={() => setHoveredId((h) => (h === CELL_WALL.id ? null : h))}
                />
                <circle
                  cx={CENTRAL_VACUOLE.x}
                  cy={CENTRAL_VACUOLE.y}
                  r={CENTRAL_VACUOLE.r + pulseFor(CENTRAL_VACUOLE.r) * 0.3}
                  fill={`${T.accent}14`}
                  stroke={CENTRAL_VACUOLE.color}
                  strokeWidth={1}
                  style={{ cursor: "pointer", transition: "r 0.1s" }}
                  onClick={() => setActiveId(CENTRAL_VACUOLE.id)}
                  onMouseEnter={() => setHoveredId(CENTRAL_VACUOLE.id)}
                  onMouseLeave={() => setHoveredId((h) => (h === CENTRAL_VACUOLE.id ? null : h))}
                />
              </>
            )}

            <ellipse
              cx={MEMBRANE.cx}
              cy={MEMBRANE.cy}
              rx={MEMBRANE.rx}
              ry={MEMBRANE.ry}
              fill={`${T.bg}cc`}
              stroke={MEMBRANE.color}
              strokeWidth={activeId === MEMBRANE.id || hoveredId === MEMBRANE.id ? 4 : 3}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveId(MEMBRANE.id)}
              onMouseEnter={() => setHoveredId(MEMBRANE.id)}
              onMouseLeave={() => setHoveredId((h) => (h === MEMBRANE.id ? null : h))}
            />

            {visibleOrganelles.map((org) => {
              const isActive = activeId === org.id;
              const isHovered = hoveredId === org.id;
              const pulse = pulseFor(org.r);
              const r = org.r + pulse * 0.3;
              const strokeWidth = isActive ? 3 : 2;
              const glow = isActive || isHovered;

              return (
                <g key={org.id}>
                  <circle
                    cx={org.x}
                    cy={org.y}
                    r={r}
                    fill={T.surface}
                    stroke={org.color}
                    strokeWidth={strokeWidth}
                    filter={glow ? "url(#cell-glow)" : undefined}
                    style={{ cursor: "pointer", transition: "r 0.1s" }}
                    onClick={() => setActiveId(org.id)}
                    onMouseEnter={() => setHoveredId(org.id)}
                    onMouseLeave={() => setHoveredId((h) => (h === org.id ? null : h))}
                  />
                  {(isActive || isHovered) && (
                    <g pointerEvents="none">
                      <text
                        x={org.x}
                        y={org.y - r - 10}
                        textAnchor="middle"
                        fill={T.text}
                        fontSize={12}
                        fontWeight={600}
                        stroke={T.bg}
                        strokeWidth={3}
                        paintOrder="stroke"
                      >
                        {org.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            <g pointerEvents="none">
              <text
                x={20}
                y={30}
                fill={T.muted}
                fontSize={12}
                fontWeight={600}
                letterSpacing={0.08}
                style={{ textTransform: "uppercase" }}
              >
                {cellTypeLabel}
              </text>
              <text x={20} y={52} fill={T.accent} fontSize={14} fontFamily={T.mono} fontWeight={600}>
                {atpReadout}
              </text>
            </g>
          </svg>
        </div>

        <div
          style={{
            flex: "0 0 260px",
            minWidth: 240,
            display: "flex",
            flexDirection: "column",
            gap: T.space4,
          }}
        >
          <div style={panelBase}>
            <p style={{ ...labelText, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
              Organelle readout
            </p>
            <div style={{ marginTop: T.space3 }}>
              <p style={labelText}>Selected</p>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: T.text }}>{readout.label}</p>
              <p style={{ margin: `${T.space2}px 0 0`, fontSize: "0.9rem", color: T.muted, lineHeight: 1.5 }}>
                {readout.short}
              </p>
            </div>
            <div
              style={{
                marginTop: T.space4,
                padding: T.space3,
                borderRadius: 10,
                background: T.surface2,
                border: `1px solid ${T.border}`,
              }}
            >
              <p style={labelText}>{readout.metricLabel}</p>
              <p style={valueText}>{readout.metricValue}</p>
            </div>
            <div
              style={{
                marginTop: T.space3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: T.space2,
              }}
            >
              <span style={labelText}>Cell type</span>
              <span style={{ fontSize: "0.85rem", color: T.text, fontWeight: 500 }}>{cellTypeLabel}</span>
            </div>
          </div>

          {interactive && (
            <div style={panelBase}>
              <p
                style={{
                  ...labelText,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  marginBottom: T.space3,
                }}
              >
                Controls
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: T.space3 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: T.space1 }}>
                  <label htmlFor="cell-activity" style={{ fontSize: "0.82rem", color: T.muted, display: "flex", justifyContent: "space-between" }}>
                    <span>Metabolic activity</span>
                    <output htmlFor="cell-activity" style={{ fontFamily: T.mono, color: T.accent }}>
                      {activity}%
                    </output>
                  </label>
                  <input
                    id="cell-activity"
                    type="range"
                    min={0}
                    max={100}
                    value={activity}
                    onChange={(e) => setActivity(Number(e.target.value))}
                    style={{ width: "100%", accentColor: T.accent }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setPlantMode((p) => !p)}
                  style={{
                    alignSelf: "flex-start",
                    padding: `${T.space2}px ${T.space4}px`,
                    borderRadius: 999,
                    border: `1px solid ${T.border}`,
                    background: plantMode ? T.plant : T.surface2,
                    color: plantMode ? T.bg : T.text,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "background 0.15s, color 0.15s, border-color 0.15s",
                  }}
                >
                  {plantMode ? "Switch to animal cell" : "Switch to plant cell"}
                </button>
              </div>

              <p
                style={{
                  margin: `${T.space3}px 0 0`,
                  fontSize: "0.82rem",
                  color: T.muted,
                  fontStyle: "italic",
                }}
              >
                Adjust activity to change the pulse. Tap any organelle to inspect it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
