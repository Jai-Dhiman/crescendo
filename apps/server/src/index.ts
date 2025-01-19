import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { clerkMiddleware } from "@/lib/auth";
import type { CustomBindings } from "./types/auth";
import healthCheck from "@/routes/health";
import pieceRouter from "@/routes/pieces";
import dotenv from "dotenv";
dotenv.config();

const app = new Hono<CustomBindings>();

app.use(
  "*",
  cors({
    origin: process.env.CLIENT_URL || "localhost:3001",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Cf-Access-Jwt-Assertion"],
  })
);

app.use("*", logger());
app.use("*", prettyJSON());
app.use("/api/*", clerkMiddleware);

app.route("/health", healthCheck);
app.route("/", pieceRouter);

app.get("/api/bucket-contents", async (c) => {
  try {
    const listed = await c.env.BUCKET.list();
    return c.json(listed.objects);
  } catch (error) {
    console.error("Error listing bucket:", error);
    return c.json({ error: "Failed to list bucket contents" }, 500);
  }
});

export default {
  fetch: app.fetch,
};
