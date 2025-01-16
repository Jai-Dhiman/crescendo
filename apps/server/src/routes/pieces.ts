// import { Hono } from "hono";
// import { db } from "../db";
// import { pieces as piecesTable } from "../db/schema";
// import { zValidator } from "@hono/zod-validator";
// import { z } from "zod";
// import { eq } from "drizzle-orm";
// import { uploadToS3, deleteFromS3 } from "../lib/s3";
// import type { UserSession } from "../types/auth";
// import { createId } from "@paralleldrive/cuid2";

// type Variables = {
//   session: UserSession;
// };

// const piecesRouter = new Hono<{ Variables: Variables }>();

// const createPieceSchema = z.object({
//   title: z.string().min(1),
// });

// piecesRouter.get("/", async (c) => {
//   const session = c.get("session") as UserSession;
//   const userPieces = await db.query.pieces.findMany({
//     where: eq(piecesTable.userId, session.userId),
//     orderBy: (pieces, { desc }) => [desc(pieces.createdAt)],
//   });

//   return c.json({ pieces: userPieces });
// });

// piecesRouter.get("/:id", async (c) => {
//   const session = c.get("session") as UserSession;
//   const pieceId = c.req.param("id");

//   const piece = await db.query.pieces.findFirst({
//     where: (pieces) => eq(pieces.id, pieceId) && eq(pieces.userId, session.userId),
//   });

//   if (!piece) {
//     return c.json({ error: "Piece not found" }, 404);
//   }

//   return c.json({ piece });
// });

// piecesRouter.post("/", zValidator("form", createPieceSchema), async (c) => {
//   const session = c.get("session") as UserSession;
//   const formData = await c.req.formData();
//   const title = formData.get("title") as string;
//   const artist = formData.get("artist") as string;
//   const id = formData.get("id") as string;
//   const pdf = formData.get("pdf") as File;

//   if (!pdf) {
//     return c.json({ error: "PDF file is required" }, 400);
//   }

//   try {
//     const { s3Key, cdnUrl } = await uploadToS3(pdf);
//     const pieceId = createId();

//     const newPiece = await db
//       .insert(piecesTable)
//       .values({
//         id,
//         title,
//         artist,
//         s3Key,
//         cdnUrl,
//         userId: session.userId,
//       })
//       .returning();

//     return c.json({ piece: newPiece[0] }, 201);
//   } catch (error: unknown) {
//     console.error("Error creating piece:", error);
//     if (error && typeof error === "object" && "code" in error) {
//       if (error.code === "23505") {
//         return c.json({ error: "Internal error - please try again" }, 500);
//       }
//     }
//     return c.json({ error: "Failed to create piece" }, 500);
//   }
// });

// piecesRouter.delete("/:id", async (c) => {
//   const session = c.get("session") as UserSession;
//   const pieceId = c.req.param("id");

//   const piece = await db.query.pieces.findFirst({
//     where: (pieces) => eq(pieces.id, pieceId) && eq(pieces.userId, session.userId),
//   });

//   if (!piece) {
//     return c.json({ error: "Piece not found" }, 404);
//   }

//   try {
//     await deleteFromS3(piece.s3Key);
//     await db.delete(piecesTable).where(eq(piecesTable.id, pieceId));
//     return c.json({ success: true });
//   } catch (error) {
//     console.error("Error deleting piece:", error);
//     return c.json({ error: "Failed to delete piece" }, 500);
//   }
// });

// export default piecesRouter;
