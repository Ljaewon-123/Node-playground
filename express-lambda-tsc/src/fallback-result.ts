type Result<T> = { ok: true; data: T } | { ok: false; error: unknown };

export function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function err(error: unknown): Result<never> {
  return { ok: false, error };
}
