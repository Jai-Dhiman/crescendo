// import { Hono } from "hono";
// import { db } from "../db";
// import { recordings as recordingsTable } from "../db/schema";
// import { eq } from "drizzle-orm";
// import { uploadToS3, deleteFromS3 } from "../lib/s3";
// import { z } from "zod";

// const recordingsRouter = new Hono();

// const createRecordingSchema = z.object({
//   title: z.string().min(1),
//   notes: z.string().optional(),
//   pieceId: z.string(),
// });

// recordingsRouter.get("/", async (c) => {
//   const userRecordings = await db.query.recordings.findMany({
//     orderBy: (recordings, { desc }) => [desc(recordings.createdAt)],
//   });
//   return c.json({ recordings: userRecordings });
// });

// recordingsRouter.get("/piece/:pieceId", async (c) => {
//   const pieceId = c.req.param("pieceId");

//   const pieceRecordings = await db.query.recordings.findMany({
//     where: eq(recordingsTable.pieceId, pieceId),
//     orderBy: (recordings, { desc }) => [desc(recordings.createdAt)],
//   });

//   return c.json({ recordings: pieceRecordings });
// });

// recordingsRouter.get("/:id", async (c) => {
//   const recordingId = c.req.param("id");
//   const recording = await db.query.recordings.findFirst({
//     where: eq(recordingsTable.id, recordingId),
//   });

//   if (!recording) {
//     return c.json({ error: "Recording not found" }, 404);
//   }

//   return c.json({ recording });
// });

// recordingsRouter.post("/", async (c) => {
//   const formData = await c.req.formData();
//   const title = formData.get("title") as string;
//   const notes = formData.get("notes") as string;
//   const pieceId = formData.get("pieceId") as string;
//   const audio = formData.get("audio") as File;

//   const result = createRecordingSchema.safeParse({
//     title,
//     notes,
//     pieceId,
//   });

//   if (!result.success) {
//     return c.json({ error: "Invalid input" }, 400);
//   }

//   if (!audio) {
//     return c.json({ error: "Audio file is required" }, 400);
//   }

//   try {
//     const { s3Key, cdnUrl } = await uploadToS3(audio);
//     const newRecording = await db
//       .insert(recordingsTable)
//       .values({
//         title,
//         notes,
//         pieceId,
//         s3Key,
//         cdnUrl,
//         userId: "temp-user",
//       })
//       .returning();

//     return c.json({ recording: newRecording[0] }, 201);
//   } catch (error) {
//     console.error("Error creating recording:", error);
//     return c.json({ error: "Failed to create recording" }, 500);
//   }
// });

// recordingsRouter.delete("/:id", async (c) => {
//   const recordingId = c.req.param("id");
//   const recording = await db.query.recordings.findFirst({
//     where: eq(recordingsTable.id, recordingId),
//   });

//   if (!recording) {
//     return c.json({ error: "Recording not found" }, 404);
//   }

//   try {
//     await deleteFromS3(recording.s3Key);
//     await db.delete(recordingsTable).where(eq(recordingsTable.id, recordingId));
//     return c.json({ success: true }, 200);
//   } catch (error) {
//     console.error("Error deleting recording:", error);
//     return c.json({ error: "Failed to delete recording" }, 500);
//   }
// });

// export default recordingsRouter;
