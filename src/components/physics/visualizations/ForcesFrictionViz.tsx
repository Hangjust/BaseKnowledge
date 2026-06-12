"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ForcesFrictionVizProps = {
  interactive?: boolean;
};

export default function ForcesFrictionViz({ interactive = false }: ForcesFrictionVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);
  const boxStateRef = useRef({ x: 0, v: 0, moving: false });

  const [pushForce, setPushForce] = useState(8);
  const [friction, setFriction] = useState(3);
  const [forceDirection, setForceDirection] = useState<"right" | "left">("right");
  const [isPlaying, setIsPlaying] = useState(false);
  const [finalDistance, setFinalDistance] = useState(0);
  const [finalVelocity, setFinalVelocity] = useState(0);

  const BOX_SIZE = 44;
  const FLOOR_Y_RATIO = 0.62;
  const MAX_TRAVEL = 280;

  const drawArrow = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      color: string,
      label: string
    ) => {
      const dx = toX - fromX;
      const dy = toY - fromY;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 2) return;
      const nx = dx / len;
      const ny = dy / len;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      const headSize = 8;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headSize * nx + headSize * ny * 0.4, toY - headSize * ny - headSize * nx * 0.4);
      ctx.lineTo(toX - headSize * nx - headSize * ny * 0.4, toY - headSize * ny + headSize * nx * 0.4);
      ctx.closePath();
      ctx.fill();

      if (label) {
        ctx.fillStyle = color;
        ctx.font = "11px Inter, sans-serif";
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2;
        ctx.fillText(label, midX + 6, midY - 6);
      }
    },
    []
  );

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      currentPush: number,
      currentFriction: number,
      direction: "right" | "left",
      elapsed: number,
      playing: boolean
    ) => {
      ctx.clearRect(0, 0, width, height);

      const floorY = height * FLOOR_Y_RATIO;
      const centerX = width * 0.5;
      const originX = centerX - MAX_TRAVEL / 2;

      // Background panel
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.roundRect(8, 8, width - 16, height - 16, 10);
      ctx.fill();

      // Floor
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(24, floorY, width - 48, height - floorY - 16);
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      ctx.strokeRect(24, floorY, width - 48, height - floorY - 16);

      // Floor texture lines
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 0.5;
      for (let x = 32; x < width - 32; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, floorY + 6);
        ctx.lineTo(x + 8, floorY + 14);
        ctx.stroke();
      }

      // Box position
      let boxX = originX;
      let boxV = 0;
      const dir = direction === "right" ? 1 : -1;
      if (playing) {
        const netForce = currentPush - currentFriction;
        if (netForce > 0) {
          const accel = netForce * 0.6;
          boxV = accel * elapsed;
          boxX = originX + dir * boxV * elapsed * 30;
          if (boxX > originX + MAX_TRAVEL) {
            boxX = originX + MAX_TRAVEL;
            boxV = 0;
          }
          if (boxX < originX - MAX_TRAVEL) {
            boxX = originX - MAX_TRAVEL;
            boxV = 0;
          }
        }
        boxStateRef.current = { x: boxX - originX, v: boxV, moving: netForce > 0 && boxX > originX - MAX_TRAVEL && boxX < originX + MAX_TRAVEL };
      } else {
        boxX = originX + boxStateRef.current.x;
        boxV = boxStateRef.current.v;
      }

      // Box shadow
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.beginPath();
      ctx.ellipse(boxX + BOX_SIZE / 2, floorY + 4, BOX_SIZE * 0.6, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Box
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.roundRect(boxX, floorY - BOX_SIZE, BOX_SIZE, BOX_SIZE, 6);
      ctx.fill();
      ctx.strokeStyle = "#0ea5e9";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Box face detail
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.beginPath();
      ctx.roundRect(boxX + 6, floorY - BOX_SIZE + 6, BOX_SIZE - 12, BOX_SIZE * 0.35, 4);
      ctx.fill();

      // Force arrows
      const arrowY = floorY - BOX_SIZE / 2;
      const arrowScale = 10;

      // Push / Pull arrow
      const pushColor = "#fbbf24";
      const pushLabel = direction === "right" ? "Push" : "Pull";
      if (direction === "right") {
        drawArrow(ctx, boxX + BOX_SIZE + 4, arrowY, boxX + BOX_SIZE + 4 + currentPush * arrowScale, arrowY, pushColor, pushLabel);
      } else {
        drawArrow(ctx, boxX - 4, arrowY, boxX - 4 - currentPush * arrowScale, arrowY, pushColor, pushLabel);
      }

      // Friction arrow (opposes motion)
      const frictionColor = "#f87171";
      if (currentPush > currentFriction && (playing || boxStateRef.current.moving)) {
        // Friction opposes direction of motion
        const frictionDir = direction === "right" ? -1 : 1;
        const fx = boxX + BOX_SIZE / 2;
        drawArrow(ctx, fx, floorY - 4, fx + frictionDir * currentFriction * arrowScale, floorY - 4, frictionColor, "Friction");
      } else {
        // Static friction hint (small arrow near box bottom)
        const fx = boxX + BOX_SIZE / 2;
        const frictionDir = direction === "right" ? -1 : 1;
        drawArrow(ctx, fx, floorY - 4, fx + frictionDir * currentFriction * arrowScale * 0.5, floorY - 4, "#ef4444", "Friction");
      }

      // Normal force (upward)
      drawArrow(ctx, boxX + BOX_SIZE / 2, floorY - BOX_SIZE - 4, boxX + BOX_SIZE / 2, floorY - BOX_SIZE - 24, "#34d399", "Normal");

      // Weight (downward)
      drawArrow(ctx, boxX + BOX_SIZE / 2, floorY - 4, boxX + BOX_SIZE / 2, floorY + 20, "#94a3b8", "Weight");

      // Net force indicator
      const netForce = currentPush - currentFriction;
      const netColor = netForce > 0 ? "#34d399" : "#f87171";
      ctx.fillStyle = netColor;
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(`Net force: ${netForce > 0 ? "+" : ""}${netForce.toFixed(1)} N`, 24, 28);

      // Metrics panel
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      const infoX = width - 150;
      ctx.fillText(`Push: ${currentPush.toFixed(1)} N`, infoX, 28);
      ctx.fillText(`Friction: ${currentFriction.toFixed(1)} N`, infoX, 46);
      ctx.fillText(`Direction: ${direction === "right" ? "→ Right" : "← Left"}`, infoX, 64);

      if (playing || boxStateRef.current.x !== 0) {
        ctx.fillText(`Velocity: ${boxV.toFixed(1)} m/s`, infoX, 82);
        ctx.fillText(`Distance: ${(boxStateRef.current.x / 30).toFixed(1)} m`, infoX, 100);
      }

      // Status text
      if (!playing) {
        ctx.fillStyle = "#64748b";
        ctx.font = "11px Inter, sans-serif";
        if (netForce <= 0) {
          ctx.fillText("Box stays still — friction balances the push.", 24, height - 20);
        } else if (Math.abs(boxStateRef.current.x) >= MAX_TRAVEL) {
          ctx.fillText("Box reached the edge.", 24, height - 20);
        } else {
          ctx.fillText("Press Play to see motion.", 24, height - 20);
        }
      } else {
        ctx.fillStyle = "#38bdf8";
        ctx.font = "11px Inter, sans-serif";
        if (netForce > 0 && boxX > originX - MAX_TRAVEL && boxX < originX + MAX_TRAVEL) {
          ctx.fillText("▶ Moving…", 24, height - 20);
        } else if (netForce <= 0) {
          ctx.fillText("No motion — push ≤ friction.", 24, height - 20);
        }
      }
    },
    [drawArrow]
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
      draw(ctx, rect.width, rect.height, pushForce, friction, forceDirection, timeRef.current, isPlaying);
    };

    resizeAndDraw();

    if (isPlaying) {
      timeRef.current = 0;
      boxStateRef.current = { x: 0, v: 0, moving: true };
      const startTime = performance.now();
      const animate = () => {
        const now = performance.now();
        timeRef.current = (now - startTime) / 1000;
        const rect = canvas.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, pushForce, friction, forceDirection, timeRef.current, true);

        const netForce = pushForce - friction;
        if (netForce > 0 && Math.abs(boxStateRef.current.x) < MAX_TRAVEL) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
          setFinalDistance(boxStateRef.current.x / 30);
          setFinalVelocity(boxStateRef.current.v);
        }
      };
      animRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeAndDraw);
    return () => {
      window.removeEventListener("resize", resizeAndDraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, pushForce, friction, forceDirection, isPlaying]);

  const handlePlay = () => {
    boxStateRef.current = { x: 0, v: 0, moving: false };
    setFinalDistance(0);
    setFinalVelocity(0);
    setIsPlaying(true);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: 340 }}
        aria-label="Forces and friction simulation with push, pull, and friction arrows"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Push / Pull force (N)</span>
              <output>{pushForce.toFixed(1)} N</output>
            </label>
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={pushForce}
              onChange={(e) => {
                setPushForce(Number(e.target.value));
                setIsPlaying(false);
              }}
            />
          </div>

          <div className="physics-control-row">
            <label>
              <span>Friction (N)</span>
              <output>{friction.toFixed(1)} N</output>
            </label>
            <input
              type="range"
              min={0}
              max={15}
              step={0.5}
              value={friction}
              onChange={(e) => {
                setFriction(Number(e.target.value));
                setIsPlaying(false);
              }}
            />
          </div>

          <div className="physics-control-row">
            <label>
              <span>Force direction</span>
              <output>{forceDirection === "right" ? "Push →" : "Pull ←"}</output>
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className={`physics-btn ${forceDirection === "right" ? "physics-btn-primary" : "physics-btn-secondary"}`}
                onClick={() => {
                  setForceDirection("right");
                  setIsPlaying(false);
                }}
                style={{ padding: "6px 14px", fontSize: "0.82rem" }}
              >
                Push →
              </button>
              <button
                type="button"
                className={`physics-btn ${forceDirection === "left" ? "physics-btn-primary" : "physics-btn-secondary"}`}
                onClick={() => {
                  setForceDirection("left");
                  setIsPlaying(false);
                }}
                style={{ padding: "6px 14px", fontSize: "0.82rem" }}
              >
                Pull ←
              </button>
            </div>
          </div>

          <button
            type="button"
            className="physics-btn physics-btn-primary"
            onClick={handlePlay}
            disabled={isPlaying}
            style={{ marginTop: 4 }}
          >
            {isPlaying ? "Running…" : "Play"}
          </button>

          {Math.abs(finalDistance) > 0 && !isPlaying && (
            <p className="physics-play-hint">
              The box moved {Math.abs(finalDistance).toFixed(1)} m {finalDistance > 0 ? "right" : "left"} with a final velocity of{" "}
              {finalVelocity.toFixed(1)} m/s. When push exceeds friction, motion begins.
            </p>
          )}

          {finalDistance === 0 && !isPlaying && pushForce <= friction && (
            <p className="physics-play-hint">
              Push force ({pushForce.toFixed(1)} N) is less than or equal to friction ({friction.toFixed(1)} N). The box will not move.
            </p>
          )}

          {finalDistance === 0 && !isPlaying && pushForce > friction && (
            <p className="physics-play-hint">
              Push ({pushForce.toFixed(1)} N) exceeds friction ({friction.toFixed(1)} N). Press Play to see the box accelerate.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
