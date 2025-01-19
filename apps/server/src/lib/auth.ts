import { createClerkClient } from "@clerk/backend";
import type { Context, Next } from "hono";
import type { CustomBindings } from "@/types/auth";

export const clerkMiddleware = async (c: Context<CustomBindings>, next: Next) => {
  try {
    const clerk = createClerkClient({
      secretKey: c.env.CLERK_SECRET_KEY,
      publishableKey: c.env.CLERK_PUBLISHABLE_KEY,
    });

    const authHeader = c.req.header("Authorization");
    const sessionToken = authHeader?.split(" ")[1];

    if (!sessionToken) {
      await next();
      return;
    }

    const verificationRequest = new Request(c.env.API_URL || "http://localhost:8787", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    const verifiedAuth = await clerk.authenticateRequest(verificationRequest, {
      jwtKey: c.env.CLERK_PEM_PUBLIC_KEY,
      authorizedParties: [c.env.CLIENT_URL || "http://localhost:3001"],
    });

    if (verifiedAuth.status === "signed-in" && verifiedAuth.toAuth()) {
      const authData = verifiedAuth.toAuth();
      if (authData?.userId) {
        c.set("auth", {
          userId: authData.userId,
          sessionId: authData.sessionId || "",
        });
      }
    }

    await next();
  } catch (error) {
    console.error("Auth error:", error);
    await next();
  }
};

export const requireAuth = () => async (c: Context<CustomBindings>, next: Next) => {
  const auth = c.get("auth");
  if (!auth?.userId) {
    return c.json(
      {
        error: "Unauthorized",
        message: "You must be signed in to access this resource",
      },
      401
    );
  }
  await next();
};
