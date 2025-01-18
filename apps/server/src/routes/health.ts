import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { pieces as piecesTable } from "@/db/schema";

interface Bindings {
  DB: D1Database;
}

const route = new Hono<{ Bindings: Bindings }>();

interface HealthStatus {
  status: "healthy" | "unhealthy";
  timestamp: string;
  services: {
    server: {
      status: "healthy" | "unhealthy";
      runtime: string;
    };
    database: {
      status: "healthy" | "unhealthy";
      message?: string;
    };
  };
}

route.get("/", async (c) => {
  const db = drizzle(c.env.DB);
  const health: HealthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      server: {
        status: "healthy",
        runtime: "Cloudflare Workers",
      },
      database: {
        status: "healthy",
      },
    },
  };

  try {
    await db.select({ id: piecesTable.id }).from(piecesTable).limit(1);
  } catch (error) {
    health.status = "unhealthy";
    health.services.database = {
      status: "unhealthy",
      message: error instanceof Error ? error.message : "Database connection failed",
    };
  }

  const statusCode = health.status === "healthy" ? 200 : 503;
  return c.json(health, statusCode);
});

export default route;
