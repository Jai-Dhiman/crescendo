import { z } from "zod";

export const PieceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  artist: z.string().optional().nullable(),
  objectKey: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreatePieceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().optional(),
  file: z.instanceof(File),
});

export const PracticeSessionSchema = z.object({
  id: z.string(),
  duration: z.number().positive("Duration must be positive"),
  notes: z.string().optional().nullable(),
  pieceId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export const CreatePracticeSessionSchema = z.object({
  duration: z.number().positive("Duration must be positive"),
  notes: z.string().optional(),
  pieceId: z.string(),
});

export const RecordingSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  objectKey: z.string(),
  notes: z.string().optional().nullable(),
  pieceId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export const CreateRecordingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  notes: z.string().optional(),
  pieceId: z.string(),
  file: z.instanceof(File),
});

export type Piece = z.infer<typeof PieceSchema>;
export type CreatePiece = z.infer<typeof CreatePieceSchema>;
export type PracticeSession = z.infer<typeof PracticeSessionSchema>;
export type CreatePracticeSession = z.infer<typeof CreatePracticeSessionSchema>;
export type Recording = z.infer<typeof RecordingSchema>;
export type CreateRecording = z.infer<typeof CreateRecordingSchema>;
