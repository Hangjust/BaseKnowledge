/**
 * =============================================================================
 * CLASSICAL MECHANICS — SECOND TEMPLATE TOPIC
 * =============================================================================
 *
 * Demonstrates the same four-mode structure with different physics content.
 * Use this file as a reference when adding topic #3+.
 * =============================================================================
 */

import type { PhysicsTopicContent } from "./types";

export const mechanicsContent: PhysicsTopicContent = {
  meta: {
    slug: "classical-mechanics",
    title: "Classical Mechanics",
    tagline: "Motion, forces, and projectile paths",
    description:
      "Study how objects move under gravity. Launch projectiles, adjust angle and speed, then solve kinematics problems.",
    accentColor: "#f97316",
    subtopics: ["Kinematics", "Projectile motion", "Velocity", "Gravity"],
    previewVisualization: "projectile"
  },

  learnChapter: {
    number: 1,
    title: "Projectile Motion",
    introduction:
      "Classical mechanics describes how objects move and respond to forces. Before studying forces in depth, we use kinematics — the mathematical description of motion. Projectile motion is one of the most important applications: any object launched into the air (a ball, a fountain jet, a spacecraft stage) follows a curved path under gravity. This chapter explains how to analyse that path by separating horizontal and vertical motion.",
    figureCaption:
      "The parabolic path of a projectile launched at angle θ with initial speed v₀. The horizontal component of velocity remains constant; the vertical component changes because gravity accelerates the object downward."
  },

  learnSections: [
    {
      id: "kinematics-basics",
      sectionNumber: "1.1",
      title: "Describing motion with kinematics",
      visualizationId: "projectile-basics",
      paragraphs: [
        "Kinematics uses position, velocity, and acceleration to describe how an object moves, without asking what caused the motion. A projectile is any object moving through the air under the influence of gravity alone, after the launch force is no longer applied. We idealise the problem by ignoring air resistance.",
        "Near Earth's surface, gravity pulls every object downward with a nearly constant acceleration of g ≈ 9.8 m/s². Because gravity acts vertically, it changes the vertical component of velocity but not the horizontal component. This independence is the key idea that makes projectile problems manageable.",
        "By treating horizontal and vertical motion separately and then combining the results, we can predict the complete trajectory: where the object lands, how long it stays in the air, and how high it rises."
      ],
      keyTerms: [
        {
          term: "Kinematics",
          definition: "The description of motion using position, velocity, and acceleration, without reference to forces."
        },
        {
          term: "Projectile",
          definition: "An object moving through the air under gravity alone, after launch."
        }
      ]
    },
    {
      id: "projectile-components",
      sectionNumber: "1.2",
      title: "Resolving the initial velocity",
      visualizationId: "projectile-basics",
      paragraphs: [
        "Suppose an object is launched with speed v₀ at an angle θ above the horizontal. We resolve this velocity into two perpendicular components. The horizontal component is v₀ cos θ and the vertical component is v₀ sin θ.",
        "During flight, the horizontal velocity vₓ remains constant (no horizontal acceleration in our model). The vertical velocity vᵧ changes: it decreases on the way up, becomes zero instantaneously at the highest point, and increases in the downward direction on the way down.",
        "The shape of the path is a parabola. Maximum height is reached when vᵧ = 0. The horizontal range — the distance from launch to landing on level ground — depends on both the launch angle and the launch speed. For a given speed on level ground, 45° gives the greatest range."
      ],
      keyTerms: [
        {
          term: "Component",
          definition: "The part of a vector along a chosen axis; here, horizontal (x) or vertical (y)."
        },
        {
          term: "Range",
          definition: "The horizontal distance a projectile travels from launch to landing."
        }
      ]
    },
    {
      id: "gravity-constant",
      sectionNumber: "1.3",
      title: "Constant acceleration due to gravity",
      visualizationId: "projectile-basics",
      paragraphs: [
        "Galileo showed that, in the absence of air resistance, all objects fall with the same acceleration regardless of mass. Near Earth's surface this acceleration is g = 9.8 m/s² directed downward.",
        "For vertical motion we use the standard kinematic equations with a = −g (taking upward as positive). For example, if an object is dropped from rest, its speed after time t is v = gt. If launched upward with initial vertical speed vᵧ₀, the time to reach the peak is t = vᵧ₀ / g.",
        "Understanding projectile motion prepares you for more advanced topics: circular motion, orbits, and energy methods. The same component technique applies whenever forces act along perpendicular directions."
      ],
      keyTerms: [
        {
          term: "g",
          definition: "The acceleration due to gravity near Earth's surface, approximately 9.8 m/s² downward."
        },
        {
          term: "Free fall",
          definition: "Motion under gravity alone, with no other forces acting on the object."
        }
      ]
    }
  ],

  practiceQuestions: [
    {
      id: "mech-pr-1",
      type: "multiple_choice",
      prompt: "Ignoring air resistance, the horizontal component of a projectile's velocity —",
      choices: [
        "increases during flight",
        "decreases during flight",
        "stays constant",
        "becomes zero at the peak"
      ],
      correctAnswer: "stays constant",
      explanation: "No horizontal force (ideal case) → no horizontal acceleration → constant vₓ.",
      hint: "Think about forces in the horizontal direction."
    },
    {
      id: "mech-pr-2",
      type: "numeric",
      prompt: "An object is dropped from rest. After 2 seconds (g = 9.8 m/s²), what is its speed in m/s?",
      correctAnswer: "19.6",
      explanation: "v = gt = 9.8 × 2 = 19.6 m/s",
      hint: "Use v = gt for free fall from rest."
    },
    {
      id: "mech-pr-3",
      type: "short_text",
      prompt: "What is the name of the curved path a projectile follows (ignoring air resistance)?",
      correctAnswer: "parabola",
      explanation: "Projectile trajectories under constant gravity are parabolic.",
      hint: "A conic section shape."
    },
    {
      id: "mech-pr-4",
      type: "multiple_choice",
      prompt: "At the highest point of an ideal projectile's path, what is true of its vertical velocity?",
      choices: ["It is zero", "It is greatest upward", "It equals the horizontal velocity", "It points upward forever"],
      correctAnswer: "It is zero",
      explanation: "At the peak, the vertical component has momentarily decreased to zero before the projectile falls.",
      hint: "Think about the instant when upward motion changes to downward motion."
    }
  ],

  examQuestions: [
    {
      id: "mech-ex-1",
      type: "numeric",
      prompt:
        "A ball is launched at 20 m/s at 30° above horizontal. What is the initial vertical component of velocity in m/s? (sin 30° = 0.5)",
      correctAnswer: "10",
      explanation: "vᵧ = v₀ sin θ = 20 × 0.5 = 10 m/s"
    },
    {
      id: "mech-ex-2",
      type: "numeric",
      prompt:
        "Using vᵧ = 10 m/s from the previous concept: how long until the ball reaches maximum height? (g = 9.8 m/s², round to 1 decimal)",
      correctAnswer: "1.0",
      explanation: "t = vᵧ / g = 10 / 9.8 ≈ 1.0 s"
    },
    {
      id: "mech-ex-3",
      type: "multiple_choice",
      prompt: "Which launch angle (ignoring air) gives maximum range on level ground?",
      choices: ["30°", "45°", "60°", "90°"],
      correctAnswer: "45°",
      explanation: "For level ground and same speed, 45° maximizes range: sin(2θ) is maximal at θ = 45°."
    },
    {
      id: "mech-ex-4",
      type: "numeric",
      prompt:
        "A car accelerates uniformly from 5 m/s to 25 m/s in 4 s. What is its acceleration in m/s²?",
      correctAnswer: "5",
      explanation: "a = Δv / Δt = (25 − 5) / 4 = 5 m/s²"
    },
    {
      id: "mech-ex-5",
      type: "multiple_choice",
      prompt: "Why can horizontal and vertical projectile motion be analyzed separately in the ideal model?",
      choices: [
        "Gravity acts vertically, so there is no horizontal acceleration",
        "Gravity acts only horizontally",
        "The projectile has no vertical velocity",
        "Air resistance always cancels gravity"
      ],
      correctAnswer: "Gravity acts vertically, so there is no horizontal acceleration",
      explanation:
        "Ignoring air resistance, gravity changes vertical velocity but leaves horizontal velocity constant."
    }
  ]
};
