/**
 * =============================================================================
 * MagnetSandboxViz — magnet poles, attraction, and repulsion (learn + play)
 * =============================================================================
 *
 * Shows two bar magnets with north/south poles, paper clips, and other materials.
 * In play mode the learner can flip either magnet, change distance, and pick a
 * test object to observe attraction or repulsion.
 *
 * Props:
 *   interactive — when true, shows flip buttons, distance slider, and material
 *                 selector (play mode)
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type MagnetSandboxVizProps = {
  interactive?: boolean;
};

type MaterialType = "paper-clip" | "nail" | "plastic" | "aluminum";

export default function MagnetSandboxViz({ interactive = false }: MagnetSandboxVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);

  const [magnet1Flipped, setMagnet1Flipped] = useState(false);
  const [magnet2Flipped, setMagnet2Flipped] = useState(false);
  const [distancePercent, setDistancePercent] = useState(50);
  const [material, setMaterial] = useState<MaterialType>("paper-clip");

  const drawMagnet = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      width: number,
      height: number,
      flipped: boolean,
      label: string
    ) => {
      const halfW = width / 2;
      const halfH = height / 2;

      // North half (red)
      ctx.fillStyle = "#f87171";
      ctx.beginPath();
      ctx.roundRect(
        flipped ? cx : cx - halfW,
        cy - halfH,
        halfW,
        height,
        [4, 0, 0, 4]
      );
      ctx.fill();

      // South half (blue)
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.roundRect(
        flipped ? cx - halfW : cx,
        cy - halfH,
        halfW,
        height,
        [0, 4, 4, 0]
      );
      ctx.fill();

      // Border
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx - halfW, cy - halfH, width, height, 4);
      ctx.stroke();

      // Pole labels
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 13px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(flipped ? "S" : "N", flipped ? cx + halfW * 0.5 : cx - halfW * 0.5, cy);
      ctx.fillText(flipped ? "N" : "S", flipped ? cx - halfW * 0.5 : cx + halfW * 0.5, cy);

      // Magnet label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, cx, cy + halfH + 18);
    },
    []
  );

  const drawMaterial = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, mat: MaterialType) => {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (mat === "paper-clip") {
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 10, y + 6);
        ctx.lineTo(x - 10, y - 4);
        ctx.arc(x - 5, y - 4, 5, Math.PI, 0);
        ctx.lineTo(x, y + 6);
        ctx.stroke();
        ctx.fillStyle = "#e8edf5";
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText("Paper clip", x, y + 16);
      } else if (mat === "nail") {
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(x - 12, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
        ctx.fillStyle = "#64748b";
        ctx.beginPath();
        ctx.arc(x + 10, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e8edf5";
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText("Steel nail", x, y + 16);
      } else if (mat === "plastic") {
        ctx.fillStyle = "#ec4899";
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#f472b6";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#e8edf5";
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText("Plastic", x, y + 18);
      } else {
        // aluminum
        ctx.fillStyle = "#a8a29e";
        ctx.fillRect(x - 10, y - 6, 20, 12);
        ctx.strokeStyle = "#d6d3d1";
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 10, y - 6, 20, 12);
        ctx.fillStyle = "#e8edf5";
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText("Aluminum", x, y + 18);
      }
    },
    []
  );

  const drawForceArrows = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      forceType: "attract" | "repel" | "none"
    ) => {
      if (forceType === "none") return;

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const color = forceType === "attract" ? "#34d399" : "#f87171";
      const label = forceType === "attract" ? "Attract" : "Repel";

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2;

      if (forceType === "attract") {
        // Arrows pointing toward each other
        const arrowLen = 18;
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // Left arrow (pointing right)
        ctx.beginPath();
        ctx.moveTo(midX - arrowLen - 6, midY);
        ctx.lineTo(midX - 6, midY);
        ctx.stroke();
        drawArrowHead(ctx, midX - 6, midY, angle);

        // Right arrow (pointing left)
        ctx.beginPath();
        ctx.moveTo(midX + arrowLen + 6, midY);
        ctx.lineTo(midX + 6, midY);
        ctx.stroke();
        drawArrowHead(ctx, midX + 6, midY, angle + Math.PI);
      } else {
        // Arrows pointing away from each other
        const arrowLen = 18;
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // Left arrow (pointing left)
        ctx.beginPath();
        ctx.moveTo(midX - 6, midY);
        ctx.lineTo(midX - arrowLen - 6, midY);
        ctx.stroke();
        drawArrowHead(ctx, midX - arrowLen - 6, midY, angle + Math.PI);

        // Right arrow (pointing right)
        ctx.beginPath();
        ctx.moveTo(midX + 6, midY);
        ctx.lineTo(midX + arrowLen + 6, midY);
        ctx.stroke();
        drawArrowHead(ctx, midX + arrowLen + 6, midY, angle);
      }

      // Label
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, midX, midY - 14);
    },
    []
  );

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      m1Flipped: boolean,
      m2Flipped: boolean,
      distPct: number,
      mat: MaterialType,
      t: number
    ) => {
      ctx.clearRect(0, 0, width, height);

      const magnetW = 100;
      const magnetH = 32;
      const centerY = height * 0.38;
      const minGap = 40;
      const maxGap = width * 0.45;
      const gap = minGap + (distPct / 100) * (maxGap - minGap);
      const m1x = width * 0.5 - gap / 2 - magnetW / 2;
      const m2x = width * 0.5 + gap / 2 + magnetW / 2;

      // Determine force between magnets
      const m1RightPole = m1Flipped ? "S" : "N";
      const m2LeftPole = m2Flipped ? "N" : "S";
      const magnetForce: "attract" | "repel" | "none" =
        m1RightPole === m2LeftPole ? "repel" : "attract";

      // Draw magnets
      drawMagnet(ctx, m1x, centerY, magnetW, magnetH, m1Flipped, "Magnet A");
      drawMagnet(ctx, m2x, centerY, magnetW, magnetH, m2Flipped, "Magnet B");

      // Force arrows between magnets
      drawForceArrows(ctx, m1x + magnetW / 2, centerY, m2x - magnetW / 2, centerY, magnetForce);

      // Material object below magnets
      const matY = height * 0.72;
      const matX = width * 0.5;
      drawMaterial(ctx, matX, matY, mat);

      // Material interaction
      const magneticMaterials: MaterialType[] = ["paper-clip", "nail"];
      const isMagnetic = magneticMaterials.includes(mat);
      const matForce: "attract" | "none" = isMagnetic ? "attract" : "none";

      if (matForce === "attract") {
        // Slight pull animation toward nearest magnet
        const pullOffset = Math.sin(t * 0.08) * 3;
        const nearestMagnetX = m1x + magnetW / 2;
        const dx = nearestMagnetX - matX;
        const pullX = matX + dx * 0.08 + pullOffset;

        ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(matX, matY - 14);
        ctx.lineTo(pullX, centerY + magnetH / 2 + 8);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#34d399";
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Magnetic material — pulled toward magnet", matX, matY + 32);
      } else {
        ctx.fillStyle = "#64748b";
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Not strongly magnetic", matX, matY + 32);
      }

      // Info panel
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`Magnet A: ${m1Flipped ? "S–N" : "N–S"}`, 14, 22);
      ctx.fillText(`Magnet B: ${m2Flipped ? "S–N" : "N–S"}`, 14, 40);
      ctx.fillText(`Force: ${magnetForce === "attract" ? "Attract" : "Repel"}`, 14, 58);

      // Rule reminder
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Like poles repel • Unlike poles attract", width - 14, 22);
    },
    [drawMagnet, drawMaterial, drawForceArrows]
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
      draw(ctx, rect.width, rect.height, magnet1Flipped, magnet2Flipped, distancePercent, material, timeRef.current);
    };

    resizeAndDraw();

    if (interactive) {
      timeRef.current = 0;
      const animate = () => {
        timeRef.current += 1;
        const rect = canvas.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, magnet1Flipped, magnet2Flipped, distancePercent, material, timeRef.current);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeAndDraw);
    return () => {
      window.removeEventListener("resize", resizeAndDraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, magnet1Flipped, magnet2Flipped, distancePercent, material, interactive]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: 320 }}
        aria-label="Magnet sandbox with two bar magnets, test materials, and force indicators"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Magnet A orientation</span>
              <output>{magnet1Flipped ? "S–N" : "N–S"}</output>
            </label>
            <button
              type="button"
              className="physics-btn physics-btn-secondary"
              onClick={() => setMagnet1Flipped((f) => !f)}
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              Flip magnet A
            </button>
          </div>
          <div className="physics-control-row">
            <label>
              <span>Magnet B orientation</span>
              <output>{magnet2Flipped ? "S–N" : "N–S"}</output>
            </label>
            <button
              type="button"
              className="physics-btn physics-btn-secondary"
              onClick={() => setMagnet2Flipped((f) => !f)}
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              Flip magnet B
            </button>
          </div>
          <div className="physics-control-row">
            <label>
              <span>Distance between magnets</span>
              <output>{distancePercent}%</output>
            </label>
            <input
              type="range"
              min={10}
              max={90}
              value={distancePercent}
              onChange={(e) => setDistancePercent(Number(e.target.value))}
            />
          </div>
          <div className="physics-control-row">
            <label>
              <span>Test material</span>
              <output>{material.replace("-", " ")}</output>
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(["paper-clip", "nail", "plastic", "aluminum"] as MaterialType[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  className="physics-btn physics-btn-secondary"
                  onClick={() => setMaterial(m)}
                  style={{
                    padding: "6px 12px",
                    fontSize: "0.8rem",
                    borderColor: material === m ? "var(--topic-accent, var(--phys-accent))" : undefined,
                    color: material === m ? "var(--topic-accent, var(--phys-accent))" : undefined
                  }}
                >
                  {m.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
          <p className="physics-play-hint">
            Flip either magnet and watch the force change. Only some materials are pulled toward a magnet.
          </p>
        </div>
      )}
    </div>
  );
}

function drawArrowHead(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
  const size = 7;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-size, -size / 2);
  ctx.lineTo(-size, size / 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
