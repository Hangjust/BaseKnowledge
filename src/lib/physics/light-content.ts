import type { PhysicsTopicContent } from "./types";

export const lightContent: PhysicsTopicContent = {
  meta: {
    slug: "light",
    title: "Light",
    tagline: "Rays, shadows, color, reflection, and refraction",
    description:
      "Learn how light travels, how shadows form, and how light interacts with surfaces and materials.",
    accentColor: "#facc15",
    subtopics: ["Rays", "Shadows", "Reflection", "Refraction", "Color"],
    previewVisualization: "light"
  },
  learnChapter: {
    number: 6,
    title: "How Light Travels and Interacts",
    introduction:
      "Light is energy that allows us to see. In beginner physics, the ray model explains many everyday observations: straight beams, shadows, reflections, refraction, and color.",
    figureCaption:
      "Straight light rays leave a source, strike objects, and either reflect, pass through, or are absorbed."
  },
  learnSections: [
    {
      id: "light-rays-shadows",
      sectionNumber: "6.1",
      title: "Light travels in straight lines",
      visualizationId: "light-rays",
      paragraphs: [
        "In many classroom situations, light can be represented as straight rays. A ray is a line with an arrow showing the direction that light travels.",
        "Shadows form when an opaque object blocks light. The area behind the object is darker because light from the source cannot reach it directly.",
        "The size and sharpness of a shadow depend on the positions of the light source, object, and screen. Moving the object closer to the source often makes a larger shadow."
      ],
      keyTerms: [
        { term: "Ray", definition: "A line that represents the direction light travels." },
        { term: "Opaque", definition: "Not allowing light to pass through." },
        { term: "Shadow", definition: "A darker region formed where light is blocked." }
      ]
    },
    {
      id: "light-materials",
      sectionNumber: "6.2",
      title: "Materials transmit, reflect, or absorb light",
      visualizationId: "light-rays",
      paragraphs: [
        "When light reaches a material, some light may pass through, some may bounce off, and some may be absorbed. Transparent materials let most light pass through.",
        "Translucent materials let some light through but scatter it, so images are not clear. Opaque materials block most light and make shadows.",
        "A surface that reflects a lot of light looks bright. A surface that absorbs much of the incoming light can become warmer and often looks darker."
      ],
      keyTerms: [
        { term: "Transparent", definition: "Allowing light to pass through clearly." },
        { term: "Translucent", definition: "Allowing some light through while scattering it." },
        { term: "Absorb", definition: "To take in light energy rather than reflecting or transmitting it." }
      ]
    },
    {
      id: "light-color",
      sectionNumber: "6.3",
      title: "Color depends on reflected light",
      visualizationId: "light-rays",
      paragraphs: [
        "White light contains many colors. When white light shines on an object, the object may absorb some colors and reflect others.",
        "A red object looks red because it reflects red light to your eyes and absorbs much of the other visible light. A black object absorbs most visible light, while a white object reflects most visible light.",
        "Filters work by transmitting some colors and absorbing others. A red filter mainly lets red light through, so other colors become dimmer."
      ],
      keyTerms: [
        { term: "Visible light", definition: "The part of the electromagnetic spectrum human eyes can detect." },
        { term: "Color", definition: "The visual result of which light wavelengths reach the eye." },
        { term: "Filter", definition: "A material that transmits some colors of light and absorbs others." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "light-pr-1",
      type: "multiple_choice",
      prompt: "In the ray model, how does light travel through air in a simple classroom setup?",
      choices: ["In straight lines", "Only in circles", "Only through metal", "Without direction"],
      correctAnswer: "In straight lines",
      hint: "Think about ray diagrams.",
      explanation: "The ray model represents light as traveling in straight lines until it interacts with matter."
    },
    {
      id: "light-pr-2",
      type: "short_text",
      prompt: "What forms when an opaque object blocks light?",
      correctAnswer: "shadow",
      hint: "It is the darker area behind the object.",
      explanation: "A shadow forms where light from the source is blocked."
    },
    {
      id: "light-pr-3",
      type: "multiple_choice",
      prompt: "Which material lets most light pass through clearly?",
      choices: ["Transparent glass", "Thick cardboard", "A wooden board", "Black cloth"],
      correctAnswer: "Transparent glass",
      hint: "Transparent means see-through.",
      explanation: "Transparent glass transmits most visible light clearly."
    },
    {
      id: "light-pr-4",
      type: "multiple_choice",
      prompt: "Why does a red object look red under white light?",
      choices: ["It reflects red light to your eyes", "It reflects only blue light", "It has no interaction with light", "It makes shadows impossible"],
      correctAnswer: "It reflects red light to your eyes",
      hint: "Objects are seen by reflected light.",
      explanation: "A red object reflects red wavelengths and absorbs much of the other visible light."
    }
  ],
  examQuestions: [
    {
      id: "light-ex-1",
      type: "multiple_choice",
      prompt: "A student moves an object closer to a lamp while keeping a screen fixed. What usually happens to the shadow?",
      choices: ["It becomes larger", "It disappears because light bends around everything", "It becomes the lamp", "It must turn blue"],
      correctAnswer: "It becomes larger",
      explanation: "Moving the blocker closer to the source lets it block a wider spread of rays, so the shadow often grows."
    },
    {
      id: "light-ex-2",
      type: "multiple_choice",
      prompt: "Which statement best compares transparent and translucent materials?",
      choices: ["Transparent materials pass light clearly; translucent materials scatter it", "Both block all light", "Transparent materials always absorb all light", "Translucent materials are always magnets"],
      correctAnswer: "Transparent materials pass light clearly; translucent materials scatter it",
      explanation: "Both can transmit light, but translucent materials scatter it so clear images are not formed."
    },
    {
      id: "light-ex-3",
      type: "short_text",
      prompt: "What word means to take in light energy rather than reflecting it?",
      correctAnswer: "absorb",
      explanation: "Absorbed light energy is taken into the material, often warming it."
    },
    {
      id: "light-ex-4",
      type: "multiple_choice",
      prompt: "A black shirt in sunlight becomes warm because it mostly does what to visible light?",
      choices: ["Absorbs it", "Transmits it clearly", "Turns it into sound only", "Reflects every color equally"],
      correctAnswer: "Absorbs it",
      explanation: "Dark materials absorb much of the incoming light energy, which can increase temperature."
    },
    {
      id: "light-ex-5",
      type: "multiple_choice",
      prompt: "What does an arrow on a light ray show?",
      choices: ["The direction light travels", "The mass of the light", "The age of the source", "The exact temperature of the room"],
      correctAnswer: "The direction light travels",
      explanation: "Ray arrows show the direction that light energy travels."
    }
  ]
};
