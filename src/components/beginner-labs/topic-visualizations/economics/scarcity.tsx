"use client";

/**
 * =============================================================================
 * ScarcityViz — Economics > Scarcity budget-choice simulation
 * =============================================================================
 *
 * Self-contained React visualization for the Scarcity topic. Learners adjust
 * a fixed budget and resource scarcity, then choose items from a store shelf.
 * A live scarcity meter tracks remaining budget, and an opportunity-cost
 * readout shows what each choice trades away.
 *
 * EXPORT:
 *   - default React component
 *   - metadata object for beginner-labs registry
 * =============================================================================
 */

import { useMemo, useState } from "react";

/* ---------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------- */

export type TopicVisualizationMetadata = {
  id: string;
  subject: string;
  topic: string;
  title: string;
  description: string;
  dependencies: string[];
};

type ShopItem = {
  id: string;
  label: string;
  price: number;
  category: "need" | "want";
  icon: string;
};

type CartEntry = {
  item: ShopItem;
  qty: number;
};

/* ---------------------------------------------------------------------------
 * Data
 * --------------------------------------------------------------------------- */

const SHELF_ITEMS: readonly ShopItem[] = [
  { id: "notebook", label: "Notebook", price: 3, category: "need", icon: "📓" },
  { id: "pencils", label: "Pencils", price: 2, category: "need", icon: "✏️" },
  { id: "lunch", label: "Lunch", price: 5, category: "need", icon: "🍎" },
  { id: "toy", label: "Toy", price: 8, category: "want", icon: "🧸" },
  { id: "snack", label: "Snack", price: 4, category: "want", icon: "🍪" },
  { id: "sticker", label: "Sticker", price: 1, category: "want", icon: "⭐" },
];

/* ---------------------------------------------------------------------------
 * Metadata
 * --------------------------------------------------------------------------- */

export const metadata: TopicVisualizationMetadata = {
  id: "economics-scarcity",
  subject: "economics",
  topic: "scarcity",
  title: "Scarcity Shop",
  description:
    "Spend a limited budget on needs and wants. Watch the scarcity meter rise and see the opportunity cost of every choice.",
  dependencies: [],
};

/* ---------------------------------------------------------------------------
 * Helpers
 * --------------------------------------------------------------------------- */

function stockForItem(item: ShopItem, scarcityLevel: number): number {
  // scarcityLevel 0-100. Higher scarcity = lower stock.
  const base = item.category === "need" ? 6 : 4;
  const reduction = Math.floor((scarcityLevel / 100) * (base - 1));
  return Math.max(1, base - reduction);
}

function scarcityColor(percent: number): string {
  if (percent < 40) return "#22c55e"; // green — plenty left
  if (percent < 70) return "#f59e0b"; // amber — tightening
  return "#ef4444"; // red — critical
}

function scarcityLabel(percent: number): string {
  if (percent < 30) return "Plenty";
  if (percent < 50) return "Comfortable";
  if (percent < 70) return "Tight";
  if (percent < 85) return "Critical";
  return "Exhausted";
}

function opportunityText(item: ShopItem, cart: CartEntry[]): string {
  const other = SHELF_ITEMS.filter((i) => i.id !== item.id).sort(
    (a, b) => a.price - b.price
  );
  const combos: string[] = [];
  let remaining = item.price;

  // Greedy fill with cheapest alternatives
  for (const alt of other) {
    if (alt.price <= remaining && remaining > 0) {
      const count = Math.floor(remaining / alt.price);
      if (count > 0) {
        combos.push(`${count} ${alt.label}${count > 1 ? "s" : ""}`);
        remaining -= count * alt.price;
      }
    }
  }

  if (combos.length === 0) return `That $${item.price} could not buy any other item.`;
  return `That $${item.price} could have bought ${combos.join(", ")} instead.`;
}

/* ---------------------------------------------------------------------------
 * Component
 * --------------------------------------------------------------------------- */

