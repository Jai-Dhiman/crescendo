import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { authMiddleware } from "@/lib/auth";
import webhookRouter from "./routes/webhook";
import healthCheck from "@/routes/health";
import dotenv from "dotenv";
dotenv.config();

type Bindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
  CF_ACCESS_AUD: string;
};

const app = new Hono<{ Bindings: Bindings }>();

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
app.use("/api/*", authMiddleware);
app.route("/api", webhookRouter);

app.route("/health", healthCheck);

export default {
  fetch: app.fetch,
};
