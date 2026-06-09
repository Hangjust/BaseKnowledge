/**
 * =============================================================================
 * TopicPlayView — "Visualization play" interactive sandbox
 * =============================================================================
 *
 * Wraps the interactive variant of each topic's visualization with sliders.
 * State is local — no server calls.
 *
 * TO ADD A NEW TOPIC: add a case in resolvePlayVisualization().
 * =============================================================================
 */

"use client";

import { useState } from "react";
import MirrorReflectionViz from "@/components/physics/visualizations/MirrorReflectionViz";
import ProjectileMotionViz from "@/components/physics/visualizations/ProjectileMotionViz";
import type { PhysicsTopicContent } from "@/lib/physics/types";

export default function TopicPlayView({ topic }: { topic: PhysicsTopicContent }) {
  return (
    <div className="physics-viz-panel" style={{ position: "static", maxWidth: 720 }}>
      <h4 style={{ marginBottom: 4 }}>Interactive sandbox</h4>
      <p style={{ color: "var(--phys-muted)", fontSize: "0.9rem", margin: "0 0 16px" }}>
        {playDescription(topic.meta.slug)}
      </p>
      {resolvePlayVisualization(topic.meta.slug)}
    </div>
  );
}

function playDescription(slug: string): string {
  switch (slug) {
    case "optics":
      return "Move the incidence angle and observe how the reflected ray mirrors it about the normal.";
    case "classical-mechanics":
      return "Change launch angle and speed — watch the projectile arc and notice horizontal velocity stays constant.";
    default:
      return "Adjust parameters to explore this topic.";
  }
}

function OpticsPlay() {
  const [angle, setAngle] = useState(35);
  return <MirrorReflectionViz interactive incidenceAngle={angle} onAngleChange={setAngle} />;
}

function MechanicsPlay() {
  const [angle, setAngle] = useState(45);
  const [speed, setSpeed] = useState(20);
  return (
    <ProjectileMotionViz
      interactive
      launchAngle={angle}
      launchSpeed={speed}
      onAngleChange={setAngle}
      onSpeedChange={setSpeed}
    />
  );
}

function resolvePlayVisualization(slug: string) {
  switch (slug) {
    case "optics":
      return <OpticsPlay />;
    case "classical-mechanics":
      return <MechanicsPlay />;
    default:
      return <p style={{ color: "var(--phys-muted)" }}>Play mode not configured.</p>;
  }
}
