"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type MotionTrackVizProps = {
  interactive?: boolean;
};

export default function MotionTrackViz({ interactive = false }: MotionTrackVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);

  const [speed, setSpeed] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [predictedDistance, setPredictedDistance] = useState<number | null>(null);
  const [runDistance, setRunDistance] = useState(0);
  const [runTime, setRunTime] = useState(0);

  const TRACK_LENGTH_METERS = 20;
  const PADDING_X = 48;
  const PADDING_Y = 40;

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      currentSpeed: number,
      elapsed: number,
      playing: boolean,
      prediction: number | null
    ) => {
      ctx.clearRect(0, 0, width, height);

      const trackY = height * 0.28;
      const trackHeight = 56;
      const graphTop = height * 0.58;
      const graphHeight = height * 0.32;
      const trackLeft = PADDING_X;
      const trackRight = width - PADDING_X;
      const trackWidth = trackRight - trackLeft;

      // Background panel
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.roundRect(8, 8, width - 16, height - 16, 10);
      ctx.fill();

      // Track surface
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.roundRect(trackLeft, trackY, trackWidth, trackHeight, 6);
      ctx.fill();
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Track lane markings
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 10]);
      ctx.beginPath();
      ctx.moveTo(trackLeft, trackY + trackHeight / 2);
      ctx.lineTo(trackRight, trackY + trackHeight / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Start line
      ctx.strokeStyle = "#34d399";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(trackLeft + 2, trackY - 4);
      ctx.lineTo(trackLeft + 2, trackY + trackHeight + 4);
      ctx.stroke();

      // Finish line (checkered)
      const finishX = trackRight - 2;
      ctx.fillStyle = "#f87171";
      for (let i = 0; i < 6; i++) {
        const y = trackY - 4 + (i * (trackHeight + 8)) / 6;
        const h = (trackHeight + 8) / 6;
        ctx.fillRect(finishX - 3, y, 6, h / 2);
      }
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(finishX, trackY - 4);
      ctx.lineTo(finishX, trackY + trackHeight + 4);
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("START", trackLeft, trackY - 12);
      ctx.fillText("FINISH", trackRight - 36, trackY - 12);

      // Distance markers every 5m
      ctx.fillStyle = "#64748b";
      ctx.font = "10px Inter, sans-serif";
      for (let m = 0; m <= TRACK_LENGTH_METERS; m += 5) {
        const x = trackLeft + (m / TRACK_LENGTH_METERS) * trackWidth;
        ctx.fillText(`${m}m`, x - 8, trackY + trackHeight + 18);
        ctx.beginPath();
        ctx.moveTo(x, trackY + trackHeight);
        ctx.lineTo(x, trackY + trackHeight + 6);
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Ball position
      let ballX = trackLeft + 14;
      let ballProgress = 0;
      if (playing) {
        const totalTime = TRACK_LENGTH_METERS / currentSpeed;
        ballProgress = Math.min(elapsed / totalTime, 1);
        ballX = trackLeft + 14 + ballProgress * (trackWidth - 28);
      }

      // Prediction ghost (when not playing but prediction exists)
      if (!playing && prediction !== null && interactive) {
        const ghostProgress = Math.min(prediction / TRACK_LENGTH_METERS, 1);
        const ghostX = trackLeft + 14 + ghostProgress * (trackWidth - 28);
        ctx.fillStyle = "rgba(251, 191, 36, 0.25)";
        ctx.beginPath();
        ctx.arc(ghostX, trackY + trackHeight / 2, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(251, 191, 36, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Ball
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(ballX, trackY + trackHeight / 2, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Ball shine
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.beginPath();
      ctx.arc(ballX - 3, trackY + trackHeight / 2 - 3, 4, 0, Math.PI * 2);
      ctx.fill();

      // Speed arrow on ball
      if (playing && ballProgress < 1) {
        const arrowLen = 18 + currentSpeed * 1.5;
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ballX + 12, trackY + trackHeight / 2);
        ctx.lineTo(ballX + 12 + arrowLen, trackY + trackHeight / 2);
        ctx.stroke();
        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(ballX + 12 + arrowLen, trackY + trackHeight / 2);
        ctx.lineTo(ballX + 8 + arrowLen, trackY + trackHeight / 2 - 4);
        ctx.lineTo(ballX + 8 + arrowLen, trackY + trackHeight / 2 + 4);
        ctx.closePath();
        ctx.fillStyle = "#38bdf8";
        ctx.fill();
      }

      // Distance-time graph
      const graphLeft = trackLeft;
      const graphRight = trackRight;
      const graphWidth = graphRight - graphLeft;
      const graphBottom = graphTop + graphHeight;

      // Graph background
      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.roundRect(graphLeft, graphTop, graphWidth, graphHeight, 6);
      ctx.fill();
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Graph axes
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(graphLeft, graphTop);
      ctx.lineTo(graphLeft, graphBottom);
      ctx.lineTo(graphRight, graphBottom);
      ctx.stroke();

      // Graph labels
      ctx.fillStyle = "#64748b";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText("Distance (m)", graphLeft + 4, graphTop + 12);
      ctx.fillText("Time (s)", graphRight - 40, graphBottom - 4);

      // Graph grid lines
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 0.5;
      for (let i = 1; i <= 4; i++) {
        const y = graphTop + (i / 4) * graphHeight;
        ctx.beginPath();
        ctx.moveTo(graphLeft, y);
        ctx.lineTo(graphRight, y);
        ctx.stroke();
        ctx.fillText(`${(TRACK_LENGTH_METERS * (1 - i / 4)).toFixed(0)}m`, graphLeft + 4, y - 2);
      }

      // Distance-time line (theoretical slope = speed)
      const maxTime = TRACK_LENGTH_METERS / Math.max(currentSpeed, 1);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(graphLeft, graphBottom);
      const endX = graphLeft + Math.min((maxTime > 0 ? 1 / maxTime : 0) * graphWidth, graphWidth);
      const endY = graphTop;
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Traveled portion of graph (when playing)
      if (playing) {
        const totalTime = TRACK_LENGTH_METERS / currentSpeed;
        const t = Math.min(elapsed, totalTime);
        const traveledX = graphLeft + (t / maxTime) * graphWidth;
        const traveledY = graphBottom - (t / maxTime) * graphHeight;

        ctx.strokeStyle = "#f97316";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(graphLeft, graphBottom);
        ctx.lineTo(traveledX, traveledY);
        ctx.stroke();

        // Current point dot
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.arc(traveledX, traveledY, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Info panel (top-right)
      ctx.fillStyle = "#e8edf5";
      ctx.font = "12px Inter, sans-serif";
      const infoX = width - 140;
      ctx.fillText(`Speed: ${currentSpeed.toFixed(1)} m/s`, infoX, 28);
      if (playing) {
        const totalTime = TRACK_LENGTH_METERS / currentSpeed;
        const t = Math.min(elapsed, totalTime);
        const d = Math.min(t * currentSpeed, TRACK_LENGTH_METERS);
        ctx.fillText(`Time: ${t.toFixed(1)} s`, infoX, 46);
        ctx.fillText(`Distance: ${d.toFixed(1)} m`, infoX, 64);
      } else {
        const estTime = TRACK_LENGTH_METERS / currentSpeed;
        ctx.fillText(`Est. time: ${estTime.toFixed(1)} s`, infoX, 46);
        ctx.fillText(`Track: ${TRACK_LENGTH_METERS} m`, infoX, 64);
      }

      // Prediction label
      if (!playing && prediction !== null && interactive) {
        ctx.fillStyle = "#fbbf24";
        ctx.font = "11px Inter, sans-serif";
        ctx.fillText(`Predicted: ${prediction.toFixed(1)} m`, infoX, 82);
      }
    },
    [interactive]
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
      draw(ctx, rect.width, rect.height, speed, timeRef.current, isPlaying, predictedDistance);
    };

    resizeAndDraw();

    if (isPlaying) {
      timeRef.current = 0;
      const startTime = performance.now();
      const animate = () => {
        const now = performance.now();
        timeRef.current = (now - startTime) / 1000;
        const totalTime = TRACK_LENGTH_METERS / speed;

        const rect = canvas.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, speed, timeRef.current, true, predictedDistance);

        if (timeRef.current < totalTime + 0.3) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
          setRunTime(totalTime);
          setRunDistance(TRACK_LENGTH_METERS);
        }
      };
      animRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeAndDraw);
    return () => {
      window.removeEventListener("resize", resizeAndDraw);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, speed, isPlaying, predictedDistance]);

  const handlePredict = () => {
    const est = (TRACK_LENGTH_METERS / speed) * speed;
    setPredictedDistance(est);
  };

  const handlePlay = () => {
    setRunDistance(0);
    setRunTime(0);
    setIsPlaying(true);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="physics-canvas"
        style={{ height: 360 }}
        aria-label="Motion track with distance-time graph"
      />

      {interactive && (
        <div className="physics-controls">
          <div className="physics-control-row">
            <label>
              <span>Speed</span>
              <output>{speed.toFixed(1)} m/s</output>
            </label>
            <input
              type="range"
              min={1}
              max={15}
              step={0.5}
              value={speed}
              onChange={(e) => {
                const v = Number(e.target.value);
                setSpeed(v);
                setPredictedDistance(null);
                setIsPlaying(false);
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <button
              type="button"
              className="physics-btn physics-btn-secondary"
              onClick={handlePredict}
              disabled={isPlaying}
            >
              Predict
            </button>
            <button
              type="button"
              className="physics-btn physics-btn-primary"
              onClick={handlePlay}
              disabled={isPlaying}
            >
              {isPlaying ? "Running…" : "Play"}
            </button>
          </div>

          {predictedDistance !== null && !isPlaying && (
            <p className="physics-play-hint">
              Predicted distance: {predictedDistance.toFixed(1)} m. Click Play to watch the ball
              travel at {speed.toFixed(1)} m/s.
            </p>
          )}

          {runDistance > 0 && !isPlaying && (
            <p className="physics-play-hint">
              Run complete: {runDistance.toFixed(1)} m in {runTime.toFixed(1)} s. The slope of the
              distance-time graph equals speed.
            </p>
          )}

          {!predictedDistance && !isPlaying && runDistance === 0 && (
            <p className="physics-play-hint">
              Set a speed, predict the distance, then press Play. A steeper graph slope means
              faster motion.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
