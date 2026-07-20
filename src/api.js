/* ============================================================
   API client. Every call has a local fallback so the site
   works with or without the server running.
   ============================================================ */
const TIMEOUT = 3500;

async function request(path, options = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(`/api${path}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...options
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error(data.error || "Request failed"), { status: res.status, server: true });
    return data;
  } finally {
    clearTimeout(t);
  }
}

export const api = {
  get: path => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) })
};

/** Run an API call; if the server is unreachable, run the local fallback instead.
 *  Server-side validation errors (4xx) are re-thrown so the UI can show them. */
export async function withFallback(call, fallback) {
  try {
    return await call();
  } catch (err) {
    if (err.server) throw err;          // real backend answered with an error
    return fallback();                  // backend not running → local demo mode
  }
}