export default function ScarcityViz() {
  const [budget, setBudget] = useState(15);
  const [scarcityLevel, setScarcityLevel] = useState(30);
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const totalSpent = useMemo(
    () => cart.reduce((sum, e) => sum + e.item.price * e.qty, 0),
    [cart]
  );

  const remaining = budget - totalSpent;
  const scarcityPercent = Math.min(100, Math.round((totalSpent / Math.max(1, budget)) * 100));
  const overBudget = totalSpent > budget;

  const stockMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of SHELF_ITEMS) {
      map[item.id] = stockForItem(item, scarcityLevel);
    }
    return map;
  }, [scarcityLevel]);

  const cartQtyFor = (id: string) => cart.find((e) => e.item.id === id)?.qty ?? 0;

  const addToCart = (item: ShopItem) => {
    const currentQty = cartQtyFor(item.id);
    if (currentQty >= stockMap[item.id]) return; // out of stock
    setCart((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing) {
        return prev.map((e) =>
          e.item.id === item.id ? { ...e, qty: e.qty + 1 } : e
        );
      }
      return [...prev, { item, qty: 1 }];
    });
    setLastAdded(item.id);
  };

  const removeFromCart = (item: ShopItem) => {
    setCart((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (!existing) return prev;
      if (existing.qty <= 1) {
        return prev.filter((e) => e.item.id !== item.id);
      }
      return prev.map((e) =>
        e.item.id === item.id ? { ...e, qty: e.qty - 1 } : e
      );
    });
  };

  const resetCart = () => {
    setCart([]);
    setLastAdded(null);
  };

  const lastAddedItem = SHELF_ITEMS.find((i) => i.id === lastAdded) ?? null;

  return (
    <div className="scarcity-root">
      <div className="scarcity-panel">
        {/* Header */}
        <div className="scarcity-header">
          <div>
            <h2 className="scarcity-title">Scarcity Shop</h2>
            <p className="scarcity-subtitle">
              You have a limited budget. Choose wisely.
            </p>
          </div>
          <div className="scarcity-budget-badge">
            <span className="badge-label">Budget</span>
            <span className={`badge-value ${overBudget ? "over" : ""}`}>
              ${remaining}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="scarcity-controls">
          <div className="scarcity-control-row">
            <label htmlFor="budget-slider">
              <span>Starting budget</span>
              <output>${budget}</output>
            </label>
            <input
              id="budget-slider"
              type="range"
              min={5}
              max={30}
              step={1}
              value={budget}
              onChange={(e) => {
                const newBudget = Number(e.target.value);
                setBudget(newBudget);
                // Trim cart if over new budget
                setCart((prev) => {
                  let spent = prev.reduce((s, e) => s + e.item.price * e.qty, 0);
                  const trimmed: CartEntry[] = [];
                  for (const entry of prev) {
                    const maxQty = Math.floor((newBudget - spent + entry.item.price * entry.qty) / entry.item.price);
                    const keepQty = Math.max(0, Math.min(entry.qty, maxQty));
                    if (keepQty > 0) {
                      trimmed.push({ ...entry, qty: keepQty });
                      spent = spent - entry.item.price * entry.qty + entry.item.price * keepQty;
                    }
                  }
                  return trimmed;
                });
              }}
            />
          </div>

          <div className="scarcity-control-row">
            <label htmlFor="scarcity-slider">
              <span>Resource scarcity</span>
              <output>{scarcityLevel}%</output>
            </label>
            <input
              id="scarcity-slider"
              type="range"
              min={0}
              max={100}
              step={10}
              value={scarcityLevel}
              onChange={(e) => setScarcityLevel(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Scarcity Meter */}
        <div className="scarcity-meter-section">
          <div className="meter-header">
            <span className="meter-label">Budget scarcity</span>
            <span className="meter-status" style={{ color: scarcityColor(scarcityPercent) }}>
              {scarcityLabel(scarcityPercent)}
            </span>
          </div>
          <div className="meter-track">
            <div
              className="meter-fill"
              style={{
                width: `${scarcityPercent}%`,
                background: scarcityColor(scarcityPercent),
              }}
            />
          </div>
          <div className="meter-footer">
            <span>Spent: ${totalSpent}</span>
            <span>{scarcityPercent}% used</span>
          </div>
        </div>

        {/* Choice Cards */}
        <div className="scarcity-shelf">
          <p className="shelf-label">Store shelf — tap cards to buy</p>
          <div className="shelf-grid">
            {SHELF_ITEMS.map((item) => {
              const qty = cartQtyFor(item.id);
              const stock = stockMap[item.id];
              const inStock = qty < stock;
              const disabled = !inStock || (item.price > remaining && qty === 0);

              return (
                <div
                  key={item.id}
                  className={`choice-card ${qty > 0 ? "active" : ""} ${disabled ? "disabled" : ""} ${item.category}`}
                  onClick={() => {
                    if (!disabled) addToCart(item);
                  }}
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  onKeyDown={(e) => {
                    if (!disabled && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      addToCart(item);
                    }
                  }}
                  aria-label={`${item.label}, $${item.price}, ${item.category}. ${
                    qty > 0 ? `${qty} in cart. ` : ""
                  }Stock: ${stock - qty} remaining.`}
                >
                  <div className="card-top">
                    <span className="card-icon">{item.icon}</span>
                    <span className={`card-category ${item.category}`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="card-label">{item.label}</p>
                  <p className="card-price">${item.price}</p>
                  {qty > 0 && (
                    <div className="card-qty-badge">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item);
                        }}
                        aria-label={`Remove one ${item.label}`}
                      >
                        −
                      </button>
                      <span className="qty-value">{qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        disabled={!inStock}
                        aria-label={`Add one ${item.label}`}
                      >
                        +
                      </button>
                    </div>
                  )}
                  {!inStock && <span className="card-sold-out">Sold out</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Opportunity Cost Readout */}
        <div className="scarcity-readout">
          <div className="readout-header">
            <span className="readout-title">Opportunity cost</span>
            {cart.length > 0 && (
              <button type="button" className="reset-btn" onClick={resetCart}>
                Reset cart
              </button>
            )}
          </div>

          {lastAddedItem && cartQtyFor(lastAddedItem.id) > 0 ? (
            <div className="readout-body">
              <p className="readout-main">
                You chose <strong>{lastAddedItem.icon} {lastAddedItem.label}</strong> for{" "}
                <strong>${lastAddedItem.price}</strong>.
              </p>
              <p className="readout-secondary">
                {opportunityText(lastAddedItem, cart)}
              </p>
            </div>
          ) : cart.length > 0 ? (
            <div className="readout-body">
              <p className="readout-main">
                Cart total: <strong>${totalSpent}</strong>
              </p>
              <p className="readout-secondary">
                Every dollar spent is a dollar that cannot be spent on something else.
              </p>
            </div>
          ) : (
            <div className="readout-body">
              <p className="readout-main">Nothing selected yet.</p>
              <p className="readout-secondary">
                Tap an item above to see what you trade away by choosing it.
              </p>
            </div>
          )}

          {overBudget && (
            <div className="readout-warning">
              ⚠️ Over budget by ${totalSpent - budget}. Remove items to continue.
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scarcity-root {
          --eco-bg: #0a0e17;
          --eco-surface: #111827;
          --eco-surface2: #1a2332;
          --eco-border: #2a3548;
          --eco-text: #e8edf5;
          --eco-muted: #8b9cb3;
          --eco-accent: #f59e0b;
          --eco-accent2: #ef4444;
          --eco-success: #22c55e;
          --eco-radius: 14px;
          --eco-mono: "Consolas", "Monaco", monospace;

          color: var(--eco-text);
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
        }

        .scarcity-panel {
          background: var(--eco-surface);
          border: 1px solid var(--eco-border);
          border-radius: var(--eco-radius);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Header */
        .scarcity-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }

        .scarcity-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .scarcity-subtitle {
          margin: 4px 0 0;
          font-size: 0.85rem;
          color: var(--eco-muted);
        }

        .scarcity-budget-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          background: var(--eco-surface2);
          border: 1px solid var(--eco-border);
          border-radius: 10px;
          padding: 10px 16px;
          min-width: 90px;
        }

        .badge-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--eco-muted);
        }

        .badge-value {
          font-family: var(--eco-mono);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--eco-success);
          transition: color 0.2s;
        }

        .badge-value.over {
          color: var(--eco-accent2);
        }

        /* Controls */
        .scarcity-controls {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .scarcity-control-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .scarcity-control-row label {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--eco-muted);
          font-weight: 500;
        }

        .scarcity-control-row input[type="range"] {
          width: 100%;
          accent-color: var(--eco-accent);
        }

        .scarcity-control-row output {
          font-family: var(--eco-mono);
          color: var(--eco-accent);
          font-weight: 600;
        }

        /* Scarcity Meter */
        .scarcity-meter-section {
          background: var(--eco-surface2);
          border: 1px solid var(--eco-border);
          border-radius: 10px;
          padding: 14px 16px;
        }

        .meter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .meter-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--eco-muted);
        }

        .meter-status {
          font-size: 0.8rem;
          font-weight: 700;
          transition: color 0.3s;
        }

        .meter-track {
          width: 100%;
          height: 12px;
          background: var(--eco-bg);
          border-radius: 999px;
          overflow: hidden;
        }

        .meter-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.4s ease, background 0.4s ease;
        }

        .meter-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 0.78rem;
          color: var(--eco-muted);
          font-family: var(--eco-mono);
        }

        /* Shelf */
        .scarcity-shelf {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .shelf-label {
          margin: 0;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--eco-muted);
        }

        .shelf-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
        }

        /* Choice Cards */
        .choice-card {
          background: var(--eco-surface2);
          border: 1px solid var(--eco-border);
          border-radius: 10px;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
          position: relative;
          user-select: none;
        }

        .choice-card:hover:not(.disabled) {
          transform: translateY(-2px);
          border-color: var(--eco-accent);
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.12);
        }

        .choice-card.active {
          border-color: var(--eco-accent);
          background: rgba(245, 158, 11, 0.06);
        }

        .choice-card.disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .choice-card.need {
          border-left: 3px solid #38bdf8;
        }

        .choice-card.want {
          border-left: 3px solid #f472b6;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .card-icon {
          font-size: 1.6rem;
          line-height: 1;
        }

        .card-category {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .card-category.need {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
        }

        .card-category.want {
          background: rgba(244, 114, 182, 0.12);
          color: #f472b6;
        }

        .card-label {
          margin: 0;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--eco-text);
        }

        .card-price {
          margin: 0;
          font-family: var(--eco-mono);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--eco-accent);
        }

        .card-qty-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }

        .qty-btn {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 1px solid var(--eco-border);
          background: var(--eco-surface);
          color: var(--eco-text);
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: background 0.15s;
        }

        .qty-btn:hover:not(:disabled) {
          background: var(--eco-accent);
          color: var(--eco-bg);
          border-color: var(--eco-accent);
        }

        .qty-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .qty-value {
          font-family: var(--eco-mono);
          font-size: 0.9rem;
          font-weight: 700;
          min-width: 20px;
          text-align: center;
        }

        .card-sold-out {
          position: absolute;
          top: 6px;
          right: 6px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--eco-accent2);
          background: rgba(239, 68, 68, 0.12);
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* Opportunity Cost Readout */
        .scarcity-readout {
          background: var(--eco-surface2);
          border: 1px solid var(--eco-border);
          border-radius: 10px;
          padding: 14px 16px;
        }

        .readout-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .readout-title {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--eco-muted);
        }

        .reset-btn {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--eco-accent);
          background: transparent;
          border: 1px solid var(--eco-border);
          border-radius: 6px;
          padding: 4px 10px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .reset-btn:hover {
          background: rgba(245, 158, 11, 0.1);
          border-color: var(--eco-accent);
        }

        .readout-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .readout-main {
          margin: 0;
          font-size: 0.95rem;
          color: var(--eco-text);
          line-height: 1.5;
        }

        .readout-main strong {
          color: var(--eco-accent);
        }

        .readout-secondary {
          margin: 0;
          font-size: 0.85rem;
          color: var(--eco-muted);
          line-height: 1.5;
        }

        .readout-warning {
          margin-top: 10px;
          padding: 8px 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--eco-accent2);
        }
      `}</style>
    </div>
  );
}
