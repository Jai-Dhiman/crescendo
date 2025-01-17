import { clerkClient } from "@clerk/clerk-sdk-node";

export const authMiddleware = async (c, next) => {
  const sessionToken = c.req.header("Authorization")?.split(" ")[1];

  if (!sessionToken) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const session = await clerkClient.sessions.verifySession(sessionToken);
    c.set("userId", session.userId);
    await next();
  } catch (error) {
    return c.json({ error: "Unauthorized" }, 401);
  }
};
