import type { PhysicsTopicContent } from "./types";

export const magnetismContent: PhysicsTopicContent = {
  meta: {
    slug: "magnetism",
    title: "Magnetism",
    tagline: "Test poles, pulls, pushes, and magnetic materials",
    description:
      "Learn what magnets can do, how north and south poles attract or repel, and why not every metal object is strongly magnetic.",
    accentColor: "#7c3aed",
    subtopics: ["Magnets", "Poles", "Attraction", "Repulsion", "Magnetic materials"],
    previewVisualization: "magnetism"
  },
  learnChapter: {
    number: 3,
    title: "Magnets, Poles, Attraction, and Repulsion",
    introduction:
      "Magnets can pull some materials and can push or pull other magnets. This chapter explains how magnetic poles work, why flipping a magnet can change the result, and why some metal objects respond strongly while others do not.",
    figureCaption: "Two bar magnets show north and south poles. Unlike poles attract, while like poles repel."
  },
  learnSections: [
    {
      id: "magnetism-magnetic-materials",
      sectionNumber: "3.1",
      title: "Magnets pull some materials",
      visualizationId: "magnet-poles",
      paragraphs: [
        "A magnet can attract some materials without touching them. Paper clips, steel nails, and some iron objects are common examples.",
        "Not every object is attracted to a magnet. Wood, plastic, glass, and paper are not magnetic in ordinary classroom tests. Some metals, such as aluminum and copper, are also not strongly attracted to a simple magnet.",
        "A better rule than 'all metal is magnetic' is that magnets strongly attract certain materials, especially iron, steel, nickel, and cobalt. Testing gives evidence."
      ],
      keyTerms: [
        { term: "Magnet", definition: "An object that can attract some materials and interact with other magnets." },
        { term: "Magnetic material", definition: "A material that is strongly attracted to a magnet." },
        { term: "Attract", definition: "To pull toward." }
      ]
    },
    {
      id: "magnetism-poles",
      sectionNumber: "3.2",
      title: "Every magnet has poles",
      visualizationId: "magnet-poles",
      paragraphs: [
        "A bar magnet has two poles, called north and south. The magnetic effect is often strongest near the poles.",
        "Poles come in pairs. If a magnet breaks, the pieces do not become single north or single south poles. Each piece acts like a smaller magnet with both pole types.",
        "The pole labels matter when magnets interact. Looking only at the color or size of the magnet is not enough; you need to know which poles are facing."
      ],
      keyTerms: [
        { term: "Pole", definition: "An end or region of a magnet where the magnetic effect is strongest." },
        { term: "North pole", definition: "One of the two pole types on a magnet." },
        { term: "South pole", definition: "The other pole type on a magnet." }
      ]
    },
    {
      id: "magnetism-attract-repel",
      sectionNumber: "3.3",
      title: "Like poles repel and unlike poles attract",
      visualizationId: "magnet-poles",
      paragraphs: [
        "When two magnets are near each other, the result depends on the poles facing each other. A north pole facing a south pole will attract.",
        "A north facing another north will repel. A south facing another south will also repel. Repel means push away.",
        "Flipping one magnet changes which pole faces the other magnet. That is why the same two magnets can attract in one setup and repel after one magnet is turned around."
      ],
      keyTerms: [
        { term: "Repel", definition: "To push away." },
        { term: "Like poles", definition: "Two matching poles, north with north or south with south." },
        { term: "Unlike poles", definition: "Two different poles, north with south." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "magnetism-pr-1",
      type: "multiple_choice",
      prompt: "Which pair of magnet poles will attract?",
      choices: ["North and south", "North and north", "South and south", "Two north poles only"],
      correctAnswer: "North and south",
      hint: "Unlike poles pull together.",
      explanation: "Unlike poles attract, so a north pole and a south pole pull together."
    },
    {
      id: "magnetism-pr-2",
      type: "multiple_choice",
      prompt: "What happens when two north poles face each other?",
      choices: ["They repel", "They attract", "They stop being magnets", "They turn into plastic"],
      correctAnswer: "They repel",
      hint: "Like poles push away.",
      explanation: "North and north are like poles, so they repel."
    },
    {
      id: "magnetism-pr-3",
      type: "multiple_choice",
      prompt: "Which object is most likely to be strongly attracted to a classroom magnet?",
      choices: ["Steel paper clip", "Wooden pencil", "Plastic cup", "Glass marble"],
      correctAnswer: "Steel paper clip",
      hint: "Look for a material that contains iron or steel.",
      explanation: "Steel contains iron, so a steel paper clip is usually attracted to a magnet."
    },
    {
      id: "magnetism-pr-4",
      type: "short_text",
      prompt: "What word means to push away in magnetism?",
      correctAnswer: "repel",
      hint: "It is the opposite of attract.",
      explanation: "Repel means push away. Like poles repel each other."
    }
  ],
  examQuestions: [
    {
      id: "magnetism-ex-1",
      type: "multiple_choice",
      prompt: "A student says magnets only pull and never push. Which observation best corrects the misconception?",
      choices: ["Two north poles facing each other push apart", "A magnet can attract a steel paper clip", "A wooden block is not attracted to a magnet", "A magnet has a north pole and a south pole"],
      correctAnswer: "Two north poles facing each other push apart",
      explanation: "Like poles repel, so magnets can push away as well as pull together."
    },
    {
      id: "magnetism-ex-2",
      type: "multiple_choice",
      prompt: "Which statement about metal and magnets is most accurate?",
      choices: ["Some metals are strongly attracted to magnets, but not all metals are", "Every metal object is strongly attracted to magnets", "No metal object is attracted to magnets", "Only shiny objects can be magnetic"],
      correctAnswer: "Some metals are strongly attracted to magnets, but not all metals are",
      explanation: "Iron, steel, nickel, and cobalt can be strongly magnetic, but metals such as aluminum and copper are not strongly attracted to simple magnets."
    },
    {
      id: "magnetism-ex-3",
      type: "multiple_choice",
      prompt: "Two bar magnets attract when their ends face each other. One magnet is flipped around, and the same ends now push apart. What changed?",
      choices: ["The poles facing each other changed", "The magnets stopped having poles", "The magnets became wood", "The force disappeared forever"],
      correctAnswer: "The poles facing each other changed",
      explanation: "Flipping a magnet changes whether like or unlike poles face each other, so attraction can change to repulsion."
    },
    {
      id: "magnetism-ex-4",
      type: "short_text",
      prompt: "Name the two pole types on a magnet.",
      correctAnswer: "north and south",
      explanation: "Magnets have north and south poles."
    },
    {
      id: "magnetism-ex-5",
      type: "multiple_choice",
      prompt: "A magnet is broken into two pieces. Which result is most likely?",
      choices: ["Each piece acts like a smaller magnet with a north pole and a south pole", "One piece has only a north pole and the other has only a south pole", "Both pieces lose all magnetic behavior immediately", "The pieces can only attract plastic"],
      correctAnswer: "Each piece acts like a smaller magnet with a north pole and a south pole",
      explanation: "Magnetic poles come in pairs. Broken pieces of a magnet still have north and south poles."
    }
  ]
};
