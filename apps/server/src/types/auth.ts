export interface Env {
  BUCKET: R2Bucket;
  R2_PUBLIC_URL: string;
  DB: D1Database;
  CLERK_SECRET_KEY: string;
  CLERK_PUBLISHABLE_KEY: string;
  CLERK_PEM_PUBLIC_KEY: string;
  CLIENT_URL: string;
  API_URL: string;
}

export interface AuthContext {
  userId: string;
  sessionId: string;
}

export interface CustomBindings {
  Bindings: Env;
  Variables: {
    auth: AuthContext;
  };
}
