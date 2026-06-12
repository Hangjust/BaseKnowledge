import { defineBeginnerLabTopics } from "../helpers";

export const chemistryBeginnerLabTopics = defineBeginnerLabTopics([
  {
    meta: {
      subjectId: "chemistry",
      slug: "matter",
      title: "Matter",
      tagline: "See solids, liquids, and gases as particles in motion.",
      description:
        "Build a clear particle model of matter, then use it to explain states, state changes, mixtures, and why invisible gases still count as matter.",
      accentColor: "#0f766e",
      subtopics: ["Mass and volume", "Particle model", "States of matter", "State changes"],
      previewVisualizationId: "chemistry:matter"
    },
    learnChapter: {
      number: 1,
      title: "Matter and the Particle Model",
      introduction:
        "Matter is anything that has mass and takes up space. That short idea explains rocks, juice, air, steam, and the tiny particles that make them up. In this chapter, you will connect everyday states of matter to a particle model that shows how particles are arranged and how they move.",
      figureCaption:
        "A particle model compares a solid with packed particles, a liquid with sliding particles, and a gas with spread out fast moving particles."
    },
    learnSections: [
      {
        id: "matter-what-counts",
        sectionNumber: "1.1",
        title: "What Counts as Matter",
        paragraphs: [
          "Matter has mass and takes up space. A brick is matter because it is heavy enough to measure and it fills part of a room. Water is matter because it has mass and takes the shape of a cup. Air is matter too, even when you cannot see it, because it has particles that push on surfaces and fill containers.",
          "A common mistake is to treat gases as empty space. A balloon proves the opposite. When you blow air into it, the balloon gains mass and grows because gas particles spread through the inside. The gas is not visible, but it still takes up space.",
          "Light, heat, and sound are not matter. They can travel through matter or from matter, but they are forms of energy rather than substances made from particles with mass."
        ],
        keyTerms: [
          { term: "matter", definition: "Anything that has mass and takes up space." },
          { term: "mass", definition: "The amount of matter in an object or sample." },
          { term: "volume", definition: "The amount of space matter takes up." }
        ],
        visualizationId: "chemistry:matter"
      },
      {
        id: "matter-particles",
        sectionNumber: "1.2",
        title: "Particles Explain the Three States",
        paragraphs: [
          "The particle model says that matter is made of tiny particles that are always moving. In a solid, particles are close together and vibrate in fixed positions, so the solid keeps its shape. In a liquid, particles are still close, but they can slide past each other, so the liquid flows and takes the shape of its container.",
          "In a gas, particles are far apart compared with a solid or liquid. They move quickly in many directions and spread out until they fill the space available. That is why perfume can spread through a room and why air can be squeezed into a smaller space.",
          "The particles in a substance do not disappear when the state changes. Ice, liquid water, and steam are all made of water particles. The arrangement and movement change, not the identity of the particles."
        ],
        keyTerms: [
          { term: "particle model", definition: "A way to explain matter as tiny moving particles." },
          { term: "solid", definition: "A state of matter with a fixed shape and fixed volume." },
          { term: "liquid", definition: "A state of matter with fixed volume but no fixed shape." },
          { term: "gas", definition: "A state of matter that spreads out to fill available space." }
        ]
      },
      {
        id: "matter-state-changes",
        sectionNumber: "1.3",
        title: "Heating, Cooling, and State Changes",
        paragraphs: [
          "Heating usually makes particles move faster. When a solid is heated enough, its particles can move out of fixed positions and the solid melts. When a liquid is heated enough, some particles escape into the gas state by evaporation or boiling.",
          "Cooling usually makes particles move more slowly. Gas particles can slow down and gather as a liquid by condensation. Liquid particles can slow down and settle into fixed positions by freezing.",
          "State changes are physical changes. The substance is still the same substance. Melting ice does not create a new chemical, and boiling water does not destroy the water particles."
        ],
        keyTerms: [
          { term: "melting", definition: "The change from solid to liquid." },
          { term: "freezing", definition: "The change from liquid to solid." },
          { term: "evaporation", definition: "The change from liquid to gas at the surface of a liquid." },
          { term: "condensation", definition: "The change from gas to liquid." }
        ]
      }
    ],
    visualizations: [
      {
        id: "chemistry:matter",
        title: "Particle Model of Matter",
        description:
          "A guided model showing particles in solids, liquids, and gases, with state changes driven by heating and cooling.",
        interactionSummary:
          "Learners adjust heating and cooling to see particle speed, spacing, and arrangement change while the substance stays the same.",
        focusPoints: ["solid particles", "liquid particles", "gas particles", "heating", "cooling"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "matter-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which example is matter?",
        choices: ["Air inside a balloon", "Light from a lamp", "Sound from a bell", "Heat from a stove"],
        correctAnswer: "Air inside a balloon",
        hint: "Matter has mass and takes up space, even when you cannot see it.",
        explanation: "Air is a gas made of particles. It has mass and fills the balloon, so it is matter."
      },
      {
        id: "matter-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What best describes particles in a solid?",
        choices: [
          "They vibrate close together in fixed positions",
          "They are very far apart and move freely",
          "They disappear until the solid melts",
          "They slide past each other like a liquid"
        ],
        correctAnswer: "They vibrate close together in fixed positions",
        hint: "A solid keeps its own shape.",
        explanation: "Solid particles are packed closely and vibrate in place, which helps the solid keep a fixed shape."
      },
      {
        id: "matter-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "Name the state change from liquid water to water vapor at the surface of the water.",
        correctAnswer: "evaporation",
        acceptedAnswers: ["evaporating"],
        hint: "This can happen from the surface even when the liquid is not boiling.",
        explanation: "Evaporation changes a liquid to a gas from the surface of the liquid."
      },
      {
        id: "matter-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "When ice melts, what happens to the water particles?",
        choices: [
          "They move out of fixed positions but stay water particles",
          "They turn into air particles",
          "They stop taking up space",
          "They become a new chemical"
        ],
        correctAnswer: "They move out of fixed positions but stay water particles",
        hint: "Melting is a physical change.",
        explanation: "Melting changes the arrangement and movement of particles, but the substance is still water."
      }
    ],
    examQuestions: [
      {
        id: "matter-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A sealed syringe contains air. When the plunger is pushed in, the air takes up less space. Which particle model explanation is best?",
        choices: [
          "Gas particles have space between them, so they can be pushed closer together",
          "Gas particles are destroyed when pressure increases",
          "Air stops being matter when it is compressed",
          "Gas particles change into liquid particles right away"
        ],
        correctAnswer: "Gas particles have space between them, so they can be pushed closer together",
        explanation: "Gas particles are far apart, so compression can reduce the space between them without destroying the particles."
      },
      {
        id: "matter-exam-2",
        mode: "exam",
        type: "short_text",
        prompt: "State the two properties that decide whether something is matter.",
        correctAnswer: "mass and volume",
        acceptedAnswers: ["has mass and takes up space", "mass and takes up space"],
        explanation: "Matter is defined as anything with mass and volume, meaning it takes up space."
      },
      {
        id: "matter-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A student says steam is not matter because it is hard to see. Which response best corrects the misconception?",
        choices: [
          "Steam is matter because it is water vapor made of particles with mass and volume",
          "Steam is not matter until it cools into liquid water",
          "Steam is only energy because it is warm",
          "Steam is empty space with no particles"
        ],
        correctAnswer: "Steam is matter because it is water vapor made of particles with mass and volume",
        explanation: "Steam is a gas form of water. It may be hard to see, but it is still made of particles."
      },
      {
        id: "matter-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "Which pair correctly matches a state change with the particle movement usually involved?",
        choices: [
          "Freezing, particles slow down and become fixed in place",
          "Melting, particles slow down and move farther apart into a gas",
          "Condensation, particles speed up and spread farther apart",
          "Evaporation, particles stop moving completely"
        ],
        correctAnswer: "Freezing, particles slow down and become fixed in place",
        explanation: "Freezing happens when liquid particles lose energy, slow down, and settle into a solid arrangement."
      },
      {
        id: "matter-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "Sand mixed with water can often be separated by filtering. What does this show about the mixture?",
        choices: [
          "The sand and water kept their own particles and did not become one new substance",
          "The sand chemically changed into water",
          "The water stopped being matter",
          "Every mixture is impossible to separate"
        ],
        correctAnswer: "The sand and water kept their own particles and did not become one new substance",
        explanation: "Many mixtures keep their original parts. Filtering separates the solid sand from the liquid water."
      }
    ]
  },
  {
    meta: {
      subjectId: "chemistry",
      slug: "periodic-table",
      title: "Periodic Table",
      tagline: "Find the patterns hidden in every element tile.",
      description:
        "Learn how the periodic table organizes elements by atoms, symbols, groups, periods, and repeating patterns in properties.",
      accentColor: "#2563eb",
      subtopics: ["Elements", "Symbols", "Groups and periods", "Metals and nonmetals"],
      previewVisualizationId: "chemistry:periodic-table"
    },
    learnChapter: {
      number: 2,
      title: "Reading Periodic Table Patterns",
      introduction:
        "The periodic table is not a random chart to memorize. It is a map of elements, and each element is made of one kind of atom. Once you know how to read rows, columns, names, and symbols, the table starts to show patterns that help you predict how elements behave.",
      figureCaption:
        "A color coded periodic table highlights element tiles, rows called periods, columns called groups, metals, nonmetals, and noble gases."
    },
    learnSections: [
      {
        id: "periodic-table-elements",
        sectionNumber: "2.1",
        title: "Elements and Their Tiles",
        paragraphs: [
          "An element is a pure substance made from one kind of atom. Oxygen is an element because every oxygen atom has the same basic identity. Carbon, hydrogen, iron, and gold are also elements. Each has its own tile on the periodic table.",
          "Most element tiles show a symbol, name, and atomic number. The symbol is a short label, usually one or two letters. Some symbols match English names, like C for carbon and O for oxygen. Others come from older names, like Fe for iron.",
          "The atomic number tells you the number of protons in one atom of that element. Changing the proton number changes the element itself, so atomic number is a basic identity tag."
        ],
        keyTerms: [
          { term: "element", definition: "A pure substance made of one kind of atom." },
          { term: "chemical symbol", definition: "A short letter code for an element." },
          { term: "atomic number", definition: "The number of protons in an atom of an element." }
        ],
        visualizationId: "chemistry:periodic-table"
      },
      {
        id: "periodic-table-patterns",
        sectionNumber: "2.2",
        title: "Rows, Columns, and Repeating Patterns",
        paragraphs: [
          "The rows of the periodic table are called periods. As you move across a period, the atomic number increases one step at a time. The columns are called groups. Elements in the same group often share similar properties because their atoms have similar outer electron patterns.",
          "This repeating pattern is why the table is called periodic. For example, noble gases are found in the far right group and usually react very little. Alkali metals are found near the far left and react strongly compared with many other metals.",
          "A common mistake is to read the table as a list sorted only by name or mass. It is actually arranged to show atomic structure and repeating properties. The position of an element gives clues, not just a location."
        ],
        keyTerms: [
          { term: "period", definition: "A horizontal row on the periodic table." },
          { term: "group", definition: "A vertical column on the periodic table." },
          { term: "periodic pattern", definition: "A property pattern that repeats across the table." }
        ]
      },
      {
        id: "periodic-table-families",
        sectionNumber: "2.3",
        title: "Metals, Nonmetals, and Families",
        paragraphs: [
          "Many periodic tables use colors to mark broad regions. Metals are mostly on the left and center. They often conduct heat and electricity, can be shiny, and can be shaped without breaking. Nonmetals are mostly on the right. Many are poor conductors, and some are gases at room temperature.",
          "Metalloids sit near the boundary between metals and nonmetals. They can have mixed properties, which makes them useful in materials such as computer chips. These regions are helpful patterns, but you should still read each element carefully.",
          "Elements in the same family can behave alike, but they are not identical. Sodium and potassium are both alkali metals, yet each element has its own details. Similar does not mean exactly the same."
        ],
        keyTerms: [
          { term: "metal", definition: "An element that often conducts heat and electricity and may be shiny." },
          { term: "nonmetal", definition: "An element that often conducts poorly and may be a gas or brittle solid." },
          { term: "metalloid", definition: "An element with some metal and some nonmetal properties." }
        ]
      }
    ],
    visualizations: [
      {
        id: "chemistry:periodic-table",
        title: "Periodic Table Tile Explorer",
        description:
          "An interactive table that opens element tiles and highlights groups, periods, metals, nonmetals, and noble gases.",
        interactionSummary:
          "Learners tap tiles to read symbols and atomic numbers, then switch overlays to compare rows, columns, and property regions.",
        focusPoints: ["element tiles", "groups", "periods", "metals", "nonmetals", "noble gases"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "periodic-table-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What is an element?",
        choices: [
          "A pure substance made of one kind of atom",
          "Any mixture that can be filtered",
          "A substance made only of water particles",
          "A row on the periodic table"
        ],
        correctAnswer: "A pure substance made of one kind of atom",
        hint: "Think about one kind of atom, not a mixture.",
        explanation: "An element contains one kind of atom and has its own place on the periodic table."
      },
      {
        id: "periodic-table-practice-2",
        mode: "practice",
        type: "short_text",
        prompt: "What is the name for a vertical column on the periodic table?",
        correctAnswer: "group",
        acceptedAnswers: ["family"],
        hint: "Elements in the same one often behave in similar ways.",
        explanation: "A vertical column is a group, sometimes also called a family."
      },
      {
        id: "periodic-table-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Why do elements in the same group often have similar properties?",
        choices: [
          "Their atoms have similar outer electron patterns",
          "Their names start with the same letter",
          "They always have the same color",
          "They all have the same atomic number"
        ],
        correctAnswer: "Their atoms have similar outer electron patterns",
        hint: "The pattern comes from atomic structure, not spelling.",
        explanation: "Elements in a group often share similar outer electron patterns, so their chemical behavior can be similar."
      },
      {
        id: "periodic-table-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which statement corrects a common misconception about the periodic table?",
        choices: [
          "Its layout follows patterns in elements and atoms",
          "It is arranged randomly so every table looks different",
          "It only lists elements in alphabetical order",
          "It is useful only for spelling element names"
        ],
        correctAnswer: "Its layout follows patterns in elements and atoms",
        hint: "Rows and columns have meaning.",
        explanation: "The periodic table is arranged to show patterns such as groups, periods, and related properties."
      }
    ],
    examQuestions: [
      {
        id: "periodic-table-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "An element has atomic number 8. What does the number 8 identify?",
        choices: [
          "The number of protons in one atom of the element",
          "The number of letters in the element name",
          "The number of compounds it can form",
          "The group number for every periodic table"
        ],
        correctAnswer: "The number of protons in one atom of the element",
        explanation: "Atomic number is the proton number. It identifies the element."
      },
      {
        id: "periodic-table-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A learner finds two elements in the same group. Which prediction is most reasonable?",
        choices: [
          "They may have similar chemical properties",
          "They must have exactly the same mass",
          "They must be the same element",
          "They cannot react with anything"
        ],
        correctAnswer: "They may have similar chemical properties",
        explanation: "Same group elements often have related properties, though they are still different elements."
      },
      {
        id: "periodic-table-exam-3",
        mode: "exam",
        type: "short_text",
        prompt: "What is the one or two letter code on an element tile called?",
        correctAnswer: "chemical symbol",
        acceptedAnswers: ["symbol", "element symbol"],
        explanation: "The chemical symbol is the short code used to represent an element."
      },
      {
        id: "periodic-table-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "Which set best describes common properties of many metals?",
        choices: [
          "Shiny, good conductors, and often shapeable",
          "Always gases and never reactive",
          "Poor conductors and always brittle powders",
          "Invisible and without mass"
        ],
        correctAnswer: "Shiny, good conductors, and often shapeable",
        explanation: "Many metals conduct heat and electricity, may shine, and can often be shaped."
      },
      {
        id: "periodic-table-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "The noble gases are grouped at the far right of the periodic table. What does their shared position suggest?",
        choices: [
          "They share a pattern of properties, including low reactivity",
          "They are all the same element",
          "They are arranged there by color only",
          "They have no atoms"
        ],
        correctAnswer: "They share a pattern of properties, including low reactivity",
        explanation: "Noble gases sit in the same group and are known for being much less reactive than many other elements."
      }
    ]
  },
  {
    meta: {
      subjectId: "chemistry",
      slug: "acids-and-bases",
      title: "Acids and Bases",
      tagline: "Use pH and indicators safely to compare common substances.",
      description:
        "Learn what acids, bases, neutral substances, pH numbers, and indicators can tell you, while practicing safe chemistry habits.",
      accentColor: "#dc2626",
      subtopics: ["Acids", "Bases", "Neutral substances", "pH and indicators", "Safety"],
      previewVisualizationId: "chemistry:acids-and-bases"
    },
    learnChapter: {
      number: 3,
      title: "Acids, Bases, pH, and Indicators",
      introduction:
        "Acids and bases are common in chemistry and in daily life. Lemon juice is acidic, many soaps are basic, and pure water is near neutral. Scientists compare them with pH and indicators, not by tasting or touching unknown substances. Safety is part of the science.",
      figureCaption:
        "A pH scale runs from acidic to neutral to basic, with indicator colors showing how a test sample changes."
    },
    learnSections: [
      {
        id: "acids-and-bases-properties",
        sectionNumber: "3.1",
        title: "Acids, Bases, and Neutral Substances",
        paragraphs: [
          "Acids and bases are types of substances with different chemical properties. Some acids, like lemon juice or vinegar, taste sour when they are foods, but tasting is never a safe test in science. Some bases, like soap solutions, can feel slippery, but touching unknown substances is also unsafe.",
          "A neutral substance is neither acidic nor basic. Pure water is close to neutral. Neutral does not always mean safe to drink, and acidic or basic does not always mean dangerous. The identity, concentration, and situation matter.",
          "Beginners often memorize examples without thinking about evidence. In a lab, you should use safe tests such as indicators, labels, and teacher instructions instead of senses like taste or touch."
        ],
        keyTerms: [
          { term: "acid", definition: "A substance with acidic properties and a pH below 7 in water." },
          { term: "base", definition: "A substance with basic properties and a pH above 7 in water." },
          { term: "neutral", definition: "Neither acidic nor basic, near pH 7 in water." }
        ],
        visualizationId: "chemistry:acids-and-bases"
      },
      {
        id: "acids-and-bases-ph",
        sectionNumber: "3.2",
        title: "The pH Scale",
        paragraphs: [
          "The pH scale is a number scale often shown from 0 to 14. Values below 7 are acidic, 7 is neutral, and values above 7 are basic. A lower pH means more acidic. A higher pH means more basic.",
          "The scale helps compare substances, but pH is not a measure of how tasty, clean, or safe something is. A strong acid and a strong base can both be dangerous. The number is information that must be used with safety rules.",
          "Household examples can help, as long as they are handled carefully. Lemon juice is acidic, water is near neutral, and some soap solutions are basic. You still should not taste or touch unknown samples."
        ],
        keyTerms: [
          { term: "pH", definition: "A scale used to show how acidic or basic a water based solution is." },
          { term: "acidic", definition: "Having a pH below 7." },
          { term: "basic", definition: "Having a pH above 7." }
        ]
      },
      {
        id: "acids-and-bases-indicators",
        sectionNumber: "3.3",
        title: "Indicators and Safe Testing",
        paragraphs: [
          "An indicator is a substance that changes color in acids or bases. Litmus paper, universal indicator, and red cabbage indicator are common beginner examples. The color change gives evidence about pH without unsafe tasting.",
          "Indicators must be read carefully. Different indicators use different color charts, so the same color does not always mean the same pH for every indicator. Always compare the result with the matching chart.",
          "Safe testing means wearing goggles when instructed, using small samples, reading labels, and washing hands after the activity. If a sample is unknown, treat it as unsafe until a trusted adult or lab instruction says what to do."
        ],
        keyTerms: [
          { term: "indicator", definition: "A substance that changes color to show acidic, neutral, or basic conditions." },
          { term: "litmus", definition: "An indicator paper often used to test acids and bases." },
          { term: "universal indicator", definition: "An indicator that shows a range of colors for different pH values." }
        ]
      }
    ],
    visualizations: [
      {
        id: "chemistry:acids-and-bases",
        title: "pH Indicator Lab",
        description:
          "A safe virtual pH scale and indicator test for comparing acid, neutral, and base samples.",
        interactionSummary:
          "Learners choose a labeled household sample, apply an indicator, match the color to a pH chart, and classify the sample safely.",
        focusPoints: ["pH scale", "acid range", "neutral point", "base range", "indicator color", "safety checks"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "acids-and-bases-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which pH value is acidic?",
        choices: ["3", "7", "9", "12"],
        correctAnswer: "3",
        hint: "Acids have pH values below 7.",
        explanation: "A pH of 3 is below 7, so it is acidic."
      },
      {
        id: "acids-and-bases-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What is the safest way to test whether an unknown solution is acidic or basic?",
        choices: [
          "Use an approved indicator and color chart",
          "Taste a tiny drop",
          "Rub it between your fingers",
          "Smell it closely for a long time"
        ],
        correctAnswer: "Use an approved indicator and color chart",
        hint: "Science tests should not use taste or unsafe contact.",
        explanation: "Indicators give evidence about acids and bases without tasting or touching unknown chemicals."
      },
      {
        id: "acids-and-bases-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "What word describes a substance with pH close to 7, like pure water?",
        correctAnswer: "neutral",
        acceptedAnswers: ["neutral substance"],
        hint: "It is neither acidic nor basic.",
        explanation: "A pH near 7 is neutral."
      },
      {
        id: "acids-and-bases-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "A universal indicator turns a sample color that matches pH 10 on its chart. How should the sample be classified?",
        choices: ["Basic", "Acidic", "Neutral", "Not matter"],
        correctAnswer: "Basic",
        hint: "Values above 7 are basic.",
        explanation: "A pH of 10 is greater than 7, so the sample is basic."
      }
    ],
    examQuestions: [
      {
        id: "acids-and-bases-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A student says, 'If a substance is an acid, it is safe to taste because some acids are in food.' Which response is best?",
        choices: [
          "Never taste unknown substances because food examples do not make lab samples safe",
          "All acids are safe if they smell like fruit",
          "Only bases need safety rules",
          "Taste is the most accurate pH test"
        ],
        correctAnswer: "Never taste unknown substances because food examples do not make lab samples safe",
        explanation: "Some foods are acidic, but unknown substances must be tested with safe lab methods, not taste."
      },
      {
        id: "acids-and-bases-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "Two samples have pH values of 5 and 9. Which comparison is correct?",
        choices: [
          "pH 5 is acidic, and pH 9 is basic",
          "pH 5 is basic, and pH 9 is acidic",
          "Both samples are neutral",
          "Both samples must be safe to touch"
        ],
        correctAnswer: "pH 5 is acidic, and pH 9 is basic",
        explanation: "Values below 7 are acidic, and values above 7 are basic."
      },
      {
        id: "acids-and-bases-exam-3",
        mode: "exam",
        type: "short_text",
        prompt: "Name one tool or material used to test pH safely without tasting the sample.",
        correctAnswer: "indicator",
        acceptedAnswers: ["litmus", "litmus paper", "universal indicator", "red cabbage indicator", "ph paper"],
        explanation: "Indicators and pH papers can show acidity or basicity through color changes."
      },
      {
        id: "acids-and-bases-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "Why should a learner use the color chart made for the same indicator they used?",
        choices: [
          "Different indicators can use different colors for pH values",
          "All indicators turn the same color in every solution",
          "Color charts are only decorative",
          "The chart changes the pH of the sample"
        ],
        correctAnswer: "Different indicators can use different colors for pH values",
        explanation: "Indicator colors must be matched to the correct chart because indicators do not all use the same color pattern."
      },
      {
        id: "acids-and-bases-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A cleaner has pH 12. Which statement is the safest and most scientifically accurate?",
        choices: [
          "It is basic and should be handled according to safety instructions",
          "It is neutral because it is a household item",
          "It is acidic because high pH means stronger acid",
          "It is safe to touch because bases are harmless"
        ],
        correctAnswer: "It is basic and should be handled according to safety instructions",
        explanation: "A pH of 12 is basic. Household products can still require careful handling."
      }
    ]
  }
]);
