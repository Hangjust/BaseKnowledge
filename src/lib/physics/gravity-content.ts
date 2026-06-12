import type { PhysicsTopicContent } from "./types";

export const gravityContent: PhysicsTopicContent = {
  meta: {
    slug: "gravity",
    title: "Gravity",
    tagline: "Falling, weight, orbits, and attraction",
    description:
      "Explore gravity as an attractive force between masses, from falling objects near Earth to planets orbiting the Sun.",
    accentColor: "#8b5cf6",
    subtopics: ["Weight", "Mass", "Free fall", "Orbits", "Gravitational field"],
    previewVisualization: "gravity"
  },
  learnChapter: {
    number: 5,
    title: "Gravity and Falling Motion",
    introduction:
      "Gravity is an attractive force between objects that have mass. It keeps people on Earth, makes dropped objects fall, and helps planets follow curved paths around stars.",
    figureCaption: "Earth pulls a falling ball downward while the Moon follows a curved orbital path around Earth."
  },
  learnSections: [
    {
      id: "gravity-attraction",
      sectionNumber: "5.1",
      title: "Gravity is attraction between masses",
      visualizationId: "gravity-field",
      paragraphs: [
        "Every object with mass attracts every other object with mass. The attraction is usually tiny unless at least one object has a very large mass, such as a planet, moon, or star.",
        "Earth's gravity pulls objects toward Earth's center. Near the surface, this pull points almost straight downward wherever you stand.",
        "Gravity is a non-contact force. It can act even when objects are not touching, which is why Earth can pull on a falling ball before it reaches the ground."
      ],
      keyTerms: [
        { term: "Gravity", definition: "An attractive force between objects that have mass." },
        { term: "Mass", definition: "The amount of matter in an object." },
        { term: "Non-contact force", definition: "A force that acts without objects touching." }
      ]
    },
    {
      id: "gravity-weight-freefall",
      sectionNumber: "5.2",
      title: "Weight is the force of gravity",
      visualizationId: "gravity-field",
      paragraphs: [
        "Mass and weight are related but not the same. Mass tells how much matter an object has. Weight is the gravitational force on that mass.",
        "On Earth, weight can be estimated using weight = mass times gravitational field strength. A larger mass has a larger weight in the same gravitational field.",
        "In free fall near Earth, objects accelerate downward at about 9.8 m/s^2 if air resistance is ignored. This does not mean heavier objects must fall faster in the ideal model."
      ],
      keyTerms: [
        { term: "Weight", definition: "The force of gravity acting on an object." },
        { term: "Free fall", definition: "Motion under gravity alone." },
        { term: "Gravitational field strength", definition: "Force of gravity per kilogram of mass." }
      ]
    },
    {
      id: "gravity-orbits",
      sectionNumber: "5.3",
      title: "Gravity can curve motion into orbits",
      visualizationId: "gravity-field",
      paragraphs: [
        "An orbit happens when gravity continually pulls a moving object inward while the object also has sideways motion. The path curves instead of simply falling straight down.",
        "The Moon orbits Earth because Earth's gravity pulls it inward while the Moon keeps moving forward. Planets orbit the Sun in the same general way.",
        "Orbits are not gravity switching on and off. Gravity acts all the time, changing the direction of motion and keeping the path curved."
      ],
      keyTerms: [
        { term: "Orbit", definition: "A curved path around a larger body caused by gravity and sideways motion." },
        { term: "Satellite", definition: "An object that orbits a planet or other larger body." },
        { term: "Centripetal", definition: "Directed toward the center of a curved path." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "gravity-pr-1",
      type: "multiple_choice",
      prompt: "Gravity is best described as what kind of force?",
      choices: ["An attractive force between masses", "A push from the ground only", "A force that needs wires", "A force that only works on magnets"],
      correctAnswer: "An attractive force between masses",
      hint: "Gravity pulls masses toward each other.",
      explanation: "Gravity is an attraction between objects that have mass."
    },
    {
      id: "gravity-pr-2",
      type: "short_text",
      prompt: "What word names the force of gravity acting on an object?",
      correctAnswer: "weight",
      hint: "It is measured in newtons.",
      explanation: "Weight is the gravitational force on an object."
    },
    {
      id: "gravity-pr-3",
      type: "numeric",
      prompt: "Using g = 10 N/kg, what is the weight in newtons of a 3 kg object?",
      correctAnswer: "30",
      hint: "Use weight = mass times gravitational field strength.",
      explanation: "Weight = 3 kg x 10 N/kg = 30 N."
    },
    {
      id: "gravity-pr-4",
      type: "multiple_choice",
      prompt: "Ignoring air resistance, which object falls with greater acceleration near Earth?",
      choices: ["They have the same acceleration", "Only the heavier object", "Only the lighter object", "Neither object accelerates"],
      correctAnswer: "They have the same acceleration",
      hint: "Think about the ideal free-fall model.",
      explanation: "Near Earth, objects in free fall share the same gravitational acceleration if air resistance is ignored."
    }
  ],
  examQuestions: [
    {
      id: "gravity-ex-1",
      type: "multiple_choice",
      prompt: "Why does the Moon follow a curved path around Earth instead of moving in a straight line forever?",
      choices: ["Earth's gravity continually pulls it inward", "The Moon has no mass", "Air pushes the Moon sideways", "Gravity only acts at night"],
      correctAnswer: "Earth's gravity continually pulls it inward",
      explanation: "Gravity changes the Moon's direction of motion, producing an orbit."
    },
    {
      id: "gravity-ex-2",
      type: "numeric",
      prompt: "Using g = 10 N/kg, what is the mass in kilograms of an object with weight 80 N?",
      correctAnswer: "8",
      explanation: "Mass = weight / g = 80 / 10 = 8 kg."
    },
    {
      id: "gravity-ex-3",
      type: "multiple_choice",
      prompt: "Which statement correctly compares mass and weight?",
      choices: ["Mass is amount of matter, while weight is gravitational force", "Mass and weight are always identical", "Weight is measured in kilograms only", "Mass disappears in space"],
      correctAnswer: "Mass is amount of matter, while weight is gravitational force",
      explanation: "Mass describes matter; weight depends on gravity acting on that mass."
    },
    {
      id: "gravity-ex-4",
      type: "short_text",
      prompt: "What is motion under gravity alone called?",
      correctAnswer: "free fall",
      explanation: "Free fall means gravity is the only force considered."
    },
    {
      id: "gravity-ex-5",
      type: "multiple_choice",
      prompt: "Where does Earth's gravity pull an object near the surface?",
      choices: ["Toward Earth's center", "Straight upward", "Only east", "Away from all mass"],
      correctAnswer: "Toward Earth's center",
      explanation: "Near the surface, Earth's gravity points downward toward Earth's center."
    }
  ]
};
