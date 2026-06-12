import type { PhysicsTopicContent } from "./types";

export const heatTemperatureContent: PhysicsTopicContent = {
  meta: {
    slug: "heat-temperature",
    title: "Heat and Temperature",
    tagline: "Thermal energy, temperature, and heat transfer",
    description:
      "Learn the difference between heat and temperature, how thermal energy moves, and why materials warm and cool at different rates.",
    accentColor: "#dc2626",
    subtopics: ["Temperature", "Thermal energy", "Conduction", "Convection", "Radiation"],
    previewVisualization: "heat"
  },
  learnChapter: {
    number: 8,
    title: "Heat, Temperature, and Energy Transfer",
    introduction:
      "Heat and temperature are connected, but they are not the same idea. Temperature tells how hot or cold something is, while heat is energy transferred because of a temperature difference.",
    figureCaption:
      "Thermal energy moves from a hotter object to a cooler object by conduction, convection, or radiation."
  },
  learnSections: [
    {
      id: "heat-temperature-difference",
      sectionNumber: "8.1",
      title: "Temperature is not the same as heat",
      visualizationId: "thermal-transfer",
      paragraphs: [
        "Temperature measures how hot or cold an object is. At the particle level, higher temperature usually means particles have greater average kinetic energy.",
        "Heat is energy transferred from a hotter object to a cooler object. Heat is not something an object stores as a substance; it is energy moving because temperatures differ.",
        "A spark can have a high temperature but little total thermal energy. A warm bath may have a lower temperature but much more thermal energy because it contains many more particles."
      ],
      keyTerms: [
        { term: "Temperature", definition: "A measure of how hot or cold something is." },
        { term: "Heat", definition: "Energy transferred because of a temperature difference." },
        { term: "Thermal energy", definition: "Internal energy associated with particle motion and arrangement." }
      ]
    },
    {
      id: "heat-conduction-convection",
      sectionNumber: "8.2",
      title: "Conduction and convection transfer heat",
      visualizationId: "thermal-transfer",
      paragraphs: [
        "Conduction is heat transfer through direct contact. A metal spoon in hot soup warms because energy passes from particle to particle through the spoon.",
        "Convection is heat transfer by the movement of a fluid, such as air or water. Warm fluid expands, becomes less dense, and can rise while cooler fluid sinks.",
        "Solids mainly transfer heat by conduction, while liquids and gases can transfer heat effectively by convection currents."
      ],
      keyTerms: [
        { term: "Conduction", definition: "Heat transfer through direct contact between particles." },
        { term: "Convection", definition: "Heat transfer by movement of a liquid or gas." },
        { term: "Fluid", definition: "A substance that can flow, such as a liquid or gas." }
      ]
    },
    {
      id: "heat-radiation-insulation",
      sectionNumber: "8.3",
      title: "Radiation and insulation affect warming",
      visualizationId: "thermal-transfer",
      paragraphs: [
        "Radiation transfers energy by electromagnetic waves. It does not require particles, so energy from the Sun can travel through space to Earth.",
        "Insulators slow heat transfer. Wool, foam, and trapped air are useful because they reduce energy flow between warm and cool regions.",
        "Good thermal design often controls all three transfer methods: reducing conduction through walls, reducing convection with sealed air spaces, and reducing radiation with reflective surfaces."
      ],
      keyTerms: [
        { term: "Radiation", definition: "Energy transfer by electromagnetic waves." },
        { term: "Insulator", definition: "A material that slows heat transfer." },
        { term: "Thermal equilibrium", definition: "A state where objects in contact reach the same temperature." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "heat-pr-1",
      type: "multiple_choice",
      prompt: "Which statement best defines heat in physics?",
      choices: ["Energy transferred because of a temperature difference", "The color of a flame", "A substance stored inside objects", "The same thing as mass"],
      correctAnswer: "Energy transferred because of a temperature difference",
      hint: "Heat is energy in transfer.",
      explanation: "Heat is energy moving from hotter to cooler regions because temperatures differ."
    },
    {
      id: "heat-pr-2",
      type: "short_text",
      prompt: "What heat transfer method occurs through direct contact?",
      correctAnswer: "conduction",
      hint: "A metal spoon warming in soup is an example.",
      explanation: "Conduction transfers heat through contact between particles."
    },
    {
      id: "heat-pr-3",
      type: "multiple_choice",
      prompt: "Which heat transfer method moves energy by circulating warm and cool fluid?",
      choices: ["Convection", "Reflection", "Friction only", "Magnetism"],
      correctAnswer: "Convection",
      hint: "Fluids can flow.",
      explanation: "Convection transfers heat by the movement of liquids or gases."
    },
    {
      id: "heat-pr-4",
      type: "multiple_choice",
      prompt: "Why can sunlight warm Earth through space?",
      choices: ["Radiation does not need matter to travel", "Conduction works through empty space", "Convection currents flow from the Sun to Earth", "The Sun touches Earth"],
      correctAnswer: "Radiation does not need matter to travel",
      hint: "Space has very little matter.",
      explanation: "Radiation transfers energy by electromagnetic waves and can travel through space."
    }
  ],
  examQuestions: [
    {
      id: "heat-ex-1",
      type: "multiple_choice",
      prompt: "A metal spoon warms when left in hot soup. What is the main heat transfer method along the spoon?",
      choices: ["Conduction", "Convection through metal", "Reflection", "Electrical current only"],
      correctAnswer: "Conduction",
      explanation: "Energy passes through the solid spoon by particle interactions, which is conduction."
    },
    {
      id: "heat-ex-2",
      type: "multiple_choice",
      prompt: "A warm room cools after a window is opened and air circulates. Which process is most directly involved?",
      choices: ["Convection", "Magnetism", "Static electricity", "Nuclear fusion"],
      correctAnswer: "Convection",
      explanation: "Moving air carries thermal energy, so convection is involved."
    },
    {
      id: "heat-ex-3",
      type: "short_text",
      prompt: "What word describes a material that slows heat transfer?",
      correctAnswer: "insulator",
      explanation: "An insulator reduces the rate of heat transfer."
    },
    {
      id: "heat-ex-4",
      type: "multiple_choice",
      prompt: "A hot cup and a cool room are left together for a long time. What tends to happen?",
      choices: ["They move toward the same temperature", "The cup becomes hotter forever", "The room becomes absolute zero", "No energy transfer can occur"],
      correctAnswer: "They move toward the same temperature",
      explanation: "Heat flows from hotter to cooler until thermal equilibrium is approached."
    },
    {
      id: "heat-ex-5",
      type: "multiple_choice",
      prompt: "Which object could have high temperature but relatively little total thermal energy?",
      choices: ["A tiny spark", "A full warm bathtub", "A large heated swimming pool", "A warm lake"],
      correctAnswer: "A tiny spark",
      explanation: "A spark can be very hot but contains little matter, so its total thermal energy is small."
    }
  ]
};
