"use client";

/**
 * =============================================================================
 * BudgetingViz — Economics > Budgeting interactive sandbox
 * =============================================================================
 *
 * Self-contained budget-planning visualization. Learners adjust monthly income
 * and allocate spending across categories. A live budget meter shows whether
 * the plan is over or under budget, and a savings readout updates in real time.
 *
 * EXPORT:
 *   - default React component
 *   - metadata object for beginner-labs registry
 * =============================================================================
 */

import { useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type BudgetCategory = {
  id: string;
  label: string;
  icon: string;
  color: string;
  max: number;
};

export type BudgetAllocation = Record<string, number>;

export type BudgetVizMetadata = {
  id: string;
  subject: string;
  topic: string;
  title: string;
  description: string;
  dependencies: string[];
};

/* -------------------------------------------------------------------------- */
/*  Design Tokens                                                             */
/* -------------------------------------------------------------------------- */

const TOKENS = {
  bg: "#0a0e17",
  surface: "#111827",
  surface2: "#1a2332",
  border: "#2a3548",
  text: "#e8edf5",
  muted: "#8b9cb3",
  accent: "#fbbf24",      // gold — economics identity
  danger: "#f87171",
  success: "#34d399",
  info: "#60a5fa",
  radius: 14,
  font: '"Inter", system-ui, sans-serif',
  mono: '"Consolas", "Monaco", monospace',
} as const;

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const CATEGORIES: BudgetCategory[] = [
  { id: "food", label: "Food", icon: "🍎", color: "#f87171", max: 100 },
  { id: "transport", label: "Transport", icon: "🚌", color: "#60a5fa", max: 80 },
  { id: "fun", label: "Fun", icon: "🎮", color: "#a78bfa", max: 60 },
  { id: "savings", label: "Savings", icon: "🏦", color: "#34d399", max: 100 },
];

export const metadata: BudgetVizMetadata = {
  id: "economics-budgeting",
  subject: "economics",
  topic: "budgeting",
  title: "Budget Planner",
  description:
    "Set your income and allocate spending across food, transport, fun, and savings. Watch the budget meter and savings readout update in real time.",
  dependencies: [],
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function currency(n: number): string {
  return `$${n.toFixed(0)}`;
}

function percent(part: number, whole: number): number {
  return whole > 0 ? Math.min(100, Math.round((part / whole) * 100)) : 0;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function BudgetingViz() {
  const [income, setIncome] = useState(100);
  const [allocations, setAllocations] = useState<BudgetAllocation>({
    food: 30,
    transport: 20,
    fun: 15,
    savings: 20,
  });

  const totalSpent = useMemo(
    () => Object.values(allocations).reduce((sum, v) => sum + v, 0),
    [allocations]
  );

  const remaining = income - totalSpent;
  const isOverBudget = remaining < 0;
  const budgetPercent = percent(totalSpent, income);

  const updateAllocation = (id: string, value: number) => {
    setAllocations((prev) => ({ ...prev, [id]: value }));
  };

  const resetBudget = () => {
    setIncome(100);
    setAllocations({ food: 30, transport: 20, fun: 15, savings: 20 });
  };

  /* ── Render ── */

  return (
    <div className="budget-root">
      <div className="budget-panel">
        {/* Header */}
        <div className="budget-header">
          <p className="budget-subtitle">Economics &middot; Budgeting</p>
          <h2 className="budget-title">Budget Planner</h2>
          <p className="budget-desc">
            Drag the income slider, then set how much you want to spend in each
            category. Keep an eye on the budget meter so you do not spend more
            than you earn.
          </p>
        </div>

        {/* Income + Meter row */}
        <div className="budget-top-row">
          {/* Income control */}
          <div className="budget-card">
            <div className="budget-card-header">
              <span className="budget-card-label">Monthly Income</span>
              <output className="budget-income-output">{currency(income)}</output>
            </div>
            <input
              id="budget-income"
              type="range"
              min={20}
              max={200}
              step={5}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="budget-slider"
              aria-label="Monthly income"
            />
            <div className="budget-slider-hints">
              <span>$20</span>
              <span>$200</span>
            </div>
          </div>

          {/* Budget meter */}
          <div className="budget-card">
            <div className="budget-card-header">
              <span className="budget-card-label">Budget Meter</span>
              <span
                className={`budget-status ${isOverBudget ? "over" : "under"}`}
              >
                {isOverBudget ? "Over budget" : "Under budget"}
              </span>
            </div>

            <div className="budget-meter">
              <div className="budget-meter-track">
                <div
                  className={`budget-meter-fill ${isOverBudget ? "over" : ""}`}
                  style={{ width: `${Math.min(100, budgetPercent)}%` }}
                />
                <div
                  className="budget-meter-tick"
                  style={{ left: `${Math.min(100, budgetPercent)}%` }}
                />
              </div>
              <div className="budget-meter-labels">
                <span>0%</span>
                <span>{budgetPercent}% spent</span>
                <span>100%</span>
              </div>
            </div>

            <div className="budget-summary-row">
              <div className="budget-summary-item">
                <span className="budget-summary-label">Income</span>
                <span className="budget-summary-value">{currency(income)}</span>
              </div>
              <div className="budget-summary-item">
                <span className="budget-summary-label">Spent</span>
                <span className="budget-summary-value spent">{currency(totalSpent)}</span>
              </div>
              <div className="budget-summary-item">
                <span className="budget-summary-label">Remaining</span>
                <span
                  className={`budget-summary-value ${isOverBudget ? "over" : "remaining"}`}
                >
                  {currency(remaining)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category allocations */}
        <div className="budget-categories">
          <h3 className="budget-section-title">Category Allocations</h3>
          <div className="budget-category-grid">
            {CATEGORIES.map((cat) => {
              const value = allocations[cat.id] ?? 0;
              const pct = percent(value, income);
              return (
                <div key={cat.id} className="budget-category-card">
                  <div className="budget-category-header">
                    <span className="budget-category-icon" style={{ color: cat.color }}>
                      {cat.icon}
                    </span>
                    <span className="budget-category-name">{cat.label}</span>
                    <output className="budget-category-value">{currency(value)}</output>
                  </div>
                  <input
                    id={`budget-cat-${cat.id}`}
                    type="range"
                    min={0}
                    max={cat.max}
                    step={1}
                    value={value}
                    onChange={(e) =>
                      updateAllocation(cat.id, Number(e.target.value))
                    }
                    className="budget-slider"
                    style={{ accentColor: cat.color }}
                    aria-label={`${cat.label} allocation`}
                  />
                  <div className="budget-category-meta">
                    <span style={{ color: cat.color, fontWeight: 600 }}>
                      {pct}% of income
                    </span>
                    <span className="budget-category-hint">
                      {value === 0 ? "Not allocated" : `${currency(value)} / ${currency(cat.max)} max`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Savings readout + reset */}
        <div className="budget-footer">
          <div
            className={`budget-savings-card ${isOverBudget ? "warning" : ""}`}
          >
            <span className="budget-savings-label">
              {isOverBudget ? "⚠️ Deficit" : "💰 Savings"}
            </span>
            <span
              className={`budget-savings-value ${isOverBudget ? "over" : ""}`}
            >
              {currency(Math.abs(remaining))}
            </span>
            <span className="budget-savings-hint">
              {isOverBudget
                ? "You are spending more than you earn. Reduce a category to fix this."
                : remaining === 0
                ? "Every dollar is allocated. Nice planning!"
                : `You have ${currency(remaining)} left to save or spend.`}
            </span>
          </div>

          <button
            type="button"
            onClick={resetBudget}
            className="budget-reset-btn"
            aria-label="Reset budget to defaults"
          >
            Reset
          </button>
        </div>

        {/* Hint */}
        <p className="budget-hint">
          Try raising your income and notice how the meter changes. Then increase
          spending in one category until you go over budget. Watch the warning
          appear and the meter turn red.
        </p>
      </div>

      <style jsx>{`
        .budget-root {
          --eco-bg: ${TOKENS.bg};
          --eco-surface: ${TOKENS.surface};
          --eco-surface2: ${TOKENS.surface2};
          --eco-border: ${TOKENS.border};
          --eco-text: ${TOKENS.text};
          --eco-muted: ${TOKENS.muted};
          --eco-accent: ${TOKENS.accent};
          --eco-danger: ${TOKENS.danger};
          --eco-success: ${TOKENS.success};
          --eco-info: ${TOKENS.info};
          --eco-radius: ${TOKENS.radius}px;
          --eco-mono: ${TOKENS.mono};

          color: var(--eco-text);
          font-family: ${TOKENS.font};
        }

        .budget-panel {
          background: var(--eco-surface);
          border: 1px solid var(--eco-border);
          border-radius: var(--eco-radius);
          padding: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Header */
        .budget-header {
          margin-bottom: 24px;
        }

        .budget-subtitle {
          margin: 0 0 6px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--eco-accent);
        }

        .budget-title {
          margin: 0;
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .budget-desc {
          margin: 8px 0 0;
          color: var(--eco-muted);
          font-size: 0.95rem;
          line-height: 1.55;
          max-width: 560px;
        }

        /* Top row */
        .budget-top-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        @media (max-width: 640px) {
          .budget-top-row {
            grid-template-columns: 1fr;
          }
        }

        .budget-card {
          background: var(--eco-bg);
          border: 1px solid var(--eco-border);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .budget-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .budget-card-label {
          font-size: 0.82rem;
          color: var(--eco-muted);
          font-weight: 500;
        }

        .budget-income-output {
          font-family: var(--eco-mono);
          color: var(--eco-accent);
          font-size: 1.15rem;
          font-weight: 700;
        }

        .budget-slider {
          width: 100%;
          accent-color: var(--eco-accent);
          cursor: pointer;
        }

        .budget-slider-hints {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--eco-muted);
          font-family: var(--eco-mono);
        }

        /* Budget meter */
        .budget-status {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          transition: all 0.3s ease;
        }

        .budget-status.under {
          background: ${TOKENS.success}22;
          color: var(--eco-success);
          border: 1px solid ${TOKENS.success}44;
        }

        .budget-status.over {
          background: ${TOKENS.danger}22;
          color: var(--eco-danger);
          border: 1px solid ${TOKENS.danger}44;
        }

        .budget-meter {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .budget-meter-track {
          position: relative;
          height: 20px;
          background: var(--eco-surface2);
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid var(--eco-border);
        }

        .budget-meter-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--eco-success), var(--eco-accent));
          border-radius: 999px;
          transition: width 0.3s ease, background 0.3s ease;
          min-width: 4px;
        }

        .budget-meter-fill.over {
          background: linear-gradient(90deg, var(--eco-accent), var(--eco-danger));
        }

        .budget-meter-tick {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--eco-text);
          transform: translateX(-50%);
          transition: left 0.3s ease;
          border-radius: 999px;
        }

        .budget-meter-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--eco-muted);
          font-family: var(--eco-mono);
        }

        .budget-summary-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 4px;
        }

        .budget-summary-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 10px;
          background: var(--eco-surface2);
          border: 1px solid var(--eco-border);
          border-radius: 10px;
        }

        .budget-summary-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--eco-muted);
        }

        .budget-summary-value {
          font-family: var(--eco-mono);
          font-size: 1rem;
          font-weight: 700;
          color: var(--eco-text);
        }

        .budget-summary-value.spent {
          color: var(--eco-accent);
        }

        .budget-summary-value.remaining {
          color: var(--eco-success);
        }

        .budget-summary-value.over {
          color: var(--eco-danger);
        }

        /* Categories */
        .budget-categories {
          margin-bottom: 24px;
        }

        .budget-section-title {
          margin: 0 0 16px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--eco-accent);
        }

        .budget-category-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (max-width: 480px) {
          .budget-category-grid {
            grid-template-columns: 1fr;
          }
        }

        .budget-category-card {
          background: var(--eco-bg);
          border: 1px solid var(--eco-border);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.2s ease;
        }

        .budget-category-card:hover {
          border-color: #475569;
        }

        .budget-category-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .budget-category-icon {
          font-size: 1.3rem;
          line-height: 1;
        }

        .budget-category-name {
          flex: 1;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--eco-text);
        }

        .budget-category-value {
          font-family: var(--eco-mono);
          font-size: 1rem;
          font-weight: 700;
          color: var(--eco-text);
        }

        .budget-category-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
        }

        .budget-category-hint {
          color: var(--eco-muted);
          font-family: var(--eco-mono);
          font-size: 0.7rem;
        }

        /* Footer */
        .budget-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: stretch;
          margin-bottom: 16px;
        }

        .budget-savings-card {
          flex: 1;
          min-width: 240px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 16px 20px;
          background: ${TOKENS.success}0d;
          border: 1px solid ${TOKENS.success}33;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .budget-savings-card.warning {
          background: ${TOKENS.danger}0d;
          border-color: ${TOKENS.danger}33;
        }

        .budget-savings-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--eco-muted);
        }

        .budget-savings-value {
          font-family: var(--eco-mono);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--eco-success);
          transition: color 0.3s ease;
        }

        .budget-savings-value.over {
          color: var(--eco-danger);
        }

        .budget-savings-hint {
          font-size: 0.82rem;
          color: var(--eco-muted);
          line-height: 1.5;
          margin-top: 2px;
        }

        .budget-reset-btn {
          align-self: flex-start;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid var(--eco-border);
          background: var(--eco-surface2);
          color: var(--eco-text);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .budget-reset-btn:hover {
          background: var(--eco-border);
          border-color: #475569;
        }

        .budget-reset-btn:focus-visible {
          outline: 2px solid var(--eco-accent);
          outline-offset: 2px;
        }

        /* Hint */
        .budget-hint {
          margin: 0;
          font-size: 0.82rem;
          color: var(--eco-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
