import { query } from "./_generated/server";

export const getHealth = query(async (ctx) => {
  const latestSubmissions = await ctx.db
    .query("submissions")
    .order("desc")
    .filter((q) => q.neq(q.field("result.status"), "generating"))
    .take(5);

  let totalTime = 0;
  let successes = 0;
  for (const submission of latestSubmissions) {
    totalTime += submission.result.elapsedMs;
    if (submission.result.status === "saved") successes += 1;
  }

  const n = latestSubmissions.length;
  return {
    averageTime: n > 0 ? totalTime / n : 0,
    successRate: n > 0 ? successes / n : 0,
    isHealthy: true,
    timestamp: new Date().toISOString(),
  };
});
