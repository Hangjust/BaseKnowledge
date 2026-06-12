/**
 * =============================================================================
 * SupplyAndDemandViz — Economics > Supply and Demand market simulation
 * =============================================================================
 *
 * Interactive canvas graph where learners adjust buyer and seller counts
 * with sliders and watch the equilibrium price and quantity shift in real time.
 * Includes a prediction mode: click the graph to guess the equilibrium point,
 * then reveal to see how close you were.
 *
 * Self-contained — no external dependencies beyond React.
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export type TopicVisualizationMetadata = {
  id: string;
  subject: string;
  topic: string;
  title: string;
  description: string;
  dependencies: string[];
};

export const metadata: TopicVisualizationMetadata = {
  id: "economics-supply-and-demand",
  subject: "economics",
  topic: "supply-and-demand",
  title: "Supply and Demand Market",
  description:
    "Adjust buyers and sellers to shift market curves and discover how equilibrium price and quantity change. Predict the equilibrium, then reveal.",
  dependencies: [],
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type PredictionState =
  | { mode: "idle" }
  | { mode: "placing" }
  | { mode: "placed"; q: number; p: number }
  | { mode: "revealed"; guessQ: number; guessP: number; actualQ: number; actualP: number };

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CANVAS_HEIGHT = 340;
const PADDING = { top: 28, right: 28, bottom: 44, left: 52 };

const COLORS = {
  bg: "#070b12",
  surface: "#111827",
  border: "#2a3548",
  text: "#e8edf5",
  muted: "#8b9cb3",
  accent: "#f59e0b", // economics amber/gold
  demand: "#38bdf8", // cyan
  supply: "#f59e0b", // amber
  equilibrium: "#34d399", // emerald
  grid: "#1a2332",
  prediction: "#f472b6", // pink
  crosshair: "#64748b",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function computeCurves(buyers: number, sellers: number) {
  // Demand: P = demandIntercept - demandSlope * Q
  // More buyers → higher willingness to pay (shifts demand right)
  const demandIntercept = 50 + buyers * 2.5;
  const demandSlope = 3;

  // Supply: P = supplyIntercept + supplySlope * Q
  // More sellers → lower minimum price (shifts supply right)
  const supplyIntercept = Math.max(5, 30 - sellers * 1.5);
  const supplySlope = 2;

  // Equilibrium: demandIntercept - demandSlope * Q = supplyIntercept + supplySlope * Q
  const eqQ = (demandIntercept - supplyIntercept) / (demandSlope + supplySlope);
  const eqP = demandIntercept - demandSlope * eqQ;

  // Clamp to positive, reasonable bounds
  const clampedEqQ = Math.max(0, Math.min(30, eqQ));
  const clampedEqP = Math.max(0, Math.min(100, eqP));

  return {
    demandIntercept,
    demandSlope,
    supplyIntercept,
    supplySlope,
    eqQ: clampedEqQ,
    eqP: clampedEqP,
  };
}

function formatCurrency(n: number): string {
  return `$${n.toFixed(2)}`;
}

function marketStatus(eqQ: number, buyers: number, sellers: number): string {
  const demandAtZero = 50 + buyers * 2.5;
  const supplyAtZero = Math.max(5, 30 - sellers * 1.5);
  if (Math.abs(demandAtZero - supplyAtZero) < 5) return "balanced";
  if (buyers > sellers + 5) return "high demand";
  if (sellers > buyers + 5) return "high supply";
  return "stable";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SupplyAndDemandViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [buyers, setBuyers] = useState(10);
  const [sellers, setSellers] = useState(10);
  const [prediction, setPrediction] = useState<PredictionState>({ mode: "idle" });
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  const curves = computeCurves(buyers, sellers);
  const status = marketStatus(curves.eqQ, buyers, sellers);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const { demandIntercept, demandSlope, supplyIntercept, supplySlope, eqQ, eqP } = curves;
      const plotW = width - PADDING.left - PADDING.right;
      const plotH = height - PADDING.top - PADDING.bottom;

      // Coordinate transforms: Q [0,30] → x, P [0,100] → y (inverted)
      const qToX = (q: number) => PADDING.left + (q / 30) * plotW;
      const pToY = (p: number) => PADDING.top + plotH - (p / 100) * plotH;

      // Clear
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      for (let q = 0; q <= 30; q += 5) {
        const x = qToX(q);
        ctx.beginPath();
        ctx.moveTo(x, PADDING.top);
        ctx.lineTo(x, PADDING.top + plotH);
        ctx.stroke();
      }
      for (let p = 0; p <= 100; p += 20) {
        const y = pToY(p);
        ctx.beginPath();
        ctx.moveTo(PADDING.left, y);
        ctx.lineTo(PADDING.left + plotW, y);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = COLORS.border;
      ctx.lineWidth = 2;
      // Y-axis
      ctx.beginPath();
      ctx.moveTo(PADDING.left, PADDING.top);
      ctx.lineTo(PADDING.left, PADDING.top + plotH);
      ctx.stroke();
      // X-axis
      ctx.beginPath();
      ctx.moveTo(PADDING.left, PADDING.top + plotH);
      ctx.lineTo(PADDING.left + plotW, PADDING.top + plotH);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = COLORS.muted;
      ctx.font = '11px "Inter", ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = "center";
      ctx.fillText("Quantity", PADDING.left + plotW / 2, height - 8);
      ctx.save();
      ctx.translate(14, PADDING.top + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("Price", 0, 0);
      ctx.restore();

      // Tick labels
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (let p = 0; p <= 100; p += 20) {
        ctx.fillText(`$${p}`, PADDING.left - 8, pToY(p));
      }
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (let q = 0; q <= 30; q += 5) {
        ctx.fillText(String(q), qToX(q), PADDING.top + plotH + 6);
      }

      // Demand curve: P = intercept - slope * Q
      const demandPoints: { x: number; y: number }[] = [];
      for (let i = 0; i <= 60; i++) {
        const q = (i / 60) * 30;
        const p = demandIntercept - demandSlope * q;
        if (p >= 0 && p <= 100) {
          demandPoints.push({ x: qToX(q), y: pToY(p) });
        }
      }
      if (demandPoints.length > 1) {
        ctx.strokeStyle = COLORS.demand;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        demandPoints.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
        ctx.stroke();

        // Demand label
        const dLabelPt = demandPoints[Math.floor(demandPoints.length * 0.25)];
        ctx.fillStyle = COLORS.demand;
        ctx.font = '12px "Inter", sans-serif';
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillText("Demand", dLabelPt.x + 8, dLabelPt.y - 4);
      }

      // Supply curve: P = intercept + slope * Q
      const supplyPoints: { x: number; y: number }[] = [];
      for (let i = 0; i <= 60; i++) {
        const q = (i / 60) * 30;
        const p = supplyIntercept + supplySlope * q;
        if (p >= 0 && p <= 100) {
          supplyPoints.push({ x: qToX(q), y: pToY(p) });
        }
      }
      if (supplyPoints.length > 1) {
        ctx.strokeStyle = COLORS.supply;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        supplyPoints.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
        ctx.stroke();

        // Supply label
        const sLabelPt = supplyPoints[Math.floor(supplyPoints.length * 0.75)];
        ctx.fillStyle = COLORS.supply;
        ctx.font = '12px "Inter", sans-serif';
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Supply", sLabelPt.x + 8, sLabelPt.y + 4);
      }

      // Equilibrium crosshairs
      const eqX = qToX(eqQ);
      const eqY = pToY(eqP);

      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = COLORS.crosshair;
      ctx.lineWidth = 1;
      // Horizontal to Y-axis
      ctx.beginPath();
      ctx.moveTo(PADDING.left, eqY);
      ctx.lineTo(eqX, eqY);
      ctx.stroke();
      // Vertical to X-axis
      ctx.beginPath();
      ctx.moveTo(eqX, PADDING.top + plotH);
      ctx.lineTo(eqX, eqY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Equilibrium point
      ctx.beginPath();
      ctx.arc(eqX, eqY, 7, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.equilibrium;
      ctx.shadowColor = COLORS.equilibrium;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = COLORS.bg;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Price tag on Y-axis
      ctx.fillStyle = COLORS.equilibrium;
      ctx.font = 'bold 11px "Consolas", "Monaco", monospace';
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(formatCurrency(eqP), PADDING.left - 10, eqY);

      // Quantity tag on X-axis
      ctx.fillStyle = COLORS.equilibrium;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(`${eqQ.toFixed(1)}`, eqX, PADDING.top + plotH + 22);

      // Prediction overlay
      if (prediction.mode === "placing" && mouseRef.current) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        // Snap to plot area
        const clampedX = Math.max(PADDING.left, Math.min(PADDING.left + plotW, mx));
        const clampedY = Math.max(PADDING.top, Math.min(PADDING.top + plotH, my));

        ctx.beginPath();
        ctx.arc(clampedX, clampedY, 8, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.prediction;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = COLORS.prediction;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Crosshairs for prediction
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = COLORS.prediction;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(PADDING.left, clampedY);
        ctx.lineTo(clampedX, clampedY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(clampedX, PADDING.top + plotH);
        ctx.lineTo(clampedX, clampedY);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (prediction.mode === "placed") {
        const px = qToX(prediction.q);
        const py = pToY(prediction.p);

        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.prediction;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = COLORS.prediction;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = COLORS.prediction;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(PADDING.left, py);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px, PADDING.top + plotH);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = COLORS.prediction;
        ctx.font = 'bold 11px "Consolas", monospace';
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText("Your guess", PADDING.left - 10, py);
      } else if (prediction.mode === "revealed") {
        const px = qToX(prediction.guessQ);
        const py = pToY(prediction.guessP);

        // Draw guess point
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.prediction;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = COLORS.prediction;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw accuracy line from guess to actual
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(eqX, eqY);
        ctx.strokeStyle = COLORS.prediction;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = COLORS.prediction;
        ctx.font = 'bold 11px "Consolas", monospace';
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText("Your guess", PADDING.left - 10, py);
      }

      // Canvas overlay label
      ctx.fillStyle = COLORS.muted;
      ctx.font = '12px "Inter", sans-serif';
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Market graph", PADDING.left + 8, PADDING.top + 6);
    },
    [curves, prediction]
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
      draw(ctx, rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  // Track mouse for prediction placement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || prediction.mode !== "placing") return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    // Trigger redraw
    const ctx = canvas.getContext("2d");
    if (ctx) draw(ctx, rect.width, rect.height);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (prediction.mode !== "placing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const plotW = rect.width - PADDING.left - PADDING.right;
    const plotH = rect.height - PADDING.top - PADDING.bottom;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert back to Q and P
    const q = Math.max(0, Math.min(30, ((x - PADDING.left) / plotW) * 30));
    const p = Math.max(0, Math.min(100, ((PADDING.top + plotH - y) / plotH) * 100));

    setPrediction({ mode: "placed", q, p });
  };

  const handleReveal = () => {
    if (prediction.mode !== "placed") return;
    setPrediction({
      mode: "revealed",
      guessQ: prediction.q,
      guessP: prediction.p,
      actualQ: curves.eqQ,
      actualP: curves.eqP,
    });
  };

  const handleResetPrediction = () => {
    setPrediction({ mode: "idle" });
  };

  const accuracyPercent =
    prediction.mode === "revealed"
      ? Math.max(
          0,
          100 -
            Math.sqrt(
              Math.pow((prediction.guessQ - prediction.actualQ) / 30, 2) +
                Math.pow((prediction.guessP - prediction.actualP) / 100, 2)
            ) *
              100
        )
      : null;

  return (
    <div className="sd-root">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <p className="sd-eyebrow">Economics &middot; Supply and Demand</p>
        <h2 className="sd-title">Market Equilibrium Sandbox</h2>
        <p className="sd-desc">
          Move the buyer and seller sliders to shift the curves. Watch the
          equilibrium price and quantity change in real time. Can you predict
          where the market will settle?
        </p>
      </div>

      {/* Main panel: graph + readouts */}
      <div className="sd-main-panel">
        {/* Canvas graph */}
        <div className="sd-graph-wrap">
          <canvas
            ref={canvasRef}
            className="sd-canvas"
            style={{ height: CANVAS_HEIGHT }}
            aria-label="Supply and demand market graph"
            onMouseMove={handleMouseMove}
            onClick={handleCanvasClick}
          />
        </div>

        {/* Readouts */}
        <div className="sd-readouts">
          <h3 className="sd-readouts-header">Equilibrium</h3>

          <div className="sd-readout">
            <span className="sd-readout-label">Price</span>
            <span className="sd-readout-value accent">{formatCurrency(curves.eqP)}</span>
          </div>
          <div className="sd-readout">
            <span className="sd-readout-label">Quantity</span>
            <span className="sd-readout-value accent">{curves.eqQ.toFixed(1)}</span>
          </div>
          <div className="sd-readout">
            <span className="sd-readout-label">Market status</span>
            <span
              className="sd-readout-value"
              style={{
                color:
                  status === "high demand"
                    ? "#f87171"
                    : status === "high supply"
                      ? "#38bdf8"
                      : "#34d399",
              }}
            >
              {status}
            </span>
          </div>

          {/* Prediction accuracy */}
          {accuracyPercent !== null && (
            <div
              className="sd-readout"
              style={{
                borderColor:
                  accuracyPercent > 80
                    ? "#34d399"
                    : accuracyPercent > 50
                      ? "#fbbf24"
                      : "#f87171",
              }}
            >
              <span className="sd-readout-label">Accuracy</span>
              <span
                className="sd-readout-value"
                style={{
                  color:
                    accuracyPercent > 80
                      ? "#34d399"
                      : accuracyPercent > 50
                        ? "#fbbf24"
                        : "#f87171",
                }}
              >
                {accuracyPercent.toFixed(0)}%
              </span>
            </div>
          )}

          <div className="sd-readout-hint">
            <strong>Tip:</strong> More buyers shift demand right (higher price).
            More sellers shift supply right (lower price).
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="sd-controls">
        <div className="sd-control-row">
          <label htmlFor="sd-buyers">
            <span>Buyers (demand)</span>
            <output>{buyers}</output>
          </label>
          <input
            id="sd-buyers"
            type="range"
            min={1}
            max={20}
            value={buyers}
            onChange={(e) => setBuyers(Number(e.target.value))}
            aria-label="Number of buyers"
          />
        </div>

        <div className="sd-control-row">
          <label htmlFor="sd-sellers">
            <span>Sellers (supply)</span>
            <output>{sellers}</output>
          </label>
          <input
            id="sd-sellers"
            type="range"
            min={1}
            max={20}
            value={sellers}
            onChange={(e) => setSellers(Number(e.target.value))}
            aria-label="Number of sellers"
          />
        </div>
      </div>

      {/* Prediction panel */}
      <div className="sd-prediction-panel">
        {prediction.mode === "idle" && (
          <button className="sd-btn-primary" onClick={() => setPrediction({ mode: "placing" })}>
            Predict Equilibrium
          </button>
        )}

        {prediction.mode === "placing" && (
          <>
            <p className="sd-prediction-hint">
              Click anywhere on the graph to place your prediction.
            </p>
            <button className="sd-btn-secondary" onClick={handleResetPrediction}>
              Cancel
            </button>
          </>
        )}

        {prediction.mode === "placed" && (
          <>
            <p className="sd-prediction-hint">
              Predicted: <strong>{formatCurrency(prediction.p)}</strong> at quantity{" "}
              <strong>{prediction.q.toFixed(1)}</strong>
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="sd-btn-primary" onClick={handleReveal}>
                Reveal Equilibrium
              </button>
              <button className="sd-btn-secondary" onClick={handleResetPrediction}>
                Reset
              </button>
            </div>
          </>
        )}

        {prediction.mode === "revealed" && (
          <>
            <p className="sd-prediction-hint">
              Actual: <strong>{formatCurrency(curves.eqP)}</strong> at quantity{" "}
              <strong>{curves.eqQ.toFixed(1)}</strong>
              {accuracyPercent !== null && (
                <span> — your guess was {accuracyPercent.toFixed(0)}% accurate.</span>
              )}
            </p>
            <button className="sd-btn-secondary" onClick={handleResetPrediction}>
              Try Again
            </button>
          </>
        )}
      </div>

      {/* Footer hint */}
      <p className="sd-footer-hint">
        Try increasing buyers and notice how the demand curve shifts right,
        pushing the equilibrium price up. Add sellers and watch the supply
        curve do the opposite.
      </p>

      {/* Scoped styles */}
      <style jsx>{`
        .sd-root {
          --econ-bg: #0a0e17;
          --econ-surface: #111827;
          --econ-surface-2: #1a2332;
          --econ-border: #2a3548;
          --econ-text: #e8edf5;
          --econ-muted: #8b9cb3;
          --econ-accent: #f59e0b;
          --econ-radius: 14px;
          --econ-mono: "Consolas", "Monaco", monospace;

          color: var(--econ-text);
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          background: var(--econ-bg);
          border: 1px solid var(--econ-border);
          border-radius: var(--econ-radius);
          padding: 24px;
          max-width: 720px;
          margin: 0 auto;
        }

        .sd-eyebrow {
          margin: 0 0 6px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--econ-accent);
        }

        .sd-title {
          margin: 0;
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .sd-desc {
          margin: 8px 0 0;
          color: var(--econ-muted);
          font-size: 0.95rem;
          line-height: 1.55;
          max-width: 560px;
        }

        .sd-main-panel {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 20px;
          margin-bottom: 20px;
        }

        @media (max-width: 600px) {
          .sd-main-panel {
            grid-template-columns: 1fr;
          }
        }

        .sd-graph-wrap {
          background: var(--econ-surface);
          border: 1px solid var(--econ-border);
          border-radius: var(--econ-radius);
          padding: 12px;
        }

        .sd-canvas {
          width: 100%;
          height: ${CANVAS_HEIGHT}px;
          border-radius: 10px;
          background: #070b12;
          display: block;
          cursor: crosshair;
        }

        .sd-readouts {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: var(--econ-surface);
          border: 1px solid var(--econ-border);
          border-radius: var(--econ-radius);
          padding: 16px;
        }

        .sd-readouts-header {
          margin: 0 0 4px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--econ-accent);
        }

        .sd-readout {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 12px;
          background: #070b12;
          border: 1px solid var(--econ-border);
          border-radius: 10px;
        }

        .sd-readout-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--econ-muted);
        }

        .sd-readout-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--econ-text);
        }

        .sd-readout-value.accent {
          color: var(--econ-accent);
        }

        .sd-readout-hint {
          margin-top: auto;
          padding: 10px;
          border-radius: 10px;
          background: var(--econ-surface-2);
          font-size: 0.78rem;
          line-height: 1.5;
          color: var(--econ-muted);
        }

        .sd-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 480px) {
          .sd-controls {
            grid-template-columns: 1fr;
          }
        }

        .sd-control-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 14px;
          background: var(--econ-surface);
          border: 1px solid var(--econ-border);
          border-radius: var(--econ-radius);
        }

        .sd-control-row label {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--econ-muted);
          font-weight: 500;
        }

        .sd-control-row output {
          font-family: var(--econ-mono);
          color: var(--econ-accent);
          font-weight: 600;
        }

        .sd-control-row input[type="range"] {
          width: 100%;
          accent-color: var(--econ-accent);
        }

        .sd-prediction-panel {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: var(--econ-surface);
          border: 1px solid var(--econ-border);
          border-radius: var(--econ-radius);
          margin-bottom: 16px;
        }

        .sd-prediction-hint {
          margin: 0;
          font-size: 0.9rem;
          color: var(--econ-text);
        }

        .sd-btn-primary {
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          background: var(--econ-accent);
          color: var(--econ-bg);
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
        }

        .sd-btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .sd-btn-secondary {
          padding: 10px 20px;
          border-radius: 10px;
          border: 1px solid var(--econ-border);
          background: var(--econ-surface-2);
          color: var(--econ-text);
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
        }

        .sd-btn-secondary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .sd-footer-hint {
          margin: 0;
          font-size: 0.82rem;
          color: var(--econ-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
