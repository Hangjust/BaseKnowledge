import { defineBeginnerLabTopics } from "../helpers";

export const economicsBeginnerLabTopics = defineBeginnerLabTopics([
  {
    meta: {
      subjectId: "economics",
      slug: "scarcity",
      title: "Scarcity",
      tagline: "Choose well when resources are limited.",
      description:
        "Learn why people, families, businesses, and countries must make choices when time, money, goods, or space run short.",
      accentColor: "#0f766e",
      subtopics: ["Limited resources", "Opportunity cost", "Needs and wants"],
      previewVisualizationId: "economics:scarcity"
    },
    learnChapter: {
      number: 1,
      title: "Scarcity and Choice",
      introduction:
        "Economics begins with a simple problem. People want many things, but resources are limited. Scarcity does not mean there is nothing. It means there is not enough to satisfy every want at the same time, so choices matter.",
      figureCaption:
        "Choice cards show a learner using a fixed budget to pick the items that matter most. Each card chosen leaves another card behind."
    },
    learnSections: [
      {
        id: "scarcity-limited-resources",
        sectionNumber: "1.1",
        title: "Resources Are Limited",
        paragraphs: [
          "A resource is anything people use to make or get goods and services. Money, time, workers, tools, land, and materials are all resources. Since these resources are limited, people cannot have every good or service they want.",
          "Scarcity is not the same as poverty or shortage. A rare toy, a busy afternoon, and a full classroom can all show scarcity because there is a limit that forces a choice. Even wealthy people and large countries face scarcity because their wants can still be bigger than their resources."
        ],
        keyTerms: [
          {
            term: "resource",
            definition: "Something people use to make, buy, or provide goods and services."
          },
          {
            term: "scarcity",
            definition: "The condition of having limited resources compared with unlimited wants."
          }
        ],
        visualizationId: "economics:scarcity"
      },
      {
        id: "scarcity-choice",
        sectionNumber: "1.2",
        title: "Choices Have Costs",
        paragraphs: [
          "Because of scarcity, choosing one option usually means giving up another option. If you spend an hour playing a game, you cannot use that same hour to study, sleep, or help at home. The cost is not only money. It can also be time, effort, or the next best thing you did not choose.",
          "The next best option given up is called opportunity cost. Beginners often think cost only means a price tag. Economists use cost in a wider way. If you choose a sandwich instead of saving for a notebook, the notebook you gave up is part of the cost of your choice."
        ],
        keyTerms: [
          {
            term: "choice",
            definition: "A decision between two or more possible uses of limited resources."
          },
          {
            term: "opportunity cost",
            definition: "The best alternative given up when a choice is made."
          }
        ]
      },
      {
        id: "scarcity-smart-decisions",
        sectionNumber: "1.3",
        title: "Making Smart Economic Decisions",
        paragraphs: [
          "A smart choice starts by naming the limit. How much money is available? How much time is left? Which need is most urgent? Clear limits make choices easier to compare.",
          "Scarcity does not make wants bad. Wants are normal. The mistake is pretending every want can be met at once. Good economic thinking asks what matters most now, what can wait, and what must be given up."
        ],
        keyTerms: [
          {
            term: "want",
            definition: "Something a person would like to have but does not always need to live well."
          },
          {
            term: "need",
            definition: "Something important for health, safety, or basic daily life."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "economics:scarcity",
        title: "Scarcity Choice Cards",
        description:
          "A fixed amount of money or time is shown beside several choice cards, so learners can see what fits and what must be left out.",
        interactionSummary:
          "Learners select cards until the resource limit is reached, then compare the chosen item with the best item they gave up.",
        focusPoints: ["Resource limit", "Chosen option", "Opportunity cost", "Need or want"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "scarcity-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which situation is the best example of scarcity?",
        choices: [
          "A student has ten dollars and wants three items that cost more than ten dollars together.",
          "A shop has a sign with bright colors.",
          "A class learns the word economics.",
          "A family writes a grocery list."
        ],
        correctAnswer:
          "A student has ten dollars and wants three items that cost more than ten dollars together.",
        hint: "Look for a limited resource and more wants than the resource can cover.",
        explanation:
          "The student has limited money and cannot buy every wanted item, so a choice is needed. That is scarcity."
      },
      {
        id: "scarcity-practice-2",
        mode: "practice",
        type: "short_text",
        prompt: "What is the opportunity cost of choosing lunch at the cafe instead of saving the money for a book?",
        correctAnswer: "the book",
        acceptedAnswers: ["book", "saving for the book", "the money saved for a book"],
        hint: "Opportunity cost is the best option given up.",
        explanation:
          "The best alternative given up is saving for the book, so the book is the opportunity cost."
      },
      {
        id: "scarcity-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which statement fixes a common misconception about scarcity?",
        choices: [
          "Scarcity means resources are limited, not worthless.",
          "Scarcity means nobody can buy anything.",
          "Scarcity only happens to people with no money.",
          "Scarcity means wants are always bad."
        ],
        correctAnswer: "Scarcity means resources are limited, not worthless.",
        hint: "Scarcity is about limits, not value disappearing.",
        explanation:
          "Something can be scarce and valuable. Scarcity means there is not enough for every want."
      },
      {
        id: "scarcity-practice-4",
        mode: "practice",
        type: "numeric",
        prompt: "Maya has 6 coins. A notebook costs 4 coins and a snack costs 3 coins. How many coins short is she if she wants both?",
        correctAnswer: "1",
        unit: "coin",
        tolerance: 0,
        hint: "Add the two prices, then compare the total with 6 coins.",
        explanation:
          "The notebook and snack cost 7 coins together. Maya has 6 coins, so she is 1 coin short."
      }
    ],
    examQuestions: [
      {
        id: "scarcity-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A city has land for either a park or extra parking spaces, but not both. What economic idea is shown most clearly?",
        choices: ["Opportunity cost", "Demand curve", "Equilibrium price", "Inflation"],
        correctAnswer: "Opportunity cost",
        explanation:
          "Choosing the park means giving up the parking spaces, and choosing the parking spaces means giving up the park."
      },
      {
        id: "scarcity-exam-2",
        mode: "exam",
        type: "short_text",
        prompt: "Name the economic problem caused by limited resources and unlimited wants.",
        correctAnswer: "scarcity",
        acceptedAnswers: ["scarcity problem", "the basic economic problem"],
        explanation:
          "Scarcity is the basic economic problem that forces people to choose among competing wants."
      },
      {
        id: "scarcity-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Why can a country with many resources still face scarcity?",
        choices: [
          "Its wants and possible uses for resources can still be greater than what it has.",
          "Scarcity only depends on population size.",
          "Scarcity disappears when resources are valuable.",
          "Countries do not make choices."
        ],
        correctAnswer:
          "Its wants and possible uses for resources can still be greater than what it has.",
        explanation:
          "Scarcity compares limited resources with wants. More resources do not remove every limit."
      },
      {
        id: "scarcity-exam-4",
        mode: "exam",
        type: "numeric",
        prompt: "A learner has 45 minutes. Reading takes 25 minutes and practice takes 30 minutes. How many extra minutes would be needed to do both fully?",
        correctAnswer: "10",
        unit: "minutes",
        tolerance: 0,
        explanation:
          "Reading and practice need 55 minutes in total. With 45 minutes available, the learner is 10 minutes short."
      },
      {
        id: "scarcity-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which question best helps someone respond to scarcity before choosing?",
        choices: [
          "What is the best alternative I will give up?",
          "How can I avoid every tradeoff?",
          "Why are all wants wrong?",
          "Can I ignore the resource limit?"
        ],
        correctAnswer: "What is the best alternative I will give up?",
        explanation:
          "Good choices include thinking about opportunity cost, which is the best alternative given up."
      }
    ]
  },
  {
    meta: {
      subjectId: "economics",
      slug: "supply-and-demand",
      title: "Supply and Demand",
      tagline: "See how buyers and sellers shape prices.",
      description:
        "Learn how demand, supply, quantity demanded, quantity supplied, and equilibrium work together in simple markets.",
      accentColor: "#2563eb",
      subtopics: ["Demand", "Supply", "Equilibrium"],
      previewVisualizationId: "economics:supply-and-demand"
    },
    learnChapter: {
      number: 2,
      title: "Prices in a Market",
      introduction:
        "Markets bring buyers and sellers together. Buyers usually want lower prices, while sellers usually want prices that make selling worthwhile. Supply and demand help explain why prices rise, fall, or settle near a balance point.",
      figureCaption:
        "Sliders for buyers, sellers, and price move a simple market graph toward the point where the amount buyers want matches the amount sellers offer."
    },
    learnSections: [
      {
        id: "supply-demand-demand",
        sectionNumber: "2.1",
        title: "Demand Is More Than Wanting",
        paragraphs: [
          "Demand means buyers are willing and able to buy a good or service at different prices. Wanting a new bike is not enough by itself. Demand includes both the desire to buy and the ability to pay.",
          "Quantity demanded is the amount buyers choose at one exact price. This difference matters. If the price of apples falls and shoppers buy more apples, the quantity demanded changed. The whole demand pattern did not have to change."
        ],
        keyTerms: [
          {
            term: "demand",
            definition: "The amounts buyers are willing and able to buy at different prices."
          },
          {
            term: "quantity demanded",
            definition: "The amount buyers choose to buy at one specific price."
          }
        ],
        visualizationId: "economics:supply-and-demand"
      },
      {
        id: "supply-demand-supply",
        sectionNumber: "2.2",
        title: "Supply Comes From Sellers",
        paragraphs: [
          "Supply means sellers are willing and able to offer a good or service at different prices. When the price is higher, sellers may want to bring more to the market because selling becomes more rewarding.",
          "Quantity supplied is the amount sellers offer at one exact price. A baker may offer 20 loaves at one price and 35 loaves at a higher price. That is a change in quantity supplied along the same supply pattern."
        ],
        keyTerms: [
          {
            term: "supply",
            definition: "The amounts sellers are willing and able to offer at different prices."
          },
          {
            term: "quantity supplied",
            definition: "The amount sellers offer at one specific price."
          }
        ]
      },
      {
        id: "supply-demand-equilibrium",
        sectionNumber: "2.3",
        title: "Equilibrium Balances the Market",
        paragraphs: [
          "Equilibrium is the price and quantity where quantity demanded equals quantity supplied. At this point, the market is balanced because buyers want to buy the same amount that sellers want to sell.",
          "If the price is too high, sellers may have extra goods left over. If the price is too low, buyers may want more than sellers offer. A common mistake is saying demand alone sets price. In most markets, supply and demand work together."
        ],
        keyTerms: [
          {
            term: "equilibrium",
            definition: "The market balance where quantity demanded equals quantity supplied."
          },
          {
            term: "surplus",
            definition: "A situation where sellers offer more than buyers want at the current price."
          },
          {
            term: "shortage",
            definition: "A situation where buyers want more than sellers offer at the current price."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "economics:supply-and-demand",
        title: "Supply and Demand Market Graph",
        description:
          "A simple graph and market scene show how buyer interest, seller supply, and price interact.",
        interactionSummary:
          "Learners move supply and demand sliders, predict whether the price rises or falls, then compare quantities at the new balance point.",
        focusPoints: ["Demand slider", "Supply slider", "Market price", "Equilibrium point"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "supply-demand-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What does demand mean in economics?",
        choices: [
          "The amounts buyers are willing and able to buy at different prices.",
          "Anything people like, even if they cannot pay for it.",
          "The amount sellers place on shelves.",
          "The cost of making one item."
        ],
        correctAnswer: "The amounts buyers are willing and able to buy at different prices.",
        hint: "Demand includes willingness and ability to buy.",
        explanation:
          "Demand is not just wanting something. Buyers must also be able to pay at the prices being considered."
      },
      {
        id: "supply-demand-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "The price of apples falls from 4 coins to 2 coins, and buyers purchase more apples. What changed first?",
        choices: ["Quantity demanded", "The subject", "The currency", "The meaning of supply"],
        correctAnswer: "Quantity demanded",
        hint: "The question gives one good at a new specific price.",
        explanation:
          "A price change for the same good changes quantity demanded, which is the amount bought at a specific price."
      },
      {
        id: "supply-demand-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "What is the market balance point called when quantity demanded equals quantity supplied?",
        correctAnswer: "equilibrium",
        acceptedAnswers: ["market equilibrium", "equilibrium point"],
        hint: "It means the market is balanced.",
        explanation:
          "Equilibrium is the point where buyers want the same amount sellers offer."
      },
      {
        id: "supply-demand-practice-4",
        mode: "practice",
        type: "numeric",
        prompt: "At a price of 5 coins, buyers want 30 tickets and sellers offer 18 tickets. How many more tickets do buyers want than sellers offer?",
        correctAnswer: "12",
        unit: "tickets",
        tolerance: 0,
        hint: "Subtract the amount sellers offer from the amount buyers want.",
        explanation:
          "Buyers want 30 tickets and sellers offer 18 tickets, so buyers want 12 more tickets than are offered."
      }
    ],
    examQuestions: [
      {
        id: "supply-demand-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which sentence correctly separates demand from quantity demanded?",
        choices: [
          "Demand is the full price pattern, while quantity demanded is the amount at one price.",
          "Demand and quantity demanded always mean the same thing.",
          "Demand belongs to sellers, while quantity demanded belongs to producers.",
          "Quantity demanded means the number of shops in a market."
        ],
        correctAnswer:
          "Demand is the full price pattern, while quantity demanded is the amount at one price.",
        explanation:
          "Demand describes amounts at different prices. Quantity demanded is the amount buyers choose at one specific price."
      },
      {
        id: "supply-demand-exam-2",
        mode: "exam",
        type: "numeric",
        prompt: "At one price, quantity demanded is 80 and quantity supplied is 65. What shortage exists?",
        correctAnswer: "15",
        unit: "units",
        tolerance: 0,
        explanation:
          "A shortage is quantity demanded minus quantity supplied when demand is larger. Here, 80 minus 65 equals 15."
      },
      {
        id: "supply-demand-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "What is most likely when a price is above equilibrium?",
        choices: [
          "A surplus may appear because sellers offer more than buyers want.",
          "A shortage must appear because buyers want everything.",
          "Demand stops existing.",
          "Supply and demand no longer matter."
        ],
        correctAnswer: "A surplus may appear because sellers offer more than buyers want.",
        explanation:
          "A high price often encourages sellers to offer more while buyers buy less, creating a surplus."
      },
      {
        id: "supply-demand-exam-4",
        mode: "exam",
        type: "short_text",
        prompt: "In one word, what do economists call the amount sellers offer at one specific price?",
        correctAnswer: "quantity supplied",
        acceptedAnswers: ["quantity supplied"],
        explanation:
          "Quantity supplied is the amount sellers offer at one specific price."
      },
      {
        id: "supply-demand-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which explanation avoids a common misconception about prices?",
        choices: [
          "Prices are shaped by both supply and demand, not demand alone.",
          "Only buyers matter because sellers follow any price.",
          "Only sellers matter because buyers have no choices.",
          "Prices cannot change once a market opens."
        ],
        correctAnswer: "Prices are shaped by both supply and demand, not demand alone.",
        explanation:
          "Market prices are shaped by how much buyers want to buy and how much sellers want to offer."
      }
    ]
  },
  {
    meta: {
      subjectId: "economics",
      slug: "budgeting",
      title: "Budgeting",
      tagline: "Plan money before it is spent.",
      description:
        "Learn how income, expenses, saving, and spending plans help people make careful choices with limited money.",
      accentColor: "#ca8a04",
      subtopics: ["Income", "Expenses", "Saving plans"],
      previewVisualizationId: "economics:budgeting"
    },
    learnChapter: {
      number: 3,
      title: "Planning Money",
      introduction:
        "A budget is a plan for money before the money is gone. It helps people decide what must be paid, what can be saved, and what can be spent on fun without losing control.",
      figureCaption:
        "Budget jars or allocation blocks show a fixed amount of income being placed into needs, savings, and wants before any spending begins."
    },
    learnSections: [
      {
        id: "budgeting-income-expenses",
        sectionNumber: "3.1",
        title: "Start With Income and Expenses",
        paragraphs: [
          "Income is money coming in. For a beginner example, income could be allowance, a gift, or money earned from a small job. Expenses are money going out for things like lunch, transport, school supplies, or entertainment.",
          "A budget starts by comparing income with planned expenses. If planned expenses are bigger than income, the plan has a problem before spending even starts. This is useful because it gives a person time to change the plan."
        ],
        keyTerms: [
          {
            term: "income",
            definition: "Money a person receives or earns."
          },
          {
            term: "expense",
            definition: "Money spent or planned to be spent."
          }
        ],
        visualizationId: "economics:budgeting"
      },
      {
        id: "budgeting-plan-first",
        sectionNumber: "3.2",
        title: "Plan Before Spending",
        paragraphs: [
          "The best time to make a budget is before spending begins. Planning first helps protect needs, savings, and important goals. Spending first and checking later can leave too little money for the things that matter most.",
          "Budgeting is not the same as never having fun. A good budget can include fun spending, but it gives that spending a limit. The limit keeps one choice from taking over the whole plan."
        ],
        keyTerms: [
          {
            term: "budget",
            definition: "A plan for how money will be received, spent, and saved."
          },
          {
            term: "saving",
            definition: "Keeping money for later use instead of spending it now."
          }
        ]
      },
      {
        id: "budgeting-tradeoffs",
        sectionNumber: "3.3",
        title: "Every Budget Has Tradeoffs",
        paragraphs: [
          "Money used in one category cannot be used in another category at the same time. If more money goes to snacks, less may be left for transport or saving. That is scarcity inside a budget.",
          "A common misconception is that a budget only matters for adults or large amounts of money. Small budgets teach the same skill. The habit is to pause, choose priorities, and check the opportunity cost before spending."
        ],
        keyTerms: [
          {
            term: "tradeoff",
            definition: "A choice where getting more of one thing means giving up some of another."
          },
          {
            term: "priority",
            definition: "Something treated as more important than other choices."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "economics:budgeting",
        title: "Budget Allocation Board",
        description:
          "A fixed income amount is divided into spending and saving categories so learners can see when a plan fits or goes over budget.",
        interactionSummary:
          "Learners drag money into needs, savings, and wants, then adjust the amounts until total planned spending is less than or equal to income.",
        focusPoints: ["Income total", "Needs", "Savings", "Wants", "Over-budget warning"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "budgeting-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What is a budget?",
        choices: [
          "A plan for how money will be received, spent, and saved.",
          "A rule that says people can never buy fun things.",
          "A list of only expensive items.",
          "Money that appears after shopping."
        ],
        correctAnswer: "A plan for how money will be received, spent, and saved.",
        hint: "A budget is a plan, not a punishment.",
        explanation:
          "A budget plans income, spending, and saving before money is used."
      },
      {
        id: "budgeting-practice-2",
        mode: "practice",
        type: "numeric",
        prompt: "Leo has 20 coins. He plans 8 coins for lunch, 5 for transport, and 4 for saving. How many coins are left for other wants?",
        correctAnswer: "3",
        unit: "coins",
        tolerance: 0,
        hint: "Add the planned amounts, then subtract from 20.",
        explanation:
          "The planned amounts total 17 coins. With 20 coins available, 3 coins remain."
      },
      {
        id: "budgeting-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which habit helps budgeting work best?",
        choices: [
          "Plan before spending.",
          "Spend first and hope money remains.",
          "Ignore small amounts of money.",
          "Treat every want as a need."
        ],
        correctAnswer: "Plan before spending.",
        hint: "The plan is most useful before choices are made.",
        explanation:
          "Planning before spending helps protect needs, savings, and priorities."
      },
      {
        id: "budgeting-practice-4",
        mode: "practice",
        type: "short_text",
        prompt: "What word means money a person receives or earns?",
        correctAnswer: "income",
        acceptedAnswers: ["income", "earnings"],
        hint: "It is money coming in.",
        explanation:
          "Income is money received or earned before it is spent or saved."
      }
    ],
    examQuestions: [
      {
        id: "budgeting-exam-1",
        mode: "exam",
        type: "numeric",
        prompt: "A student has 50 coins of income. Planned expenses are 18 for food, 12 for transport, 9 for supplies, and 7 for savings. How many coins remain unplanned?",
        correctAnswer: "4",
        unit: "coins",
        tolerance: 0,
        explanation:
          "The planned amounts total 46 coins. Subtracting 46 from 50 leaves 4 coins unplanned."
      },
      {
        id: "budgeting-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A plan shows expenses of 63 coins and income of 55 coins. What should the learner notice before spending?",
        choices: [
          "The plan is over budget by 8 coins.",
          "The plan has 8 coins left over.",
          "The plan has no scarcity.",
          "The income should be ignored."
        ],
        correctAnswer: "The plan is over budget by 8 coins.",
        explanation:
          "Planned expenses are 8 coins higher than income, so the plan must change before spending."
      },
      {
        id: "budgeting-exam-3",
        mode: "exam",
        type: "short_text",
        prompt: "What is the best alternative given up when money is spent on one budget category called?",
        correctAnswer: "opportunity cost",
        acceptedAnswers: ["opportunity cost", "the opportunity cost"],
        explanation:
          "Using money in one category means giving up the next best alternative use of that money."
      },
      {
        id: "budgeting-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which statement corrects a budgeting misconception?",
        choices: [
          "Budgeting can include wants, but it gives them a planned limit.",
          "Budgeting means all wants are forbidden.",
          "Budgeting only works after money is gone.",
          "Budgeting is only useful for adults with large incomes."
        ],
        correctAnswer: "Budgeting can include wants, but it gives them a planned limit.",
        explanation:
          "A budget can include fun spending. The important point is planning and limiting it before spending."
      },
      {
        id: "budgeting-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Why is saving often placed in a budget before extra wants?",
        choices: [
          "It protects future goals before all money is spent.",
          "It makes income disappear.",
          "It proves wants are always wrong.",
          "It removes the need to make choices."
        ],
        correctAnswer: "It protects future goals before all money is spent.",
        explanation:
          "Planning saving early helps protect future goals from being crowded out by immediate wants."
      }
    ]
  }
]);
