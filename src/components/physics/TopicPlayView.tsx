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
import CircuitBuilderViz from "@/components/physics/visualizations/CircuitBuilderViz";
import EnergyFlowViz from "@/components/physics/visualizations/EnergyFlowViz";
import ForcesFrictionViz from "@/components/physics/visualizations/ForcesFrictionViz";
import GravityOrbitViz from "@/components/physics/visualizations/GravityOrbitViz";
import HeatTemperatureViz from "@/components/physics/visualizations/HeatTemperatureViz";
import LightShadowViz from "@/components/physics/visualizations/LightShadowViz";
import MagnetSandboxViz from "@/components/physics/visualizations/MagnetSandboxViz";
import MirrorRayViz from "@/components/physics/visualizations/MirrorRayViz";
import MirrorReflectionViz from "@/components/physics/visualizations/MirrorReflectionViz";
import MotionTrackViz from "@/components/physics/visualizations/MotionTrackViz";
import ProjectileMotionViz from "@/components/physics/visualizations/ProjectileMotionViz";
import SoundWaveViz from "@/components/physics/visualizations/SoundWaveViz";
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
    case "motion":
      return "Set a speed, predict the distance, then press Play. A steeper graph slope means faster motion.";
    case "forces":
      return "Adjust push force and friction, choose direction, then press Play to see when motion begins.";
    case "gravity":
      return "Change gravity strength and press Drop — watch the fall speed and orbit speed change together.";
    case "light":
      return "Move the light up and down, then slide the blocker. Watch how the shadow grows or shrinks.";
    case "mirrors-and-reflection":
      return "Drag the slider — the reflected ray always bounces at the same angle. θi always equals θr!";
    case "electricity":
      return "Toggle the switch or break the wire — the bulb only lights when the loop is complete.";
    case "heat-temperature":
      return "Slide the hot-object temperature and watch heat flow arrows, thermometer level, and particle speed change.";
    case "sound":
      return "Change pitch (frequency) and loudness (amplitude) — watch the wave shape and vibration speed change.";
    case "energy":
      return "Pick a source and device — watch energy flow and change form. Notice some energy always becomes heat.";
    case "magnetism":
      return "Flip either magnet and watch the force change. Only some materials are pulled toward a magnet.";
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

function MotionPlay() {
  return <MotionTrackViz interactive />;
}

function ForcesPlay() {
  return <ForcesFrictionViz interactive />;
}

function GravityPlay() {
  return <GravityOrbitViz interactive />;
}

function LightPlay() {
  return <LightShadowViz interactive />;
}

function MirrorPlay() {
  return <MirrorRayViz interactive />;
}

function ElectricityPlay() {
  return <CircuitBuilderViz interactive />;
}

function HeatPlay() {
  return <HeatTemperatureViz interactive />;
}

function SoundPlay() {
  return <SoundWaveViz interactive />;
}

function EnergyPlay() {
  return <EnergyFlowViz interactive />;
}

function MagnetismPlay() {
  return <MagnetSandboxViz interactive />;
}

function resolvePlayVisualization(slug: string) {
  switch (slug) {
    case "optics":
      return <OpticsPlay />;
    case "classical-mechanics":
      return <MechanicsPlay />;
    case "motion":
      return <MotionPlay />;
    case "forces":
      return <ForcesPlay />;
    case "gravity":
      return <GravityPlay />;
    case "light":
      return <LightPlay />;
    case "mirrors-and-reflection":
      return <MirrorPlay />;
    case "electricity":
      return <ElectricityPlay />;
    case "heat-temperature":
      return <HeatPlay />;
    case "sound":
      return <SoundPlay />;
    case "energy":
      return <EnergyPlay />;
    case "magnetism":
      return <MagnetismPlay />;
    default:
      return <p style={{ color: "var(--phys-muted)" }}>Play mode not configured.</p>;
  }
}
