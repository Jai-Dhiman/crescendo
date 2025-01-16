// import { Hono } from "hono";
// import { db } from "../db";
// import { practiceSessions as practiceSessionsTable } from "../db/schema";
// import { eq } from "drizzle-orm";
// import { z } from "zod";

// const practiceSessionsRouter = new Hono();

// const createPracticeSessionSchema = z.object({
//   duration: z.number().positive(),
//   notes: z.string().optional(),
//   pieceId: z.string(),
// });

// practiceSessionsRouter.get("/", async (c) => {
//   const userSessions = await db.query.practiceSessions.findMany({
//     orderBy: (sessions, { desc }) => [desc(sessions.createdAt)],
//   });
//   return c.json({ sessions: userSessions });
// });

// practiceSessionsRouter.get("/piece/:pieceId", async (c) => {
//   const pieceId = c.req.param("pieceId");
//   const pieceSessions = await db.query.practiceSessions.findMany({
//     where: eq(practiceSessionsTable.pieceId, pieceId),
//     orderBy: (sessions, { desc }) => [desc(sessions.createdAt)],
//   });
//   return c.json({ sessions: pieceSessions });
// });

// practiceSessionsRouter.get("/:id", async (c) => {
//   const sessionId = c.req.param("id");
//   const session = await db.query.practiceSessions.findFirst({
//     where: eq(practiceSessionsTable.id, sessionId),
//   });

//   if (!session) {
//     return c.json({ error: "Practice session not found" }, 404);
//   }
//   return c.json({ session });
// });

// practiceSessionsRouter.post("/", async (c) => {
//   const body = await c.req.json();
//   const result = createPracticeSessionSchema.safeParse(body);

//   if (!result.success) {
//     return c.json({ error: "Invalid input" }, 400);
//   }

//   try {
//     const newSession = await db
//       .insert(practiceSessionsTable)
//       .values({
//         duration: result.data.duration,
//         notes: result.data.notes,
//         pieceId: result.data.pieceId,
//         userId: "temp-user",
//       })
//       .returning();

//     return c.json({ session: newSession[0] }, 201);
//   } catch (error) {
//     console.error("Error creating practice session:", error);
//     return c.json({ error: "Failed to create practice session" }, 500);
//   }
// });

// practiceSessionsRouter.delete("/:id", async (c) => {
//   const sessionId = c.req.param("id");
//   const session = await db.query.practiceSessions.findFirst({
//     where: eq(practiceSessionsTable.id, sessionId),
//   });

//   if (!session) {
//     return c.json({ error: "Practice session not found" }, 404);
//   }

//   try {
//     await db.delete(practiceSessionsTable).where(eq(practiceSessionsTable.id, sessionId));
//     return c.json({ success: true }, 200);
//   } catch (error) {
//     console.error("Error deleting practice session:", error);
//     return c.json({ error: "Failed to delete practice session" }, 500);
//   }
// });

// export default practiceSessionsRouter;
