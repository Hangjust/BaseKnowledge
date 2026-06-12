import { defineBeginnerLabTopics } from "../helpers";

export const computerScienceBeginnerLabTopics = defineBeginnerLabTopics([
  {
    meta: {
      subjectId: "computer-science",
      slug: "algorithms",
      title: "Algorithms",
      tagline: "Put clear steps in the right order.",
      description:
        "Learn how a computer follows ordered instructions, why small missing steps matter, and how to test a process from start to finish.",
      accentColor: "#2563eb",
      subtopics: ["step order", "clear instructions", "testing a process"],
      previewVisualizationId: "computer-science:algorithms"
    },
    learnChapter: {
      number: 1,
      title: "Algorithms as Step-by-Step Plans",
      introduction:
        "An algorithm is a clear plan for solving a problem. Beginners often know the answer in their head, but a computer needs every needed step written in an order it can follow.",
      figureCaption:
        "A recipe-style algorithm starts at the first instruction, follows arrows through each step, and ends only after the goal is complete."
    },
    learnSections: [
      {
        id: "algorithms-steps",
        sectionNumber: "1.1",
        title: "A Computer Needs Exact Steps",
        paragraphs: [
          "An algorithm is a set of instructions for solving a problem. The instructions can be simple, like making a sandwich, or more technical, like sorting names into order.",
          "People can guess missing details from experience. A computer doesn't guess. If a needed step is missing, the result may be wrong even when the main idea sounds correct."
        ],
        keyTerms: [
          {
            term: "algorithm",
            definition: "A clear set of steps used to solve a problem."
          },
          {
            term: "instruction",
            definition: "One action in an algorithm that tells what to do next."
          }
        ]
      },
      {
        id: "algorithms-order",
        sectionNumber: "1.2",
        title: "Order Changes the Result",
        paragraphs: [
          "The same steps can lead to different results when they are arranged in a different order. You must put toothpaste on the brush before brushing, not after.",
          "Computer programs also depend on order. A program that checks an answer before it asks the question is using the right pieces in the wrong sequence."
        ],
        keyTerms: [
          {
            term: "sequence",
            definition: "The order in which instructions are followed."
          },
          {
            term: "output",
            definition: "The result produced after an algorithm runs."
          }
        ],
        visualizationId: "computer-science:algorithms"
      },
      {
        id: "algorithms-test",
        sectionNumber: "1.3",
        title: "Test the Plan",
        paragraphs: [
          "A good way to check an algorithm is to act it out slowly. Start at the first step, do exactly what it says, and notice where you get stuck.",
          "Testing helps you find vague instructions such as prepare the cup or finish the task. Replace vague words with actions a beginner or a computer could follow."
        ],
        keyTerms: [
          {
            term: "test run",
            definition: "A careful try of an algorithm to see whether the steps work."
          },
          {
            term: "clear step",
            definition: "An instruction that tells one specific action without hidden guessing."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "computer-science:algorithms",
        title: "Recipe Step Ordering",
        description:
          "Learners arrange everyday actions into a working algorithm and compare the result when steps are missing or out of order.",
        interactionSummary:
          "Drag the instruction cards into order, run the recipe, then revise the sequence after seeing the outcome.",
        focusPoints: ["start step", "middle steps", "finish step", "test run"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "algorithms-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which description best matches an algorithm?",
        choices: [
          "A clear set of steps for solving a problem",
          "A picture of a computer screen",
          "A random list of ideas",
          "A password used to sign in"
        ],
        correctAnswer: "A clear set of steps for solving a problem",
        hint: "Think about the recipe example.",
        explanation: "An algorithm gives ordered instructions that can be followed to reach a result."
      },
      {
        id: "algorithms-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Why does step order matter in an algorithm?",
        choices: [
          "Changing the order can change the result",
          "Computers ignore the order of steps",
          "Only the last step matters",
          "Order matters only for pictures"
        ],
        correctAnswer: "Changing the order can change the result",
        hint: "Imagine brushing teeth before adding toothpaste.",
        explanation: "A sequence tells which action happens first, next, and last. The result can change when the sequence changes."
      },
      {
        id: "algorithms-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "What is one common problem with the instruction 'make the tea' in an algorithm?",
        correctAnswer: "it is too vague",
        acceptedAnswers: ["too vague", "not specific", "missing steps", "it leaves out steps"],
        hint: "Would a computer know what exact action to do first?",
        explanation: "The instruction hides many smaller steps, such as boiling water, placing the tea bag, and pouring water."
      },
      {
        id: "algorithms-practice-4",
        mode: "practice",
        type: "numeric",
        prompt: "A simple algorithm has 1 start step, 3 middle steps, and 1 finish step. How many steps does it have in all?",
        correctAnswer: "5",
        hint: "Add each group of steps together.",
        explanation: "The total is 1 + 3 + 1, so the algorithm has 5 steps."
      }
    ],
    examQuestions: [
      {
        id: "algorithms-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A learner writes these steps: pour cereal, eat cereal, get a bowl, add milk. What is the main issue?",
        choices: [
          "The steps are out of order",
          "The algorithm has too many loops",
          "The output is a password",
          "The computer will choose the order"
        ],
        correctAnswer: "The steps are out of order",
        explanation: "The bowl is needed before cereal can be poured into it, so the sequence needs revision."
      },
      {
        id: "algorithms-exam-2",
        mode: "exam",
        type: "short_text",
        prompt: "Name the part of an algorithm that tells the computer what to do next.",
        correctAnswer: "instruction",
        acceptedAnswers: ["step", "command"],
        explanation: "An instruction, step, or command gives one action in the algorithm."
      },
      {
        id: "algorithms-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which step is clearest for a sandwich-making algorithm?",
        choices: [
          "Put one slice of bread on the plate",
          "Get ready",
          "Do the food part",
          "Make it nice"
        ],
        correctAnswer: "Put one slice of bread on the plate",
        explanation: "The clear step names one specific action that can be followed without guessing."
      },
      {
        id: "algorithms-exam-4",
        mode: "exam",
        type: "numeric",
        prompt: "An algorithm begins with step 1 and ends with step 7. If no step numbers are skipped, how many steps are there?",
        correctAnswer: "7",
        explanation: "Counting from 1 through 7 gives seven steps."
      },
      {
        id: "algorithms-exam-5",
        mode: "exam",
        type: "short_text",
        prompt: "What should you do after writing an algorithm to check whether the steps work?",
        correctAnswer: "test it",
        acceptedAnswers: ["run it", "test run", "try it", "act it out"],
        explanation: "A test run shows whether the steps are complete, clear, and in a useful order."
      }
    ]
  },
  {
    meta: {
      subjectId: "computer-science",
      slug: "loops",
      title: "Loops",
      tagline: "Repeat actions without writing them again and again.",
      description:
        "Learn how loops repeat instructions, how a count controls repetition, and why every loop needs a clear stopping condition.",
      accentColor: "#16a34a",
      subtopics: ["repetition", "repeat counts", "stopping conditions"],
      previewVisualizationId: "computer-science:loops"
    },
    learnChapter: {
      number: 2,
      title: "Loops and Repeated Actions",
      introduction:
        "A loop tells a computer to repeat an action. Loops save time, but they must say what repeats and when the repetition should stop.",
      figureCaption:
        "A loop sends the program back to the same instructions until the repeat count or stopping condition is finished."
    },
    learnSections: [
      {
        id: "loops-repeat",
        sectionNumber: "2.1",
        title: "Loops Repeat a Small Set of Steps",
        paragraphs: [
          "When a program needs to do the same action many times, a loop can repeat the instruction instead of writing it again and again.",
          "For example, a sprite can clap three times by repeating the clap command. The repeated action stays the same, while the loop controls how many times it happens."
        ],
        keyTerms: [
          {
            term: "loop",
            definition: "A structure that repeats one or more instructions."
          },
          {
            term: "repeat",
            definition: "To do the same action again."
          }
        ],
        visualizationId: "computer-science:loops"
      },
      {
        id: "loops-count",
        sectionNumber: "2.2",
        title: "A Count Tells How Many Times",
        paragraphs: [
          "Many beginner loops use a number to say how many times to repeat. Repeat 4 means the computer should run the loop body four times, then move on.",
          "The loop body is the part inside the loop. If the body has two actions and the count is three, both actions happen three times."
        ],
        keyTerms: [
          {
            term: "loop body",
            definition: "The instruction or instructions that run each time the loop repeats."
          },
          {
            term: "count",
            definition: "The number of times a counted loop should repeat."
          }
        ]
      },
      {
        id: "loops-stop",
        sectionNumber: "2.3",
        title: "Loops Need a Way to Stop",
        paragraphs: [
          "A loop is useful only when it stops at the right time. If a loop keeps repeating forever by mistake, the program may get stuck.",
          "The stopping condition can be a finished count, a reached goal, or a rule that becomes true. Beginners should always ask, what tells this loop to stop?"
        ],
        keyTerms: [
          {
            term: "stopping condition",
            definition: "The rule or count that tells a loop when to finish."
          },
          {
            term: "forever loop",
            definition: "A loop that keeps repeating without stopping."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "computer-science:loops",
        title: "Repeat Count Animation",
        description:
          "Learners set a repeat count and watch each pass through the loop so they can see how repetition builds the final action.",
        interactionSummary:
          "Change the loop count, run the animation, and watch the counter mark each repeat until the loop stops.",
        focusPoints: ["loop body", "repeat count", "current repeat", "stop point"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "loops-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What does a loop do in a program?",
        choices: [
          "Repeats instructions",
          "Deletes all code",
          "Turns hardware into software",
          "Changes every answer to yes"
        ],
        correctAnswer: "Repeats instructions",
        hint: "Think about making a sprite clap several times.",
        explanation: "A loop runs the same instruction or group of instructions more than once."
      },
      {
        id: "loops-practice-2",
        mode: "practice",
        type: "numeric",
        prompt: "A loop repeats a jump command 4 times. How many jumps happen?",
        correctAnswer: "4",
        hint: "The count tells how many repeats happen.",
        explanation: "A repeat count of 4 runs the loop body four times, so the jump happens four times."
      },
      {
        id: "loops-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Why is a stopping condition important?",
        choices: [
          "It tells the loop when to finish",
          "It makes the computer ignore the loop",
          "It removes the loop body",
          "It changes code into hardware"
        ],
        correctAnswer: "It tells the loop when to finish",
        hint: "Ask what stops the repetition.",
        explanation: "A stopping condition prevents the loop from repeating longer than needed."
      },
      {
        id: "loops-practice-4",
        mode: "practice",
        type: "short_text",
        prompt: "What do we call the instructions inside a loop that repeat each time?",
        correctAnswer: "loop body",
        acceptedAnswers: ["body", "loop instructions"],
        hint: "It is the part of the loop that runs again and again.",
        explanation: "The loop body contains the repeated instruction or instructions."
      }
    ],
    examQuestions: [
      {
        id: "loops-exam-1",
        mode: "exam",
        type: "numeric",
        prompt: "A loop body has 2 commands. The loop repeats 5 times. How many command runs happen in all?",
        correctAnswer: "10",
        explanation: "Each repeat runs 2 commands, and 2 x 5 = 10 command runs."
      },
      {
        id: "loops-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which situation is a good reason to use a loop?",
        choices: [
          "A character needs to move forward ten times",
          "A program needs one title on the screen",
          "A learner needs to name one file",
          "A keyboard needs to be hardware"
        ],
        correctAnswer: "A character needs to move forward ten times",
        explanation: "A repeated movement is a good use for a loop because the same action happens many times."
      },
      {
        id: "loops-exam-3",
        mode: "exam",
        type: "short_text",
        prompt: "What question should you ask to check whether a loop is safe from running forever?",
        correctAnswer: "what makes it stop",
        acceptedAnswers: ["when does it stop", "what tells it to stop", "how does it stop", "what is the stopping condition"],
        explanation: "A loop should have a clear count or rule that tells it when to finish."
      },
      {
        id: "loops-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A repeat 3 loop contains the commands clap and step. What happens?",
        choices: [
          "Clap and step both happen three times",
          "Only clap happens three times",
          "Only step happens once",
          "Nothing happens because loops cannot hold two commands"
        ],
        correctAnswer: "Clap and step both happen three times",
        explanation: "Every command in the loop body runs during each repeat."
      },
      {
        id: "loops-exam-5",
        mode: "exam",
        type: "short_text",
        prompt: "Name the number that controls how many times a counted loop repeats.",
        correctAnswer: "count",
        acceptedAnswers: ["repeat count", "loop count"],
        explanation: "The count tells a counted loop how many times to run its body."
      }
    ]
  },
  {
    meta: {
      subjectId: "computer-science",
      slug: "debugging",
      title: "Debugging",
      tagline: "Find mistakes by checking one thing at a time.",
      description:
        "Learn how to investigate broken code, test one change at a time, and fix mistakes without guessing randomly.",
      accentColor: "#dc2626",
      subtopics: ["finding bugs", "testing changes", "systematic fixes"],
      previewVisualizationId: "computer-science:debugging"
    },
    learnChapter: {
      number: 3,
      title: "Debugging Without Guessing",
      introduction:
        "Debugging means finding and fixing mistakes in code. Errors are part of learning, and a careful method works better than changing random blocks until something looks right.",
      figureCaption:
        "A magnifying glass highlights one suspicious step while the learner compares the expected result with the actual result."
    },
    learnSections: [
      {
        id: "debugging-bugs",
        sectionNumber: "3.1",
        title: "Bugs Are Mistakes You Can Study",
        paragraphs: [
          "A bug is a mistake that makes a program behave the wrong way. The mistake might be a missing step, the wrong value, or instructions in the wrong order.",
          "Finding a bug doesn't mean you failed. It means the program is giving you information. The first job is to describe what happened and what you expected to happen."
        ],
        keyTerms: [
          {
            term: "bug",
            definition: "A mistake that makes a program work incorrectly."
          },
          {
            term: "expected result",
            definition: "What you thought the program should do."
          }
        ]
      },
      {
        id: "debugging-compare",
        sectionNumber: "3.2",
        title: "Compare Expected and Actual Results",
        paragraphs: [
          "Debugging starts with a comparison. What did you want the program to do, and what did it actually do when you ran it?",
          "That difference gives you a clue. If a sprite moves two steps instead of three, the problem may be a repeat count. If it moves before turning, the problem may be order."
        ],
        keyTerms: [
          {
            term: "actual result",
            definition: "What the program really did when it ran."
          },
          {
            term: "clue",
            definition: "Information that helps you decide where to look for the mistake."
          }
        ],
        visualizationId: "computer-science:debugging"
      },
      {
        id: "debugging-one-change",
        sectionNumber: "3.3",
        title: "Change One Thing, Then Test Again",
        paragraphs: [
          "A common beginner mistake is to change many blocks at once. If the program works after that, you may not know which change fixed it. If it breaks more, you may not know which change caused the new problem.",
          "A systematic debugger reads the code, chooses one likely fix, tests it, and observes the result. This makes each test useful, even when the first fix is not correct."
        ],
        keyTerms: [
          {
            term: "debugging",
            definition: "The process of finding, understanding, and fixing mistakes in code."
          },
          {
            term: "systematic",
            definition: "Done in an organized way instead of by random guessing."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "computer-science:debugging",
        title: "Broken Program Challenge",
        description:
          "Learners inspect a small broken block program, compare expected and actual behavior, and choose one fix to test.",
        interactionSummary:
          "Run the broken program, read a hint, select one suspected bug, apply one change, and run the program again.",
        focusPoints: ["expected result", "actual result", "suspected bug", "one-change test"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "debugging-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What does debugging mean?",
        choices: [
          "Finding and fixing mistakes in code",
          "Writing code without ever testing it",
          "Turning off the computer",
          "Changing every block at once"
        ],
        correctAnswer: "Finding and fixing mistakes in code",
        hint: "Debugging begins when something doesn't work as expected.",
        explanation: "Debugging is the process of finding, understanding, and fixing code mistakes."
      },
      {
        id: "debugging-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What should you compare first when a program behaves incorrectly?",
        choices: [
          "Expected result and actual result",
          "Keyboard and mouse",
          "Screen size and speaker volume",
          "File name and password"
        ],
        correctAnswer: "Expected result and actual result",
        hint: "Ask what should have happened and what really happened.",
        explanation: "The difference between expected and actual results gives clues about where the bug may be."
      },
      {
        id: "debugging-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "Why is it better to change one thing before testing again?",
        correctAnswer: "so you know what changed the result",
        acceptedAnswers: [
          "to know what fixed it",
          "to know which change worked",
          "so you can track the change",
          "to avoid guessing"
        ],
        hint: "Think about what happens if you make five changes at once.",
        explanation: "Testing one change at a time helps you connect the result to the exact change you made."
      },
      {
        id: "debugging-practice-4",
        mode: "practice",
        type: "numeric",
        prompt: "You test 1 change, then another 1 change, then another 1 change. How many changes did you test in all?",
        correctAnswer: "3",
        hint: "Add the one-change tests together.",
        explanation: "You tested 1 + 1 + 1, so you tested 3 changes in all."
      }
    ],
    examQuestions: [
      {
        id: "debugging-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A sprite should clap three times, but it claps forever. Which bug is most likely?",
        choices: [
          "The loop has no correct stopping condition",
          "The screen is hardware",
          "The algorithm has no title",
          "The output is too colorful"
        ],
        correctAnswer: "The loop has no correct stopping condition",
        explanation: "Repeating forever points to a loop that does not stop at the right time."
      },
      {
        id: "debugging-exam-2",
        mode: "exam",
        type: "short_text",
        prompt: "What do we call the result you wanted before running the program?",
        correctAnswer: "expected result",
        acceptedAnswers: ["expected output", "what you expected"],
        explanation: "The expected result is what you thought the program should do."
      },
      {
        id: "debugging-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which debugging plan is most systematic?",
        choices: [
          "Read the code, pick one likely bug, change one thing, then test",
          "Change every block and hope the program works",
          "Ignore the actual result and start a new project",
          "Run the same broken program without looking at it"
        ],
        correctAnswer: "Read the code, pick one likely bug, change one thing, then test",
        explanation: "A systematic plan uses evidence and checks one change at a time."
      },
      {
        id: "debugging-exam-4",
        mode: "exam",
        type: "numeric",
        prompt: "A program should move 6 steps but moves 4 steps. How many steps are missing?",
        correctAnswer: "2",
        explanation: "The difference is 6 - 4, so 2 steps are missing."
      },
      {
        id: "debugging-exam-5",
        mode: "exam",
        type: "short_text",
        prompt: "Name one kind of bug that can stop an algorithm from working correctly.",
        correctAnswer: "missing step",
        acceptedAnswers: ["wrong value", "wrong order", "missing instruction", "incorrect count"],
        explanation: "Common beginner bugs include missing steps, wrong values, wrong order, and incorrect counts."
      }
    ]
  }
]);
