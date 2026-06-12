import { defineBeginnerLabTopics } from "../helpers";

export const historyBeginnerLabTopics = defineBeginnerLabTopics([
  {
    meta: {
      subjectId: "history",
      slug: "timelines",
      title: "Timelines",
      tagline: "Put events in order so history makes sense.",
      description:
        "Learn how timelines show chronology, change over time, and cause and effect between events.",
      accentColor: "#b45309",
      subtopics: ["Chronology", "Dates", "Sequence", "Cause and effect", "Centuries"],
      previewVisualizationId: "history:timelines"
    },
    learnChapter: {
      number: 1,
      title: "History Happens in Order",
      introduction:
        "A timeline is a tool for thinking clearly about the past. It helps you see what happened first, what came next, and how one event may have helped cause another.",
      figureCaption:
        "A drag-to-order timeline shows event cards moving into sequence, with a zoom control for years and centuries."
    },
    learnSections: [
      {
        id: "timelines-chronology",
        sectionNumber: "1.1",
        title: "Chronology Means Time Order",
        paragraphs: [
          "Chronology is the order in which events happen. Historians use chronology to avoid mixing up the beginning, middle, and end of a story about the past.",
          "A timeline places events along a line from earlier to later. When you read one, look first at the direction of time and the date labels. Some timelines move left to right. Others may move top to bottom.",
          "A common mistake is to choose an event because its date looks smaller without checking what the date means. Always ask which year is earlier and which year is later."
        ],
        keyTerms: [
          {
            term: "chronology",
            definition: "The order in which events happen over time."
          },
          {
            term: "timeline",
            definition: "A diagram that places events in time order."
          }
        ],
        visualizationId: "history:timelines"
      },
      {
        id: "timelines-dates-and-centuries",
        sectionNumber: "1.2",
        title: "Dates Can Be Years or Centuries",
        paragraphs: [
          "Some timelines show exact years, such as 1066 or 1914. Others show larger periods, such as the 1700s or the nineteenth century. Both are useful, but they give different levels of detail.",
          "A century is a period of one hundred years. The nineteenth century means the years 1801 to 1900. The number can feel one step ahead, so slow down and check the range.",
          "Zooming out from years to centuries helps you see long patterns. Zooming in helps you compare events that happened close together."
        ],
        keyTerms: [
          {
            term: "century",
            definition: "A period of one hundred years."
          },
          {
            term: "period",
            definition: "A span of time with a shared feature or theme."
          }
        ]
      },
      {
        id: "timelines-cause-and-effect",
        sectionNumber: "1.3",
        title: "Order Helps Explain Cause and Effect",
        paragraphs: [
          "Cause and effect means one event helps explain why another event happened. A drought might reduce harvests, which may lead to food shortages, which may lead people to move or protest.",
          "A timeline does not prove cause by itself. It shows that one event happened before another, then you need evidence to explain the connection.",
          "Do not assume every earlier event caused every later event. Good history uses time order together with sources, reasons, and careful evidence."
        ],
        keyTerms: [
          {
            term: "cause",
            definition: "A reason something happened."
          },
          {
            term: "effect",
            definition: "A result or change caused by an event or condition."
          },
          {
            term: "evidence",
            definition: "Information that supports an explanation about the past."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "history:timelines",
        title: "Timeline Order Builder",
        description:
          "Learners place event cards in order, compare years and centuries, and connect earlier events to possible effects.",
        interactionSummary:
          "Drag events onto a timeline, use the zoom control to switch between years and centuries, then mark one possible cause and one possible effect.",
        focusPoints: ["earliest event", "later event", "date labels", "century zoom", "cause and effect"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "timelines-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which event happened first: 1200, 1450, or 1700?",
        choices: ["1200", "1450", "1700", "They are the same time"],
        correctAnswer: "1200",
        hint: "For these years, the smaller number is earlier.",
        explanation: "The year 1200 comes before 1450 and 1700."
      },
      {
        id: "timelines-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What does chronology mean?",
        choices: ["events in time order", "a list of places", "a type of source", "a river valley"],
        correctAnswer: "events in time order",
        hint: "Think about what a timeline shows.",
        explanation: "Chronology means the order in which events happened."
      },
      {
        id: "timelines-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "A crop failure happened in 1788. A food protest happened in 1789. Which statement is safest?",
        choices: [
          "The crop failure happened before the protest.",
          "The protest happened before the crop failure.",
          "The dates prove there was no connection.",
          "Both events happened in the same year."
        ],
        correctAnswer: "The crop failure happened before the protest.",
        hint: "Use the dates first before making a bigger claim.",
        explanation: "1788 comes before 1789. More evidence would be needed to prove cause."
      },
      {
        id: "timelines-practice-4",
        mode: "practice",
        type: "short_text",
        prompt: "What do we call a period of one hundred years?",
        correctAnswer: "century",
        acceptedAnswers: ["a century"],
        hint: "The word is often used in phrases like nineteenth century.",
        explanation: "A century is a period of one hundred years."
      }
    ],
    examQuestions: [
      {
        id: "timelines-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which order is chronological from earliest to latest?",
        choices: ["900, 1215, 1492", "1492, 1215, 900", "1215, 900, 1492", "900, 1492, 1215"],
        correctAnswer: "900, 1215, 1492",
        explanation: "Chronological order places the earliest year first and the latest year last."
      },
      {
        id: "timelines-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Why is a timeline helpful when studying cause and effect?",
        choices: [
          "It shows whether a possible cause happened before a possible effect.",
          "It proves every event caused the next event.",
          "It removes the need for evidence.",
          "It shows only places, not time."
        ],
        correctAnswer: "It shows whether a possible cause happened before a possible effect.",
        explanation: "A cause must come before its effect, but sources are still needed to explain the link."
      },
      {
        id: "timelines-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which statement best corrects the mistake that a smaller-looking date is always earlier?",
        choices: [
          "Check the full date and the direction of the timeline before deciding.",
          "Ignore all dates on the timeline.",
          "Choose the longest event name.",
          "Later events always appear on the left."
        ],
        correctAnswer: "Check the full date and the direction of the timeline before deciding.",
        explanation: "The safest approach is to read the labels and the timeline direction carefully."
      },
      {
        id: "timelines-exam-4",
        mode: "exam",
        type: "short_text",
        prompt: "What history skill means putting events in the order they happened?",
        correctAnswer: "chronology",
        acceptedAnswers: ["chronological order", "time order"],
        explanation: "Chronology is the skill of arranging events by time."
      },
      {
        id: "timelines-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A river flooded often, leaving rich soil. Farmers settled nearby, then towns grew. Which event is the effect in this chain?",
        choices: ["towns grew", "the river flooded", "rich soil was left", "farmers settled nearby"],
        correctAnswer: "towns grew",
        explanation: "In this chain, town growth is a later result of earlier river, farming, and settlement conditions."
      }
    ]
  },
  {
    meta: {
      subjectId: "history",
      slug: "ancient-civilizations",
      title: "Ancient Civilizations",
      tagline: "See why early cities grew near rivers.",
      description:
        "Learn how farming, river valleys, trade, cities, and different customs shaped early civilizations.",
      accentColor: "#0f766e",
      subtopics: ["River valleys", "Farming", "Cities", "Trade", "Customs", "Achievements"],
      previewVisualizationId: "history:ancient-civilizations"
    },
    learnChapter: {
      number: 2,
      title: "Early Societies Near Water",
      introduction:
        "Ancient civilizations were early complex societies with cities, jobs, leaders, beliefs, and inventions. Many grew near rivers because water helped people farm, travel, and trade.",
      figureCaption:
        "A river valley map shows pins for Egypt, Mesopotamia, the Indus Valley, and early China, with farming fields and city markers."
    },
    learnSections: [
      {
        id: "ancient-river-valleys",
        sectionNumber: "2.1",
        title: "Rivers Helped People Settle",
        paragraphs: [
          "Many ancient civilizations began in river valleys. Egypt grew along the Nile, Mesopotamia between the Tigris and Euphrates, the Indus Valley along the Indus River, and early China near rivers such as the Huang He.",
          "Rivers gave people water for crops and animals. Floods could leave rich soil behind, which made farming easier when people learned how to manage the water.",
          "Rivers also helped people move goods and messages. This made trade easier and connected farms, towns, and cities."
        ],
        keyTerms: [
          {
            term: "river valley",
            definition: "Land near a river where water and soil can support farming and settlement."
          },
          {
            term: "settlement",
            definition: "A place where people live together."
          },
          {
            term: "trade",
            definition: "The exchange of goods or services."
          }
        ],
        visualizationId: "history:ancient-civilizations"
      },
      {
        id: "ancient-farming-and-cities",
        sectionNumber: "2.2",
        title: "Farming Made Bigger Communities Possible",
        paragraphs: [
          "When farming produced extra food, not everyone had to spend all day finding food. Some people could become builders, traders, leaders, scribes, soldiers, or craft workers.",
          "Extra food helped villages grow into cities. Cities needed organization because people had to plan water use, store grain, settle arguments, and protect the community.",
          "This shows cause and effect. Better farming could lead to extra food. Extra food could support more jobs. More jobs and people could help cities grow."
        ],
        keyTerms: [
          {
            term: "civilization",
            definition: "A complex society with features such as cities, organized leadership, jobs, beliefs, and shared culture."
          },
          {
            term: "surplus",
            definition: "More of something than people need right away, such as extra food."
          },
          {
            term: "scribe",
            definition: "A person trained to write and keep records in some ancient societies."
          }
        ]
      },
      {
        id: "ancient-not-all-the-same",
        sectionNumber: "2.3",
        title: "Civilizations Were Not All the Same",
        paragraphs: [
          "Ancient people did not all live the same way. Each civilization had its own language, beliefs, buildings, tools, art, laws, and ways of organizing work.",
          "Comparing civilizations helps you notice both similarities and differences. River farming was common, but pyramids in Egypt, city planning in the Indus Valley, writing in Mesopotamia, and early Chinese bronze work show different achievements.",
          "Avoid treating ancient people as simple or identical. They solved hard problems with the knowledge, materials, and environments they had."
        ],
        keyTerms: [
          {
            term: "custom",
            definition: "A usual way of doing something in a group or society."
          },
          {
            term: "achievement",
            definition: "Something important created, built, discovered, or improved by people."
          },
          {
            term: "compare",
            definition: "To look for similarities and differences."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "history:ancient-civilizations",
        title: "River Valley Civilization Map",
        description:
          "Learners match early civilizations to river valleys and inspect farming, trade, city, and achievement clues.",
        interactionSummary:
          "Click map pins for Egypt, Mesopotamia, the Indus Valley, and early China, then match each civilization to its river and one reason water mattered.",
        focusPoints: ["Nile", "Tigris and Euphrates", "Indus River", "Huang He", "farming and trade"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "ancient-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Why did many ancient civilizations grow near rivers?",
        choices: [
          "Rivers provided water for farming and helped people move goods.",
          "Rivers stopped all travel.",
          "Rivers made farming impossible.",
          "Rivers meant people never needed organization."
        ],
        correctAnswer: "Rivers provided water for farming and helped people move goods.",
        hint: "Think about crops, animals, and trade.",
        explanation: "River water, fertile soil, and travel routes helped settlements and trade grow."
      },
      {
        id: "ancient-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which civilization grew along the Nile River?",
        choices: ["Egypt", "Indus Valley", "Mesopotamia", "Early China"],
        correctAnswer: "Egypt",
        hint: "The Nile is strongly linked with pyramids and ancient Egyptian farming.",
        explanation: "Ancient Egypt developed along the Nile River."
      },
      {
        id: "ancient-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "How could extra food help a village become a city?",
        choices: [
          "It allowed people to do different jobs besides farming.",
          "It made all tools disappear.",
          "It stopped people from trading.",
          "It meant no one needed water."
        ],
        correctAnswer: "It allowed people to do different jobs besides farming.",
        hint: "Surplus food can support builders, traders, and leaders.",
        explanation: "Surplus food made specialized jobs possible, which helped larger communities develop."
      },
      {
        id: "ancient-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which idea avoids a common misconception about ancient civilizations?",
        choices: [
          "Different civilizations had different customs and achievements.",
          "All ancient people lived exactly the same way.",
          "Ancient societies never built cities.",
          "Rivers were never useful to farmers."
        ],
        correctAnswer: "Different civilizations had different customs and achievements.",
        hint: "Compare Egypt, Mesopotamia, the Indus Valley, and China.",
        explanation: "Ancient civilizations shared some patterns, but each had its own culture and achievements."
      }
    ],
    examQuestions: [
      {
        id: "ancient-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which cause and effect chain best explains early city growth?",
        choices: [
          "River water supported farming, farming produced surplus food, surplus food supported more jobs and cities.",
          "Cities appeared first, then rivers appeared later.",
          "Trade ended farming, then people stopped settling.",
          "Writing caused rivers to flood every year."
        ],
        correctAnswer:
          "River water supported farming, farming produced surplus food, surplus food supported more jobs and cities.",
        explanation: "River valley farming helped create food surpluses, which supported larger and more organized communities."
      },
      {
        id: "ancient-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which match is correct?",
        choices: [
          "Mesopotamia, Tigris and Euphrates",
          "Egypt, Indus River",
          "Indus Valley, Nile",
          "Early China, Tigris only"
        ],
        correctAnswer: "Mesopotamia, Tigris and Euphrates",
        explanation: "Mesopotamia developed between the Tigris and Euphrates rivers."
      },
      {
        id: "ancient-exam-3",
        mode: "exam",
        type: "short_text",
        prompt: "What word means extra food or goods beyond what people need right away?",
        correctAnswer: "surplus",
        acceptedAnswers: ["a surplus"],
        explanation: "A surplus is an extra amount that can be stored, traded, or used to support other work."
      },
      {
        id: "ancient-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A student says every ancient civilization had the same buildings, beliefs, and jobs. What is the best correction?",
        choices: [
          "Civilizations shared some needs, but each developed its own customs and achievements.",
          "The student is correct because rivers make everyone identical.",
          "Ancient civilizations had no customs.",
          "Differences do not matter in history."
        ],
        correctAnswer: "Civilizations shared some needs, but each developed its own customs and achievements.",
        explanation: "Comparing civilizations means noticing similarities and differences."
      },
      {
        id: "ancient-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which evidence would best support the claim that rivers helped trade?",
        choices: [
          "Records or artifacts showing goods moved by boat between river towns",
          "A drawing of a mountain far from any river",
          "A list of modern countries only",
          "A story that never mentions goods or travel"
        ],
        correctAnswer: "Records or artifacts showing goods moved by boat between river towns",
        explanation: "Evidence about goods moving by boat would directly support a claim about river trade."
      }
    ]
  },
  {
    meta: {
      subjectId: "history",
      slug: "historical-sources",
      title: "Historical Sources",
      tagline: "Use evidence carefully before trusting a claim.",
      description:
        "Learn the difference between primary and secondary sources, how evidence supports history, and how to judge reliability.",
      accentColor: "#7c3aed",
      subtopics: ["Primary sources", "Secondary sources", "Evidence", "Reliability", "Point of view"],
      previewVisualizationId: "history:historical-sources"
    },
    learnChapter: {
      number: 3,
      title: "Evidence From the Past",
      introduction:
        "History is built from sources. A source can be a letter, photo, diary, object, map, article, textbook, or interview. Strong historians ask what a source is, who made it, and how reliable it is.",
      figureCaption:
        "A source sorter shows letters, photos, books, diaries, and newspaper clippings moving into evidence groups."
    },
    learnSections: [
      {
        id: "sources-primary-and-secondary",
        sectionNumber: "3.1",
        title: "Primary and Secondary Sources",
        paragraphs: [
          "A primary source comes from the time or event being studied. Diaries, letters, photographs, official records, tools, and buildings can be primary sources when they connect directly to the topic.",
          "A secondary source is made later to explain, describe, or interpret the past. Textbooks, documentaries, articles, and history websites are often secondary sources.",
          "The same item can change role depending on the question. A newspaper from 1910 is a primary source for what people read in 1910, but a modern article about 1910 is secondary."
        ],
        keyTerms: [
          {
            term: "primary source",
            definition: "Evidence from the time or event being studied."
          },
          {
            term: "secondary source",
            definition: "A later explanation or interpretation of the past."
          }
        ],
        visualizationId: "history:historical-sources"
      },
      {
        id: "sources-evidence-for-claims",
        sectionNumber: "3.2",
        title: "Sources Become Evidence for Claims",
        paragraphs: [
          "A source is not useful just because it exists. It becomes evidence when it helps answer a historical question or support a claim.",
          "For example, a photo of crowded factory housing could support a claim about city life during industrialization. A recipe book would usually be weaker evidence for that same claim unless the question was about food or household life.",
          "Good history connects claims to evidence. If you cannot point to a source that supports the answer, the answer may be a guess."
        ],
        keyTerms: [
          {
            term: "claim",
            definition: "A statement that can be supported or challenged with evidence."
          },
          {
            term: "evidence",
            definition: "Information from a source that supports a historical answer or claim."
          },
          {
            term: "interpret",
            definition: "To explain the meaning of evidence."
          }
        ]
      },
      {
        id: "sources-reliability",
        sectionNumber: "3.3",
        title: "Reliability Means Trust With Care",
        paragraphs: [
          "Reliability means how much you can trust a source for a particular question. A reliable source is not always perfect. It is useful when you understand who made it, when it was made, why it was made, and what it can and cannot show.",
          "Point of view matters. A leader, a child, a visitor, and a worker may describe the same event differently because they saw different parts or had different reasons for writing.",
          "Do not trust every source equally. Historians compare sources, look for missing information, and ask whether a source agrees with other evidence."
        ],
        keyTerms: [
          {
            term: "reliability",
            definition: "How much a source can be trusted for a particular question."
          },
          {
            term: "point of view",
            definition: "The position, experience, or opinion that shapes how someone describes an event."
          },
          {
            term: "bias",
            definition: "A leaning or preference that can affect how information is presented."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "history:historical-sources",
        title: "Historical Source Sorter",
        description:
          "Learners sort items into primary and secondary source groups, then run a reliability check on selected evidence.",
        interactionSummary:
          "Drag each source card into a group, answer who made it and why, then choose which source best supports a historical claim.",
        focusPoints: ["primary source", "secondary source", "claim support", "author", "reliability check"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "sources-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which item is usually a primary source for studying a soldier's life during a war?",
        choices: ["the soldier's diary", "a modern textbook chapter", "a new movie review", "a later encyclopedia article"],
        correctAnswer: "the soldier's diary",
        hint: "Look for something from the time or person being studied.",
        explanation: "A diary written by the soldier during the war is direct evidence from the time."
      },
      {
        id: "sources-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What is a secondary source?",
        choices: [
          "A later explanation of the past",
          "Only an object found underground",
          "Any source that is always wrong",
          "A source made before the event happened"
        ],
        correctAnswer: "A later explanation of the past",
        hint: "Think of textbooks and articles written after the event.",
        explanation: "Secondary sources explain or interpret events after they happened."
      },
      {
        id: "sources-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which question helps test a source's reliability?",
        choices: ["Who made it and why?", "Is it printed in blue?", "Is it the shortest source?", "Does it have a fancy title?"],
        correctAnswer: "Who made it and why?",
        hint: "Reliability depends on origin and purpose.",
        explanation: "Knowing who made a source and why helps you judge how much to trust it."
      },
      {
        id: "sources-practice-4",
        mode: "practice",
        type: "short_text",
        prompt: "What word means information from a source that supports a claim?",
        correctAnswer: "evidence",
        acceptedAnswers: ["historical evidence", "proof"],
        hint: "It is what historians point to when they explain an answer.",
        explanation: "Evidence is information that supports a historical claim."
      }
    ],
    examQuestions: [
      {
        id: "sources-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A class studies daily life in an ancient city. Which source would most directly support a claim about what people bought and sold?",
        choices: [
          "A market record listing goods and prices",
          "A modern poem about a different city",
          "A blank map with no labels",
          "A ruler's name written without context"
        ],
        correctAnswer: "A market record listing goods and prices",
        explanation: "A market record gives direct evidence about trade and goods."
      },
      {
        id: "sources-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Why should historians compare more than one source?",
        choices: [
          "Sources can have limits, missing details, or different points of view.",
          "One source always tells the complete truth.",
          "Comparing sources makes evidence unnecessary.",
          "Primary sources are never useful."
        ],
        correctAnswer: "Sources can have limits, missing details, or different points of view.",
        explanation: "Comparing sources helps historians check reliability and notice gaps or disagreements."
      },
      {
        id: "sources-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A diary from 1850 and a textbook from 2020 both discuss 1850. Which statement is most accurate?",
        choices: [
          "The diary is likely primary for 1850, while the textbook is likely secondary.",
          "The textbook is primary because it is newer.",
          "The diary cannot be evidence because it is old.",
          "Both sources must be trusted equally for every question."
        ],
        correctAnswer: "The diary is likely primary for 1850, while the textbook is likely secondary.",
        explanation: "The diary comes from the time being studied, while the textbook explains that past later."
      },
      {
        id: "sources-exam-4",
        mode: "exam",
        type: "short_text",
        prompt: "What term describes how much a source can be trusted for a particular question?",
        correctAnswer: "reliability",
        acceptedAnswers: ["source reliability", "reliable"],
        explanation: "Reliability is about how much a source can be trusted for the question being asked."
      },
      {
        id: "sources-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A king's speech says everyone in the kingdom is happy. What should a careful historian do next?",
        choices: [
          "Ask who made the speech, why it was made, and compare it with other evidence.",
          "Accept it as complete truth because it is old.",
          "Reject all speeches without reading them.",
          "Use it only to study river valleys."
        ],
        correctAnswer: "Ask who made the speech, why it was made, and compare it with other evidence.",
        explanation: "The speech may be useful, but its purpose and point of view must be checked with other sources."
      }
    ]
  }
]);
