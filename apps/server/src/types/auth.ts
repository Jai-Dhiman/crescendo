export interface Env {
  BUCKET: R2Bucket;
  R2_PUBLIC_URL: string;
  DB: D1Database;
  CF_ACCESS_AUD: string;
}

export interface AuthContext {
  userId: string;
}

export interface CustomBindings {
  Bindings: Env;
  Variables: {
    auth: AuthContext;
  };
}
