import type { PhysicsTopicContent } from "./types";

export const motionContent: PhysicsTopicContent = {
  meta: {
    slug: "motion",
    title: "Motion",
    tagline: "Compare how fast objects move and how far they travel",
    description:
      "Learn how distance, time, and speed describe motion, then use graphs to compare trips without mixing up fast and far.",
    accentColor: "#f97316",
    subtopics: ["Position", "Distance", "Time", "Speed", "Distance-time graphs"],
    previewVisualization: "motion"
  },
  learnChapter: {
    number: 1,
    title: "Motion, Distance, Time, and Speed",
    introduction:
      "Motion means a change in position. This chapter shows how to describe moving objects by measuring distance and time, then using those measurements to compare speed. The main goal is to keep two ideas separate: moving far is not the same as moving fast.",
    figureCaption:
      "A car moves along a marked track while a distance-time graph records how far it has traveled at each moment."
  },
  learnSections: [
    {
      id: "motion-position-distance",
      sectionNumber: "1.1",
      title: "Motion means position changes",
      visualizationId: "motion-track",
      paragraphs: [
        "An object is in motion when its position changes compared with a reference point. A runner leaving the start line, a ball rolling across a floor, and a bus driving away from a stop are all examples of motion.",
        "Distance tells how much ground an object covers. A toy car that moves from 0 meters to 6 meters on a track has traveled 6 meters. Distance alone does not say whether the car moved quickly or slowly.",
        "A common beginner mistake is to hear a large distance and assume high speed. A walker can travel a long distance slowly, while a sprinter can travel a short distance very quickly."
      ],
      keyTerms: [
        { term: "Motion", definition: "A change in an object's position compared with a reference point." },
        { term: "Position", definition: "Where an object is located compared with a chosen point." },
        { term: "Distance", definition: "How far an object travels along its path." }
      ]
    },
    {
      id: "motion-speed",
      sectionNumber: "1.2",
      title: "Speed compares distance and time",
      visualizationId: "motion-track",
      paragraphs: [
        "Speed tells how much distance is covered in a certain amount of time. If two cyclists travel the same distance, the one who takes less time has the greater speed.",
        "A simple way to calculate speed is distance divided by time. If a cart travels 12 meters in 3 seconds, its speed is 4 meters per second.",
        "Do not decide speed from distance alone. A car that travels 100 kilometers in 2 hours is faster than a bus that travels 120 kilometers in 4 hours, even though the bus went farther."
      ],
      keyTerms: [
        { term: "Speed", definition: "How quickly distance is covered, found by comparing distance with time." },
        { term: "Time", definition: "How long the motion takes." },
        { term: "Meters per second", definition: "A speed unit showing how many meters are traveled each second." }
      ]
    },
    {
      id: "motion-graphs",
      sectionNumber: "1.3",
      title: "Graphs show motion patterns",
      visualizationId: "motion-track",
      paragraphs: [
        "A distance-time graph can show a whole trip at once. Time is usually placed along the bottom, and distance from the start is placed up the side.",
        "A steeper line means a greater speed because the distance changes more in the same time. A flat line means the object is stopped because time passes but distance does not change.",
        "Graphs help check predictions. Before a car moves, you can predict whether the graph will be steep, gentle, or flat, then compare the prediction with evidence."
      ],
      keyTerms: [
        { term: "Distance-time graph", definition: "A graph that shows distance from the start at different times." },
        { term: "Steeper line", definition: "A graph line that rises more quickly and shows greater speed." },
        { term: "Flat line", definition: "A graph line showing no change in distance while time passes." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "motion-pr-1",
      type: "multiple_choice",
      prompt: "Which statement best describes motion?",
      choices: [
        "An object's position changes compared with a reference point",
        "An object is always moving if it is large",
        "An object travels a long distance",
        "An object has a bright color"
      ],
      correctAnswer: "An object's position changes compared with a reference point",
      hint: "Think about whether the object's location changes.",
      explanation: "Motion means position changes compared with a chosen reference point."
    },
    {
      id: "motion-pr-2",
      type: "numeric",
      prompt: "A toy car travels 10 meters in 2 seconds. What is its speed in meters per second?",
      correctAnswer: "5",
      hint: "Use speed equals distance divided by time.",
      explanation: "Speed = 10 meters divided by 2 seconds = 5 meters per second."
    },
    {
      id: "motion-pr-3",
      type: "multiple_choice",
      prompt: "Runner A travels 20 meters in 5 seconds. Runner B travels 20 meters in 4 seconds. Who is faster?",
      choices: ["Runner A", "Runner B", "They have the same speed", "There is not enough information"],
      correctAnswer: "Runner B",
      hint: "They ran the same distance, so compare the times.",
      explanation: "Runner B covers the same distance in less time, so Runner B has the greater speed."
    },
    {
      id: "motion-pr-4",
      type: "multiple_choice",
      prompt: "What does a flat line on a distance-time graph usually show?",
      choices: ["The object is stopped", "The object is speeding up", "The object moved backward quickly", "The object traveled the farthest"],
      correctAnswer: "The object is stopped",
      hint: "Look for whether distance changes while time passes.",
      explanation: "A flat line means time changes but distance from the start stays the same, so the object is stopped."
    }
  ],
  examQuestions: [
    {
      id: "motion-ex-1",
      type: "multiple_choice",
      prompt: "A student says, 'The longer trip must be the faster trip.' Which response best corrects the misconception?",
      choices: [
        "Speed depends on both distance and time, not distance alone",
        "Longer distance always means higher speed",
        "Time does not matter when comparing speed",
        "Only objects with engines can have speed"
      ],
      correctAnswer: "Speed depends on both distance and time, not distance alone",
      explanation: "Speed compares distance with time. A long trip can still be slow if it takes a long time."
    },
    {
      id: "motion-ex-2",
      type: "numeric",
      prompt: "A cyclist travels 60 meters in 12 seconds. What is the cyclist's speed in meters per second?",
      correctAnswer: "5",
      explanation: "Speed = distance divided by time = 60 divided by 12 = 5 meters per second."
    },
    {
      id: "motion-ex-3",
      type: "multiple_choice",
      prompt: "Two carts move for 6 seconds. Cart A travels 18 meters. Cart B travels 24 meters. Which cart has the greater speed?",
      choices: ["Cart A", "Cart B", "They have the same speed", "Neither cart moved"],
      correctAnswer: "Cart B",
      explanation: "The time is the same, so the cart that covers more distance has the greater speed."
    },
    {
      id: "motion-ex-4",
      type: "multiple_choice",
      prompt: "On a distance-time graph, which line shows the fastest steady motion?",
      choices: ["The steepest rising line", "A flat line", "The shortest line label", "The line with the lightest color"],
      correctAnswer: "The steepest rising line",
      explanation: "A steeper rising line shows more distance covered in the same time, so it shows greater speed."
    },
    {
      id: "motion-ex-5",
      type: "short_text",
      prompt: "What two measurements are needed to calculate speed?",
      correctAnswer: "distance and time",
      explanation: "Speed is found by comparing distance traveled with the time taken."
    }
  ]
};
