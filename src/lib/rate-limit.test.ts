import { describe, expect, it } from "vitest";
import { checkRateLimit } from "./rate-limit";

describe("checkRateLimit", () => {
  it.skipIf(Boolean(process.env.MONGODB_URI))("limits repeated local requests without MongoDB", async () => {
    const key = `test:${Date.now()}:${Math.random()}`;

    await expect(checkRateLimit(key, 2, 60_000)).resolves.toMatchObject({ allowed: true, remaining: 1 });
    await expect(checkRateLimit(key, 2, 60_000)).resolves.toMatchObject({ allowed: true, remaining: 0 });
    await expect(checkRateLimit(key, 2, 60_000)).resolves.toMatchObject({ allowed: false, remaining: 0 });
  });
});
