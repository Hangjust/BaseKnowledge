import type { PhysicsTopicContent } from "./types";

export const mirrorsReflectionContent: PhysicsTopicContent = {
  meta: {
    slug: "mirrors-and-reflection",
    title: "Mirrors and Reflection",
    tagline: "Trace rays and predict mirror images",
    description:
      "Learn the law of reflection, how plane mirrors form virtual images, and why smooth and rough surfaces reflect differently.",
    accentColor: "#06b6d4",
    subtopics: ["Reflection", "Normal line", "Plane mirrors", "Virtual images", "Diffuse reflection"],
    previewVisualization: "mirror"
  },
  learnChapter: {
    number: 7,
    title: "Reflection from Plane Mirrors",
    introduction:
      "Reflection happens when light bounces from a surface. Plane mirrors are useful because their smooth surfaces make reflected rays predictable and form clear virtual images.",
    figureCaption:
      "A ray strikes a plane mirror, meets the normal line, and reflects away at the same angle measured from the normal."
  },
  learnSections: [
    {
      id: "mirrors-law-reflection",
      sectionNumber: "7.1",
      title: "The law of reflection",
      visualizationId: "mirror-rays",
      paragraphs: [
        "The law of reflection says that the angle of incidence equals the angle of reflection. Both angles are measured from the normal, not from the mirror surface.",
        "The normal is an imaginary line drawn at right angles to the surface where the ray hits. It gives a fair reference line for comparing incoming and outgoing rays.",
        "If a problem gives an angle measured from the mirror surface, subtract it from 90 degrees to find the angle from the normal."
      ],
      keyTerms: [
        { term: "Reflection", definition: "The bouncing of light from a surface." },
        { term: "Normal", definition: "A line perpendicular to a surface at the point where a ray hits." },
        { term: "Angle of incidence", definition: "The angle between the incoming ray and the normal." }
      ]
    },
    {
      id: "mirrors-plane-images",
      sectionNumber: "7.2",
      title: "Plane mirrors form virtual images",
      visualizationId: "mirror-rays",
      paragraphs: [
        "A plane mirror forms an image that appears behind the mirror. The image is virtual because light does not actually pass through that point behind the mirror.",
        "For a plane mirror, the image appears the same distance behind the mirror as the object is in front of it. If your face is 0.5 m from the mirror, the image appears 0.5 m behind it.",
        "The image is upright and the same size as the object. It is laterally inverted, which means left and right appear swapped."
      ],
      keyTerms: [
        { term: "Plane mirror", definition: "A flat mirror surface." },
        { term: "Virtual image", definition: "An apparent image location where light rays do not really meet." },
        { term: "Lateral inversion", definition: "Left-right reversal in a mirror image." }
      ]
    },
    {
      id: "mirrors-specular-diffuse",
      sectionNumber: "7.3",
      title: "Smooth and rough surfaces reflect differently",
      visualizationId: "mirror-rays",
      paragraphs: [
        "A smooth mirror gives specular reflection. Parallel incoming rays remain neatly arranged after reflection, so a clear image can form.",
        "A rough surface gives diffuse reflection. Each tiny part still follows the law of reflection, but the surface normals point in many directions, so the reflected rays scatter.",
        "Paper reflects light, but it does not act like a mirror because its surface scatters rays in many directions instead of preserving a clear image."
      ],
      keyTerms: [
        { term: "Specular reflection", definition: "Reflection from a smooth surface that can form a clear image." },
        { term: "Diffuse reflection", definition: "Reflection from a rough surface that scatters light in many directions." },
        { term: "Surface normal", definition: "The perpendicular direction at a particular point on a surface." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "mirrors-pr-1",
      type: "multiple_choice",
      prompt: "In reflection from a plane mirror, the angle of incidence equals the angle of what?",
      choices: ["Reflection", "Refraction", "Absorption", "Temperature"],
      correctAnswer: "Reflection",
      hint: "This is the law of reflection.",
      explanation: "The law of reflection states that the angle of incidence equals the angle of reflection."
    },
    {
      id: "mirrors-pr-2",
      type: "numeric",
      prompt: "A ray has an angle of incidence of 25 degrees. What is the angle of reflection in degrees?",
      correctAnswer: "25",
      hint: "The two angles from the normal are equal.",
      explanation: "For a plane mirror, the angle of reflection is also 25 degrees."
    },
    {
      id: "mirrors-pr-3",
      type: "short_text",
      prompt: "What is the perpendicular reference line at a mirror surface called?",
      correctAnswer: "normal",
      hint: "Angles are measured from it.",
      explanation: "The normal is drawn perpendicular to the mirror at the point where the ray strikes."
    },
    {
      id: "mirrors-pr-4",
      type: "multiple_choice",
      prompt: "A plane mirror image is best described as what?",
      choices: ["Virtual and upright", "Real and upside down", "Smaller and behind your eyes", "Always blurry"],
      correctAnswer: "Virtual and upright",
      hint: "The image appears behind the mirror.",
      explanation: "A plane mirror forms a virtual, upright image behind the mirror."
    }
  ],
  examQuestions: [
    {
      id: "mirrors-ex-1",
      type: "numeric",
      prompt: "A ray strikes a mirror at 60 degrees to the mirror surface. What is the angle of reflection from the normal, in degrees?",
      correctAnswer: "30",
      explanation: "The angle from the normal is 90 - 60 = 30 degrees, so the reflection angle is 30 degrees."
    },
    {
      id: "mirrors-ex-2",
      type: "numeric",
      prompt: "A candle is 2 meters in front of a plane mirror. How far behind the mirror does its image appear, in meters?",
      correctAnswer: "2",
      explanation: "In a plane mirror, image distance equals object distance."
    },
    {
      id: "mirrors-ex-3",
      type: "multiple_choice",
      prompt: "Why does paper not form a clear mirror image even though it reflects light?",
      choices: ["Its rough surface gives diffuse reflection", "It absorbs every ray perfectly", "It has no surface", "It changes light into gravity"],
      correctAnswer: "Its rough surface gives diffuse reflection",
      explanation: "Paper scatters reflected rays in many directions, so a clear image is not preserved."
    },
    {
      id: "mirrors-ex-4",
      type: "short_text",
      prompt: "What word describes an image formed where light rays only appear to come from?",
      correctAnswer: "virtual",
      explanation: "A virtual image is an apparent source of rays, not a point where rays actually meet."
    },
    {
      id: "mirrors-ex-5",
      type: "multiple_choice",
      prompt: "Which pair must be measured from the normal for the reflection law?",
      choices: ["Angle of incidence and angle of reflection", "Mass and weight", "Current and voltage", "Speed and distance"],
      correctAnswer: "Angle of incidence and angle of reflection",
      explanation: "Reflection angles are defined from the normal line, not from the surface."
    }
  ]
};
