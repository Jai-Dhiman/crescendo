import { Hono } from "hono";
import { createClerkClient } from "@clerk/backend";
import type { Context, Next } from "hono";
import type { CustomBindings } from "@/types/auth";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const clerkMiddleware = async (c: Context<CustomBindings>, next: Next) => {
  try {
    const sessionToken = c.req.header("Authorization")?.split(" ")[1];
    if (sessionToken) {
      const session = await clerk.sessions.getSession(sessionToken);
      if (session) {
        c.set("auth", { userId: session.userId });
      }
    }
    await next();
  } catch (error) {
    await next();
  }
};

export const requireAuth = () => async (c: Context<CustomBindings>, next: Next) => {
  const auth = c.get("auth");
  if (!auth?.userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
};

const app = new Hono();
