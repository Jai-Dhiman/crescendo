import type { Context } from "hono";

export const createHealthCheck = (deps: Dependencies) => {
  return async (c: Context) => {
    try {
      return c.json({
        server: "healthy",
      });
    } catch (err) {
      const error = err as Error;
      return c.json(
        {
          server: "healthy",
          error: error.message,
        },
        503
      );
    }
  };
};
