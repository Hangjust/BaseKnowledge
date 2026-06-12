import { defineBeginnerLabTopics } from "../helpers";

export const englishBeginnerLabTopics = defineBeginnerLabTopics([
  {
    meta: {
      subjectId: "english",
      slug: "parts-of-speech",
      title: "Parts of Speech",
      tagline: "See what each word is doing in a sentence.",
      description:
        "Learn how nouns, verbs, adjectives, adverbs, and pronouns help sentences carry meaning, and why context decides a word's job.",
      accentColor: "#2563eb",
      subtopics: ["Nouns", "Verbs", "Adjectives", "Adverbs", "Pronouns", "Context"],
      previewVisualizationId: "english:parts-of-speech"
    },
    learnChapter: {
      number: 1,
      title: "Words Have Jobs",
      introduction:
        "Parts of speech are the jobs words do inside sentences. A word's job is not decided by how it looks on its own. It is decided by how the word helps the sentence make sense.",
      figureCaption:
        "A word-sort lab shows how the same word can move to a different group when the sentence around it changes."
    },
    learnSections: [
      {
        id: "naming-and-action-words",
        sectionNumber: "1.1",
        title: "Naming Words and Action Words",
        paragraphs: [
          "A noun names a person, place, thing, or idea. In the sentence The puppy chased the ball, puppy and ball are nouns because they name things in the sentence.",
          "A verb shows action or being. Chased is a verb because it tells what the puppy did. Is, are, was, and were can also be verbs because they show a state of being.",
          "Beginners sometimes look for action only. That misses being verbs. A sentence can be quiet and still have a verb, as in The sky is gray."
        ],
        keyTerms: [
          {
            term: "noun",
            definition: "A word that names a person, place, thing, or idea."
          },
          {
            term: "verb",
            definition: "A word that shows action or being."
          }
        ],
        visualizationId: "english:parts-of-speech"
      },
      {
        id: "describing-words",
        sectionNumber: "1.2",
        title: "Describing Words",
        paragraphs: [
          "An adjective describes a noun or pronoun. It can tell what kind, which one, or how many. In three small birds, three and small describe the noun birds.",
          "An adverb often describes a verb. It can tell how, when, where, or how much. In The birds sang softly, softly tells how they sang.",
          "Do not decide by word endings alone. Many adverbs end in ly, but not all ly words are adverbs, and some adverbs do not end in ly. The sentence gives the best evidence."
        ],
        keyTerms: [
          {
            term: "adjective",
            definition: "A word that describes a noun or pronoun."
          },
          {
            term: "adverb",
            definition: "A word that describes a verb, adjective, or another adverb."
          }
        ]
      },
      {
        id: "context-decides-the-job",
        sectionNumber: "1.3",
        title: "Context Decides the Job",
        paragraphs: [
          "Some words can do more than one job. In I drink water, drink is a verb. In I spilled my drink, drink is a noun. The spelling stayed the same, but the sentence changed the job.",
          "Pronouns replace nouns so sentences do not sound repetitive. In Maya found her pencil, her points back to Maya and helps the reader follow the meaning.",
          "When you are unsure, ask what the word does for the sentence. Does it name something, show action, describe a noun, describe an action, or stand in for a noun?"
        ],
        keyTerms: [
          {
            term: "context",
            definition: "The words and meaning around a word that help show its job."
          },
          {
            term: "pronoun",
            definition: "A word that takes the place of a noun, such as he, she, it, they, or we."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "english:parts-of-speech",
        title: "Context Word Sort",
        description:
          "Learners sort words into part-of-speech groups, then see how a word changes groups when it appears in a new sentence.",
        interactionSummary:
          "Drag each highlighted word to noun, verb, adjective, adverb, or pronoun. Tap the sentence to reveal the evidence for the correct choice.",
        focusPoints: ["word job", "sentence context", "meaning clues", "same word, new role"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "parts-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "In The quiet cat slept, which word is an adjective?",
        choices: ["quiet", "cat", "slept", "the"],
        correctAnswer: "quiet",
        hint: "Find the word that describes the noun cat.",
        explanation: "Quiet describes what kind of cat, so it is an adjective."
      },
      {
        id: "parts-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "In We walk home, which word is the verb?",
        choices: ["we", "walk", "home", "none"],
        correctAnswer: "walk",
        hint: "Look for the action word.",
        explanation: "Walk tells what we do, so it is the verb."
      },
      {
        id: "parts-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "In She packed the bag carefully, what does carefully describe?",
        choices: ["how she packed", "which bag", "who packed", "the word the"],
        correctAnswer: "how she packed",
        hint: "Ask how the action happened.",
        explanation: "Carefully describes the verb packed by telling how the action happened."
      },
      {
        id: "parts-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which sentence uses park as a noun?",
        choices: ["We park near the school.", "The park closes at sunset.", "Please park the bike here.", "They park outside."],
        correctAnswer: "The park closes at sunset.",
        hint: "Find the sentence where park names a place.",
        explanation: "In The park closes at sunset, park names a place, so it is a noun."
      }
    ],
    examQuestions: [
      {
        id: "parts-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "In The bright moon rose slowly, which pair is labeled correctly?",
        choices: ["bright, adjective and slowly, adverb", "moon, verb and rose, noun", "the, adjective and bright, verb", "slowly, noun and rose, adjective"],
        correctAnswer: "bright, adjective and slowly, adverb",
        explanation: "Bright describes the noun moon, and slowly describes how the moon rose."
      },
      {
        id: "parts-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "In The team will light the lantern, what part of speech is light?",
        choices: ["verb", "noun", "adjective", "pronoun"],
        correctAnswer: "verb",
        explanation: "Light shows the action the team will do to the lantern."
      },
      {
        id: "parts-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "In The light jacket dried quickly, what part of speech is light?",
        choices: ["adjective", "verb", "adverb", "pronoun"],
        correctAnswer: "adjective",
        explanation: "Light describes the noun jacket, so it is an adjective in this sentence."
      },
      {
        id: "parts-exam-4",
        mode: "exam",
        type: "short_text",
        prompt: "In Omar lost his notebook, which word is a pronoun?",
        correctAnswer: "his",
        acceptedAnswers: ["his"],
        explanation: "His replaces or points back to Omar, so it is a pronoun."
      },
      {
        id: "parts-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Why is context important when naming a part of speech?",
        choices: [
          "A word can have different jobs in different sentences.",
          "Every word has only one job forever.",
          "Long words are always nouns.",
          "Words ending in ly are always verbs."
        ],
        correctAnswer: "A word can have different jobs in different sentences.",
        explanation: "The same word can change jobs when the sentence meaning changes."
      }
    ]
  },
  {
    meta: {
      subjectId: "english",
      slug: "reading-comprehension",
      title: "Reading Comprehension",
      tagline: "Use the text as your evidence.",
      description:
        "Build the habit of finding main ideas, important details, and text evidence instead of guessing from memory.",
      accentColor: "#16a34a",
      subtopics: ["Main idea", "Details", "Evidence", "Who and what", "Why and how"],
      previewVisualizationId: "english:reading-comprehension"
    },
    learnChapter: {
      number: 2,
      title: "Understand What the Text Says",
      introduction:
        "Reading comprehension means making sense of what you read. Strong readers slow down, notice the main idea, and point to words or lines that prove their answers.",
      figureCaption:
        "A passage-highlight lab marks the main idea, supporting details, and evidence in different colors."
    },
    learnSections: [
      {
        id: "main-idea",
        sectionNumber: "2.1",
        title: "Find the Main Idea",
        paragraphs: [
          "The main idea is what a passage is mostly about. It is bigger than one detail but smaller than every possible thought about the topic.",
          "To find it, ask what the writer wants you to understand after reading the whole passage. Titles, repeated words, and the first or last sentence can help, but they are not automatic answers.",
          "A common mistake is choosing a detail because it is easy to remember. A detail supports the main idea, but it usually does not cover the whole passage."
        ],
        keyTerms: [
          {
            term: "main idea",
            definition: "The most important point or message in a passage."
          },
          {
            term: "detail",
            definition: "A smaller fact, example, or event that supports the main idea."
          }
        ],
        visualizationId: "english:reading-comprehension"
      },
      {
        id: "questions-and-details",
        sectionNumber: "2.2",
        title: "Ask Who, What, When, Where, Why, and How",
        paragraphs: [
          "Good readers ask questions while they read. Who is involved? What happened? When and where did it happen? Why did it happen? How did the person or event change?",
          "These questions help you track meaning instead of only saying the words. If you can answer them with the passage, you understand more than the surface sound.",
          "When an answer is not stated directly, look for clues. The best inference still grows from evidence in the text, not from a guess outside the text."
        ],
        keyTerms: [
          {
            term: "inference",
            definition: "A smart conclusion based on clues from the text and what you already know."
          },
          {
            term: "key event",
            definition: "An important thing that happens in a passage or story."
          }
        ]
      },
      {
        id: "answer-with-evidence",
        sectionNumber: "2.3",
        title: "Answer with Evidence",
        paragraphs: [
          "Evidence is the part of the text that proves an answer. It can be a sentence, a phrase, or a detail that clearly supports what you say.",
          "Before choosing an answer, point to the line that helped you. If you cannot find proof, reread the passage and check whether the answer came from memory instead of the text.",
          "This habit matters because some answer choices sound true but do not match the passage. The strongest answer is the one the text supports."
        ],
        keyTerms: [
          {
            term: "evidence",
            definition: "Words or details from a text that support an answer."
          },
          {
            term: "support",
            definition: "To back up an idea with proof or details."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "english:reading-comprehension",
        title: "Passage Evidence Highlighter",
        description:
          "Learners highlight parts of a short passage to separate the main idea, details, and evidence for an answer.",
        interactionSummary:
          "Tap lines in a passage, choose whether each one is main idea, detail, or evidence, then answer a question using the highlighted proof.",
        focusPoints: ["main idea", "supporting detail", "text evidence", "not guessing"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "reading-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt:
          "A passage tells how bees collect nectar, carry pollen, and help flowers grow. What is the best main idea?",
        choices: ["Bees help plants while collecting food.", "Flowers can be yellow.", "Nectar is sweet.", "Some insects fly."],
        correctAnswer: "Bees help plants while collecting food.",
        hint: "Choose the answer that covers the whole passage, not one small fact.",
        explanation: "The passage is mostly about how bees collect food and help flowers grow."
      },
      {
        id: "reading-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt:
          "Mina wore boots because the trail was muddy after rain. Which detail explains why Mina wore boots?",
        choices: ["the trail was muddy", "Mina wore boots", "after rain", "the trail existed"],
        correctAnswer: "the trail was muddy",
        hint: "Look for the reason in the sentence.",
        explanation: "The muddy trail is the reason she needed boots."
      },
      {
        id: "reading-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which answer should you trust most when reading a passage?",
        choices: ["one supported by the text", "one that sounds exciting", "one from a different book", "one with the longest words"],
        correctAnswer: "one supported by the text",
        hint: "Good answers can be proven.",
        explanation: "Reading answers should come from evidence in the passage."
      },
      {
        id: "reading-practice-4",
        mode: "practice",
        type: "short_text",
        prompt: "What do we call words or lines from a text that prove an answer?",
        correctAnswer: "evidence",
        acceptedAnswers: ["text evidence", "proof"],
        hint: "It is the proof you point to in the passage.",
        explanation: "Evidence is the proof from the text that supports an answer."
      }
    ],
    examQuestions: [
      {
        id: "reading-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A paragraph explains that a library started a weekend story hour, more families visited, and children began borrowing more books. Which main idea is best?",
        choices: [
          "The story hour helped more children and families use the library.",
          "The library has shelves.",
          "Some children like weekends.",
          "Families can own books."
        ],
        correctAnswer: "The story hour helped more children and families use the library.",
        explanation: "This choice covers the story hour, family visits, and children borrowing books."
      },
      {
        id: "reading-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "Jalen reread the recipe twice before measuring the flour. What can you infer about Jalen?",
        choices: ["He wanted to be careful.", "He disliked flour.", "He had no recipe.", "He was outside."],
        correctAnswer: "He wanted to be careful.",
        explanation: "Rereading before measuring is evidence that Jalen wanted to avoid a mistake."
      },
      {
        id: "reading-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt:
          "A question asks why a character apologized. Which evidence would best support the answer?",
        choices: [
          "A sentence showing the mistake the character made",
          "A sentence describing the character's shirt",
          "The title of a different story",
          "A fun fact about apologies"
        ],
        correctAnswer: "A sentence showing the mistake the character made",
        explanation: "The reason for the apology should be proven by the event that caused it."
      },
      {
        id: "reading-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which choice is a detail rather than a main idea?",
        choices: [
          "The turtle hid under a flat gray rock.",
          "Animals use shelters to stay safe.",
          "The passage explains animal homes.",
          "Shelters protect living things."
        ],
        correctAnswer: "The turtle hid under a flat gray rock.",
        explanation: "This is one specific fact. The other choices are broader ideas."
      },
      {
        id: "reading-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Why is answering from memory alone risky?",
        choices: [
          "The answer may not match what the passage actually says.",
          "Memory always gives more evidence than reading.",
          "Texts never include answers.",
          "Main ideas are unrelated to passages."
        ],
        correctAnswer: "The answer may not match what the passage actually says.",
        explanation: "Good comprehension answers need support from the current text."
      }
    ]
  },
  {
    meta: {
      subjectId: "english",
      slug: "punctuation",
      title: "Punctuation",
      tagline: "Marks guide meaning, pauses, and voice.",
      description:
        "Learn how periods, commas, question marks, exclamation marks, quotation marks, and apostrophes help readers understand sentence meaning.",
      accentColor: "#f97316",
      subtopics: ["Periods", "Commas", "Questions", "Exclamations", "Quotation marks", "Apostrophes"],
      previewVisualizationId: "english:punctuation"
    },
    learnChapter: {
      number: 3,
      title: "Marks That Shape Meaning",
      introduction:
        "Punctuation gives readers signals. It shows where a sentence ends, where a small pause belongs, whether words are spoken, and whether a sentence asks something or shows strong feeling.",
      figureCaption:
        "A punctuation-picker lab compares how the same words can change meaning when the mark changes."
    },
    learnSections: [
      {
        id: "ending-marks",
        sectionNumber: "3.1",
        title: "End Marks Show the Sentence Type",
        paragraphs: [
          "A period ends a statement or command. It tells the reader the thought is complete without asking a question or showing strong feeling.",
          "A question mark ends a direct question. An exclamation mark shows strong feeling, surprise, or urgency, but it should not be used for every exciting sentence.",
          "Changing only the end mark can change how readers hear the sentence. You are coming. sounds calm, but You are coming? asks for an answer."
        ],
        keyTerms: [
          {
            term: "period",
            definition: "A mark that ends a statement or many commands."
          },
          {
            term: "question mark",
            definition: "A mark that ends a direct question."
          },
          {
            term: "exclamation mark",
            definition: "A mark that shows strong feeling or urgency."
          }
        ],
        visualizationId: "english:punctuation"
      },
      {
        id: "commas-with-jobs",
        sectionNumber: "3.2",
        title: "Commas Have Jobs",
        paragraphs: [
          "A comma can separate items in a list, set off a name, or show a small pause after an opening word group. In We packed apples, water, and maps, commas help separate the list.",
          "Commas should not be sprinkled everywhere a reader might breathe. Too many commas can break a sentence into confusing pieces.",
          "Use evidence from the sentence to decide whether a comma has a job. Ask whether it separates a list item, a name, an opening phrase, or another clear part of the sentence."
        ],
        keyTerms: [
          {
            term: "comma",
            definition: "A mark that separates certain words, phrases, or items so a sentence is easier to read."
          },
          {
            term: "list",
            definition: "Three or more related items named in a sentence."
          }
        ]
      },
      {
        id: "speech-and-ownership",
        sectionNumber: "3.3",
        title: "Speech Marks and Apostrophes",
        paragraphs: [
          "Quotation marks show the exact words someone says or writes. In Mom said, \"Pack your lunch,\" the quotation marks tell us which words were spoken.",
          "An apostrophe can show ownership or a missing letter in a contraction. The dog's leash means the leash belongs to the dog. Don't means do not.",
          "A common mistake is using apostrophes for ordinary plurals. Dogs means more than one dog. Dog's means something belongs to one dog."
        ],
        keyTerms: [
          {
            term: "quotation marks",
            definition: "Marks that show the exact words someone says or writes."
          },
          {
            term: "apostrophe",
            definition: "A mark that can show ownership or missing letters."
          },
          {
            term: "contraction",
            definition: "A shortened word made by joining words and replacing missing letters with an apostrophe."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "english:punctuation",
        title: "Punctuation Meaning Picker",
        description:
          "Learners choose punctuation marks for blanks and compare how each mark changes the sound or meaning of a sentence.",
        interactionSummary:
          "Drag a period, comma, question mark, exclamation mark, quotation mark, or apostrophe into a sentence, then read feedback about the mark's job.",
        focusPoints: ["sentence ending", "comma purpose", "spoken words", "ownership", "meaning change"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "punctuation-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which mark should end this sentence: Where did you put the keys",
        choices: ["?", ".", "!", ","],
        correctAnswer: "?",
        hint: "The sentence asks something.",
        explanation: "A direct question should end with a question mark."
      },
      {
        id: "punctuation-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which sentence uses commas correctly in a list?",
        choices: [
          "I brought pencils, paper, and glue.",
          "I brought, pencils paper and glue.",
          "I brought pencils paper, and glue.",
          "I, brought pencils, paper and glue."
        ],
        correctAnswer: "I brought pencils, paper, and glue.",
        hint: "Commas should separate the list items.",
        explanation: "The commas separate pencils, paper, and glue as list items."
      },
      {
        id: "punctuation-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which sentence shows the exact words spoken?",
        choices: [
          "Lena said, \"I found it.\"",
          "Lena said, I found it.",
          "Lena said I found it?",
          "Lena said, I found it.\""
        ],
        correctAnswer: "Lena said, \"I found it.\"",
        hint: "Look for quotation marks around the spoken words.",
        explanation: "Quotation marks go around the exact words Lena said."
      },
      {
        id: "punctuation-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which sentence uses an apostrophe to show ownership?",
        choices: ["The bird's nest is high.", "The birds fly south.", "The bird sings loudly.", "The birds are small."],
        correctAnswer: "The bird's nest is high.",
        hint: "Find the sentence where something belongs to the bird.",
        explanation: "Bird's shows that the nest belongs to the bird."
      }
    ],
    examQuestions: [
      {
        id: "punctuation-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which sentence is punctuated as a calm statement?",
        choices: ["The bus is here.", "The bus is here?", "The bus is here!", "The bus, is here"],
        correctAnswer: "The bus is here.",
        explanation: "A period makes the sentence a calm statement."
      },
      {
        id: "punctuation-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which sentence avoids the mistake of using too many commas?",
        choices: [
          "After lunch we played outside.",
          "After, lunch, we, played, outside.",
          "After lunch, we, played outside.",
          "After, lunch we played, outside."
        ],
        correctAnswer: "After lunch we played outside.",
        explanation: "This short sentence is clear without extra commas breaking it apart."
      },
      {
        id: "punctuation-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "How does the mark change the meaning in You finished?",
        choices: [
          "It turns the words into a question.",
          "It shows ownership.",
          "It creates a list.",
          "It marks exact speech."
        ],
        correctAnswer: "It turns the words into a question.",
        explanation: "The question mark tells the reader the speaker is asking, not stating."
      },
      {
        id: "punctuation-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which sentence uses an apostrophe for a contraction?",
        choices: ["I can't find my notebook.", "The dog's bowl is full.", "Three dogs barked.", "The dog runs."],
        correctAnswer: "I can't find my notebook.",
        explanation: "Can't is a contraction for cannot, with an apostrophe marking missing letters."
      },
      {
        id: "punctuation-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which sentence correctly uses quotation marks and ending punctuation?",
        choices: [
          "\"Close the gate,\" said Ravi.",
          "\"Close the gate, said Ravi.",
          "Close the gate,\" said Ravi.",
          "\"Close the gate\" said Ravi."
        ],
        correctAnswer: "\"Close the gate,\" said Ravi.",
        explanation: "The spoken words are inside quotation marks, and the comma belongs before the closing quote."
      }
    ]
  }
]);
