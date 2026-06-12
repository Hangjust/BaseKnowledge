/**
 * =============================================================================
 * LightShadowViz — Light, shadows, and material transparency (learn + play)
 * =============================================================================
 *
 * Shows a lamp beam hitting transparent, translucent, and opaque materials.
 * In play mode, learners move the light and an opaque blocker to see how
 * shadow size and position change.
 *
 * Props:
 *   interactive — when true, shows sliders to move light and blocker
 * =============================================================================
 */

"use client";

import { useCallback, useEffect, useRef } from "react";

type LightShadowVizProps = {
  interactive?: boolean;
};

export default function LightShadowViz({ interactive = false }: LightShadowVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightYRef = useRef(0.35); // 0–1 relative height
  const blockerXRef = useRef(0.55); // 0–1 relative width

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, lightY: number, blockerX: number) => {
      ctx.clearRect(0, 0, width, height);

      const groundY = height * 0.78;
      const lampX = width * 0.12;
      const lampY = height * lightY;
      const beamEndX = width * 0.92;
      const materialY = groundY - height * 0.22;
      const materialH = height * 0.22;

      // Ground / table surface
      ctx.fillStyle = "#0f1520";
      ctx.fillRect(0, groundY, width, height - groundY);
      ctx.strokeStyle = "#2a3548";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Lamp housing
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.ellipse(lampX, lampY, 18, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Lamp bulb glow
      const glow = ctx.createRadialGradient(lampX + 6, lampY, 2, lampX + 6, lampY, 28);
      glow.addColorStop(0, "rgba(251, 191, 36, 0.9)");
      glow.addColorStop(0.5, "rgba(251, 191, 36, 0.25)");
      glow.addColorStop(1, "rgba(251, 191, 36, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(lampX + 6, lampY, 28, 0, Math.PI * 2);
      ctx.fill();

      // Lamp label
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText("Light source", lampX - 32, lampY - 24);

      // Beam cone (subtle fill behind everything)
      ctx.fillStyle = "rgba(251, 191, 36, 0.06)";
      ctx.beginPath();
      ctx.moveTo(lampX + 10, lampY - 10);
      ctx.lineTo(beamEndX, groundY - height * 0.38);
      ctx.lineTo(beamEndX, groundY);
      ctx.lineTo(lampX + 10, lampY + 10);
      ctx.closePath();
      ctx.fill();

      // Central beam line
      ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lampX + 10, lampY);
      ctx.lineTo(beamEndX, groundY - height * 0.18);
      ctx.stroke();

      // === Material 1: Transparent (Glass) ===
      const glassX = width * 0.38;
      const glassW = width * 0.12;
      drawMaterial(ctx, glassX, materialY, glassW, materialH, "transparent");
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Transparent", glassX + 6, materialY - 8);
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText("(glass)", glassX + 6, materialY + 12);

      // Beam through glass (slightly refracted, mostly straight)
      ctx.strokeStyle = "rgba(251, 191, 36, 0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lampX + 10, lampY);
      ctx.lineTo(glassX, lampY + (groundY - height * 0.18 - lampY) * ((glassX - lampX) / (beamEndX - lampX)));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(glassX + glassW, lampY + (groundY - height * 0.18 - lampY) * ((glassX + glassW - lampX) / (beamEndX - lampX)));
      ctx.lineTo(beamEndX, groundY - height * 0.18);
      ctx.stroke();

      // === Material 2: Translucent (Frosted glass) ===
      const frostedX = width * 0.58;
      const frostedW = width * 0.12;
      drawMaterial(ctx, frostedX, materialY, frostedW, materialH, "translucent");
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Translucent", frostedX + 6, materialY - 8);
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText("(frosted)", frostedX + 6, materialY + 12);

      // Diffused beam after translucent
      ctx.strokeStyle = "rgba(251, 191, 36, 0.12)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(frostedX + frostedW, materialY + materialH * 0.5);
      ctx.lineTo(beamEndX, groundY - height * 0.25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(frostedX + frostedW, materialY + materialH * 0.5);
      ctx.lineTo(beamEndX, groundY - height * 0.10);
      ctx.stroke();

      // === Material 3: Opaque (Wood/Block) — interactive blocker ===
      const blockX = width * blockerX;
      const blockW = width * 0.10;
      const blockH = height * 0.18;
      const blockY = groundY - blockH;
      drawMaterial(ctx, blockX, blockY, blockW, blockH, "opaque");
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Opaque", blockX + 6, blockY - 8);
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText("(wood)", blockX + 6, blockY + 14);

      // Shadow calculation
      const shadowStartX = blockX + blockW;
      const shadowTopY = blockY;
      const shadowBottomY = groundY;
      const shadowEndX = shadowStartX + (beamEndX - lampX) * ((groundY - lampY) / (groundY - lampY));
      const shadowFarX = shadowStartX + (groundY - blockY) * (beamEndX - lampX) / (groundY - lampY);

      // Shadow on ground
      ctx.fillStyle = "rgba(2, 6, 23, 0.85)";
      ctx.beginPath();
      ctx.moveTo(shadowStartX, groundY);
      ctx.lineTo(Math.min(shadowFarX, width - 8), groundY);
      ctx.lineTo(Math.min(shadowFarX, width - 8), groundY - 4);
      ctx.lineTo(shadowStartX, groundY - 4);
      ctx.closePath();
      ctx.fill();

      // Shadow edge line
      ctx.strokeStyle = "rgba(2, 6, 23, 0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(blockX + blockW, blockY);
      ctx.lineTo(Math.min(shadowFarX, width - 8), groundY);
      ctx.stroke();

      // Shadow label
      const shadowLabelX = (shadowStartX + Math.min(shadowFarX, width - 8)) / 2;
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText("Shadow", shadowLabelX - 16, groundY + 14);

      // Legend
      ctx.fillStyle = "#e8edf5";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("Legend:", 12, 18);
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(62, 10, 12, 8);
      ctx.fillStyle = "#8b9cb3";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText("Light beam", 78, 18);

      ctx.fillStyle = "rgba(56, 189, 248, 0.35)";
      ctx.fillRect(140, 10, 12, 8);
      ctx.fillStyle = "#8b9cb3";
      ctx.fillText("Transparent", 156, 18);

      ctx.fillStyle = "rgba(251, 191, 36, 0.25)";
      ctx.fillRect(230, 10, 12, 8);
      ctx.fillStyle = "#8b9cb3";
      ctx.fillText("Translucent", 246, 18);

      ctx.fillStyle = "#475569";
      ctx.fillRect(320, 10, 12, 8);
      ctx.fillStyle = "#8b9cb3";
      ctx.fillText("Opaque", 336, 18);
    },
    []
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
      draw(ctx, rect.width, rect.height, lightYRef.current, blockerXRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: 320 }}
        aria-label="Light and shadow visualization showing transparent, translucent, and opaque materials"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Light source height</span>
              <output>{Math.round(lightYRef.current * 100)}%</output>
            </label>
            <input
              type="range"
              min={15}
              max={65}
              value={Math.round(lightYRef.current * 100)}
              onChange={(e) => {
                const value = Number(e.target.value) / 100;
                lightYRef.current = value;
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                const rect = canvas.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                draw(ctx, rect.width, rect.height, value, blockerXRef.current);
              }}
            />
          </div>
          <div className="physics-control-row">
            <label>
              <span>Opaque blocker position</span>
              <output>{Math.round(blockerXRef.current * 100)}%</output>
            </label>
            <input
              type="range"
              min={45}
              max={75}
              value={Math.round(blockerXRef.current * 100)}
              onChange={(e) => {
                const value = Number(e.target.value) / 100;
                blockerXRef.current = value;
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                const rect = canvas.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                draw(ctx, rect.width, rect.height, lightYRef.current, value);
              }}
            />
          </div>
          <p className="physics-play-hint">
            Move the light up and down, then slide the blocker. Watch how the shadow grows or shrinks. Higher light = longer shadow!
          </p>
        </div>
      )}
    </div>
  );
}

function drawMaterial(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  type: "transparent" | "translucent" | "opaque"
) {
  ctx.save();
  if (type === "transparent") {
    // Glass: light blue tint, visible edges
    ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    // Reflection highlight
    ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 4, y + h - 6);
    ctx.lineTo(x + w - 4, y + 6);
    ctx.stroke();
  } else if (type === "translucent") {
    // Frosted: warm tint, blurry look via pattern
    ctx.fillStyle = "rgba(251, 191, 36, 0.18)";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    // Dots for frosted texture
    ctx.fillStyle = "rgba(251, 191, 36, 0.15)";
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 10; j++) {
        ctx.beginPath();
        ctx.arc(x + 8 + i * ((w - 16) / 5), y + 8 + j * ((h - 16) / 9), 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else {
    // Opaque: solid dark block
    ctx.fillStyle = "#334155";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    // Wood grain lines
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(x + 4, y + (h * i) / 4);
      ctx.lineTo(x + w - 4, y + (h * i) / 4);
      ctx.stroke();
    }
  }
  ctx.restore();
}
