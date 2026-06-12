/**
 * =============================================================================
 * AcidsAndBasesViz — Chemistry pH indicator sandbox (learn + play)
 * =============================================================================
 *
 * Interactive pH exploration with universal indicator color animation.
 * Users drag a pH slider or pick household items to see the beaker change color
 * and read acid / neutral / base classification.
 *
 * Self-contained — no external dependencies beyond React.
 * =============================================================================
 */

"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const meta = {
  topic: "acids-and-bases",
  subject: "chemistry",
  title: "Acids and Bases",
  description:
    "Explore the pH scale with a universal indicator simulation. Drag the slider or pick household items to see color changes and classify substances as acid, neutral, or base.",
  modes: ["learn", "play"],
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Classification = "acid" | "neutral" | "base";

type HouseholdItem = {
  name: string;
  icon: string;
  ph: number;
  category: Classification;
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const HOUSEHOLD_ITEMS: HouseholdItem[] = [
  { name: "Lemon juice", icon: "🍋", ph: 2.0, category: "acid" },
  { name: "Vinegar", icon: "🍶", ph: 3.0, category: "acid" },
  { name: "Orange juice", icon: "🍊", ph: 3.5, category: "acid" },
  { name: "Tomato", icon: "🍅", ph: 4.5, category: "acid" },
  { name: "Coffee", icon: "☕", ph: 5.0, category: "acid" },
  { name: "Milk", icon: "🥛", ph: 6.5, category: "acid" },
  { name: "Pure water", icon: "💧", ph: 7.0, category: "neutral" },
  { name: "Blood", icon: "🩸", ph: 7.4, category: "base" },
  { name: "Baking soda", icon: "🧂", ph: 9.0, category: "base" },
  { name: "Soap", icon: "🧼", ph: 10.0, category: "base" },
  { name: "Ammonia", icon: "🧴", ph: 11.5, category: "base" },
  { name: "Bleach", icon: "🧪", ph: 13.0, category: "base" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function classifyPh(ph: number): Classification {
  if (Math.abs(ph - 7) <= 0.05) return "neutral";
  if (ph < 7) return "acid";
  return "base";
}

function phToIndicatorColor(ph: number): string {
  // Universal indicator approximated as a piecewise linear gradient
  if (ph <= 2) return "#dc2626";
  if (ph <= 3) return "#ea580c";
  if (ph <= 4) return "#f97316";
  if (ph <= 5) return "#f59e0b";
  if (ph <= 6) return "#eab308";
  if (ph <= 7) return "#84cc16";
  if (ph <= 8) return "#22c55e";
  if (ph <= 9) return "#06b6d4";
  if (ph <= 10) return "#3b82f6";
  if (ph <= 11) return "#6366f1";
  if (ph <= 12) return "#8b5cf6";
  return "#a855f7";
}

function phToGlowColor(ph: number): string {
  const base = phToIndicatorColor(ph);
  return base + "44"; // 27 % opacity
}

function categoryLabel(c: Classification): string {
  switch (c) {
    case "acid":
      return "Acid";
    case "neutral":
      return "Neutral";
    case "base":
      return "Base";
  }
}

function categoryColor(c: Classification): string {
  switch (c) {
    case "acid":
      return "#f87171";
    case "neutral":
      return "#34d399";
    case "base":
      return "#818cf8";
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AcidsAndBasesViz() {
  const [ph, setPh] = useState<number>(7);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const classification = classifyPh(ph);
  const indicatorColor = phToIndicatorColor(ph);
  const glowColor = phToGlowColor(ph);

  const scaleMarkers = useMemo(() => {
    const markers: { value: number; label: string }[] = [];
    for (let i = 0; i <= 14; i += 1) {
      markers.push({ value: i, label: String(i) });
    }
    return markers;
  }, []);

  const handlePhChange = (value: number) => {
    setPh(value);
    // Deselect household item if user manually drifts away
    if (selectedItem) {
      const item = HOUSEHOLD_ITEMS.find((i) => i.name === selectedItem);
      if (item && Math.abs(item.ph - value) > 0.25) {
        setSelectedItem(null);
      }
    }
  };

  const handleItemClick = (item: HouseholdItem) => {
    setPh(item.ph);
    setSelectedItem(item.name);
  };

  return (
    <div
      style={{
        fontFamily:
          '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#e8edf5",
        background: "#0a0e17",
        borderRadius: 14,
        border: "1px solid #2a3548",
        padding: 24,
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            margin: "0 0 6px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#38bdf8",
          }}
        >
          Chemistry &middot; Acids and Bases
        </p>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          pH Indicator Sandbox
        </h2>
        <p
          style={{
            margin: "8px 0 0",
            color: "#8b9cb3",
            fontSize: "0.95rem",
            lineHeight: 1.55,
            maxWidth: 560,
          }}
        >
          Drag the slider to change pH, or pick a household item. Watch the
          universal indicator change colour and classify each substance.
        </p>
      </div>

      {/* Beaker + Readouts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 24,
        }}
      >
        {/* Beaker */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#111827",
            borderRadius: 14,
            border: "1px solid #2a3548",
            padding: 24,
            minHeight: 220,
          }}
        >
          {/* Flask shape using CSS */}
          <div
            style={{
              position: "relative",
              width: 120,
              height: 160,
            }}
          >
            {/* Neck */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 32,
                height: 50,
                borderLeft: "2px solid #475569",
                borderRight: "2px solid #475569",
                borderTop: "2px solid #475569",
                borderRadius: "4px 4px 0 0",
                background: "transparent",
              }}
            />
            {/* Bulb */}
            <div
              style={{
                position: "absolute",
                top: 48,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 112,
                borderRadius: "50% 50% 16px 16px",
                border: "2px solid #475569",
                background: "transparent",
                overflow: "hidden",
              }}
            >
              {/* Liquid */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "85%",
                  background: indicatorColor,
                  boxShadow: `inset 0 0 40px ${glowColor}`,
                  transition: "background 0.35s ease, box-shadow 0.35s ease",
                }}
              />
              {/* Surface reflection */}
              <div
                style={{
                  position: "absolute",
                  top: "18%",
                  left: "15%",
                  width: "25%",
                  height: "8%",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.15)",
                }}
              />
            </div>
            {/* pH bubble */}
            <div
              style={{
                position: "absolute",
                top: 68,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "4px 12px",
                borderRadius: 999,
                background: "rgba(10,14,23,0.85)",
                border: "1px solid #2a3548",
                fontFamily:
                  '"Consolas", "Monaco", monospace',
                fontSize: "0.9rem",
                fontWeight: 700,
                color: indicatorColor,
                transition: "color 0.35s ease",
                zIndex: 2,
              }}
            >
              pH {ph.toFixed(1)}
            </div>
          </div>

          {/* Classification badge */}
          <div
            style={{
              marginTop: 16,
              padding: "6px 16px",
              borderRadius: 999,
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              background: `${categoryColor(classification)}22`,
              color: categoryColor(classification),
              border: `1px solid ${categoryColor(classification)}44`,
              transition: "all 0.35s ease",
            }}
          >
            {categoryLabel(classification)}
          </div>
        </div>

        {/* Readouts */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "#111827",
            borderRadius: 14,
            border: "1px solid #2a3548",
            padding: 20,
          }}
        >
          <h3
            style={{
              margin: "0 0 4px",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#38bdf8",
            }}
          >
            Readouts
          </h3>

          <ReadoutRow label="pH value" value={ph.toFixed(1)} />
          <ReadoutRow label="Category" value={categoryLabel(classification)} />
          <ReadoutRow
            label="Hydronium"
            value={`10^-${ph.toFixed(1)} mol/L`}
          />
          <ReadoutRow
            label="[H+]"
            value={`${Math.pow(10, -ph).toExponential(1)} M`}
          />

          <div
            style={{
              marginTop: "auto",
              padding: 12,
              borderRadius: 10,
              background: "#1a2332",
              fontSize: "0.82rem",
              lineHeight: 1.5,
              color: "#8b9cb3",
            }}
          >
            <strong style={{ color: "#e8edf5" }}>Safety tip:</strong> Never
            taste unknown substances to test acidity. Use indicators or pH paper
            instead.
          </div>
        </div>
      </div>

      {/* pH Slider */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <label
            style={{
              fontSize: "0.82rem",
              color: "#8b9cb3",
              fontWeight: 500,
            }}
          >
            pH scale
          </label>
          <output
            style={{
              fontFamily: '"Consolas", "Monaco", monospace',
              color: indicatorColor,
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: "color 0.35s ease",
            }}
          >
            {ph.toFixed(1)}
          </output>
        </div>

        <input
          type="range"
          min={0}
          max={14}
          step={0.1}
          value={ph}
          onChange={(e) => handlePhChange(Number(e.target.value))}
          style={{
            width: "100%",
            accentColor: indicatorColor,
            transition: "accent-color 0.35s ease",
            cursor: "pointer",
          }}
          aria-label="pH slider"
        />

        {/* Scale ticks */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
            padding: "0 2px",
          }}
        >
          {scaleMarkers.map((m) => (
            <span
              key={m.value}
              style={{
                fontSize: "0.68rem",
                color: Math.abs(ph - m.value) < 0.6 ? "#e8edf5" : "#475569",
                fontWeight: Math.abs(ph - m.value) < 0.6 ? 700 : 400,
                transition: "color 0.2s ease",
                fontFamily: '"Consolas", "Monaco", monospace',
              }}
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Household Item Selector */}
      <div>
        <h3
          style={{
            margin: "0 0 12px",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#38bdf8",
          }}
        >
          Household Items
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 10,
          }}
        >
          {HOUSEHOLD_ITEMS.map((item) => {
            const isSelected = selectedItem === item.name;
            const itemColor = categoryColor(item.category);
            return (
              <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  padding: "14px 10px",
                  borderRadius: 12,
                  border: isSelected
                    ? `2px solid ${itemColor}`
                    : "1px solid #2a3548",
                  background: isSelected
                    ? `${itemColor}14`
                    : "#111827",
                  color: isSelected ? "#e8edf5" : "#8b9cb3",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "#475569";
                    e.currentTarget.style.background = "#1a2332";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "#2a3548";
                    e.currentTarget.style.background = "#111827";
                  }
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = "2px solid #38bdf8";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = "none";
                }}
                aria-pressed={isSelected}
              >
                <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: "0.78rem",
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontFamily:
                      '"Consolas", "Monaco", monospace',
                    fontSize: "0.7rem",
                    color: itemColor,
                    fontWeight: 700,
                  }}
                >
                  pH {item.ph}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Play hint */}
      <p
        style={{
          margin: "16px 0 0",
          fontSize: "0.82rem",
          color: "#8b9cb3",
          lineHeight: 1.5,
        }}
      >
        Try dragging the slider across the scale — notice how the indicator
        shifts from red (acid) through green (neutral) to purple (base). Click
        any household item to jump to its typical pH.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ReadoutRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "8px 0",
        borderBottom: "1px solid #1a2332",
      }}
    >
      <span style={{ fontSize: "0.82rem", color: "#8b9cb3" }}>{label}</span>
      <span
        style={{
          fontFamily: '"Consolas", "Monaco", monospace',
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#e8edf5",
        }}
      >
        {value}
      </span>
    </div>
  );
}
