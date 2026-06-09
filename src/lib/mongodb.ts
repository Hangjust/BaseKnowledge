import "server-only";

import { MongoClient, type Db } from "mongodb";
import { env } from "./env";

let clientPromise: Promise<MongoClient> | null = null;

export function getMongoClient() {
  if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!clientPromise) {
    const client = new MongoClient(env.MONGODB_URI);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(env.MONGODB_DB);
}
