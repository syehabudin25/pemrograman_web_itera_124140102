const abortError = () => new DOMException("Permintaan dibatalkan.", "AbortError");

export const sleep = (milliseconds, signal) => new Promise((resolve, reject) => {
  if (signal?.aborted) { reject(abortError()); return; }
  const abort = () => { clearTimeout(timer); reject(abortError()); };
  const timer = setTimeout(() => { signal?.removeEventListener("abort", abort); resolve(); }, milliseconds);
  signal?.addEventListener("abort", abort, { once: true });
});

// Retry paling banyak 3 kali, dengan jeda 250 ms lalu 500 ms.
export async function fetchJSONWithRetry(url, {
  fetcher = globalThis.fetch?.bind(globalThis), attempts = 3, baseDelay = 250,
  timeoutMs = 4000, signal, wait = sleep, onRetry = () => {}
} = {}) {
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 5) throw new Error("Jumlah percobaan harus 1-5.");
  if (!fetcher) throw new Error("Browser tidak mendukung fetch.");
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (signal?.aborted) throw abortError();
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal?.addEventListener("abort", abort, { once: true });
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let failure;
    try {
      const response = await fetcher(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}: data tidak dapat diambil.`);
      return await response.json();
    } catch (error) {
      if (signal?.aborted) throw abortError();
      failure = error.name === "AbortError" ? new Error("Waktu pengambilan data habis.") : error;
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
    }
    if (attempt === attempts) throw failure;
    const delay = baseDelay * 2 ** (attempt - 1);
    onRetry({ attempt, nextAttempt: attempt + 1, delay, error: failure });
    await wait(delay, signal);
  }
}

export async function fetchCombinedPage({ source = "local", query = "", page = 1, pageSize = 5, ...requestOptions } = {}) {
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1) throw new Error("Halaman tidak valid.");
  if (!["local", "online"].includes(source)) throw new Error("Sumber data tidak dikenal.");
  const endpoints = source === "online"
    ? ["https://jsonplaceholder.typicode.com/users", "https://jsonplaceholder.typicode.com/posts"]
    : [new URL("./data/users.json", import.meta.url).href, new URL("./data/posts.json", import.meta.url).href];
  // Dua endpoint independen dijalankan bersamaan, kemudian dihubungkan dengan userId.
  const [users, posts] = await Promise.all(endpoints.map((url) => fetchJSONWithRetry(url, requestOptions)));
  if (!Array.isArray(users) || !Array.isArray(posts)
      || users.some((user) => !user || !Number.isInteger(user.id) || typeof user.name !== "string")
      || posts.some((post) => !post || !Number.isInteger(post.id) || !Number.isInteger(post.userId)
        || typeof post.title !== "string" || typeof post.body !== "string")) throw new Error("Format data tidak sesuai.");
  const authors = new Map(users.map(({ id, name }) => [id, name]));
  const combined = posts.map((post) => ({ ...post, author: authors.get(post.userId) ?? "Penulis tidak ditemukan" }));
  const keyword = query.trim().toLocaleLowerCase("id-ID");
  const filtered = combined.filter(({ title, body, author }) => `${title} ${body} ${author}`.toLocaleLowerCase("id-ID").includes(keyword));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  return { items: filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize), total: filtered.length, page: currentPage, totalPages };
}

// Batas error untuk operasi async: kegagalan ditangani, bukan menjadi rejection bebas.
export async function withErrorBoundary(operation, onError = () => {}) {
  try { return await operation(); }
  catch (error) { onError(error); return null; }
}

export const debounce = (callback, delay = 350) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};
