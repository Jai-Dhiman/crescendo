import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

type Bindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
  CF_ACCESS_AUD: string;
};

type CFAccessPayload = {
  email: string;
  sub: string;
};

const app = new Hono<{ Bindings: Bindings }>();

async function validateAccessJWT(c: Context, next: Next) {
  const jwt = c.req.header("Cf-Access-Jwt-Assertion");

  if (!jwt) {
    return c.json({ error: "Missing access token" }, 401);
  }

  try {
    const response = await fetch("https://YOURDOMAIN.cloudflareaccess.com/cdn-cgi/access/certs");
    const jwks = await response.json();

    const payload = (await validateJWT(jwt, jwks, {
      audience: c.env.CF_ACCESS_AUD,
    })) as CFAccessPayload;

    c.set("user", {
      email: payload.email,
      id: payload.sub,
    });

    await next();
  } catch (e) {
    return c.json({ error: "Invalid access token" }, 401);
  }
}

app.use(
  "*",
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Cf-Access-Jwt-Assertion"],
  })
);

app.use("*", logger());
app.use("*", prettyJSON());

app.get("/health", (c) => c.json({ status: "ok" }));

app.use("/api/*", validateAccessJWT);

app.get("/api/me", async (c) => {
  const user = c.get("user");

  const dbUser = await c.env.DB.db.select().from(users).where(eq(users.email, user.email)).first();

  if (!dbUser) {
    const newUser = await c.env.DB.db
      .insert(users)
      .values({
        email: user.email,
      })
      .returning()
      .get();

    return c.json(newUser);
  }

  return c.json(dbUser);
});

export default {
  fetch: app.fetch,
};
