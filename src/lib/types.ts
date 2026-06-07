export const difficultyLevels = ["Basic", "Intermediate", "Advanced"] as const;

export type Difficulty = (typeof difficultyLevels)[number];

export type SubjectId = "biology" | "english" | "physics" | "chemistry" | "economics";

export type Subject = {
  id: SubjectId;
  name: string;
  description: string;
  accent: string;
  topicIds: string[];
};

export type LessonSection = {
  heading: string;
  body: string;
};

export type ExampleProblem = {
  prompt: string;
  solution: string;
};

export type Lesson = {
  id: string;
  title: string;
  difficulty: Difficulty;
  summary: string;
  sections: LessonSection[];
  diagram?: {
    title: string;
    description: string;
    imageUrl?: string;
  };
  examples: ExampleProblem[];
  videoUrl?: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
  explanation: string;
  difficulty: Difficulty;
};

export type Topic = {
  id: string;
  subjectId: SubjectId;
  slug: string;
  title: string;
  description: string;
  subtopics: string[];
  lessons: Lesson[];
  questions: QuizQuestion[];
  isPublished: boolean;
  updatedAt: string;
};

export type PublicTopicSummary = Pick<
  Topic,
  "id" | "subjectId" | "slug" | "title" | "description" | "subtopics" | "isPublished" | "updatedAt"
>;

export type AssistantMode = "explain" | "practice" | "quiz" | "qa";

export type AssistantRequest = {
  subjectId: SubjectId;
  topicSlug?: string;
  difficulty: Difficulty;
  mode: AssistantMode;
  question?: string;
};

export type AssistantResponse = {
  answer: string;
  mode: AssistantMode;
};
