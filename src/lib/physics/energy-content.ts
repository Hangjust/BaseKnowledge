import type { PhysicsTopicContent } from "./types";

export const energyContent: PhysicsTopicContent = {
  meta: {
    slug: "energy",
    title: "Energy",
    tagline: "Stores, transfers, conservation, and useful changes",
    description:
      "Learn how energy is stored and transferred, why energy is conserved, and how devices change energy from one form to another.",
    accentColor: "#22c55e",
    subtopics: ["Energy stores", "Transfers", "Kinetic energy", "Potential energy", "Efficiency"],
    previewVisualization: "energy"
  },
  learnChapter: {
    number: 10,
    title: "Energy Stores and Transfers",
    introduction:
      "Energy helps explain changes. Moving objects, lifted objects, hot objects, stretched springs, fuels, and batteries can all be described using energy stores and transfers.",
    figureCaption:
      "A moving cart has kinetic energy, gains gravitational potential energy on a ramp, and transfers some energy to thermal stores through friction."
  },
  learnSections: [
    {
      id: "energy-stores",
      sectionNumber: "10.1",
      title: "Energy can be stored in different ways",
      visualizationId: "energy-flow",
      paragraphs: [
        "A moving object has kinetic energy. An object lifted above the ground has gravitational potential energy. A stretched spring has elastic potential energy.",
        "Thermal energy is associated with temperature and particle motion. Chemical energy is stored in fuels, foods, and batteries.",
        "Naming energy stores helps track what changes during an event. For example, a falling ball transfers energy from a gravitational store to a kinetic store."
      ],
      keyTerms: [
        { term: "Kinetic energy", definition: "Energy in a moving object." },
        { term: "Gravitational potential energy", definition: "Energy stored because of height in a gravitational field." },
        { term: "Chemical energy", definition: "Energy stored in chemical substances such as food, fuel, or batteries." }
      ]
    },
    {
      id: "energy-transfers",
      sectionNumber: "10.2",
      title: "Energy is transferred during changes",
      visualizationId: "energy-flow",
      paragraphs: [
        "Energy transfers from one store to another when work is done, heating occurs, radiation carries energy, or an electrical current flows.",
        "A lamp transfers energy electrically from a battery or outlet, then transfers energy by light and heating to the surroundings.",
        "Energy transfer diagrams help show where energy starts, where useful energy goes, and where wasted energy spreads into the surroundings."
      ],
      keyTerms: [
        { term: "Energy transfer", definition: "Movement of energy from one store or object to another." },
        { term: "Work", definition: "Energy transferred when a force moves an object through a distance." },
        { term: "Radiation", definition: "Energy transfer by waves, including light and infrared." }
      ]
    },
    {
      id: "energy-conservation-efficiency",
      sectionNumber: "10.3",
      title: "Energy is conserved but can become less useful",
      visualizationId: "energy-flow",
      paragraphs: [
        "The law of conservation of energy says energy cannot be created or destroyed. The total amount stays the same, even though it can move and change stores.",
        "In real devices, some energy is usually transferred to thermal stores in the surroundings. This wasted energy is still energy, but it is less useful for the intended task.",
        "Efficiency compares useful output energy with input energy. A more efficient device transfers a larger fraction of the input energy in the wanted way."
      ],
      keyTerms: [
        { term: "Conservation of energy", definition: "Energy cannot be created or destroyed, only transferred or transformed." },
        { term: "Useful energy", definition: "Energy transferred in the intended way." },
        { term: "Efficiency", definition: "The fraction or percentage of input energy transferred usefully." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "energy-pr-1",
      type: "multiple_choice",
      prompt: "Which energy store does a moving bicycle have because it is moving?",
      choices: ["Kinetic", "Chemical only", "Elastic only", "Magnetic only"],
      correctAnswer: "Kinetic",
      hint: "Kinetic means motion energy.",
      explanation: "A moving object has kinetic energy."
    },
    {
      id: "energy-pr-2",
      type: "multiple_choice",
      prompt: "A book is lifted onto a high shelf. Which energy store increases?",
      choices: ["Gravitational potential", "Sound", "Electrical only", "Nuclear"],
      correctAnswer: "Gravitational potential",
      hint: "Height in a gravitational field matters.",
      explanation: "Lifting the book increases its gravitational potential energy store."
    },
    {
      id: "energy-pr-3",
      type: "short_text",
      prompt: "What word describes the percentage of input energy transferred usefully?",
      correctAnswer: "efficiency",
      hint: "It compares useful output with input.",
      explanation: "Efficiency measures the fraction or percentage of energy usefully transferred."
    },
    {
      id: "energy-pr-4",
      type: "multiple_choice",
      prompt: "What does conservation of energy say?",
      choices: ["Energy cannot be created or destroyed", "Energy always disappears", "Only batteries have energy", "Energy never transfers"],
      correctAnswer: "Energy cannot be created or destroyed",
      hint: "The total amount is conserved.",
      explanation: "Energy can be transferred or transformed, but the total amount is conserved."
    }
  ],
  examQuestions: [
    {
      id: "energy-ex-1",
      type: "multiple_choice",
      prompt: "A ball rolls down a ramp. Which energy change is the best simple description?",
      choices: ["Gravitational potential energy decreases while kinetic energy increases", "Kinetic energy becomes mass", "Chemical energy appears from nothing", "Energy stops being conserved"],
      correctAnswer: "Gravitational potential energy decreases while kinetic energy increases",
      explanation: "As height decreases, gravitational potential energy is transferred mainly to kinetic energy."
    },
    {
      id: "energy-ex-2",
      type: "numeric",
      prompt: "A device receives 100 J and transfers 40 J usefully. What is its efficiency as a percent?",
      correctAnswer: "40",
      explanation: "Efficiency = useful output / input x 100 = 40 / 100 x 100 = 40 percent."
    },
    {
      id: "energy-ex-3",
      type: "multiple_choice",
      prompt: "Why is wasted energy not truly destroyed?",
      choices: ["It is transferred to less useful stores such as thermal energy in the surroundings", "It becomes nothing", "It stops obeying physics", "It turns into mass every time"],
      correctAnswer: "It is transferred to less useful stores such as thermal energy in the surroundings",
      explanation: "Energy is conserved; wasted energy is energy transferred in an unwanted or less useful way."
    },
    {
      id: "energy-ex-4",
      type: "short_text",
      prompt: "What energy store is associated with a stretched spring?",
      correctAnswer: "elastic potential",
      explanation: "A stretched or compressed spring stores elastic potential energy."
    },
    {
      id: "energy-ex-5",
      type: "multiple_choice",
      prompt: "Which pathway best describes a battery-powered torch?",
      choices: ["Chemical energy transfers electrically, then by light and heating", "Light energy creates chemical energy from nothing", "Sound energy turns directly into gravity", "No energy transfer occurs"],
      correctAnswer: "Chemical energy transfers electrically, then by light and heating",
      explanation: "The battery's chemical store transfers energy electrically to the bulb, then energy leaves by light and heating."
    }
  ]
};
