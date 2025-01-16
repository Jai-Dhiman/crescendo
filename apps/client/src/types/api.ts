import { z } from "zod";

export const PieceSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  s3Key: z.string(),
  cdnUrl: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Piece = z.infer<typeof PieceSchema>;
