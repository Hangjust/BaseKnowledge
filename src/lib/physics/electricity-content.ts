import type { PhysicsTopicContent } from "./types";

export const electricityContent: PhysicsTopicContent = {
  meta: {
    slug: "electricity",
    title: "Electricity",
    tagline: "Build circuits that give current a path to follow",
    description:
      "Learn how batteries, bulbs, wires, and switches work together in a circuit, and why a gap anywhere in the path stops the current.",
    accentColor: "#2563eb",
    subtopics: ["Circuits", "Batteries", "Bulbs", "Switches", "Current path"],
    previewVisualization: "electricity"
  },
  learnChapter: {
    number: 2,
    title: "Complete Circuits and Current Paths",
    introduction:
      "Electricity can make bulbs light, buzzers sound, and motors turn, but only when charges have a complete path to move through. This chapter explains why batteries, wires, bulbs, and switches must be connected in a closed loop.",
    figureCaption:
      "A simple circuit loop connects a battery, switch, wires, and bulb so current can travel through every part."
  },
  learnSections: [
    {
      id: "electricity-circuit-parts",
      sectionNumber: "2.1",
      title: "Circuit parts have jobs",
      visualizationId: "circuit-builder",
      paragraphs: [
        "A circuit is a path for electric current. In a simple bulb circuit, the battery provides energy, the wires connect the parts, and the bulb changes electrical energy into light and heat.",
        "A battery has two terminals. For a bulb to light, the circuit must connect from one terminal of the battery, through the bulb, and back to the other terminal.",
        "Beginners sometimes connect only one side of a battery or bulb and expect the bulb to light. The circuit needs both sides of each part connected into one path."
      ],
      keyTerms: [
        { term: "Circuit", definition: "A path that electric current can follow." },
        { term: "Battery", definition: "A source that provides energy to charges in a circuit." },
        { term: "Terminal", definition: "A connection point on a battery or component." }
      ]
    },
    {
      id: "electricity-complete-path",
      sectionNumber: "2.2",
      title: "Current needs a complete path",
      visualizationId: "circuit-builder",
      paragraphs: [
        "Electric current is the movement of electric charge through a circuit. In a closed circuit, every part is connected so current has a full path.",
        "In an open circuit, there is a gap. A missing wire, a loose connection, or an open switch can break the path and keep the bulb off.",
        "The gap can be anywhere in the path. If the loop is broken at the switch, near the battery, or between wires, the current path is still incomplete."
      ],
      keyTerms: [
        { term: "Current", definition: "The movement of electric charge through a circuit." },
        { term: "Closed circuit", definition: "A circuit with a complete path for current." },
        { term: "Open circuit", definition: "A circuit with a gap that stops current." }
      ]
    },
    {
      id: "electricity-switches-faults",
      sectionNumber: "2.3",
      title: "Switches open and close circuits",
      visualizationId: "circuit-builder",
      paragraphs: [
        "A switch controls a circuit by opening or closing the path. When the switch is closed, it acts like a connected piece of the path and current can flow.",
        "Fault finding means checking each connection to see where the path is broken. If a bulb does not light, ask whether every component is connected into one loop.",
        "Electricity is not used up before it reaches the bulb. In a complete circuit, current follows the whole loop while energy is transferred at the bulb."
      ],
      keyTerms: [
        { term: "Switch", definition: "A component that opens or closes a circuit path." },
        { term: "Gap", definition: "A break in the circuit path that stops current." },
        { term: "Fault", definition: "A problem in a circuit, such as a loose or missing connection." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "electricity-pr-1",
      type: "multiple_choice",
      prompt: "What must a simple bulb circuit have for the bulb to light?",
      choices: ["A complete path from one battery terminal to the other", "Only one wire touching the bulb", "A gap beside the switch", "A battery drawn near the bulb but not connected"],
      correctAnswer: "A complete path from one battery terminal to the other",
      hint: "Current needs a full loop.",
      explanation: "The bulb lights only when the circuit forms a closed path through the battery and bulb."
    },
    {
      id: "electricity-pr-2",
      type: "multiple_choice",
      prompt: "What happens when a switch is open in a simple circuit?",
      choices: ["The circuit has a gap and current stops", "The bulb gets brighter", "The battery becomes two batteries", "Current jumps across every gap"],
      correctAnswer: "The circuit has a gap and current stops",
      hint: "An open switch breaks the path.",
      explanation: "An open switch creates an open circuit, so current cannot travel around the loop."
    },
    {
      id: "electricity-pr-3",
      type: "short_text",
      prompt: "What word describes a circuit with no gap in the current path?",
      correctAnswer: "closed circuit",
      hint: "It is the opposite of an open circuit.",
      explanation: "A closed circuit has a complete path for current."
    },
    {
      id: "electricity-pr-4",
      type: "multiple_choice",
      prompt: "A bulb does not light because one wire is loose near the battery. Why does that stop the bulb?",
      choices: ["The current path is broken anywhere in the loop", "The bulb only works when wires are loose", "The battery no longer has terminals", "Electricity can only move through air"],
      correctAnswer: "The current path is broken anywhere in the loop",
      hint: "A gap does not need to be beside the bulb to matter.",
      explanation: "Any gap in the loop makes the circuit open, so current cannot flow through the bulb."
    }
  ],
  examQuestions: [
    {
      id: "electricity-ex-1",
      type: "multiple_choice",
      prompt: "A student connects one wire from a battery to a bulb and says the bulb should light because it touches the battery. What is the best correction?",
      choices: [
        "The bulb needs a complete path from one battery terminal, through the bulb, and back to the other terminal",
        "The bulb lights whenever any part touches a battery",
        "Only the positive terminal matters",
        "A bulb cannot be part of a circuit"
      ],
      correctAnswer: "The bulb needs a complete path from one battery terminal, through the bulb, and back to the other terminal",
      explanation: "A single connection does not make a closed loop. Current needs a complete path."
    },
    {
      id: "electricity-ex-2",
      type: "multiple_choice",
      prompt: "Which change would make an open circuit become a closed circuit?",
      choices: ["Closing the switch so it completes the path", "Removing a wire from the loop", "Adding a gap beside the bulb", "Disconnecting one battery terminal"],
      correctAnswer: "Closing the switch so it completes the path",
      explanation: "Closing the switch removes the gap at the switch and lets current flow around the loop."
    },
    {
      id: "electricity-ex-3",
      type: "multiple_choice",
      prompt: "In a simple complete circuit with one battery and one bulb, which path best describes current?",
      choices: ["Around the whole loop through the battery, wires, and bulb", "Only from the battery to the first wire, then it stops", "Only inside the bulb", "Through empty space without needing wires"],
      correctAnswer: "Around the whole loop through the battery, wires, and bulb",
      explanation: "Current follows the complete conducting loop when the circuit is closed."
    },
    {
      id: "electricity-ex-4",
      type: "short_text",
      prompt: "What circuit part opens and closes the current path?",
      correctAnswer: "switch",
      explanation: "A switch controls whether the circuit path is open or closed."
    },
    {
      id: "electricity-ex-5",
      type: "multiple_choice",
      prompt: "A circuit has a working battery, bulb, and switch, but a wire is disconnected far from the bulb. What should happen?",
      choices: ["The bulb stays off because the circuit path is incomplete", "The bulb lights because the gap is far away", "The battery sends current through the table", "The switch stops mattering"],
      correctAnswer: "The bulb stays off because the circuit path is incomplete",
      explanation: "A gap anywhere in the loop makes the circuit open, so the bulb will not light."
    }
  ]
};
