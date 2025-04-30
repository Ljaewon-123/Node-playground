type Result<T> = { ok: true; data: T } | { ok: false; error: unknown };

function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

function err(error: unknown): Result<never> {
  return { ok: false, error };
}
