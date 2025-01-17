import { Hono } from "hono";
import { handleClerkWebhook } from "@/webhooks/clerk";

const webhookRouter = new Hono();

webhookRouter.post("/clerk-webhook", async (c) => {
  const evt = await c.req.json();
  await handleClerkWebhook(evt);
  return c.json({ received: true });
});

export default webhookRouter;
