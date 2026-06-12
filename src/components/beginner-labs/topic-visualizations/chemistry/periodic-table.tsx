/**
 * =============================================================================
 * PeriodicTableViz — interactive periodic table for Chemistry > Periodic Table
 * =============================================================================
 *
 * A self-contained, dark-themed periodic table visualization for beginner
 * chemistry learners. Features tappable element tiles, category filters,
 * pattern highlighting, and a detailed element readout panel.
 *
 * Visual language mirrors the Physics Lab: dark panels, accent color, clear
 * controls, and playable metrics.
 *
 * Props:
 *   interactive — when true, enables category filters and pattern toggles
 * =============================================================================
 */

"use client";

import { useCallback, useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type ElementCategory =
  | "alkali-metal"
  | "alkaline-earth"
  | "transition-metal"
  | "post-transition"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble-gas";

type HighlightPattern = "none" | "metals" | "nonmetals" | "metalloids" | "trend-mass";

interface ElementData {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: ElementCategory;
  fact: string;
  period: number;
  group: number;
  electrons: string;
}

/* -------------------------------------------------------------------------- */
/*  Design Tokens (Chemistry palette — distinct from Physics sky-blue)        */
/* -------------------------------------------------------------------------- */

const TOKENS = {
  bg: "#0a0e17",
  surface: "#111827",
  surface2: "#1a2332",
  border: "#2a3548",
  text: "#e8edf5",
  muted: "#8b9cb3",
  accent: "#34d399", // emerald green — chemistry identity
  success: "#34d399",
  error: "#f87171",
  warning: "#fbbf24",
  radius: "14px",
  font: '"Inter", system-ui, sans-serif',
  mono: '"Consolas", "Monaco", monospace',
} as const;

const CATEGORY_STYLES: Record<
  ElementCategory,
  { color: string; bg: string; label: string }
> = {
  "alkali-metal": { color: "#f87171", bg: "rgba(248, 113, 113, 0.12)", label: "Alkali Metal" },
  "alkaline-earth": { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.12)", label: "Alkaline Earth" },
  "transition-metal": { color: "#a78bfa", bg: "rgba(167, 139, 250, 0.12)", label: "Transition Metal" },
  "post-transition": { color: "#f472b6", bg: "rgba(244, 114, 182, 0.12)", label: "Post-Transition" },
  metalloid: { color: "#34d399", bg: "rgba(52, 211, 153, 0.12)", label: "Metalloid" },
  nonmetal: { color: "#60a5fa", bg: "rgba(96, 165, 250, 0.12)", label: "Nonmetal" },
  halogen: { color: "#fb923c", bg: "rgba(251, 146, 60, 0.12)", label: "Halogen" },
  "noble-gas": { color: "#22d3ee", bg: "rgba(34, 211, 238, 0.12)", label: "Noble Gas" },
};

/* -------------------------------------------------------------------------- */
/*  Element Data (first 36 elements — beginner scope)                         */
/* -------------------------------------------------------------------------- */

const ELEMENTS: ElementData[] = [
  { number: 1, symbol: "H", name: "Hydrogen", mass: 1.008, category: "nonmetal", fact: "The most abundant element in the universe.", period: 1, group: 1, electrons: "1" },
  { number: 2, symbol: "He", name: "Helium", mass: 4.003, category: "noble-gas", fact: "Makes balloons float and stars shine.", period: 1, group: 18, electrons: "2" },
  { number: 3, symbol: "Li", name: "Lithium", mass: 6.941, category: "alkali-metal", fact: "Used in rechargeable batteries for phones.", period: 2, group: 1, electrons: "2, 1" },
  { number: 4, symbol: "Be", name: "Beryllium", mass: 9.012, category: "alkaline-earth", fact: "A strong, lightweight metal used in aircraft.", period: 2, group: 2, electrons: "2, 2" },
  { number: 5, symbol: "B", name: "Boron", mass: 10.811, category: "metalloid", fact: "Used in borax and heat-resistant glass.", period: 2, group: 13, electrons: "2, 3" },
  { number: 6, symbol: "C", name: "Carbon", mass: 12.011, category: "nonmetal", fact: "The basis of all life on Earth.", period: 2, group: 14, electrons: "2, 4" },
  { number: 7, symbol: "N", name: "Nitrogen", mass: 14.007, category: "nonmetal", fact: "Makes up 78% of Earth's atmosphere.", period: 2, group: 15, electrons: "2, 5" },
  { number: 8, symbol: "O", name: "Oxygen", mass: 15.999, category: "nonmetal", fact: "Essential for breathing and burning.", period: 2, group: 16, electrons: "2, 6" },
  { number: 9, symbol: "F", name: "Fluorine", mass: 18.998, category: "halogen", fact: "The most reactive element; protects teeth.", period: 2, group: 17, electrons: "2, 7" },
  { number: 10, symbol: "Ne", name: "Neon", mass: 20.180, category: "noble-gas", fact: "Glows bright red-orange in signs.", period: 2, group: 18, electrons: "2, 8" },
  { number: 11, symbol: "Na", name: "Sodium", mass: 22.990, category: "alkali-metal", fact: "Common in table salt (NaCl).", period: 3, group: 1, electrons: "2, 8, 1" },
  { number: 12, symbol: "Mg", name: "Magnesium", mass: 24.305, category: "alkaline-earth", fact: "Burns with a brilliant white light.", period: 3, group: 2, electrons: "2, 8, 2" },
  { number: 13, symbol: "Al", name: "Aluminium", mass: 26.982, category: "post-transition", fact: "Lightweight metal used in foil and cans.", period: 3, group: 13, electrons: "2, 8, 3" },
  { number: 14, symbol: "Si", name: "Silicon", mass: 28.086, category: "metalloid", fact: "The key material in computer chips.", period: 3, group: 14, electrons: "2, 8, 4" },
  { number: 15, symbol: "P", name: "Phosphorus", mass: 30.974, category: "nonmetal", fact: "Glows in the dark and feeds plants.", period: 3, group: 15, electrons: "2, 8, 5" },
  { number: 16, symbol: "S", name: "Sulfur", mass: 32.065, category: "nonmetal", fact: "Yellow solid with a distinct smell.", period: 3, group: 16, electrons: "2, 8, 6" },
  { number: 17, symbol: "Cl", name: "Chlorine", mass: 35.453, category: "halogen", fact: "Used to keep swimming pools clean.", period: 3, group: 17, electrons: "2, 8, 7" },
  { number: 18, symbol: "Ar", name: "Argon", mass: 39.948, category: "noble-gas", fact: "Used to fill light bulbs.", period: 3, group: 18, electrons: "2, 8, 8" },
  { number: 19, symbol: "K", name: "Potassium", mass: 39.098, category: "alkali-metal", fact: "Helps your muscles and nerves work.", period: 4, group: 1, electrons: "2, 8, 8, 1" },
  { number: 20, symbol: "Ca", name: "Calcium", mass: 40.078, category: "alkaline-earth", fact: "Builds strong bones and teeth.", period: 4, group: 2, electrons: "2, 8, 8, 2" },
  { number: 21, symbol: "Sc", name: "Scandium", mass: 44.956, category: "transition-metal", fact: "Used in aerospace alloys.", period: 4, group: 3, electrons: "2, 8, 9, 2" },
  { number: 22, symbol: "Ti", name: "Titanium", mass: 47.867, category: "transition-metal", fact: "Strong as steel but much lighter.", period: 4, group: 4, electrons: "2, 8, 10, 2" },
  { number: 23, symbol: "V", name: "Vanadium", mass: 50.942, category: "transition-metal", fact: "Strengthens steel for tools.", period: 4, group: 5, electrons: "2, 8, 11, 2" },
  { number: 24, symbol: "Cr", name: "Chromium", mass: 51.996, category: "transition-metal", fact: "Gives chrome plating its shine.", period: 4, group: 6, electrons: "2, 8, 13, 1" },
  { number: 25, symbol: "Mn", name: "Manganese", mass: 54.938, category: "transition-metal", fact: "Essential for steelmaking.", period: 4, group: 7, electrons: "2, 8, 13, 2" },
  { number: 26, symbol: "Fe", name: "Iron", mass: 55.845, category: "transition-metal", fact: "The most widely used metal on Earth.", period: 4, group: 8, electrons: "2, 8, 14, 2" },
  { number: 27, symbol: "Co", name: "Cobalt", mass: 58.933, category: "transition-metal", fact: "Used in magnets and blue pigments.", period: 4, group: 9, electrons: "2, 8, 15, 2" },
  { number: 28, symbol: "Ni", name: "Nickel", mass: 58.693, category: "transition-metal", fact: "Used in coins and stainless steel.", period: 4, group: 10, electrons: "2, 8, 16, 2" },
  { number: 29, symbol: "Cu", name: "Copper", mass: 63.546, category: "transition-metal", fact: "Excellent conductor of electricity.", period: 4, group: 11, electrons: "2, 8, 18, 1" },
  { number: 30, symbol: "Zn", name: "Zinc", mass: 65.380, category: "transition-metal", fact: "Protects steel from rusting.", period: 4, group: 12, electrons: "2, 8, 18, 2" },
  { number: 31, symbol: "Ga", name: "Gallium", mass: 69.723, category: "post-transition", fact: "Melts in your hand at body temperature.", period: 4, group: 13, electrons: "2, 8, 18, 3" },
  { number: 32, symbol: "Ge", name: "Germanium", mass: 72.640, category: "metalloid", fact: "An early semiconductor material.", period: 4, group: 14, electrons: "2, 8, 18, 4" },
  { number: 33, symbol: "As", name: "Arsenic", mass: 74.922, category: "metalloid", fact: "A poisonous metalloid with uses in medicine.", period: 4, group: 15, electrons: "2, 8, 18, 5" },
  { number: 34, symbol: "Se", name: "Selenium", mass: 78.960, category: "nonmetal", fact: "Needed in tiny amounts for health.", period: 4, group: 16, electrons: "2, 8, 18, 6" },
  { number: 35, symbol: "Br", name: "Bromine", mass: 79.904, category: "halogen", fact: "A red-brown liquid at room temperature.", period: 4, group: 17, electrons: "2, 8, 18, 7" },
  { number: 36, symbol: "Kr", name: "Krypton", mass: 83.798, category: "noble-gas", fact: "Used in high-performance light bulbs.", period: 4, group: 18, electrons: "2, 8, 18, 8" },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function isMetal(category: ElementCategory): boolean {
  return (
    category === "alkali-metal" ||
    category === "alkaline-earth" ||
    category === "transition-metal" ||
    category === "post-transition"
  );
}

function getPatternOpacity(category: ElementCategory, pattern: HighlightPattern): number {
  switch (pattern) {
    case "metals":
      return isMetal(category) ? 1 : 0.22;
    case "nonmetals":
      return !isMetal(category) && category !== "metalloid" ? 1 : 0.22;
    case "metalloids":
      return category === "metalloid" ? 1 : 0.22;
    default:
      return 1;
  }
}

function interpolateColor(minVal: number, maxVal: number, val: number): string {
  const t = (val - minVal) / (maxVal - minVal || 1);
  // interpolate from muted blue to chemistry accent green
  const r = Math.round(96 + (52 - 96) * t);
  const g = Math.round(165 + (211 - 165) * t);
  const b = Math.round(250 + (153 - 250) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export const metadata = {
  title: "Periodic Table Explorer",
  description: "Interactive periodic table with category filters, pattern highlighting, and element details for beginner chemistry.",
  subject: "Chemistry",
  topic: "Periodic Table",
  difficulty: "beginner",
} as const;

type PeriodicTableVizProps = {
  interactive?: boolean;
};

export default function PeriodicTableViz({ interactive = true }: PeriodicTableVizProps) {
  const [selected, setSelected] = useState<ElementData | null>(null);
  const [activeCategory, setActiveCategory] = useState<ElementCategory | "all">("all");
  const [pattern, setPattern] = useState<HighlightPattern>("none");

  const minMass = useMemo(() => Math.min(...ELEMENTS.map((e) => e.mass)), []);
  const maxMass = useMemo(() => Math.max(...ELEMENTS.map((e) => e.mass)), []);

  const filteredElements = useMemo(() => {
    if (activeCategory === "all") return ELEMENTS;
    return ELEMENTS.filter((el) => el.category === activeCategory);
  }, [activeCategory]);

  const isVisible = useCallback(
    (el: ElementData) => {
      if (activeCategory !== "all" && el.category !== activeCategory) return false;
      return true;
    },
    [activeCategory]
  );

  const handleTileClick = useCallback((el: ElementData) => {
    setSelected((prev) => (prev?.number === el.number ? null : el));
  }, []);

  /* ------------------------------------------------------------------------ */
  /*  Grid cell renderer                                                      */
  /* ------------------------------------------------------------------------ */

  const renderCell = (period: number, group: number) => {
    const el = ELEMENTS.find((e) => e.period === period && e.group === group);
    if (!el) {
      return (
        <div
          key={`${period}-${group}`}
          style={{
            gridRow: period + 1,
            gridColumn: group,
          }}
        />
      );
    }

    const catStyle = CATEGORY_STYLES[el.category];
    const visible = isVisible(el);
    const dimmed = !visible;
    const patternOpacity = getPatternOpacity(el.category, pattern);
    const isSelected = selected?.number === el.number;

    let tileBg = catStyle.bg;
    let tileBorder = isSelected ? TOKENS.accent : catStyle.color;
    let tileColor = catStyle.color;

    if (pattern === "trend-mass") {
      tileColor = interpolateColor(minMass, maxMass, el.mass);
      tileBg = tileColor.replace("rgb", "rgba").replace(")", ", 0.12)");
      tileBorder = isSelected ? TOKENS.accent : tileColor;
    }

    return (
      <button
        key={`${period}-${group}`}
        onClick={() => handleTileClick(el)}
        title={`${el.name} — ${catStyle.label}`}
        style={{
          gridRow: period + 1,
          gridColumn: group,
          appearance: "none",
          border: `2px solid ${tileBorder}`,
          borderRadius: "8px",
          background: tileBg,
          color: tileColor,
          padding: "6px 4px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          minHeight: "64px",
          transition: "all 0.15s ease",
          opacity: dimmed ? 0.18 : patternOpacity,
          transform: isSelected ? "scale(1.08)" : "scale(1)",
          boxShadow: isSelected ? `0 0 0 3px ${TOKENS.accent}33, 0 4px 12px rgba(0,0,0,0.4)` : "none",
          fontFamily: TOKENS.font,
        }}
        onMouseEnter={(e) => {
          if (!dimmed) {
            e.currentTarget.style.transform = isSelected ? "scale(1.08)" : "scale(1.05)";
            e.currentTarget.style.zIndex = "10";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isSelected ? "scale(1.08)" : "scale(1)";
          e.currentTarget.style.zIndex = "1";
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontFamily: TOKENS.mono,
            opacity: 0.8,
            lineHeight: 1,
          }}
        >
          {el.number}
        </span>
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          {el.symbol}
        </span>
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 500,
            opacity: 0.85,
            lineHeight: 1,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            padding: "0 2px",
          }}
        >
          {el.name}
        </span>
        <span
          style={{
            fontSize: "0.55rem",
            fontFamily: TOKENS.mono,
            opacity: 0.6,
            lineHeight: 1,
          }}
        >
          {el.mass.toFixed(2)}
        </span>
      </button>
    );
  };

  /* ------------------------------------------------------------------------ */
  /*  Render                                                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      style={{
        fontFamily: TOKENS.font,
        color: TOKENS.text,
        background: TOKENS.bg,
        borderRadius: TOKENS.radius,
        border: `1px solid ${TOKENS.border}`,
        padding: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              margin: "0 0 6px",
              fontSize: "1.4rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Periodic Table Explorer
          </h2>
          <p style={{ margin: 0, color: TOKENS.muted, fontSize: "0.88rem" }}>
            Tap any element to explore. Use filters to highlight patterns.
          </p>
        </div>
        <div
          style={{
            fontFamily: TOKENS.mono,
            fontSize: "0.75rem",
            color: TOKENS.muted,
            background: TOKENS.surface,
            padding: "6px 12px",
            borderRadius: "8px",
            border: `1px solid ${TOKENS.border}`,
          }}
        >
          {filteredElements.length} / {ELEMENTS.length} elements
        </div>
      </div>

      {/* Controls */}
      {interactive && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "20px",
            padding: "16px",
            background: TOKENS.surface,
            borderRadius: "10px",
            border: `1px solid ${TOKENS.border}`,
          }}
        >
          {/* Category filters */}
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: TOKENS.muted,
                marginBottom: "8px",
              }}
            >
              Filter by Category
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              <FilterChip
                label="All"
                active={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
                color={TOKENS.accent}
              />
              {(Object.keys(CATEGORY_STYLES) as ElementCategory[]).map((cat) => (
                <FilterChip
                  key={cat}
                  label={CATEGORY_STYLES[cat].label}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  color={CATEGORY_STYLES[cat].color}
                />
              ))}
            </div>
          </div>

          {/* Pattern toggles */}
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: TOKENS.muted,
                marginBottom: "8px",
              }}
            >
              Highlight Patterns
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              <PatternChip
                label="None"
                active={pattern === "none"}
                onClick={() => setPattern("none")}
              />
              <PatternChip
                label="Metals"
                active={pattern === "metals"}
                onClick={() => setPattern("metals")}
                hint="shiny, conductive"
              />
              <PatternChip
                label="Nonmetals"
                active={pattern === "nonmetals"}
                onClick={() => setPattern("nonmetals")}
                hint="dull, brittle"
              />
              <PatternChip
                label="Metalloids"
                active={pattern === "metalloids"}
                onClick={() => setPattern("metalloids")}
                hint="in-between"
              />
              <PatternChip
                label="Mass Trend"
                active={pattern === "trend-mass"}
                onClick={() => setPattern("trend-mass")}
                hint="heavier → greener"
              />
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "16px",
          padding: "10px 14px",
          background: TOKENS.surface2,
          borderRadius: "8px",
          border: `1px solid ${TOKENS.border}`,
        }}
      >
        {(Object.keys(CATEGORY_STYLES) as ElementCategory[]).map((cat) => (
          <div
            key={cat}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "0.72rem",
              color: TOKENS.muted,
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "3px",
                background: CATEGORY_STYLES[cat].color,
                display: "inline-block",
              }}
            />
            {CATEGORY_STYLES[cat].label}
          </div>
        ))}
      </div>

      {/* Periodic Table Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(18, 1fr)",
          gridTemplateRows: "repeat(5, auto)",
          gap: "4px",
          marginBottom: "20px",
        }}
      >
        {/* Column headers (group numbers) */}
        {Array.from({ length: 18 }, (_, i) => i + 1).map((g) => (
          <div
            key={`gh-${g}`}
            style={{
              gridRow: 1,
              gridColumn: g,
              textAlign: "center",
              fontSize: "0.6rem",
              fontFamily: TOKENS.mono,
              color: TOKENS.muted,
              padding: "2px 0",
            }}
          >
            {g}
          </div>
        ))}

        {/* Element cells */}
        {Array.from({ length: 4 }, (_, p) => p + 1).flatMap((period) =>
          Array.from({ length: 18 }, (_, g) => g + 1).map((group) =>
            renderCell(period, group)
          )
        )}
      </div>

      {/* Selected Element Readout */}
      {selected && (
        <div
          style={{
            background: TOKENS.surface,
            borderRadius: "10px",
            border: `1px solid ${TOKENS.border}`,
            padding: "20px",
            animation: "pt-fadeIn 0.2s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              alignItems: "flex-start",
            }}
          >
            {/* Element card */}
            <div
              style={{
                flexShrink: 0,
                width: "120px",
                height: "140px",
                borderRadius: "10px",
                border: `2px solid ${CATEGORY_STYLES[selected.category].color}`,
                background: CATEGORY_STYLES[selected.category].bg,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                color: CATEGORY_STYLES[selected.category].color,
              }}
            >
              <span style={{ fontSize: "0.75rem", fontFamily: TOKENS.mono, opacity: 0.8 }}>
                {selected.number}
              </span>
              <span style={{ fontSize: "2rem", fontWeight: 700 }}>{selected.symbol}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{selected.name}</span>
              <span style={{ fontSize: "0.7rem", fontFamily: TOKENS.mono, opacity: 0.7 }}>
                {selected.mass.toFixed(2)}
              </span>
            </div>

            {/* Metrics */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: TOKENS.text,
                }}
              >
                {selected.name}{" "}
                <span style={{ color: TOKENS.muted, fontWeight: 400 }}>({selected.symbol})</span>
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <Metric label="Atomic Number" value={String(selected.number)} />
                <Metric label="Atomic Mass" value={`${selected.mass.toFixed(2)} u`} />
                <Metric label="Period" value={String(selected.period)} />
                <Metric label="Group" value={String(selected.group)} />
                <Metric label="Category" value={CATEGORY_STYLES[selected.category].label} />
                <Metric label="Electrons" value={selected.electrons} />
              </div>

              <div
                style={{
                  padding: "12px 14px",
                  background: TOKENS.surface2,
                  borderRadius: "8px",
                  border: `1px solid ${TOKENS.border}`,
                  borderLeft: `3px solid ${TOKENS.accent}`,
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: TOKENS.accent,
                    marginBottom: "4px",
                  }}
                >
                  Did You Know?
                </div>
                <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.5, color: TOKENS.text }}>
                  {selected.fact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hint when nothing selected */}
      {!selected && (
        <div
          style={{
            textAlign: "center",
            padding: "28px",
            color: TOKENS.muted,
            fontSize: "0.88rem",
            background: TOKENS.surface,
            borderRadius: "10px",
            border: `1px dashed ${TOKENS.border}`,
          }}
        >
          Tap an element tile to see its details, electron configuration, and a fun fact.
        </div>
      )}

      {/* Global animation keyframes */}
      <style>{`
        @keyframes pt-fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function FilterChip({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        appearance: "none",
        border: active ? "none" : `1px solid ${TOKENS.border}`,
        background: active ? color : TOKENS.surface2,
        color: active ? TOKENS.bg : TOKENS.text,
        fontSize: "0.78rem",
        fontWeight: 600,
        padding: "5px 12px",
        borderRadius: "999px",
        cursor: "pointer",
        transition: "all 0.15s",
        fontFamily: TOKENS.font,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = TOKENS.border;
      }}
    >
      {label}
    </button>
  );
}

function PatternChip({
  label,
  active,
  onClick,
  hint,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  hint?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={hint}
      style={{
        appearance: "none",
        border: active ? `1px solid ${TOKENS.accent}` : `1px solid ${TOKENS.border}`,
        background: active ? `${TOKENS.accent}18` : TOKENS.surface2,
        color: active ? TOKENS.accent : TOKENS.muted,
        fontSize: "0.78rem",
        fontWeight: 500,
        padding: "5px 12px",
        borderRadius: "999px",
        cursor: "pointer",
        transition: "all 0.15s",
        fontFamily: TOKENS.font,
      }}
    >
      {label}
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "8px 10px",
        background: TOKENS.surface2,
        borderRadius: "6px",
        border: `1px solid ${TOKENS.border}`,
      }}
    >
      <div
        style={{
          fontSize: "0.65rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: TOKENS.muted,
          marginBottom: "2px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "0.88rem",
          fontWeight: 700,
          color: TOKENS.text,
          fontFamily: TOKENS.mono,
        }}
      >
        {value}
      </div>
    </div>
  );
}
