import { describe, it, expect, vi, beforeEach } from "vitest";
import { Hono } from "hono";
import type { Context, Next } from "hono";
import pieceRouter from "../../src/routes/pieces";
import { createMockEnv } from "../mockEnv";
import type { CustomBindings } from "../../src/types";
import * as auth from "../../src/lib/auth";
import { afterEach } from "vitest";

type AuthResponse =
  | JSONResponse<
      {
        error: string;
        message: string;
      },
      401
    >
  | undefined;

describe("Piece Routes", () => {
  let app: Hono<CustomBindings>;
  let mockEnv: CustomBindings["Bindings"];

  beforeEach(() => {
    mockEnv = createMockEnv();
    app = new Hono<CustomBindings>();

    vi.spyOn(auth, "requireAuth").mockImplementation(() => {
      return async (c: Context<CustomBindings>, next: Next): Promise<AuthResponse> => {
        c.set("auth", { userId: "user-1", sessionId: "session-1" });
        await next();
        return undefined;
      };
    });

    vi.spyOn(auth, "clerkMiddleware").mockImplementation(async (c: Context<CustomBindings>, next: Next) => {
      c.set("auth", { userId: "user-1", sessionId: "session-1" });
      await next();
      return undefined;
    });

    app.route("/", pieceRouter);
  });

  describe("GET /api/pieces", () => {
    it("should return pieces for authenticated user", async () => {
      const mockPieces = [
        {
          id: "1",
          title: "Test Piece",
          artist: "Test Artist",
          objectKey: "test-key",
          userId: "user-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.spyOn(mockEnv.DB, "prepare").mockReturnValue({
        all: () => Promise.resolve(mockPieces),
        get: () => Promise.resolve(mockPieces[0]),
      } as any);

      const req = new Request("http://localhost/api/pieces", {
        headers: {
          Authorization: "Bearer mock-token",
        },
      });
      const res = await app.fetch(req, mockEnv);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual(mockPieces);
    });

    it("should return 401 when not authenticated", async () => {
      vi.spyOn(auth, "requireAuth").mockImplementation(() => {
        return async (c: Context<CustomBindings>, _next: Next): Promise<AuthResponse> => {
          return c.json(
            {
              error: "Unauthorized",
              message: "You must be signed in to access this resource",
            },
            401
          ) as AuthResponse;
        };
      });

      const req = new Request("http://localhost/api/pieces");
      const res = await app.fetch(req, mockEnv);

      expect(res.status).toBe(401);
      const data = await res.json();
      expect(data).toEqual({
        error: "Unauthorized",
        message: "You must be signed in to access this resource",
      });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
