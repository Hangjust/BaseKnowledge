import { defineBeginnerLabTopics } from "../helpers";

export const physicsBeginnerLabTopics = defineBeginnerLabTopics([
  {
    meta: {
      subjectId: "physics",
      slug: "motion",
      title: "Motion",
      tagline: "Compare how fast objects move and how far they travel.",
      description:
        "Learn how distance, time, and speed describe motion, then use a track and graph to compare trips without mixing up fast and far.",
      accentColor: "#f97316",
      subtopics: ["Position", "Distance", "Time", "Speed", "Distance time graphs"],
      previewVisualizationId: "physics:motion"
    },
    learnChapter: {
      number: 1,
      title: "Motion, Distance, Time, and Speed",
      introduction:
        "Motion means a change in position. In this chapter, you will learn how to describe a moving object by measuring distance and time, then using those measurements to compare speed. The main goal is to keep two ideas separate: moving far is not the same as moving fast.",
      figureCaption:
        "A car moves along a marked track while a distance time graph records how far it has traveled at each moment."
    },
    learnSections: [
      {
        id: "motion-position-distance",
        sectionNumber: "1.1",
        title: "Motion Means Position Changes",
        paragraphs: [
          "An object is in motion when its position changes compared with a reference point. A runner leaving the start line, a ball rolling across a floor, and a bus driving away from a stop are all examples of motion. To describe the motion clearly, you need a starting point and a way to measure how far the object moves.",
          "Distance tells how much ground an object covers. A toy car that moves from 0 meters to 6 meters on a track has traveled 6 meters. Distance does not tell you by itself whether the car moved quickly or slowly. It only tells how far it went.",
          "A common beginner mistake is to hear a large distance and assume high speed. A walker can travel a long distance slowly, while a sprinter can travel a short distance very quickly. Distance and speed answer different questions."
        ],
        keyTerms: [
          { term: "motion", definition: "A change in an object's position compared with a reference point." },
          { term: "position", definition: "Where an object is located compared with a chosen point." },
          { term: "distance", definition: "How far an object travels along its path." }
        ],
        visualizationId: "physics:motion"
      },
      {
        id: "motion-speed",
        sectionNumber: "1.2",
        title: "Speed Compares Distance and Time",
        paragraphs: [
          "Speed tells how much distance is covered in a certain amount of time. If two cyclists travel the same distance, the one who takes less time has the greater speed. If they travel for the same amount of time, the one who covers more distance has the greater speed.",
          "A simple way to calculate speed is distance divided by time. If a cart travels 12 meters in 3 seconds, its speed is 4 meters per second. The unit matters because it shows both the distance unit and the time unit.",
          "Do not decide speed from distance alone. A car that travels 100 kilometers in 2 hours is faster than a bus that travels 120 kilometers in 4 hours, even though the bus went farther. Speed compares both distance and time."
        ],
        keyTerms: [
          { term: "speed", definition: "How quickly distance is covered, found by comparing distance with time." },
          { term: "time", definition: "How long the motion takes." },
          { term: "meters per second", definition: "A speed unit showing how many meters are traveled each second." }
        ]
      },
      {
        id: "motion-graphs",
        sectionNumber: "1.3",
        title: "Graphs Show Motion Patterns",
        paragraphs: [
          "A distance time graph can show a whole trip at once. Time is usually placed along the bottom, and distance from the start is placed up the side. Each point on the graph says where the object was at a certain time.",
          "A steeper line means a greater speed because the distance changes more in the same time. A flat line means the object is stopped because time passes but the distance from the start does not change. A gentle line means slower motion than a steep line.",
          "Graphs help check predictions. Before a car moves, you can predict whether the graph will be steep, gentle, or flat. After the motion plays, the graph lets you compare the prediction with evidence."
        ],
        keyTerms: [
          { term: "distance time graph", definition: "A graph that shows distance from the start at different times." },
          { term: "steeper line", definition: "A graph line that rises more quickly and shows greater speed." },
          { term: "flat line", definition: "A graph line showing no change in distance while time passes." }
        ]
      }
    ],
    visualizations: [
      {
        id: "physics:motion",
        title: "Motion Track and Graph",
        description:
          "A track model where learners set speed, watch a car move, and compare its trip with a live distance time graph.",
        interactionSummary:
          "Learners predict the graph shape, adjust speed, run the motion, and decide which object is faster from distance and time evidence.",
        focusPoints: ["start point", "finish point", "distance", "time", "speed slider", "graph slope"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "motion-practice-1",
        mode: "practice",
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
        id: "motion-practice-2",
        mode: "practice",
        type: "numeric",
        prompt: "A toy car travels 10 meters in 2 seconds. What is its speed in meters per second?",
        correctAnswer: "5",
        unit: "m/s",
        tolerance: 0,
        hint: "Use speed equals distance divided by time.",
        explanation: "Speed = 10 meters divided by 2 seconds = 5 meters per second."
      },
      {
        id: "motion-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Runner A travels 20 meters in 5 seconds. Runner B travels 20 meters in 4 seconds. Who is faster?",
        choices: ["Runner A", "Runner B", "They have the same speed", "There is not enough information"],
        correctAnswer: "Runner B",
        hint: "They ran the same distance, so compare the times.",
        explanation: "Runner B covers the same distance in less time, so Runner B has the greater speed."
      },
      {
        id: "motion-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What does a flat line on a distance time graph usually show?",
        choices: ["The object is stopped", "The object is speeding up", "The object moved backward quickly", "The object traveled the farthest"],
        correctAnswer: "The object is stopped",
        hint: "Look for whether distance changes while time passes.",
        explanation: "A flat line means time changes but distance from the start stays the same, so the object is stopped."
      }
    ],
    examQuestions: [
      {
        id: "motion-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A student says, 'The longer trip must be the faster trip.' Which response best corrects the misconception?",
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
        id: "motion-exam-2",
        mode: "exam",
        type: "numeric",
        prompt: "A cyclist travels 60 meters in 12 seconds. What is the cyclist's speed in meters per second?",
        correctAnswer: "5",
        unit: "m/s",
        tolerance: 0,
        explanation: "Speed = distance divided by time = 60 divided by 12 = 5 meters per second."
      },
      {
        id: "motion-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "Two carts move for 6 seconds. Cart A travels 18 meters. Cart B travels 24 meters. Which cart has the greater speed?",
        choices: ["Cart A", "Cart B", "They have the same speed", "Neither cart moved"],
        correctAnswer: "Cart B",
        explanation: "The time is the same, so the cart that covers more distance has the greater speed."
      },
      {
        id: "motion-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "On a distance time graph, which line shows the fastest steady motion?",
        choices: ["The steepest rising line", "A flat line", "The shortest line label", "The line with the lightest color"],
        correctAnswer: "The steepest rising line",
        explanation: "A steeper rising line shows more distance covered in the same time, so it shows greater speed."
      },
      {
        id: "motion-exam-5",
        mode: "exam",
        type: "short_text",
        prompt: "What two measurements are needed to calculate speed?",
        correctAnswer: "distance and time",
        acceptedAnswers: ["time and distance"],
        explanation: "Speed is found by comparing distance traveled with the time taken."
      }
    ]
  },
  {
    meta: {
      subjectId: "physics",
      slug: "electricity",
      title: "Electricity",
      tagline: "Build circuits that give current a path to follow.",
      description:
        "Learn how batteries, bulbs, wires, and switches work together in a circuit, and why a gap anywhere in the path stops the current.",
      accentColor: "#2563eb",
      subtopics: ["Circuits", "Batteries", "Bulbs", "Switches", "Current path"],
      previewVisualizationId: "physics:electricity"
    },
    learnChapter: {
      number: 2,
      title: "Complete Circuits and Current Paths",
      introduction:
        "Electricity can make bulbs light, buzzers sound, and motors turn, but only when charges have a complete path to move through. In this chapter, you will build a simple circuit model and learn why batteries, wires, bulbs, and switches must be connected in a closed loop.",
      figureCaption:
        "A simple circuit loop connects a battery, switch, wires, and bulb so current can travel through every part."
    },
    learnSections: [
      {
        id: "electricity-circuit-parts",
        sectionNumber: "2.1",
        title: "Circuit Parts Have Jobs",
        paragraphs: [
          "A circuit is a path for electric current. In a simple bulb circuit, the battery provides energy, the wires connect the parts, and the bulb changes electrical energy into light and heat. Each part has a job, but no single part works alone.",
          "A battery has two terminals. For a bulb to light, the circuit must connect from one terminal of the battery, through the bulb, and back to the other terminal. That full loop matters more than how neat the drawing looks.",
          "Beginners sometimes connect only one side of a battery or one side of a bulb and expect the bulb to light. The circuit needs both sides of each part connected into one path."
        ],
        keyTerms: [
          { term: "circuit", definition: "A path that electric current can follow." },
          { term: "battery", definition: "A source that provides energy to charges in a circuit." },
          { term: "terminal", definition: "A connection point on a battery or component." }
        ],
        visualizationId: "physics:electricity"
      },
      {
        id: "electricity-complete-path",
        sectionNumber: "2.2",
        title: "Current Needs a Complete Path",
        paragraphs: [
          "Electric current is the movement of electric charge through a circuit. In a closed circuit, every part is connected so current has a full path. The bulb can light because current passes through it as part of the loop.",
          "In an open circuit, there is a gap. A missing wire, a loose connection, or an open switch can break the path. When the path is broken, current does not flow around the loop, so the bulb stays off.",
          "The gap can be anywhere in the path. It does not have to be next to the bulb. If the loop is broken at the switch, near the battery, or between wires, the current path is still incomplete."
        ],
        keyTerms: [
          { term: "current", definition: "The movement of electric charge through a circuit." },
          { term: "closed circuit", definition: "A circuit with a complete path for current." },
          { term: "open circuit", definition: "A circuit with a gap that stops current." }
        ]
      },
      {
        id: "electricity-switches-faults",
        sectionNumber: "2.3",
        title: "Switches Open and Close Circuits",
        paragraphs: [
          "A switch controls a circuit by opening or closing the path. When the switch is closed, it acts like a connected piece of the path and current can flow. When the switch is open, it makes a gap and stops the current.",
          "Fault finding means checking each connection to see where the path is broken. If a bulb does not light, ask whether the battery is connected on both sides, whether the bulb is in the loop, and whether the switch is closed.",
          "Electricity is not used up before it reaches the bulb. In a simple complete circuit, current follows the whole loop. The bulb lights because energy is transferred there, not because current disappears inside it."
        ],
        keyTerms: [
          { term: "switch", definition: "A component that opens or closes a circuit path." },
          { term: "gap", definition: "A break in the circuit path that stops current." },
          { term: "fault", definition: "A problem in a circuit, such as a loose or missing connection." }
        ]
      }
    ],
    visualizations: [
      {
        id: "physics:electricity",
        title: "Simple Circuit Builder",
        description:
          "A circuit building model where learners connect a battery, bulb, wires, and switch, then test whether the bulb lights.",
        interactionSummary:
          "Learners drag parts into a loop, toggle the switch, find broken connections, and trace the current path through a complete circuit.",
        focusPoints: ["battery terminals", "wire path", "bulb", "switch", "open circuit", "closed circuit"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "electricity-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What must a simple bulb circuit have for the bulb to light?",
        choices: ["A complete path from one battery terminal to the other", "Only one wire touching the bulb", "A gap beside the switch", "A battery drawn near the bulb but not connected"],
        correctAnswer: "A complete path from one battery terminal to the other",
        hint: "Current needs a full loop.",
        explanation: "The bulb lights only when the circuit forms a closed path through the battery and bulb."
      },
      {
        id: "electricity-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What happens when a switch is open in a simple circuit?",
        choices: ["The circuit has a gap and current stops", "The bulb gets brighter", "The battery becomes two batteries", "Current jumps across every gap"],
        correctAnswer: "The circuit has a gap and current stops",
        hint: "An open switch breaks the path.",
        explanation: "An open switch creates an open circuit, so current cannot travel around the loop."
      },
      {
        id: "electricity-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "What word describes a circuit with no gap in the current path?",
        correctAnswer: "closed circuit",
        acceptedAnswers: ["closed", "complete circuit", "complete path"],
        hint: "It is the opposite of an open circuit.",
        explanation: "A closed circuit has a complete path for current."
      },
      {
        id: "electricity-practice-4",
        mode: "practice",
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
        id: "electricity-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A student connects one wire from a battery to a bulb and says the bulb should light because it touches the battery. What is the best correction?",
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
        id: "electricity-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which change would make an open circuit become a closed circuit?",
        choices: ["Closing the switch so it completes the path", "Removing a wire from the loop", "Adding a gap beside the bulb", "Disconnecting one battery terminal"],
        correctAnswer: "Closing the switch so it completes the path",
        explanation: "Closing the switch removes the gap at the switch and lets current flow around the loop."
      },
      {
        id: "electricity-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "In a simple complete circuit with one battery and one bulb, which path best describes current?",
        choices: [
          "Around the whole loop through the battery, wires, and bulb",
          "Only from the battery to the first wire, then it stops",
          "Only inside the bulb",
          "Through empty space without needing wires"
        ],
        correctAnswer: "Around the whole loop through the battery, wires, and bulb",
        explanation: "Current follows the complete conducting loop when the circuit is closed."
      },
      {
        id: "electricity-exam-4",
        mode: "exam",
        type: "short_text",
        prompt: "What circuit part opens and closes the current path?",
        correctAnswer: "switch",
        acceptedAnswers: ["a switch"],
        explanation: "A switch controls whether the circuit path is open or closed."
      },
      {
        id: "electricity-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A circuit has a working battery, bulb, and switch, but a wire is disconnected far from the bulb. What should happen?",
        choices: ["The bulb stays off because the circuit path is incomplete", "The bulb lights because the gap is far away", "The battery sends current through the table", "The switch stops mattering"],
        correctAnswer: "The bulb stays off because the circuit path is incomplete",
        explanation: "A gap anywhere in the loop makes the circuit open, so the bulb will not light."
      }
    ]
  },
  {
    meta: {
      subjectId: "physics",
      slug: "magnetism",
      title: "Magnetism",
      tagline: "Test poles, pulls, pushes, and magnetic materials.",
      description:
        "Learn what magnets can do, how north and south poles attract or repel, and why not every metal object is strongly magnetic.",
      accentColor: "#7c3aed",
      subtopics: ["Magnets", "Poles", "Attraction", "Repulsion", "Magnetic materials"],
      previewVisualizationId: "physics:magnetism"
    },
    learnChapter: {
      number: 3,
      title: "Magnets, Poles, Attraction, and Repulsion",
      introduction:
        "Magnets can pull some materials and can push or pull other magnets. In this chapter, you will learn how magnetic poles work, why flipping a magnet can change the result, and why some metal objects respond strongly while others do not.",
      figureCaption:
        "Two bar magnets show north and south poles. Unlike poles attract, while like poles repel."
    },
    learnSections: [
      {
        id: "magnetism-magnetic-materials",
        sectionNumber: "3.1",
        title: "Magnets Pull Some Materials",
        paragraphs: [
          "A magnet can attract some materials without touching them. Paper clips, steel nails, and some iron objects are common examples. The pull can act through a small space and sometimes through thin materials such as paper.",
          "Not every object is attracted to a magnet. Wood, plastic, glass, and paper are not magnetic in ordinary classroom tests. Some metals, such as aluminum and copper, are also not strongly attracted to a simple magnet.",
          "A common mistake is to think all metal objects are magnetic. A better rule is that magnets strongly attract certain materials, especially iron, steel, nickel, and cobalt. Testing gives evidence."
        ],
        keyTerms: [
          { term: "magnet", definition: "An object that can attract some materials and interact with other magnets." },
          { term: "magnetic material", definition: "A material that is strongly attracted to a magnet." },
          { term: "attract", definition: "To pull toward." }
        ],
        visualizationId: "physics:magnetism"
      },
      {
        id: "magnetism-poles",
        sectionNumber: "3.2",
        title: "Every Magnet Has Poles",
        paragraphs: [
          "A bar magnet has two poles, called north and south. The magnetic effect is often strongest near the poles. If you bring a paper clip near the end of a bar magnet, the pull is usually stronger than near the middle.",
          "Poles come in pairs. If a magnet breaks, the pieces do not become single north or single south poles. Each piece acts like a smaller magnet with its own north pole and south pole.",
          "The pole labels matter when magnets interact. Looking only at the color or size of the magnet is not enough. You need to know which poles are facing each other."
        ],
        keyTerms: [
          { term: "pole", definition: "An end or region of a magnet where the magnetic effect is strongest." },
          { term: "north pole", definition: "One of the two pole types on a magnet." },
          { term: "south pole", definition: "The other pole type on a magnet." }
        ]
      },
      {
        id: "magnetism-attract-repel",
        sectionNumber: "3.3",
        title: "Like Poles Repel and Unlike Poles Attract",
        paragraphs: [
          "When two magnets are near each other, the result depends on the poles facing each other. A north pole facing a south pole will attract. A north facing another north will repel. A south facing another south will also repel.",
          "Repel means push away. This can surprise beginners because magnets are often described only as pulling things. Magnets can pull magnetic materials, but two magnets can either pull together or push apart depending on pole direction.",
          "Flipping one magnet changes which pole faces the other magnet. That is why the same two magnets can attract in one setup and repel after one magnet is turned around."
        ],
        keyTerms: [
          { term: "repel", definition: "To push away." },
          { term: "like poles", definition: "Two matching poles, north with north or south with south." },
          { term: "unlike poles", definition: "Two different poles, north with south." }
        ]
      }
    ],
    visualizations: [
      {
        id: "physics:magnetism",
        title: "Magnet Pole Sandbox",
        description:
          "A magnet sandbox where learners drag bar magnets and test objects to observe attraction, repulsion, and magnetic materials.",
        interactionSummary:
          "Learners place magnets near paper clips and other materials, flip poles, predict attract or repel, then compare the result with the model.",
        focusPoints: ["north pole", "south pole", "attraction", "repulsion", "paper clips", "nonmagnetic objects"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "magnetism-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which pair of magnet poles will attract?",
        choices: ["North and south", "North and north", "South and south", "Two north poles only"],
        correctAnswer: "North and south",
        hint: "Unlike poles pull together.",
        explanation: "Unlike poles attract, so a north pole and a south pole pull together."
      },
      {
        id: "magnetism-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What happens when two north poles face each other?",
        choices: ["They repel", "They attract", "They stop being magnets", "They turn into plastic"],
        correctAnswer: "They repel",
        hint: "Like poles push away.",
        explanation: "North and north are like poles, so they repel."
      },
      {
        id: "magnetism-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which object is most likely to be strongly attracted to a classroom magnet?",
        choices: ["Steel paper clip", "Wooden pencil", "Plastic cup", "Glass marble"],
        correctAnswer: "Steel paper clip",
        hint: "Look for a material that contains iron or steel.",
        explanation: "Steel contains iron, so a steel paper clip is usually attracted to a magnet."
      },
      {
        id: "magnetism-practice-4",
        mode: "practice",
        type: "short_text",
        prompt: "What word means to push away in magnetism?",
        correctAnswer: "repel",
        acceptedAnswers: ["repulsion", "repelling"],
        hint: "It is the opposite of attract.",
        explanation: "Repel means push away. Like poles repel each other."
      }
    ],
    examQuestions: [
      {
        id: "magnetism-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A student says magnets only pull and never push. Which observation best corrects the misconception?",
        choices: [
          "Two north poles facing each other push apart",
          "A magnet can attract a steel paper clip",
          "A wooden block is not attracted to a magnet",
          "A magnet has a north pole and a south pole"
        ],
        correctAnswer: "Two north poles facing each other push apart",
        explanation: "Like poles repel, so magnets can push away as well as pull together."
      },
      {
        id: "magnetism-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which statement about metal and magnets is most accurate?",
        choices: [
          "Some metals are strongly attracted to magnets, but not all metals are",
          "Every metal object is strongly attracted to magnets",
          "No metal object is attracted to magnets",
          "Only shiny objects can be magnetic"
        ],
        correctAnswer: "Some metals are strongly attracted to magnets, but not all metals are",
        explanation: "Iron, steel, nickel, and cobalt can be strongly magnetic, but metals such as aluminum and copper are not strongly attracted to simple magnets."
      },
      {
        id: "magnetism-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "Two bar magnets attract when their ends face each other. One magnet is flipped around, and the same ends now push apart. What changed?",
        choices: ["The poles facing each other changed", "The magnets stopped having poles", "The magnets became wood", "The force disappeared forever"],
        correctAnswer: "The poles facing each other changed",
        explanation: "Flipping a magnet changes whether like or unlike poles face each other, so attraction can change to repulsion."
      },
      {
        id: "magnetism-exam-4",
        mode: "exam",
        type: "short_text",
        prompt: "Name the two pole types on a magnet.",
        correctAnswer: "north and south",
        acceptedAnswers: ["south and north", "north pole and south pole", "south pole and north pole"],
        explanation: "Magnets have north and south poles."
      },
      {
        id: "magnetism-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A magnet is broken into two pieces. Which result is most likely?",
        choices: [
          "Each piece acts like a smaller magnet with a north pole and a south pole",
          "One piece has only a north pole and the other has only a south pole",
          "Both pieces lose all magnetic behavior immediately",
          "The pieces can only attract plastic"
        ],
        correctAnswer: "Each piece acts like a smaller magnet with a north pole and a south pole",
        explanation: "Magnetic poles come in pairs. Broken pieces of a magnet still have north and south poles."
      }
    ]
  }
]);
