import { defineBeginnerLabTopics } from "../helpers";

export const biologyBeginnerLabTopics = defineBeginnerLabTopics([
  {
    meta: {
      subjectId: "biology",
      slug: "cells",
      title: "Cells",
      tagline: "Meet the tiny units that make living things work.",
      description:
        "Learn how cells act as the basic building blocks of life, why cell parts have different jobs, and how plant and animal cells compare.",
      accentColor: "#16a34a",
      subtopics: ["Cell parts", "Plant and animal cells", "Specialized cells"],
      previewVisualizationId: "biology:cells"
    },
    learnChapter: {
      number: 1,
      title: "Cells, the Building Blocks of Life",
      introduction:
        "Every living thing is made of cells. In this chapter, you will learn what cells are, what their main parts do, and why cells are not all exactly alike.",
      figureCaption:
        "A cell diagram with hotspots for the nucleus, cell membrane, cytoplasm, cell wall, and chloroplasts."
    },
    learnSections: [
      {
        id: "cells-living-units",
        sectionNumber: "1.1",
        title: "Cells are small living units",
        paragraphs: [
          "A cell is the smallest unit that can carry out the basic jobs of life. Your body, a tree, a mushroom, and a pond plant are all made of cells. Some living things have only one cell, while others have many millions or even trillions of cells working together.",
          "Cells are tiny, but they are active. They take in materials, release waste, use energy, grow, and help living things stay alive. Thinking of a cell as a small working space is helpful, because different parts inside the cell handle different jobs.",
          "A common beginner mistake is to imagine cells as empty bubbles. Real cells are organized. Even a simple cell has a boundary and material inside it, and many cells have structures that help them carry out life processes."
        ],
        keyTerms: [
          {
            term: "Cell",
            definition: "The smallest unit of a living thing that can carry out life processes."
          },
          {
            term: "Organism",
            definition: "A living thing, such as a plant, animal, bacterium, or fungus."
          }
        ],
        visualizationId: "biology:cells"
      },
      {
        id: "cells-main-parts",
        sectionNumber: "1.2",
        title: "Cell parts have jobs",
        paragraphs: [
          "Many beginner diagrams show a cell with a few important parts. The cell membrane is a thin boundary around the cell. It helps control what enters and leaves, a bit like a careful gate that lets useful materials in and helps keep harmful or unneeded materials out.",
          "The cytoplasm is the jellylike material inside the cell where many activities happen. In many plant and animal cells, the nucleus holds instructions that help control the cell. These instructions affect growth, repair, and how the cell works.",
          "These parts work together. The nucleus does not do every job by itself, and the membrane is not just a wrapper. A healthy cell depends on its parts doing their jobs at the same time."
        ],
        keyTerms: [
          {
            term: "Cell membrane",
            definition: "The boundary that helps control what enters and leaves a cell."
          },
          {
            term: "Nucleus",
            definition: "The part of many cells that holds instructions for cell activities."
          },
          {
            term: "Cytoplasm",
            definition: "The jellylike material inside a cell where many cell activities happen."
          }
        ]
      },
      {
        id: "cells-not-the-same",
        sectionNumber: "1.3",
        title: "Not all cells are the same",
        paragraphs: [
          "Plant cells and animal cells share some parts, including a cell membrane, cytoplasm, and often a nucleus. Plant cells also usually have a cell wall, which gives extra support, and chloroplasts, which help the plant make food using light.",
          "Cells can also be specialized. A nerve cell is shaped to carry messages. A muscle cell is suited for movement. A leaf cell may contain many chloroplasts because leaves do a lot of food making. Shape and structure match the cell's job.",
          "So it is not accurate to say that all cells are the same. Cells follow the same basic idea, but different organisms and different body parts need cells with different features."
        ],
        keyTerms: [
          {
            term: "Cell wall",
            definition: "A firm outer layer found in plant cells that gives support and shape."
          },
          {
            term: "Chloroplast",
            definition: "A plant cell part that uses light energy to help make food."
          },
          {
            term: "Specialized cell",
            definition: "A cell with a shape or structure suited to a particular job."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "biology:cells",
        title: "Cell Hotspot Explorer",
        description:
          "A labeled plant and animal cell scene where learners select hotspots to reveal what each part does.",
        interactionSummary:
          "Learners tap cell hotspots, compare plant and animal cell parts, and match each structure to its job.",
        focusPoints: ["Nucleus", "Cell membrane", "Cytoplasm", "Cell wall", "Chloroplasts"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "cells-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which statement best describes a cell?",
        choices: [
          "The smallest living unit that carries out life processes",
          "A liquid found only in animals",
          "A nonliving part of soil",
          "A type of food made by plants"
        ],
        correctAnswer: "The smallest living unit that carries out life processes",
        hint: "Think about what living things are made from at the smallest level.",
        explanation: "A cell is the basic living unit. Living things are made of one or more cells."
      },
      {
        id: "cells-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which cell part helps control what enters and leaves the cell?",
        choices: ["Cell membrane", "Nucleus", "Cell wall", "Chloroplast"],
        correctAnswer: "Cell membrane",
        hint: "Look for the cell part that works like a boundary or gate.",
        explanation: "The cell membrane surrounds the cell and helps control movement in and out."
      },
      {
        id: "cells-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "What plant cell part helps plants make food using light?",
        correctAnswer: "chloroplast",
        acceptedAnswers: ["chloroplasts"],
        hint: "This part is often shown as a green structure in plant cells.",
        explanation: "Chloroplasts contain materials that capture light energy for food making."
      },
      {
        id: "cells-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Why is it wrong to say all cells are exactly the same?",
        choices: [
          "Different cells can have different parts, shapes, and jobs",
          "Cells are not found in plants",
          "Only animals have cells",
          "Cells never do any work"
        ],
        correctAnswer: "Different cells can have different parts, shapes, and jobs",
        hint: "Compare a plant cell, an animal cell, and a nerve cell.",
        explanation: "Cells share basic features, but many cells are specialized for different tasks."
      }
    ],
    examQuestions: [
      {
        id: "cells-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A student says the nucleus is the boundary that controls what enters and leaves a cell. What is the best correction?",
        choices: [
          "The cell membrane controls entry and exit, while the nucleus holds instructions",
          "The cytoplasm controls entry and exit, while the nucleus makes sunlight",
          "The cell wall controls entry and exit in all animal cells",
          "The chloroplast controls entry and exit, while the membrane stores instructions"
        ],
        correctAnswer: "The cell membrane controls entry and exit, while the nucleus holds instructions",
        explanation: "The membrane is the controlling boundary. The nucleus stores instructions in many cells."
      },
      {
        id: "cells-exam-2",
        mode: "exam",
        type: "short_text",
        prompt: "Name one structure usually found in plant cells but not animal cells.",
        correctAnswer: "cell wall",
        acceptedAnswers: ["chloroplast", "chloroplasts", "large vacuole", "cell walls"],
        explanation: "Plant cells usually have a cell wall and chloroplasts, while animal cells do not."
      },
      {
        id: "cells-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which example best shows a specialized cell?",
        choices: [
          "A nerve cell with a long shape for carrying messages",
          "A stone in soil",
          "A drop of rainwater",
          "A spoonful of sugar"
        ],
        correctAnswer: "A nerve cell with a long shape for carrying messages",
        explanation: "A specialized cell has features that fit a specific job."
      },
      {
        id: "cells-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which pair correctly matches a cell part with its job?",
        choices: [
          "Cytoplasm, jellylike area where many cell activities happen",
          "Chloroplast, controls what enters and leaves animal cells",
          "Cell wall, holds instructions in animal cells",
          "Nucleus, makes plant cells green by capturing light"
        ],
        correctAnswer: "Cytoplasm, jellylike area where many cell activities happen",
        explanation: "Cytoplasm fills much of the inside of the cell and is the site of many activities."
      },
      {
        id: "cells-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A microscope view shows a cell with a cell wall and chloroplasts. What is the most likely conclusion?",
        choices: [
          "It is probably a plant cell",
          "It is definitely an animal blood cell",
          "It is not living",
          "It cannot use energy"
        ],
        correctAnswer: "It is probably a plant cell",
        explanation: "Cell walls and chloroplasts are common features of plant cells."
      }
    ]
  },
  {
    meta: {
      subjectId: "biology",
      slug: "photosynthesis",
      title: "Photosynthesis",
      tagline: "See how plants make their own food using light.",
      description:
        "Learn how sunlight, water, and carbon dioxide help plants make sugar, and why oxygen is released during the process.",
      accentColor: "#65a30d",
      subtopics: ["Plant needs", "Inputs and outputs", "Leaves and chloroplasts"],
      previewVisualizationId: "biology:photosynthesis"
    },
    learnChapter: {
      number: 2,
      title: "How Plants Make Food",
      introduction:
        "Plants do not eat food the way animals do. They make sugar inside their leaves using light energy, water, and carbon dioxide.",
      figureCaption:
        "A leaf diagram showing sunlight, water, and carbon dioxide going in, with sugar made and oxygen released."
    },
    learnSections: [
      {
        id: "photosynthesis-food-making",
        sectionNumber: "2.1",
        title: "Plants make sugar for food",
        paragraphs: [
          "Photosynthesis is the process plants use to make sugar. Sugar is a food because it stores energy the plant can use for growth, repair, and other life processes. The plant may use some sugar right away and store some for later.",
          "This idea fixes a common misconception. Soil helps plants by holding water and minerals, but soil is not the plant's main food. Plants make their food inside their own cells, especially in green parts such as leaves.",
          "Animals must eat other organisms to get food energy. Plants are different because they can use light energy to build sugar from simple materials. That is why plants are called producers in many ecosystems."
        ],
        keyTerms: [
          {
            term: "Photosynthesis",
            definition: "The process plants use to make sugar from water and carbon dioxide using light energy."
          },
          {
            term: "Sugar",
            definition: "A food made by plants that stores energy for life processes."
          }
        ],
        visualizationId: "biology:photosynthesis"
      },
      {
        id: "photosynthesis-inputs-outputs",
        sectionNumber: "2.2",
        title: "Inputs go in, outputs come out",
        paragraphs: [
          "Photosynthesis has inputs and outputs. Inputs are the materials and energy needed for the process. The main inputs are sunlight, water, and carbon dioxide. Water usually enters through the roots, carbon dioxide comes from the air, and light reaches the leaves.",
          "The outputs are sugar and oxygen. Sugar stays with the plant as food. Oxygen is released into the air. This oxygen matters to many living things, including humans, because it is used in breathing.",
          "A useful word equation is: carbon dioxide plus water plus light makes sugar plus oxygen. The equation is not just a set of words to memorize. It shows that photosynthesis rearranges simple materials into food."
        ],
        keyTerms: [
          {
            term: "Input",
            definition: "Something needed for a process to happen."
          },
          {
            term: "Output",
            definition: "Something produced by a process."
          },
          {
            term: "Carbon dioxide",
            definition: "A gas from the air that plants use during photosynthesis."
          }
        ]
      },
      {
        id: "photosynthesis-not-breathing",
        sectionNumber: "2.3",
        title: "Photosynthesis is not the same as breathing",
        paragraphs: [
          "Plants exchange gases with the air, so it is easy to confuse photosynthesis with breathing. Photosynthesis is food making. It needs light and makes sugar. Breathing, also called respiration in science, releases energy from food in living cells.",
          "Plants also respire because plant cells need usable energy day and night. During bright light, photosynthesis can happen quickly in green parts. At night, photosynthesis stops because there is no light, but plant cells still use energy from food.",
          "The key point is simple: photosynthesis makes food, while respiration uses food to release energy. Both processes matter, but they are not the same job."
        ],
        keyTerms: [
          {
            term: "Respiration",
            definition: "The process cells use to release energy from food."
          },
          {
            term: "Producer",
            definition: "An organism, such as a green plant, that makes its own food."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "biology:photosynthesis",
        title: "Photosynthesis Inputs and Outputs",
        description:
          "A leaf model with arrows showing sunlight, water, and carbon dioxide entering, and sugar and oxygen being produced.",
        interactionSummary:
          "Learners turn inputs on and off, then observe how the model explains the effect on sugar and oxygen production.",
        focusPoints: ["Sunlight", "Water", "Carbon dioxide", "Sugar", "Oxygen"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "photosynthesis-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What is the main food made by photosynthesis?",
        choices: ["Sugar", "Soil", "Oxygen", "Sunlight"],
        correctAnswer: "Sugar",
        hint: "Plants use this as stored food energy.",
        explanation: "Photosynthesis makes sugar, which stores energy for the plant."
      },
      {
        id: "photosynthesis-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which list contains only inputs for photosynthesis?",
        choices: [
          "Sunlight, water, carbon dioxide",
          "Sugar, oxygen, sunlight",
          "Soil, oxygen, sugar",
          "Water, oxygen, sugar"
        ],
        correctAnswer: "Sunlight, water, carbon dioxide",
        hint: "Inputs are what the plant needs before it can make sugar.",
        explanation: "Photosynthesis needs light energy, water, and carbon dioxide."
      },
      {
        id: "photosynthesis-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "What gas is released by plants during photosynthesis?",
        correctAnswer: "oxygen",
        acceptedAnswers: ["o2"],
        hint: "This gas is important for many animals when they breathe.",
        explanation: "Oxygen is produced and released during photosynthesis."
      },
      {
        id: "photosynthesis-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Why is it incorrect to say plants get all their food from soil?",
        choices: [
          "Plants make sugar using light, water, and carbon dioxide",
          "Plants never need water",
          "Soil is made of oxygen",
          "Leaves do not do any work"
        ],
        correctAnswer: "Plants make sugar using light, water, and carbon dioxide",
        hint: "Think about what photosynthesis produces.",
        explanation: "Soil can provide minerals and hold water, but plants make their own sugar food."
      }
    ],
    examQuestions: [
      {
        id: "photosynthesis-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which word equation best represents photosynthesis?",
        choices: [
          "Carbon dioxide plus water plus light makes sugar plus oxygen",
          "Oxygen plus sugar makes water plus soil",
          "Sunlight plus oxygen makes carbon dioxide plus soil",
          "Water plus soil makes oxygen plus roots"
        ],
        correctAnswer: "Carbon dioxide plus water plus light makes sugar plus oxygen",
        explanation: "Photosynthesis uses carbon dioxide, water, and light to produce sugar and oxygen."
      },
      {
        id: "photosynthesis-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A plant is kept in darkness for a long time. Which process is directly stopped by the lack of light?",
        choices: ["Photosynthesis", "Water entering roots", "Cell membrane control", "Seed covering"],
        correctAnswer: "Photosynthesis",
        explanation: "Photosynthesis needs light energy, so it cannot continue without light."
      },
      {
        id: "photosynthesis-exam-3",
        mode: "exam",
        type: "short_text",
        prompt: "Name the plant cell structure where photosynthesis happens in green plant cells.",
        correctAnswer: "chloroplast",
        acceptedAnswers: ["chloroplasts"],
        explanation: "Chloroplasts are the structures in green plant cells where photosynthesis occurs."
      },
      {
        id: "photosynthesis-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which statement correctly compares photosynthesis and respiration in plants?",
        choices: [
          "Photosynthesis makes sugar, while respiration releases energy from sugar",
          "Photosynthesis and respiration are the same process",
          "Respiration only happens in animals, never in plants",
          "Photosynthesis releases energy from sugar at night"
        ],
        correctAnswer: "Photosynthesis makes sugar, while respiration releases energy from sugar",
        explanation: "Photosynthesis is food making. Respiration releases usable energy from food."
      },
      {
        id: "photosynthesis-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A student says oxygen is an input of photosynthesis because plants need it to live. What is the best response?",
        choices: [
          "Oxygen is an output of photosynthesis, even though plant cells also use oxygen in respiration",
          "Oxygen is the only input of photosynthesis",
          "Oxygen turns directly into soil during photosynthesis",
          "Plants never use oxygen for any process"
        ],
        correctAnswer: "Oxygen is an output of photosynthesis, even though plant cells also use oxygen in respiration",
        explanation: "Photosynthesis releases oxygen. Plants can also use oxygen during respiration, which is a different process."
      }
    ]
  },
  {
    meta: {
      subjectId: "biology",
      slug: "ecosystems",
      title: "Ecosystems",
      tagline: "Explore how living and nonliving parts connect.",
      description:
        "Learn how organisms, habitats, food chains, sunlight, water, and soil work together in an ecosystem.",
      accentColor: "#0f766e",
      subtopics: ["Living and nonliving parts", "Food chains", "Ecosystem balance"],
      previewVisualizationId: "biology:ecosystems"
    },
    learnChapter: {
      number: 3,
      title: "Life in Ecosystems",
      introduction:
        "An ecosystem includes living things and the nonliving parts around them. In this chapter, you will see how energy moves, how habitats support organisms, and how changes can affect balance.",
      figureCaption:
        "A pond or grassland ecosystem with a food chain and labels for sunlight, water, soil, plants, and animals."
    },
    learnSections: [
      {
        id: "ecosystems-parts",
        sectionNumber: "3.1",
        title: "Ecosystems include more than animals",
        paragraphs: [
          "An ecosystem is made of all the living and nonliving parts in an area. Living parts include plants, animals, fungi, and microorganisms. Nonliving parts include sunlight, water, air, rocks, soil, and temperature.",
          "Beginners often picture an ecosystem as only a group of animals. That leaves out some of the most important parts. A frog in a pond depends on insects for food, plants for shelter, water for a place to live, and sunlight that helps pond plants grow.",
          "A habitat is the place where an organism lives. The habitat provides what the organism needs, such as food, water, shelter, and space. Different organisms need different habitats because they are suited to different conditions."
        ],
        keyTerms: [
          {
            term: "Ecosystem",
            definition: "All the living and nonliving parts in an area and how they interact."
          },
          {
            term: "Habitat",
            definition: "The place where an organism lives and gets what it needs."
          },
          {
            term: "Nonliving factor",
            definition: "A nonliving part of an ecosystem, such as sunlight, water, soil, or temperature."
          }
        ],
        visualizationId: "biology:ecosystems"
      },
      {
        id: "ecosystems-food-chains",
        sectionNumber: "3.2",
        title: "Food chains show energy flow",
        paragraphs: [
          "A food chain shows one path that energy can take through an ecosystem. It often starts with a producer, such as grass or algae. Producers use sunlight to make food, so they bring energy into the living parts of the ecosystem.",
          "Consumers get energy by eating other organisms. A rabbit that eats grass is a consumer. A fox that eats the rabbit is also a consumer. Arrows in a food chain show the direction energy moves, not just who is chasing whom.",
          "For example, grass to rabbit to fox means energy stored in grass moves to the rabbit when it eats, then to the fox when it eats the rabbit. The chain starts with a producer because most ecosystems depend on energy from sunlight."
        ],
        keyTerms: [
          {
            term: "Producer",
            definition: "An organism, usually a green plant or algae, that makes its own food."
          },
          {
            term: "Consumer",
            definition: "An organism that gets energy by eating plants, animals, or other organisms."
          },
          {
            term: "Food chain",
            definition: "A model that shows one path of energy flow through organisms."
          }
        ]
      },
      {
        id: "ecosystems-balance",
        sectionNumber: "3.3",
        title: "Changes can affect ecosystem balance",
        paragraphs: [
          "Ecosystems can change when one part changes. If there is less rain, plants may grow poorly. If there are fewer plants, plant eating animals may have less food. Then predators may also be affected because their prey becomes harder to find.",
          "Balance does not mean nothing ever changes. Seasons, weather, births, deaths, and movement all change ecosystems. Balance means the parts of the ecosystem can keep supporting life over time.",
          "People can affect ecosystems too. Pollution, cutting down plants, or introducing a new species can change habitats and food chains. Protecting ecosystems means paying attention to both living and nonliving parts."
        ],
        keyTerms: [
          {
            term: "Balance",
            definition: "A condition where ecosystem parts continue to support life over time."
          },
          {
            term: "Prey",
            definition: "An animal that is hunted and eaten by another animal."
          },
          {
            term: "Predator",
            definition: "An animal that hunts and eats other animals."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "biology:ecosystems",
        title: "Food Chain and Balance Model",
        description:
          "A simple ecosystem scene showing sunlight, plants, consumers, predators, water, soil, and how a change affects the chain.",
        interactionSummary:
          "Learners build a food chain, identify living and nonliving parts, then adjust one part to see how balance can change.",
        focusPoints: ["Sunlight", "Producer", "Consumer", "Predator", "Water and soil"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "ecosystems-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which list includes both living and nonliving parts of an ecosystem?",
        choices: [
          "Grass, rabbit, sunlight, water",
          "Fox, rabbit, frog, beetle",
          "Water, air, soil, rocks",
          "Desk, pencil, book, chair"
        ],
        correctAnswer: "Grass, rabbit, sunlight, water",
        hint: "An ecosystem includes organisms and the physical things around them.",
        explanation: "Grass and rabbits are living parts. Sunlight and water are nonliving parts."
      },
      {
        id: "ecosystems-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "In the food chain grass to rabbit to fox, which organism is the producer?",
        choices: ["Grass", "Rabbit", "Fox", "All of them"],
        correctAnswer: "Grass",
        hint: "The producer makes its own food using sunlight.",
        explanation: "Grass is a producer because it makes its own food by photosynthesis."
      },
      {
        id: "ecosystems-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "What is the place where an organism lives called?",
        correctAnswer: "habitat",
        acceptedAnswers: ["a habitat"],
        hint: "This word describes the organism's home environment.",
        explanation: "A habitat is the place where an organism lives and gets what it needs."
      },
      {
        id: "ecosystems-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Why can removing many plants from an ecosystem affect animals?",
        choices: [
          "Plants provide food, shelter, and energy for food chains",
          "Animals do not need habitats",
          "Plants are not part of ecosystems",
          "Only predators depend on sunlight"
        ],
        correctAnswer: "Plants provide food, shelter, and energy for food chains",
        hint: "Think about what producers do and what habitats provide.",
        explanation: "Plants support ecosystems by making food and providing habitat for many organisms."
      }
    ],
    examQuestions: [
      {
        id: "ecosystems-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which statement best corrects the idea that an ecosystem is only animals?",
        choices: [
          "An ecosystem includes living things and nonliving parts such as water, soil, air, and sunlight",
          "An ecosystem includes only predators and prey",
          "An ecosystem includes only large animals",
          "An ecosystem includes nonliving parts but not plants"
        ],
        correctAnswer: "An ecosystem includes living things and nonliving parts such as water, soil, air, and sunlight",
        explanation: "Ecosystems include organisms and physical factors that affect them."
      },
      {
        id: "ecosystems-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "In the chain algae to small fish to heron, what do the arrows represent?",
        choices: [
          "The direction energy moves through the organisms",
          "The direction every animal walks",
          "The size order of the organisms",
          "The order in which organisms were born"
        ],
        correctAnswer: "The direction energy moves through the organisms",
        explanation: "Food chain arrows show energy flow from food to eater."
      },
      {
        id: "ecosystems-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A drought causes fewer plants to grow in a grassland. Which outcome is most likely?",
        choices: [
          "Some plant eating animals may have less food",
          "All predators will immediately become producers",
          "Sunlight will no longer matter",
          "The ecosystem will stop having nonliving parts"
        ],
        correctAnswer: "Some plant eating animals may have less food",
        explanation: "If producers decrease, consumers that eat them can be affected."
      },
      {
        id: "ecosystems-exam-4",
        mode: "exam",
        type: "short_text",
        prompt: "What type of organism makes its own food and usually begins a food chain?",
        correctAnswer: "producer",
        acceptedAnswers: ["a producer", "producers"],
        explanation: "Producers, such as plants and algae, make their own food and start many food chains."
      },
      {
        id: "ecosystems-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which example shows an interaction between a living and a nonliving part of an ecosystem?",
        choices: [
          "A plant taking in water from soil",
          "A fox eating a rabbit",
          "Two birds calling to each other",
          "A frog eating an insect"
        ],
        correctAnswer: "A plant taking in water from soil",
        explanation: "The plant is living, while water and soil are nonliving parts of the ecosystem."
      }
    ]
  }
]);
