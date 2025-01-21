import { type Env } from ".././src/types";
import { type R2Bucket, type D1Database } from "@cloudflare/workers-types";
import { vi } from "vitest";

export function createMockEnv(): Env {
  return {
    BUCKET: {
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    } as unknown as R2Bucket,
    R2_PUBLIC_URL: "http://test-r2.com",
    DB: {
      prepare: vi.fn(),
      batch: vi.fn(),
      exec: vi.fn(),
    } as unknown as D1Database,
    CLERK_SECRET_KEY: "test-clerk-secret",
    CLERK_PUBLISHABLE_KEY: "test-clerk-publishable",
    CLERK_PEM_PUBLIC_KEY: "test-pem-public",
    CLIENT_URL: "http://localhost:3001",
    API_URL: "http://localhost:8787",
  };
}
