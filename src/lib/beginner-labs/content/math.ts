import { defineBeginnerLabTopics } from "../helpers";

export const mathBeginnerLabTopics = defineBeginnerLabTopics([
  {
    meta: {
      subjectId: "math",
      slug: "fractions",
      title: "Fractions",
      tagline: "Name equal parts of one whole.",
      description:
        "Learn how fractions show equal parts of a whole, what the numerator and denominator mean, and why uneven pieces do not make fair fractions.",
      accentColor: "#f97316",
      subtopics: ["Equal parts", "Numerator", "Denominator", "Halves", "Thirds", "Quarters"],
      previewVisualizationId: "math:fractions"
    },
    learnChapter: {
      number: 1,
      title: "Fractions Show Equal Parts",
      introduction:
        "A fraction names part of a whole. The whole might be one pizza, one bar, one shape, or one group. The key idea is fairness: the parts must be equal in size before a fraction name makes sense.",
      figureCaption:
        "A circle and a strip are split into equal pieces, with selected parts shaded to show the fraction."
    },
    learnSections: [
      {
        id: "fractions-equal-parts",
        sectionNumber: "1.1",
        title: "The parts must be equal",
        paragraphs: [
          "A fraction tells how many equal parts of a whole are being used. If a rectangle is split into four equal pieces and one piece is shaded, the shaded part is one quarter of the rectangle.",
          "Equal parts do not have to face the same direction, but they do need to be the same size. Two pieces that only look similar are not enough. A small slice and a large slice cannot both be called one half of the same whole.",
          "A common beginner mistake is counting any pieces as fractions. If the pieces are uneven, the fraction name is not fair because each part does not represent the same amount."
        ],
        keyTerms: [
          {
            term: "fraction",
            definition: "A number that names equal parts of a whole or equal parts of a group."
          },
          {
            term: "whole",
            definition: "The complete object, shape, or group being split or counted."
          },
          {
            term: "equal parts",
            definition: "Parts that are the same size, so each part has the same share of the whole."
          }
        ],
        visualizationId: "math:fractions"
      },
      {
        id: "fractions-numerator-denominator",
        sectionNumber: "1.2",
        title: "Top number and bottom number",
        paragraphs: [
          "A written fraction has two numbers. The denominator is the bottom number. It tells how many equal parts make the whole. In 3/4, the denominator is 4, so the whole has been split into four equal parts.",
          "The numerator is the top number. It tells how many of those equal parts are chosen, shaded, eaten, or counted. In 3/4, the numerator is 3, so three of the four equal parts are being used.",
          "Do not read the denominator as the answer by itself. Four parts in the whole and three parts chosen are different pieces of information. A strong fraction answer uses both numbers."
        ],
        keyTerms: [
          {
            term: "numerator",
            definition: "The top number in a fraction, showing how many equal parts are chosen."
          },
          {
            term: "denominator",
            definition: "The bottom number in a fraction, showing how many equal parts make the whole."
          }
        ]
      },
      {
        id: "fractions-common-names",
        sectionNumber: "1.3",
        title: "Halves, thirds, and quarters",
        paragraphs: [
          "Some fractions have names you will hear often. One out of two equal parts is one half. One out of three equal parts is one third. One out of four equal parts is one quarter, also called one fourth.",
          "The size of a fraction depends on the whole. Half of a large pizza is bigger than half of a small cookie, even though both are called one half. Always ask what the whole is before comparing amounts.",
          "When you compare simple fractions, pictures help. Make sure the wholes are the same size, then compare how much is shaded. Without the same whole, the comparison can trick you."
        ],
        keyTerms: [
          {
            term: "half",
            definition: "One of two equal parts of a whole."
          },
          {
            term: "third",
            definition: "One of three equal parts of a whole."
          },
          {
            term: "quarter",
            definition: "One of four equal parts of a whole."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "math:fractions",
        title: "Equal Parts Fraction Builder",
        description:
          "Learners split circles and bars into equal parts, shade selected pieces, and connect the picture to a fraction name.",
        interactionSummary:
          "Choose the number of equal parts, shade pieces, then check how the numerator and denominator describe the model.",
        focusPoints: ["equal parts", "whole", "numerator", "denominator", "fraction name"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "fractions-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "A shape is split into 4 equal parts. 1 part is shaded. What fraction is shaded?",
        choices: ["1/4", "4/1", "3/4", "1/3"],
        correctAnswer: "1/4",
        hint: "The bottom number tells how many equal parts make the whole.",
        explanation: "There are 4 equal parts in the whole and 1 is shaded, so the fraction is 1/4."
      },
      {
        id: "fractions-practice-2",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which shape can correctly show one half?",
        choices: [
          "A rectangle split into two equal parts with one shaded",
          "A circle split into one small part and one large part with one shaded",
          "A square split into three equal parts with one shaded",
          "A bar split into four equal parts with one shaded"
        ],
        correctAnswer: "A rectangle split into two equal parts with one shaded",
        hint: "One half means one of two equal parts.",
        explanation: "A half must be one part out of two equal parts. Uneven parts cannot show one half fairly."
      },
      {
        id: "fractions-practice-3",
        mode: "practice",
        type: "short_text",
        prompt: "In the fraction 2/3, what is the bottom number called?",
        correctAnswer: "denominator",
        acceptedAnswers: ["the denominator"],
        hint: "It tells how many equal parts make the whole.",
        explanation: "The bottom number is the denominator. In 2/3, it shows that the whole has 3 equal parts."
      },
      {
        id: "fractions-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "A pizza is cut into 8 equal slices. Sam eats 3 slices. Which fraction names what Sam eats?",
        choices: ["3/8", "8/3", "5/8", "3/5"],
        correctAnswer: "3/8",
        hint: "Use eaten slices on top and total equal slices on bottom.",
        explanation: "Sam eats 3 of the 8 equal slices, so he eats 3/8 of the pizza."
      }
    ],
    examQuestions: [
      {
        id: "fractions-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A student shades one of three pieces and calls it 1/3, but the pieces are different sizes. What is the best correction?",
        choices: [
          "The pieces must be equal before each piece can be one third",
          "Any three pieces always make thirds",
          "The largest piece should always be the numerator",
          "The fraction should be 3/1 because there are three pieces"
        ],
        correctAnswer: "The pieces must be equal before each piece can be one third",
        explanation: "Fractions name equal parts. Uneven pieces cannot each be called one third of the same whole."
      },
      {
        id: "fractions-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which statement correctly explains 5/6?",
        choices: [
          "The whole has 6 equal parts, and 5 parts are chosen",
          "The whole has 5 equal parts, and 6 parts are chosen",
          "There are 11 unequal parts",
          "Only the top number matters"
        ],
        correctAnswer: "The whole has 6 equal parts, and 5 parts are chosen",
        explanation: "The denominator 6 gives the number of equal parts in the whole. The numerator 5 gives the chosen parts."
      },
      {
        id: "fractions-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Two bars are the same size. One shows 1/2 shaded and one shows 1/4 shaded. Which is greater?",
        choices: ["1/2", "1/4", "They are equal", "It cannot be known because 4 is bigger than 2"],
        correctAnswer: "1/2",
        explanation: "With the same size whole, one half covers more of the bar than one quarter."
      },
      {
        id: "fractions-exam-4",
        mode: "exam",
        type: "short_text",
        prompt: "What name means one of four equal parts of a whole?",
        correctAnswer: "quarter",
        acceptedAnswers: ["one quarter", "fourth", "one fourth"],
        explanation: "One of four equal parts is called a quarter or a fourth."
      },
      {
        id: "fractions-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Why can half of a large cake be bigger than half of a small cake?",
        choices: [
          "The whole is different in each case",
          "Half never means equal parts",
          "The denominator changes from 2 to 4",
          "A small cake cannot be split into halves"
        ],
        correctAnswer: "The whole is different in each case",
        explanation: "A fraction depends on its whole. Half of a larger whole is a larger amount."
      }
    ]
  },
  {
    meta: {
      subjectId: "math",
      slug: "percentages",
      title: "Percentages",
      tagline: "Think out of 100.",
      description:
        "Learn that percent means out of 100, use 100-grid pictures to read percentages, and connect percentages to scores, progress, and simple discounts.",
      accentColor: "#0ea5e9",
      subtopics: ["Out of 100", "100 grids", "Scores", "Progress bars", "Simple discounts"],
      previewVisualizationId: "math:percentages"
    },
    learnChapter: {
      number: 2,
      title: "Percent Means Out of 100",
      introduction:
        "A percentage is a way to compare part of a whole using 100 as the whole. Percentages are useful because they put different situations on the same scale.",
      figureCaption:
        "A 100-square grid shows shaded squares as a percentage of the whole grid."
    },
    learnSections: [
      {
        id: "percentages-out-of-100",
        sectionNumber: "2.1",
        title: "Percent uses 100 as the whole",
        paragraphs: [
          "Percent means out of 100. The symbol % is a short way to write percent. If 37 out of 100 squares are shaded, then 37% of the grid is shaded.",
          "This does not mean every real group must contain exactly 100 things. It means we are comparing the part to a whole as if the whole were 100 equal parts. That makes different wholes easier to compare.",
          "A common mistake is treating percent as just a number without a whole. Saying 50% only makes sense when you know 50% of what. The whole gives the percentage its meaning."
        ],
        keyTerms: [
          {
            term: "percent",
            definition: "A way to name a part of a whole using 100 as the whole."
          },
          {
            term: "percentage",
            definition: "A number written as a percent, such as 25% or 80%."
          },
          {
            term: "whole",
            definition: "The full amount or full group that the percent is based on."
          }
        ],
        visualizationId: "math:percentages"
      },
      {
        id: "percentages-grid-models",
        sectionNumber: "2.2",
        title: "Use a 100-grid picture",
        paragraphs: [
          "A 100-grid has 100 equal small squares. Each small square is 1% of the grid. Ten full squares in a row are 10%, and half of the grid is 50%.",
          "The grid helps you see that 25% is 25 out of 100, which is the same as one quarter of the grid. It also helps with 75%, because three quarters of the grid are shaded.",
          "When using a picture, count the shaded part and the whole. If the whole grid changes or only part of the grid is shown, the percentage can change too."
        ],
        keyTerms: [
          {
            term: "100-grid",
            definition: "A square model split into 100 equal small squares."
          },
          {
            term: "shaded part",
            definition: "The part of a model being counted or described by the percentage."
          }
        ]
      },
      {
        id: "percentages-everyday-uses",
        sectionNumber: "2.3",
        title: "Percentages in scores and shopping",
        paragraphs: [
          "Percentages appear in test scores, battery levels, progress bars, sports records, and shop discounts. A score of 80% means 80 out of 100 of the score was earned, not always 80 marks exactly.",
          "A discount percentage tells what part of the original price is taken away. A 25% discount removes 25 out of every 100 parts of the price. The final price is what remains after the discount is subtracted.",
          "Do not confuse the discount with the final price. If a shirt is 20% off, the discount is 20% of the original price. The buyer still pays the remaining 80% before any other costs."
        ],
        keyTerms: [
          {
            term: "discount",
            definition: "An amount taken away from the original price."
          },
          {
            term: "original price",
            definition: "The price before a discount is subtracted."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "math:percentages",
        title: "100-Grid Percentage Model",
        description:
          "Learners shade a 100-square grid and connect the shaded squares to percentages, common fractions, and simple everyday examples.",
        interactionSummary:
          "Adjust the shaded squares from 0 to 100, then compare the grid with a percent label, progress bar, score, or discount story.",
        focusPoints: ["out of 100", "whole", "shaded squares", "common percentages", "discount vs final price"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "percentages-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "What does 40% mean?",
        choices: ["40 out of 100", "100 out of 40", "40 more than 100", "4 out of 1000"],
        correctAnswer: "40 out of 100",
        hint: "Percent means out of 100.",
        explanation: "40% means 40 out of 100 equal parts of the whole."
      },
      {
        id: "percentages-practice-2",
        mode: "practice",
        type: "numeric",
        prompt: "On a 100-grid, 25 squares are shaded. What percentage is shaded?",
        correctAnswer: "25",
        unit: "%",
        hint: "Each square in a 100-grid is 1%.",
        explanation: "25 shaded squares out of 100 squares means 25%."
      },
      {
        id: "percentages-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "A progress bar says 75%. Which statement is correct?",
        choices: [
          "75 out of 100 parts are complete",
          "75 parts are still missing every time",
          "The whole must contain exactly 75 objects",
          "Only 25 out of 100 parts are complete"
        ],
        correctAnswer: "75 out of 100 parts are complete",
        hint: "Read the percent as a part compared with 100.",
        explanation: "75% means 75 out of 100 parts of the whole progress are complete."
      },
      {
        id: "percentages-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "A $100 jacket has a 20% discount. What amount is taken off?",
        choices: ["$20", "$80", "$120", "$5"],
        correctAnswer: "$20",
        hint: "20% of 100 dollars is 20 dollars.",
        explanation: "A 20% discount on $100 takes away $20. The remaining price is $80 before any other costs."
      }
    ],
    examQuestions: [
      {
        id: "percentages-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A student says 60% means there are always exactly 60 objects. What is the best correction?",
        choices: [
          "60% means 60 out of 100 parts of the whole, not always 60 objects",
          "60% means 100 out of 60 objects",
          "60% has no connection to a whole",
          "60% always means 60 objects are missing"
        ],
        correctAnswer: "60% means 60 out of 100 parts of the whole, not always 60 objects",
        explanation: "Percent uses 100 as a comparison scale. The actual whole can be different from 100 objects."
      },
      {
        id: "percentages-exam-2",
        mode: "exam",
        type: "numeric",
        prompt: "A 100-grid has 68 squares shaded. What percentage is unshaded?",
        correctAnswer: "32",
        unit: "%",
        explanation: "If 68 of 100 squares are shaded, 32 of 100 are unshaded, so 32% is unshaded."
      },
      {
        id: "percentages-exam-3",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which comparison is fairer for two quizzes with different numbers of questions?",
        choices: [
          "Compare the percentages correct",
          "Compare only the number of wrong answers",
          "Choose the quiz with more questions every time",
          "Ignore the whole for each quiz"
        ],
        correctAnswer: "Compare the percentages correct",
        explanation: "Percentages help compare different wholes by using the same out-of-100 scale."
      },
      {
        id: "percentages-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A game is 30% complete. What percentage is not complete?",
        choices: ["70%", "30%", "100%", "130%"],
        correctAnswer: "70%",
        explanation: "The whole is 100%. If 30% is complete, 100% minus 30% leaves 70% not complete."
      },
      {
        id: "percentages-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A bag has 200 beads. 50% are blue. Which statement must be true?",
        choices: [
          "Half of the beads are blue",
          "Exactly 50 beads are blue",
          "All 200 beads are blue",
          "The percent cannot be used because there are not 100 beads"
        ],
        correctAnswer: "Half of the beads are blue",
        explanation: "50% means half of the whole. Since the whole is 200 beads, half are blue."
      }
    ]
  },
  {
    meta: {
      subjectId: "math",
      slug: "geometry-basics",
      title: "Geometry Basics",
      tagline: "Sort shapes by their features.",
      description:
        "Learn how geometry describes shape and space, how 2D shapes differ from 3D solids, and how sides, faces, edges, angles, and units help identify figures.",
      accentColor: "#7c3aed",
      subtopics: ["2D shapes", "3D solids", "Sides", "Faces", "Angles", "Units"],
      previewVisualizationId: "math:geometry-basics"
    },
    learnChapter: {
      number: 3,
      title: "Shapes Have Properties",
      introduction:
        "Geometry is the study of shapes and space. Instead of naming a shape by a guess, you can look at its properties, such as sides, angles, faces, edges, and whether it is flat or solid.",
      figureCaption:
        "Flat shapes are sorted on one side and solid shapes on the other, with labels for sides, faces, edges, and angles."
    },
    learnSections: [
      {
        id: "geometry-2d-and-3d",
        sectionNumber: "3.1",
        title: "Flat shapes and solid shapes",
        paragraphs: [
          "A 2D shape is flat. It has length and width, but no thickness that you can hold. Squares, rectangles, triangles, and circles are common 2D shapes in beginner geometry.",
          "A 3D shape is solid. It has length, width, and height or depth. Cubes, spheres, cones, cylinders, and rectangular prisms are common 3D shapes. You can think of 3D shapes as objects that take up space.",
          "A common mistake is mixing up a flat drawing with the solid it represents. A circle is 2D, while a sphere is 3D. A square is 2D, while a cube is 3D."
        ],
        keyTerms: [
          {
            term: "2D shape",
            definition: "A flat shape with length and width."
          },
          {
            term: "3D shape",
            definition: "A solid shape with length, width, and height or depth."
          },
          {
            term: "solid",
            definition: "A 3D object that takes up space."
          }
        ],
        visualizationId: "math:geometry-basics"
      },
      {
        id: "geometry-properties",
        sectionNumber: "3.2",
        title: "Use properties to name shapes",
        paragraphs: [
          "A property is a feature that helps describe a shape. A triangle has 3 sides. A square has 4 equal sides and 4 square corners. A rectangle has 4 sides and 4 square corners, but all 4 sides do not have to be equal.",
          "For 3D shapes, you can look for faces, edges, and vertices. A cube has 6 square faces. An edge is where two faces meet, and a vertex is a corner point.",
          "Properties matter more than the way a shape is turned. A square is still a square if it is rotated. Do not rename it just because it looks like a diamond on the page."
        ],
        keyTerms: [
          {
            term: "property",
            definition: "A feature of a shape, such as number of sides, faces, corners, or angles."
          },
          {
            term: "face",
            definition: "A flat surface on a 3D shape."
          },
          {
            term: "edge",
            definition: "A line segment where two faces of a 3D shape meet."
          },
          {
            term: "vertex",
            definition: "A corner point where sides or edges meet."
          }
        ]
      },
      {
        id: "geometry-angles-and-units",
        sectionNumber: "3.3",
        title: "Angles and units help describe space",
        paragraphs: [
          "An angle is made when two lines or sides meet. A square corner is called a right angle. Triangles and rectangles can be described by their sides and their angles.",
          "Geometry also uses units. Length might be measured in centimeters or meters. Area uses square units, such as square centimeters, because it covers a flat surface. Volume uses cubic units, such as cubic centimeters, because it fills 3D space.",
          "Do not mix units for different properties. Sides are lengths, faces have areas, and solids can have volume. Choosing the right unit helps the answer match the property being measured."
        ],
        keyTerms: [
          {
            term: "angle",
            definition: "The space formed where two lines or sides meet."
          },
          {
            term: "right angle",
            definition: "A square corner angle, like the corner of a rectangle."
          },
          {
            term: "area",
            definition: "The amount of flat surface a 2D shape covers, measured in square units."
          },
          {
            term: "volume",
            definition: "The amount of space inside a 3D shape, measured in cubic units."
          }
        ]
      }
    ],
    visualizations: [
      {
        id: "math:geometry-basics",
        title: "2D and 3D Shape Sorter",
        description:
          "Learners sort flat and solid shapes, rotate examples, and inspect sides, faces, edges, vertices, angles, and matching units.",
        interactionSummary:
          "Drag each shape into 2D or 3D, tap its properties, then choose the unit that matches length, area, or volume.",
        focusPoints: ["2D vs 3D", "sides", "faces", "edges", "angles", "units"]
      }
    ],
    defaultAnswerMode: "computer",
    practiceQuestions: [
      {
        id: "geometry-practice-1",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which shape is 3D?",
        choices: ["Cube", "Circle", "Triangle", "Square"],
        correctAnswer: "Cube",
        hint: "A 3D shape is solid and takes up space.",
        explanation: "A cube is a solid 3D shape. Circles, triangles, and squares are flat 2D shapes."
      },
      {
        id: "geometry-practice-2",
        mode: "practice",
        type: "numeric",
        prompt: "How many sides does a triangle have?",
        correctAnswer: "3",
        hint: "Tri means three.",
        explanation: "A triangle has 3 sides and 3 vertices."
      },
      {
        id: "geometry-practice-3",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which pair correctly matches a shape with a property?",
        choices: [
          "Cube, 6 square faces",
          "Circle, 4 straight sides",
          "Triangle, 6 faces",
          "Sphere, 3 straight sides"
        ],
        correctAnswer: "Cube, 6 square faces",
        hint: "Think about the flat surfaces of a cube.",
        explanation: "A cube has 6 square faces. The other choices mix up flat and solid shape properties."
      },
      {
        id: "geometry-practice-4",
        mode: "practice",
        type: "multiple_choice",
        prompt: "Which unit is best for measuring the length of a pencil?",
        choices: ["centimeters", "square centimeters", "cubic centimeters", "degrees"],
        correctAnswer: "centimeters",
        hint: "Length uses ordinary distance units, not square or cubic units.",
        explanation: "Centimeters measure length. Square centimeters measure area, and cubic centimeters measure volume."
      }
    ],
    examQuestions: [
      {
        id: "geometry-exam-1",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A student says a sphere is a circle because both are round. What is the best correction?",
        choices: [
          "A circle is flat 2D, while a sphere is solid 3D",
          "A sphere has four straight sides",
          "A circle is always 3D",
          "A sphere and a circle are both measured only by area"
        ],
        correctAnswer: "A circle is flat 2D, while a sphere is solid 3D",
        explanation: "The key difference is dimension. A circle is flat, and a sphere is a solid that takes up space."
      },
      {
        id: "geometry-exam-2",
        mode: "exam",
        type: "multiple_choice",
        prompt: "A square is turned so it looks like a diamond. Which statement is true?",
        choices: [
          "It is still a square because its side and angle properties did not change",
          "It becomes a triangle because it was turned",
          "It becomes a circle because it has no top side",
          "It is no longer a 2D shape"
        ],
        correctAnswer: "It is still a square because its side and angle properties did not change",
        explanation: "Turning a shape does not change its properties. The square still has 4 equal sides and 4 right angles."
      },
      {
        id: "geometry-exam-3",
        mode: "exam",
        type: "short_text",
        prompt: "What do we call a flat surface on a 3D shape?",
        correctAnswer: "face",
        acceptedAnswers: ["a face"],
        explanation: "A face is a flat surface on a 3D shape, such as one square side of a cube."
      },
      {
        id: "geometry-exam-4",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which property and unit match correctly?",
        choices: [
          "Area, square centimeters",
          "Length, cubic centimeters",
          "Volume, centimeters",
          "Angle, square meters"
        ],
        correctAnswer: "Area, square centimeters",
        explanation: "Area measures flat surface and uses square units. Length uses distance units, and volume uses cubic units."
      },
      {
        id: "geometry-exam-5",
        mode: "exam",
        type: "multiple_choice",
        prompt: "Which description best identifies a rectangle?",
        choices: [
          "A 2D shape with 4 sides and 4 right angles",
          "A 3D shape with 6 square faces",
          "A 2D shape with exactly 3 sides",
          "A solid shape with one curved surface and one point"
        ],
        correctAnswer: "A 2D shape with 4 sides and 4 right angles",
        explanation: "A rectangle is a flat shape with 4 sides and 4 right angles."
      }
    ]
  }
]);
