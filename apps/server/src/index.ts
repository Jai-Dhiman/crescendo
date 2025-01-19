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
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie", "X-Requested-With"],
    exposeHeaders: ["Set-Cookie"],
  })
);

app.use("*", logger());
app.use("*", prettyJSON());
app.use("/api/*", clerkMiddleware);

app.route("/health", healthCheck);
app.route("/", pieceRouter);

export default {
  fetch: app.fetch,
};
