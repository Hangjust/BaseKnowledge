import { Collection, MongoServerError } from "mongodb";
import { seedTopics } from "./seed-data";
import { getDb } from "./mongodb";
import { getSubject, getSubjects } from "./subjects";
import type { Difficulty, PublicTopicSummary, SubjectId, Topic } from "./types";
import { hasMongoConfig } from "./env";

export { getSubject, getSubjects };

const memoryTopics = new Map<string, Topic>(seedTopics.map((topic) => [topic.id, structuredClone(topic)]));

type TopicDocument = Topic & { _id?: string };

export class ContentWriteUnavailableError extends Error {
  constructor() {
    super("MONGODB_URI is required for persistent admin content changes.");
    this.name = "ContentWriteUnavailableError";
  }
}

export class DuplicateTopicError extends Error {
  constructor() {
    super("A topic with this subject and slug already exists.");
    this.name = "DuplicateTopicError";
  }
}

let topicIndexesPromise: Promise<void> | null = null;

function topicCollection(): Promise<Collection<TopicDocument>> {
  return getDb().then((db) => db.collection<TopicDocument>("topics"));
}

async function ensureTopicIndexes(collection: Collection<TopicDocument>) {
  if (!topicIndexesPromise) {
    topicIndexesPromise = Promise.all([
      collection.createIndex({ id: 1 }, { unique: true }),
      collection.createIndex({ subjectId: 1, slug: 1 }, { unique: true }),
      collection.createIndex({ subjectId: 1, isPublished: 1 })
    ]).then(() => undefined);
  }

  await topicIndexesPromise;
}

async function ensureSeeded(collection: Collection<TopicDocument>) {
  const count = await collection.countDocuments();

  if (count > 0) {
    return;
  }

  try {
    await collection.insertMany(seedTopics.map((topic) => ({ ...topic, _id: topic.id })));
  } catch (caught) {
    if (!(caught instanceof MongoServerError) || caught.code !== 11000) {
      throw caught;
    }
  }
}

async function preparedTopicCollection() {
  const collection = await topicCollection();
  await ensureTopicIndexes(collection);
  await ensureSeeded(collection);
  return collection;
}

function requirePersistentContentStore() {
  if (!hasMongoConfig()) {
    throw new ContentWriteUnavailableError();
  }
}

function isDuplicateKeyError(caught: unknown) {
  return caught instanceof MongoServerError && caught.code === 11000;
}

function stripMongoId(topic: TopicDocument): Topic {
  const { _id: _unused, ...rest } = topic;
  return rest;
}

function publicTopic(topic: Topic): PublicTopicSummary {
  return {
    id: topic.id,
    subjectId: topic.subjectId,
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    subtopics: topic.subtopics,
    isPublished: topic.isPublished,
    updatedAt: topic.updatedAt
  };
}

function sortTopics(a: Topic, b: Topic) {
  return a.title.localeCompare(b.title);
}

export async function getTopics(): Promise<Topic[]> {
  if (!hasMongoConfig()) {
    return [...memoryTopics.values()].sort(sortTopics);
  }

  const collection = await preparedTopicCollection();
  const topics = await collection.find().sort({ title: 1 }).toArray();
  return topics.map(stripMongoId);
}

export async function getPublishedTopicsBySubject(subjectId: SubjectId): Promise<PublicTopicSummary[]> {
  const topics = await getTopics();
  return topics
    .filter((topic) => topic.subjectId === subjectId && topic.isPublished)
    .sort(sortTopics)
    .map(publicTopic);
}

export async function getTopic(subjectId: SubjectId, slug: string): Promise<Topic | null> {
  if (!hasMongoConfig()) {
    const topic = [...memoryTopics.values()].find(
      (candidate) => candidate.subjectId === subjectId && candidate.slug === slug
    );
    return topic ? structuredClone(topic) : null;
  }

  const collection = await preparedTopicCollection();
  const topic = await collection.findOne({ subjectId, slug });
  return topic ? stripMongoId(topic) : null;
}

export async function getTopicById(id: string): Promise<Topic | null> {
  if (!hasMongoConfig()) {
    const topic = memoryTopics.get(id);
    return topic ? structuredClone(topic) : null;
  }

  const collection = await preparedTopicCollection();
  const topic = await collection.findOne({ id });
  return topic ? stripMongoId(topic) : null;
}

export async function upsertTopic(topic: Topic): Promise<Topic> {
  requirePersistentContentStore();

  const nextTopic = {
    ...topic,
    updatedAt: new Date().toISOString()
  };

  const collection = await preparedTopicCollection();
  const conflict = await collection.findOne({
    subjectId: nextTopic.subjectId,
    slug: nextTopic.slug,
    id: { $ne: nextTopic.id }
  });

  if (conflict) {
    throw new DuplicateTopicError();
  }

  try {
    await collection.updateOne(
      { id: nextTopic.id },
      { $set: nextTopic, $setOnInsert: { _id: nextTopic.id } },
      { upsert: true }
    );
  } catch (caught) {
    if (isDuplicateKeyError(caught)) {
      throw new DuplicateTopicError();
    }

    throw caught;
  }

  return nextTopic;
}

export async function createTopic(input: {
  subjectId: SubjectId;
  title: string;
  slug: string;
  description: string;
  subtopics: string[];
  isPublished: boolean;
}): Promise<Topic> {
  requirePersistentContentStore();

  const id = `${input.subjectId}-${input.slug}`;
  const collection = await preparedTopicCollection();
  const existingTopic = await collection.findOne({
    $or: [{ id }, { subjectId: input.subjectId, slug: input.slug }]
  });

  if (existingTopic) {
    throw new DuplicateTopicError();
  }

  const topic: Topic = {
    id,
    subjectId: input.subjectId,
    slug: input.slug,
    title: input.title,
    description: input.description,
    subtopics: input.subtopics,
    lessons: [],
    questions: [],
    isPublished: input.isPublished,
    updatedAt: new Date().toISOString()
  };

  return upsertTopic(topic);
}

export async function deleteTopic(id: string): Promise<void> {
  requirePersistentContentStore();

  const collection = await preparedTopicCollection();
  await collection.deleteOne({ id });
}

export function getLessonForDifficulty(topic: Topic, difficulty: Difficulty) {
  return topic.lessons.find((lesson) => lesson.difficulty === difficulty) ?? topic.lessons[0] ?? null;
}

export function getQuestionsForDifficulty(topic: Topic, difficulty: Difficulty) {
  return topic.questions.filter((question) => question.difficulty === difficulty);
}
