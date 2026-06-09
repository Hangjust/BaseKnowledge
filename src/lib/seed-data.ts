import type { Subject, Topic } from "./types";

export const subjects: Subject[] = [
  {
    id: "biology",
    name: "Biology",
    description: "Cells, organisms, genetics, ecology, and human body systems.",
    accent: "#2f855a",
    topicIds: ["cells"]
  },
  {
    id: "english",
    name: "English",
    description: "Reading comprehension, writing structure, grammar, and analysis.",
    accent: "#7c3aed",
    topicIds: ["reading-skills"]
  },
  {
    id: "physics",
    name: "Physics",
    description: "Forces, energy, waves, electricity, optics, and modern physics.",
    accent: "#2563eb",
    topicIds: ["thermodynamics", "classical-mechanics", "optics"]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Atoms, bonding, reactions, acids, bases, and organic chemistry.",
    accent: "#c2410c",
    topicIds: ["atomic-structure"]
  },
  {
    id: "economics",
    name: "Economics",
    description: "Markets, choices, inflation, trade, and financial decision-making.",
    accent: "#0f766e",
    topicIds: ["supply-and-demand"]
  },
  {
    id: "math",
    name: "Math",
    description: "Algebra, geometry, calculus, statistics, and problem-solving strategies.",
    accent: "#7c3aed",
    topicIds: ["algebra-basics"]
  }
];

