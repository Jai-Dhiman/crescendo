import { Hono } from "hono";
import { practiceSessions as practiceSessionTable } from "@/db/schema";
import { createDb } from "@/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "@/lib/auth";
import type { CustomBindings } from "@/types";

const practiceSessionRouter = new Hono<CustomBindings>();

practiceSessionRouter.get("/api/practiceSession", requireAuth(), async (c) => {
  try {
    const auth = c.get("auth");
    const db = createDb(c.env.DB);
    const sessions = await db
      .select()
      .from(practiceSessionTable)
      .where(eq(practiceSessionTable.userId, auth.userId))
      .all();
    return c.json(sessions);
  } catch (error) {
    console.error("Error fetching practice sessions:", error);
    return c.json({ error: "Failed to fetch practice sessions" }, 500);
  }
});

practiceSessionRouter.get("/api/practiceSession/piece/:id", requireAuth(), async (c) => {
  try {
    const pieceId = c.req.param("id");
    const auth = c.get("auth");
    const db = createDb(c.env.DB);
    const sessions = await db
      .select()
      .from(practiceSessionTable)
      .where(and(eq(practiceSessionTable.pieceId, pieceId), eq(practiceSessionTable.userId, auth.userId)))
      .all();
    return c.json(sessions);
  } catch (error) {
    console.error("Error fetching practice sessions:", error);
    return c.json({ error: "Failed to fetch practice sessions" }, 500);
  }
});

practiceSessionRouter.get("/api/practiceSession/:id", requireAuth(), async (c) => {
  try {
    const id = c.req.param("id");
    const auth = c.get("auth");
    const db = createDb(c.env.DB);
    const session = await db.select().from(practiceSessionTable).where(eq(practiceSessionTable.id, id)).get();

    if (!session) {
      return c.json({ error: "Practice session not found" }, 404);
    }

    if (session.userId !== auth.userId) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    return c.json(session);
  } catch (error) {
    console.error("Error fetching practice session:", error);
    return c.json({ error: "Failed to fetch practice session" }, 500);
  }
});

practiceSessionRouter.post("/api/practiceSession", requireAuth(), async (c) => {
  try {
    const auth = c.get("auth");
    const data = await c.req.json();
    const { duration, notes, pieceId } = data;

    if (!duration || !pieceId) {
      return c.json({ error: "Duration and pieceId are required" }, 400);
    }

    const db = createDb(c.env.DB);
    const session = await db
      .insert(practiceSessionTable)
      .values({
        duration,
        notes: notes || null,
        pieceId,
        userId: auth.userId,
      })
      .returning()
      .get();

    return c.json(session, 201);
  } catch (error) {
    console.error("Error creating practice session:", error);
    return c.json({ error: "Failed to create practice session" }, 500);
  }
});

practiceSessionRouter.delete("/api/practiceSession/:id", requireAuth(), async (c) => {
  try {
    const auth = c.get("auth");
    const id = c.req.param("id");
    const db = createDb(c.env.DB);

    const session = await db.select().from(practiceSessionTable).where(eq(practiceSessionTable.id, id)).get();

    if (!session) {
      return c.json({ error: "Practice session not found" }, 404);
    }

    if (session.userId !== auth.userId) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    await db.delete(practiceSessionTable).where(eq(practiceSessionTable.id, id)).run();

    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting practice session:", error);
    return c.json({ error: "Failed to delete practice session" }, 500);
  }
});

export default practiceSessionRouter;
