import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const pieces = sqliteTable("piece", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  artist: text("artist"),
  objectKey: text("object_key").notNull(),
  userId: text("user_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const practiceSessions = sqliteTable("practice_session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  duration: integer("duration").notNull(),
  notes: text("notes"),
  pieceId: text("piece_id").references(() => pieces.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const recordings = sqliteTable("recording", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  objectKey: text("object_key").notNull(),
  notes: text("notes"),
  pieceId: text("piece_id").references(() => pieces.id, { onDelete: "cascade" }),

  userId: text("user_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
