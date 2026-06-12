import type { PhysicsTopicContent } from "./types";

export const soundContent: PhysicsTopicContent = {
  meta: {
    slug: "sound",
    title: "Sound",
    tagline: "Vibrations, waves, pitch, and loudness",
    description:
      "Learn how vibrating objects make sound waves, how sound travels through matter, and how pitch and loudness are related to wave properties.",
    accentColor: "#0ea5e9",
    subtopics: ["Vibrations", "Waves", "Pitch", "Loudness", "Echoes"],
    previewVisualization: "sound"
  },
  learnChapter: {
    number: 9,
    title: "Sound as a Vibration Wave",
    introduction:
      "Sound begins with vibration. When an object vibrates, it disturbs nearby particles and sends a wave through a material such as air, water, or metal.",
    figureCaption:
      "A vibrating speaker compresses and spreads air particles, producing a longitudinal sound wave."
  },
  learnSections: [
    {
      id: "sound-vibrations",
      sectionNumber: "9.1",
      title: "Vibrations make sound",
      visualizationId: "sound-wave",
      paragraphs: [
        "A sound source vibrates back and forth. A guitar string, drum skin, tuning fork, and speaker cone all make sound by vibrating.",
        "The vibration pushes and pulls nearby particles. These particles then push and pull their neighbors, passing the disturbance along as a wave.",
        "Sound needs a medium, which means matter to travel through. It can travel through gases, liquids, and solids, but not through a perfect vacuum."
      ],
      keyTerms: [
        { term: "Vibration", definition: "Repeated back-and-forth motion." },
        { term: "Medium", definition: "Matter through which a wave travels." },
        { term: "Sound wave", definition: "A traveling vibration through matter." }
      ]
    },
    {
      id: "sound-pitch-frequency",
      sectionNumber: "9.2",
      title: "Frequency controls pitch",
      visualizationId: "sound-wave",
      paragraphs: [
        "Frequency tells how many vibrations happen each second. It is measured in hertz, abbreviated Hz.",
        "Higher frequency sounds have higher pitch. Lower frequency sounds have lower pitch. Tightening a guitar string raises its frequency and pitch.",
        "Pitch is not the same as loudness. A quiet whistle can have high pitch, and a loud drum can have low pitch."
      ],
      keyTerms: [
        { term: "Frequency", definition: "The number of vibrations or waves per second." },
        { term: "Hertz", definition: "The unit of frequency, equal to one cycle per second." },
        { term: "Pitch", definition: "How high or low a sound seems." }
      ]
    },
    {
      id: "sound-loudness-echoes",
      sectionNumber: "9.3",
      title: "Amplitude affects loudness",
      visualizationId: "sound-wave",
      paragraphs: [
        "Amplitude describes how large a vibration is. Greater amplitude usually produces a louder sound because more energy is carried by the wave.",
        "Sound can reflect from hard surfaces. A reflected sound heard after a delay is called an echo.",
        "Soft materials can absorb sound energy and reduce echoes. That is why curtains, carpets, and foam can make a room sound less echoing."
      ],
      keyTerms: [
        { term: "Amplitude", definition: "The size of a vibration or wave disturbance." },
        { term: "Loudness", definition: "How strong a sound seems to a listener." },
        { term: "Echo", definition: "A reflected sound heard after a delay." }
      ]
    }
  ],
  practiceQuestions: [
    {
      id: "sound-pr-1",
      type: "multiple_choice",
      prompt: "What must a sound source do to make sound?",
      choices: ["Vibrate", "Become magnetic", "Stop all motion", "Turn transparent"],
      correctAnswer: "Vibrate",
      hint: "Think about a guitar string or drum skin.",
      explanation: "Sound begins when an object vibrates."
    },
    {
      id: "sound-pr-2",
      type: "multiple_choice",
      prompt: "What does frequency mainly affect in a sound?",
      choices: ["Pitch", "Color", "Mass", "Temperature only"],
      correctAnswer: "Pitch",
      hint: "High frequency means a high sound.",
      explanation: "Higher frequency produces higher pitch; lower frequency produces lower pitch."
    },
    {
      id: "sound-pr-3",
      type: "short_text",
      prompt: "What word describes matter that a sound wave travels through?",
      correctAnswer: "medium",
      hint: "Air can be one.",
      explanation: "A medium is the matter through which a wave travels."
    },
    {
      id: "sound-pr-4",
      type: "multiple_choice",
      prompt: "Greater amplitude usually makes a sound seem what?",
      choices: ["Louder", "Lower pitched only", "Invisible", "Unable to reflect"],
      correctAnswer: "Louder",
      hint: "Amplitude is related to wave energy.",
      explanation: "Greater amplitude usually means more energy and greater loudness."
    }
  ],
  examQuestions: [
    {
      id: "sound-ex-1",
      type: "multiple_choice",
      prompt: "Why can sound not travel through a perfect vacuum?",
      choices: ["There are no particles to pass on the vibration", "The sound becomes too colorful", "Frequency becomes zero in all materials", "Vacuum blocks only light"],
      correctAnswer: "There are no particles to pass on the vibration",
      explanation: "Sound is a mechanical wave and needs matter to transmit particle vibrations."
    },
    {
      id: "sound-ex-2",
      type: "numeric",
      prompt: "A tuning fork vibrates 256 times each second. What is its frequency in hertz?",
      correctAnswer: "256",
      explanation: "Frequency is the number of vibrations per second, so the frequency is 256 Hz."
    },
    {
      id: "sound-ex-3",
      type: "multiple_choice",
      prompt: "A string is tightened and then plucked. Its frequency increases. What happens to pitch?",
      choices: ["Pitch increases", "Pitch decreases", "Pitch disappears", "Loudness must become zero"],
      correctAnswer: "Pitch increases",
      explanation: "Higher frequency corresponds to higher pitch."
    },
    {
      id: "sound-ex-4",
      type: "short_text",
      prompt: "What is a reflected sound heard after a delay called?",
      correctAnswer: "echo",
      explanation: "An echo is reflected sound that arrives after a noticeable delay."
    },
    {
      id: "sound-ex-5",
      type: "multiple_choice",
      prompt: "Which change most directly makes a sound wave carry more energy?",
      choices: ["Increasing amplitude", "Changing the label on the speaker", "Removing all particles", "Making the room darker"],
      correctAnswer: "Increasing amplitude",
      explanation: "Larger amplitude means a stronger vibration and more wave energy."
    }
  ]
};
