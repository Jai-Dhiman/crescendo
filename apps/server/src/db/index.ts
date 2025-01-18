import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function createDb(dbInstance: D1Database) {
  return drizzle(dbInstance, { schema });
}

export type Database = ReturnType<typeof createDb>;

export { schema };
