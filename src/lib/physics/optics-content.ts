/**
 * =============================================================================
 * OPTICS — TOPIC CONTENT
 * =============================================================================
 *
 * TEMPLATE FILE: duplicate this structure for each new physics topic.
 *
 * Steps to add "Waves":
 *   1. Copy this file → `waves-content.ts`
 *   2. Replace meta, learnSections, practiceQuestions, examQuestions
 *   3. Register in `topics.ts`
 *   4. Build visualizations referenced by `visualizationId` / `previewVisualization`
 * =============================================================================
 */

import type { PhysicsTopicContent } from "./types";

export const opticsContent: PhysicsTopicContent = {
  meta: {
    slug: "optics",
    title: "Optics",
    tagline: "Light, mirrors, and how rays bend",
    description:
      "Explore reflection and refraction through interactive ray diagrams. Learn the laws of optics, play with mirror angles, then test yourself.",
    accentColor: "#06b6d4",
    subtopics: ["Reflection", "Refraction", "Mirrors", "Snell's law"],
    previewVisualization: "mirror"
  },

  learnChapter: {
    number: 1,
    title: "Reflection and Plane Mirrors",
    introduction:
      "Optics is the study of light — how it travels, how it bounces off surfaces, and how it bends when entering new materials. In this chapter we begin with geometric optics: a model that treats light as straight-line rays. This approximation explains everyday phenomena such as mirror images, reflections in still water, and the path of a flashlight beam.",
    figureCaption:
      "A ray striking a plane mirror. The incident ray (yellow) meets the surface at the point of contact. The normal (dashed) is drawn perpendicular to the mirror. The reflected ray (blue) leaves at the same angle from the normal as the incident ray."
  },

  learnSections: [
    {
      id: "what-is-light",
      sectionNumber: "1.1",
      title: "Modeling light as rays",
      visualizationId: "mirror-basics",
      paragraphs: [
        "Light is a form of electromagnetic radiation. In many situations — especially when light interacts with mirrors, lenses, and windows — we can describe its behavior using rays. A ray is a straight line with an arrow indicating the direction in which light energy travels.",
        "Geometric optics does not describe every property of light. It does not explain colour dispersion or interference patterns in full detail. However, for reflection and refraction at surfaces, the ray model gives accurate, practical predictions that match what we observe in the laboratory and in daily life.",
        "When light reaches a boundary between two materials, one of two things typically happens: it reflects back into the original material, or it refracts (bends) as it passes into the second material. The next sections examine reflection in detail."
      ],
      keyTerms: [
        {
          term: "Ray",
          definition: "A straight-line representation of the direction light travels in geometric optics."
        },
        {
          term: "Geometric optics",
          definition: "The study of light using rays, angles, and straight-line paths at surfaces."
        }
      ]
    },
    {
      id: "law-of-reflection",
      sectionNumber: "1.2",
      title: "The law of reflection",
      visualizationId: "mirror-basics",
      paragraphs: [
        "When a ray strikes a smooth reflecting surface, such as a plane mirror, it obeys the law of reflection. This law has two parts. First, the angle of incidence equals the angle of reflection. Second, the incident ray, the reflected ray, and the normal all lie in the same plane.",
        "Angles are always measured from the normal — not from the surface itself. The normal is an imaginary line drawn perpendicular to the surface at the exact point where the ray hits. Students often confuse the angle to the mirror with the angle to the normal. If a problem gives the angle to the surface, subtract it from 90° to obtain the angle from the normal.",
        "Specular reflection from a smooth mirror produces a clear image because parallel incident rays remain parallel after reflection. Rough surfaces scatter light in many directions; this is called diffuse reflection, which is why a sheet of paper does not act like a mirror even though light reflects from it."
      ],
      keyTerms: [
        {
          term: "Normal",
          definition: "A line perpendicular to a surface at the point where a ray strikes it."
        },
        {
          term: "Angle of incidence (θᵢ)",
          definition: "The angle between the incident ray and the normal."
        },
        {
          term: "Angle of reflection (θᵣ)",
          definition: "The angle between the reflected ray and the normal. For a plane mirror, θᵢ = θᵣ."
        }
      ]
    },
    {
      id: "mirror-images",
      sectionNumber: "1.3",
      title: "Images formed by plane mirrors",
      visualizationId: "mirror-basics",
      paragraphs: [
        "A plane mirror forms an image that appears to be behind the mirror surface. The image is virtual: light rays do not actually converge there, but our eyes trace the reflected rays backward and perceive an object at that location.",
        "For a plane mirror, the image distance equals the object distance. If you stand 1.5 m in front of a mirror, your image appears 1.5 m behind the mirror. The image is the same size as the object and is upright. However, it is laterally inverted — left and right appear swapped, which is why text held up to a mirror seems reversed.",
        "These properties follow directly from the law of reflection. Each point on an object sends rays toward the mirror; the reflected rays diverge as if they came from a point equally far behind the mirror. This symmetry is one of the most useful results in introductory optics."
      ],
      keyTerms: [
        {
          term: "Virtual image",
          definition: "An image position from which reflected rays appear to originate, though no light actually passes through that point."
        },
        {
          term: "Lateral inversion",
          definition: "Left-right reversal of an image in a plane mirror; the image is upright but swapped horizontally."
        }
      ]
    }
  ],

  practiceQuestions: [
    {
      id: "opt-pr-1",
      type: "multiple_choice",
      prompt: "When a light ray reflects off a flat mirror, the angle of incidence equals the angle of —",
      choices: ["refraction", "reflection", "diffraction", "dispersion"],
      correctAnswer: "reflection",
      explanation:
        "The law of reflection states θᵢ = θᵣ, where both angles are measured from the normal.",
      hint: "Think about the law of reflection."
    },
    {
      id: "opt-pr-2",
      type: "numeric",
      prompt:
        "A ray hits a mirror with an angle of incidence of 35° (measured from the normal). What is the angle of reflection in degrees?",
      correctAnswer: "35",
      explanation: "For specular reflection on a flat mirror, θᵢ = θᵣ = 35°.",
      hint: "The two angles from the normal are equal."
    },
    {
      id: "opt-pr-3",
      type: "short_text",
      prompt: "What do we call the line drawn perpendicular to a mirror at the point where a ray hits?",
      correctAnswer: "normal",
      explanation:
        "The normal is the reference line for measuring angles of incidence and reflection.",
      hint: "It is a geometry term meaning perpendicular."
    },
    {
      id: "opt-pr-4",
      type: "multiple_choice",
      prompt: "An image in a plane mirror is —",
      choices: [
        "real and inverted",
        "virtual and upright",
        "real and upright",
        "virtual and inverted vertically"
      ],
      correctAnswer: "virtual and upright",
      explanation:
        "Plane mirrors produce virtual images that appear upright behind the mirror (laterally inverted, not upside down)."
    }
  ],

  examQuestions: [
    {
      id: "opt-ex-1",
      type: "numeric",
      prompt:
        "A ray strikes a mirror at 52° to the mirror surface (NOT from the normal). What is the angle of reflection measured from the normal, in degrees?",
      correctAnswer: "38",
      explanation:
        "Angle from normal = 90° − 52° = 38°. By reflection law, θᵣ = 38° from the normal."
    },
    {
      id: "opt-ex-2",
      type: "multiple_choice",
      prompt:
        "A student stands 1.5 m in front of a plane mirror. How far behind the mirror does the virtual image appear?",
      choices: ["0.75 m", "1.5 m", "3.0 m", "1.5 m in front of the mirror"],
      correctAnswer: "1.5 m",
      explanation:
        "Object distance equals image distance behind a plane mirror: 1.5 m behind the mirror surface."
    },
    {
      id: "opt-ex-3",
      type: "short_text",
      prompt:
        "Light travels from air (n ≈ 1.00) into glass (n = 1.50) and bends toward the normal. This bending is called —",
      correctAnswer: "refraction",
      explanation:
        "Refraction occurs when light changes speed crossing media, bending toward the normal when entering a denser medium."
    },
    {
      id: "opt-ex-4",
      type: "numeric",
      prompt:
        "Using Snell's law, n₁ sin θ₁ = n₂ sin θ₂: light enters glass (n₂ = 1.5) from air (n₁ = 1) at θ₁ = 30°. Find sin θ₂ (round to 2 decimals).",
      correctAnswer: "0.33",
      explanation: "sin θ₂ = (1 × sin 30°) / 1.5 = 0.5 / 1.5 ≈ 0.33"
    },
    {
      id: "opt-ex-5",
      type: "multiple_choice",
      prompt: "Which statement about the law of reflection is FALSE?",
      choices: [
        "The incident and reflected rays lie in the same plane as the normal",
        "The angle of incidence equals the angle of reflection",
        "Reflection only occurs when light hits rough surfaces",
        "A smooth mirror produces specular reflection"
      ],
      correctAnswer: "Reflection only occurs when light hits rough surfaces",
      explanation:
        "Reflection occurs on both smooth (specular) and rough (diffuse) surfaces; the false claim reverses the truth."
    }
  ]
};