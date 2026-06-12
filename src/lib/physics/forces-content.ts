import type { PhysicsTopicContent } from "./types";

export const forcesContent: PhysicsTopicContent = {
  meta: {
    slug: "forces",
    title: "Forces",
    tagline: "Pushes, pulls, balance, and changes in motion",
    description:
      "Study forces as pushes and pulls, compare balanced and unbalanced forces, and predict when an object's motion will change.",
    accentColor: "#ef4444",
    subtopics: ["Pushes", "Pulls", "Net force", "Balanced forces", "Friction"],
    previewVisualization: "forces"
  },
  learnChapter: {
    number: 4,
    title: "Forces and Changes in Motion",
    introduction:
      "A force is a push or pull. Forces can start motion, stop motion, change speed, change direction, or change shape. To predict what happens, you compare all the forces acting on an object and decide whether they balance.",
    figureCaption:
      "A box is pulled to the right while friction acts to the left. The difference between the arrows is the net force."
  },
  learnSections: [
    {
      id: "forces-pushes-pulls",
      sectionNumber: "4.1",
      title: "Forces are pushes and pulls",
      visualizationId: "force-arrows",
      paragraphs: [
        "Forces are interactions between objects. You exert a force when you push a door, pull a wagon, kick a ball, or stretch a rubber band.",
        "A force has a size and a direction, so it is represented by an arrow. A longer arrow can show a stronger force, and the arrow points in the direction of the push or pull.",
        "Some forces need contact, such as friction and tension. Other forces, such as gravity and magnetism, can act without direct contact."
      ],
      keyTerms: [
        { term: "Force", definition: "A push or pull that can change an object's motion or shape." },
        { term: "Contact force", definition: "A force that acts when objects touch." },
        { term: "Non-contact force", definition: "A force that can act across a distance." }
      ]
    },
    {
      id: "forces-balanced",
      sectionNumber: "4.2",
      title: "Balanced forces do not change motion",
      visualizationId: "force-arrows",
      paragraphs: [
        "Forces are balanced when they are equal in size and opposite in direction. A book resting on a table has gravity pulling down and the table pushing up with equal strength.",
        "Balanced forces do not mean no forces exist. They mean the forces cancel, so the net force is zero.",
        "When the net force is zero, an object at rest stays at rest, and an object already moving keeps moving at the same speed in the same direction."
      ],
      keyTerms: [
        { term: "Balanced forces", definition: "Forces that cancel because they are equal and opposite." },
        { term: "Net force", definition: "The overall force after combining all forces on an object." },
        { term: "Zero net force", definition: "A situation where forces cancel and motion does not change." }
      ]
    },
    {
      id: "forces-unbalanced-friction",
      sectionNumber: "4.3",
      title: "Unbalanced forces change motion",
      visualizationId: "force-arrows",
      paragraphs: [
        "Forces are unbalanced when one direction has a stronger force than the opposite direction. The object accelerates in the direction of the net force.",
        "Friction is a contact force that opposes sliding or rolling. It often acts opposite the direction of motion and can slow objects down.",
        "To solve force problems, draw arrows for each force, compare opposite directions, and ask what direction has the leftover force."
      ],
      keyTerms: [
        { term: "Unbalanced forces", definition: "Forces that do not cancel and therefore change motion." },
        { term: "Friction", definition: "A force that opposes motion between touching surfaces." },
        { term: "Acceleration", definition: "A change in speed, direction, or both." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "forces-pr-1",
      type: "multiple_choice",
      prompt: "Which example is a force?",
      choices: ["Pushing a door open", "The color of a door", "The name of a door", "The age of a door"],
      correctAnswer: "Pushing a door open",
      hint: "A force is a push or pull.",
      explanation: "Pushing the door is a force because it is an interaction that can change motion."
    },
    {
      id: "forces-pr-2",
      type: "multiple_choice",
      prompt: "Two teams pull on a rope with equal force in opposite directions. What is the net force?",
      choices: ["Zero", "Both forces added forward", "Only the left force", "Only gravity"],
      correctAnswer: "Zero",
      hint: "Equal opposite forces cancel.",
      explanation: "Equal forces in opposite directions are balanced, so the net force is zero."
    },
    {
      id: "forces-pr-3",
      type: "short_text",
      prompt: "What force usually opposes sliding between two surfaces?",
      correctAnswer: "friction",
      hint: "It can slow a moving object.",
      explanation: "Friction acts between touching surfaces and opposes sliding motion."
    },
    {
      id: "forces-pr-4",
      type: "numeric",
      prompt: "A 10 N force pulls right and a 4 N force pulls left. What is the net force to the right in newtons?",
      correctAnswer: "6",
      hint: "Subtract opposite forces.",
      explanation: "10 N right minus 4 N left leaves 6 N to the right."
    }
  ],
  examQuestions: [
    {
      id: "forces-ex-1",
      type: "multiple_choice",
      prompt: "A book rests on a table without moving. Which statement best describes the vertical forces?",
      choices: ["Gravity downward and table force upward are balanced", "Only gravity acts", "Only the table acts", "The forces must be unbalanced"],
      correctAnswer: "Gravity downward and table force upward are balanced",
      explanation: "The book is not accelerating vertically because the downward and upward forces cancel."
    },
    {
      id: "forces-ex-2",
      type: "numeric",
      prompt: "Forces of 18 N right and 7 N left act on a cart. What is the net force to the right in newtons?",
      correctAnswer: "11",
      explanation: "Opposite forces subtract: 18 - 7 = 11 N to the right."
    },
    {
      id: "forces-ex-3",
      type: "multiple_choice",
      prompt: "An object speeds up to the left. What must be true about the forces on it?",
      choices: ["The net force is to the left", "The net force is zero", "All forces are balanced", "No forces act on it"],
      correctAnswer: "The net force is to the left",
      explanation: "Acceleration occurs in the direction of the net force."
    },
    {
      id: "forces-ex-4",
      type: "short_text",
      prompt: "What phrase describes equal forces acting in opposite directions?",
      correctAnswer: "balanced forces",
      explanation: "Balanced forces cancel each other and make the net force zero."
    },
    {
      id: "forces-ex-5",
      type: "multiple_choice",
      prompt: "Why does a sliding block slow down on a rough floor?",
      choices: ["Friction acts opposite the motion", "The floor removes its mass", "Gravity stops acting", "Balanced forces always speed objects up"],
      correctAnswer: "Friction acts opposite the motion",
      explanation: "Friction is an opposing contact force, so it can reduce speed."
    }
  ]
};
