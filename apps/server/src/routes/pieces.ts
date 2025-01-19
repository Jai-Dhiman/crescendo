import { Hono } from "hono";
import { uploadToR2 } from "@/lib/r2";
import { pieces as pieceTable } from "@/db/schema";
import { createDb } from "@/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/auth";
import type { CustomBindings } from "@/types";

const pieceRouter = new Hono<CustomBindings>();

pieceRouter.get("/api/pieces", requireAuth(), async (c) => {
  try {
    const auth = c.get("auth");
    const db = createDb(c.env.DB);
    const pieces = await db.select().from(pieceTable).where(eq(pieceTable.userId, auth.userId)).all();
    return c.json(pieces);
  } catch (error) {
    console.error("Error fetching pieces:", error);
    return c.json({ error: "Failed to fetch pieces" }, 500);
  }
});

pieceRouter.get("/api/pieces/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const db = createDb(c.env.DB);
    const piece = await db.select().from(pieceTable).where(eq(pieceTable.id, id)).get();

    if (!piece) {
      return c.json({ error: "Piece not found" }, 404);
    }

    return c.json(piece);
  } catch (error) {
    console.error("Error fetching piece:", error);
    return c.json({ error: "Failed to fetch piece" }, 500);
  }
});

pieceRouter.get("/api/pieces/:id/pdf", async (c) => {
  try {
    const id = c.req.param("id");
    const db = createDb(c.env.DB);

    const piece = await db.select().from(pieceTable).where(eq(pieceTable.id, id)).get();
    if (!piece) {
      return c.json({ error: "Piece not found" }, 404);
    }

    const file = await c.env.BUCKET.get(piece.objectKey);
    if (!file) {
      return c.json({ error: "PDF not found" }, 404);
    }

    c.header("Content-Type", "application/pdf");
    c.header("Content-Disposition", `inline; filename="${piece.title}.pdf"`);
    return c.body(await file.arrayBuffer());
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return c.json({ error: "Failed to fetch PDF" }, 500);
  }
});

pieceRouter.post("/api/pieces", requireAuth(), async (c) => {
  try {
    const auth = c.get("auth");
    const formData = await c.req.formData();
    const fileData = formData.get("pdf");
    if (!fileData || typeof fileData !== "object" || !("size" in fileData) || !("type" in fileData)) {
      return c.json({ error: "Invalid file data" }, 400);
    }
    const file = fileData as File;

    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;

    if (!file || !title) {
      return c.json({ error: "File and title are required" }, 400);
    }

    const { objectKey } = await uploadToR2(file, c.env);
    const db = createDb(c.env.DB);
    const piece = await db
      .insert(pieceTable)
      .values({
        title,
        artist: artist || null,
        objectKey,
        userId: auth.userId,
      })
      .returning()
      .get();
    return c.json(piece, 201);
  } catch (error) {
    console.error("Error creating piece:", error);
    return c.json({ error: "Failed to create piece" }, 500);
  }
});

pieceRouter.delete("/api/pieces/:id", requireAuth(), async (c) => {
  try {
    const auth = c.get("auth");
    const id = c.req.param("id");
    const db = createDb(c.env.DB);

    const piece = await db.select().from(pieceTable).where(eq(pieceTable.id, id)).get();

    if (!piece) {
      return c.json({ error: "Piece not found" }, 404);
    }

    if (piece.userId !== auth.userId) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    await db.delete(pieceTable).where(eq(pieceTable.id, id)).run();

    try {
      await c.env.BUCKET.delete(piece.objectKey);
    } catch (r2Error) {
      console.error("Error deleting file from R2:", r2Error);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting piece:", error);
    return c.json({ error: "Failed to delete piece" }, 500);
  }
});

export default pieceRouter;