export const seedTopics: Topic[] = [
  {
    id: "thermodynamics",
    subjectId: "physics",
    slug: "thermodynamics",
    title: "Thermodynamics",
    description:
      "Study heat, temperature, energy transfer, and how physical systems change when energy moves.",
    subtopics: ["Temperature", "Heat transfer", "Specific heat", "Work and energy", "Laws of thermodynamics"],
    isPublished: true,
    updatedAt: "2026-06-07T00:00:00.000Z",
    lessons: [
      {
        id: "thermo-basic",
        title: "Heat, Temperature, and Everyday Energy",
        difficulty: "Basic",
        summary:
          "Learn the difference between heat and temperature, and why energy moves from warmer objects to cooler ones.",
        sections: [
          {
            heading: "Temperature measures particle motion",
            body:
              "Temperature tells us the average kinetic energy of particles in a material. Faster particle motion usually means a higher temperature."
          },
          {
            heading: "Heat is energy in transit",
            body:
              "Heat is not something an object stores as a substance. Heat is energy moving because of a temperature difference."
          },
          {
            heading: "Thermal equilibrium",
            body:
              "When two objects touch, energy transfers until both reach the same temperature. At that point there is no net heat flow."
          }
        ],
        diagram: {
          title: "Heat flow direction",
          description:
            "A hot cup transfers energy to cooler air until the cup and nearby air approach the same temperature."
        },
        examples: [
          {
            prompt: "A metal spoon in hot soup becomes warm. What moved from the soup into the spoon?",
            solution:
              "Thermal energy moved from the hotter soup to the cooler spoon. The spoon's particles vibrated more, so its temperature rose."
          }
        ]
      },
      {
        id: "thermo-intermediate",
        title: "Specific Heat and Energy Calculations",
        difficulty: "Intermediate",
        summary:
          "Use Q = mc Delta T to calculate how much energy is needed to change a material's temperature.",
        sections: [
          {
            heading: "Specific heat capacity",
            body:
              "Specific heat capacity is the energy needed to raise 1 kilogram of a substance by 1 degree Celsius. Water has a high specific heat, so it warms and cools slowly."
          },
          {
            heading: "Using Q = mc Delta T",
            body:
              "Q is thermal energy in joules, m is mass in kilograms, c is specific heat capacity, and Delta T is the temperature change."
          },
          {
            heading: "Sign matters",
            body:
              "If temperature increases, Delta T is positive and the object gains energy. If temperature decreases, Delta T is negative and the object loses energy."
          }
        ],
        diagram: {
          title: "Specific heat comparison",
          description:
            "Equal energy added to equal masses can produce different temperature changes when materials have different specific heats."
        },
        examples: [
          {
            prompt:
              "How much energy is needed to heat 2 kg of water from 20 C to 30 C? Use c = 4200 J/kg C.",
            solution:
              "Q = mc Delta T = 2 x 4200 x 10 = 84,000 J. The water needs 84 kJ of thermal energy."
          }
        ]
      },
      {
        id: "thermo-advanced",
        title: "First Law of Thermodynamics",
        difficulty: "Advanced",
        summary:
          "Connect heat, work, and internal energy using conservation of energy in thermal systems.",
        sections: [
          {
            heading: "Internal energy",
            body:
              "Internal energy is the total microscopic kinetic and potential energy of particles in a system."
          },
          {
            heading: "Energy accounting",
            body:
              "The first law says a system's internal energy changes when heat enters or leaves and when work is done by or on the system."
          },
          {
            heading: "Common convention",
            body:
              "One useful convention is Delta U = Q - W, where W is work done by the system. If a gas expands and does work, its internal energy can decrease unless heat is added."
          }
        ],
        diagram: {
          title: "Gas piston energy transfer",
          description:
            "Heat added to a gas can increase internal energy, push a piston upward, or both."
        },
        examples: [
          {
            prompt:
              "A gas absorbs 500 J of heat and does 120 J of work on a piston. What is Delta U?",
            solution:
              "Using Delta U = Q - W, Delta U = 500 - 120 = 380 J. The gas internal energy increases by 380 J."
          }
        ]
      }
    ],
    questions: [
      {
        id: "q-heat-temp",
        difficulty: "Basic",
        prompt: "Which statement best describes heat?",
        choices: [
          "The average particle energy in an object",
          "Energy moving because of a temperature difference",
          "The same thing as temperature",
          "A measure of how heavy an object is"
        ],
        correctChoiceIndex: 1,
        explanation:
          "Heat is energy transferred from a warmer region or object to a cooler one because of a temperature difference."
      },
      {
        id: "q-equilibrium",
        difficulty: "Basic",
        prompt: "Two objects are in thermal equilibrium when they have the same...",
        choices: ["mass", "volume", "temperature", "specific heat"],
        correctChoiceIndex: 2,
        explanation:
          "Thermal equilibrium means there is no net heat transfer between objects because they have the same temperature."
      },
      {
        id: "q-specific-heat",
        difficulty: "Intermediate",
        prompt: "A 1 kg block with c = 900 J/kg C warms by 5 C. How much energy did it gain?",
        choices: ["180 J", "900 J", "4,500 J", "45,000 J"],
        correctChoiceIndex: 2,
        explanation: "Q = mc Delta T = 1 x 900 x 5 = 4,500 J."
      },
      {
        id: "q-water-high-c",
        difficulty: "Intermediate",
        prompt: "Why does water often change temperature slowly?",
        choices: [
          "It has a low density",
          "It has a high specific heat capacity",
          "It cannot transfer heat",
          "Its particles do not move"
        ],
        correctChoiceIndex: 1,
        explanation:
          "Water needs a relatively large amount of energy for each kilogram to change by 1 C."
      },
      {
        id: "q-first-law",
        difficulty: "Advanced",
        prompt: "Using Delta U = Q - W, a gas absorbs 300 J and does 80 J of work. Delta U is...",
        choices: ["-380 J", "-220 J", "220 J", "380 J"],
        correctChoiceIndex: 2,
        explanation: "Delta U = 300 - 80 = 220 J."
      },
      {
        id: "q-work-by-system",
        difficulty: "Advanced",
        prompt: "If a gas does work on its surroundings and no heat enters, what happens to its internal energy?",
        choices: [
          "It increases",
          "It decreases",
          "It stays exactly the same",
          "It becomes equal to temperature"
        ],
        correctChoiceIndex: 1,
        explanation:
          "With Q = 0 and W positive, Delta U = -W, so internal energy decreases."
      }
    ]
  },
  {
    id: "classical-mechanics",
    subjectId: "physics",
    slug: "classical-mechanics",
    title: "Classical Mechanics",
    description: "Forces, motion, energy, and momentum. Full lessons are coming soon.",
    subtopics: ["Newton's laws", "Kinematics", "Momentum", "Energy"],
    lessons: [],
    questions: [],
    isPublished: true,
    updatedAt: "2026-06-07T00:00:00.000Z"
  },
  {
    id: "optics",
    subjectId: "physics",
    slug: "optics",
    title: "Optics",
    description: "Light, reflection, refraction, lenses, and image formation. Full lessons are coming soon.",
    subtopics: ["Reflection", "Refraction", "Lenses"],
    lessons: [],
    questions: [],
    isPublished: true,
    updatedAt: "2026-06-07T00:00:00.000Z"
  },
  {
    id: "cells",
    subjectId: "biology",
    slug: "cells",
    title: "Cells",
    description: "Cell structure, organelles, and basic cell processes. Full lessons are coming soon.",
    subtopics: ["Cell membrane", "Nucleus", "Mitochondria"],
    lessons: [],
    questions: [],
    isPublished: true,
    updatedAt: "2026-06-07T00:00:00.000Z"
  },
  {
    id: "reading-skills",
    subjectId: "english",
    slug: "reading-skills",
    title: "Reading Skills",
    description: "Main ideas, inference, evidence, and close reading. Full lessons are coming soon.",
    subtopics: ["Main idea", "Inference", "Evidence"],
    lessons: [],
    questions: [],
    isPublished: true,
    updatedAt: "2026-06-07T00:00:00.000Z"
  },
  {
    id: "atomic-structure",
    subjectId: "chemistry",
    slug: "atomic-structure",
    title: "Atomic Structure",
    description: "Protons, neutrons, electrons, isotopes, and atomic models. Full lessons are coming soon.",
    subtopics: ["Particles", "Isotopes", "Electron shells"],
    lessons: [],
    questions: [],
    isPublished: true,
    updatedAt: "2026-06-07T00:00:00.000Z"
  },
  {
    id: "supply-and-demand",
    subjectId: "economics",
    slug: "supply-and-demand",
    title: "Supply and Demand",
    description: "How markets coordinate choices through prices. Full lessons are coming soon.",
    subtopics: ["Demand curves", "Supply curves", "Equilibrium"],
    lessons: [],
    questions: [],
    isPublished: true,
    updatedAt: "2026-06-07T00:00:00.000Z"
  },
  {
    id: "algebra-basics",
    subjectId: "math",
    slug: "algebra-basics",
    title: "Algebra Basics",
    description: "Variables, expressions, equations, and linear relationships. Full lessons are coming soon.",
    subtopics: ["Variables", "Linear equations", "Graphing"],
    lessons: [],
    questions: [],
    isPublished: true,
    updatedAt: "2026-06-07T00:00:00.000Z"
  }
];
