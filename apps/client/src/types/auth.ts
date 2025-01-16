import { z } from "zod";

export interface AuthResponse {
  authenticated: boolean;
  user?: User;
}

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  profileImage: z.string().nullable(),
});

export const SessionDataSchema = z.object({
  userId: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  profileImage: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;
export type UserSession = z.infer<typeof SessionDataSchema>;
