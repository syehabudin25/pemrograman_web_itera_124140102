import { byId, escapeHTML } from "../utils.js";
import { fetchCombinedPage, withErrorBoundary, debounce, sleep } from "./api.js";

let page = 1;
let totalPages = 1;
let sequence = 0;
let activeController;

const renderItems = ({ items, total, page: currentPage, totalPages: pages }) => {
  page = currentPage;
  totalPages = pages;
  byId("hasil-post").innerHTML = items.length ? items.map(({ id, title, body, author }) => `
    <article class="post"><small>POST ${id} · ${escapeHTML(author)}</small><h3>${escapeHTML(title)}</h3><p>${escapeHTML(body)}</p></article>`).join("")
    : '<p class="muted">Tidak ada data yang sesuai pencarian.</p>';
  byId("info-halaman").textContent = `Halaman ${page} dari ${totalPages} · ${total} hasil`;
  byId("sebelumnya").disabled = page <= 1;
  byId("berikutnya").disabled = page >= totalPages;
};

const loadPage = async (nextPage = 1) => {
  const requestId = ++sequence;
  activeController?.abort();
  activeController = new AbortController();
  const controller = activeController;
  const { signal } = controller;
  const source = byId("sumber-data").value;
  const query = byId("cari-post").value;
  const simulateFailure = byId("simulasi-error").value === "yes";
  byId("loading").hidden = false;
  byId("pesan-error").hidden = true;
  byId("pesan-error").textContent = "";
  byId("retry-status").textContent = "";
  byId("muat-data").disabled = true;
  byId("sebelumnya").disabled = true;
  byId("berikutnya").disabled = true;
  byId("hasil-post").setAttribute("aria-busy", "true");
  byId("hasil-post").replaceChildren();
  byId("info-halaman").textContent = "Memuat data...";
  byId("mode-status").textContent = source === "online"
    ? "Sumber aktif: API JSONPlaceholder. Membutuhkan internet."
    : "Sumber aktif: dua JSON lokal. Tidak membutuhkan internet.";
  let succeeded = false;
  try {
    const result = await withErrorBoundary(async () => {
      // Jeda singkat pada contoh lokal agar perubahan status loading terlihat.
      if (source === "local") await sleep(250, signal);
      return fetchCombinedPage({
        source, query, page: nextPage, signal,
        ...(simulateFailure ? { fetcher: async () => { throw new Error("Simulasi kegagalan jaringan."); } } : {}),
        onRetry: ({ nextAttempt, delay }) => {
          if (requestId === sequence) byId("retry-status").textContent = `Mencoba ulang ke-${nextAttempt} setelah ${delay} ms...`;
        }
      });
    }, (error) => {
      if (signal.aborted || requestId !== sequence) return;
      byId("pesan-error").textContent = `${error.message} Periksa sumber data atau matikan simulasi error, lalu klik Muat data.`;
      byId("pesan-error").hidden = false;
      byId("info-halaman").textContent = "Data gagal dimuat.";
    });
    if (signal.aborted || requestId !== sequence || !result) return;
    renderItems(result);
    byId("retry-status").textContent = "Data berhasil digabung. Pencarian dan pagination diterapkan pada hasil pengambilan data.";
    succeeded = true;
  } finally {
    if (requestId === sequence) {
      byId("loading").hidden = true;
      byId("muat-data").disabled = false;
      byId("hasil-post").setAttribute("aria-busy", "false");
      byId("sebelumnya").disabled = !succeeded || page <= 1;
      byId("berikutnya").disabled = !succeeded || page >= totalPages;
    }
  }
};

const delayedSearch = debounce(() => { void loadPage(1); }, 350);
byId("cari-post").addEventListener("input", () => {
  // Batalkan hasil lama saat teks berubah, sebelum pencarian tertunda dijalankan.
  activeController?.abort();
  delayedSearch();
});
byId("form-async").addEventListener("submit", (event) => { event.preventDefault(); void loadPage(1); });
byId("sumber-data").addEventListener("change", () => { void loadPage(1); });
byId("sebelumnya").addEventListener("click", () => { void loadPage(page - 1); });
byId("berikutnya").addEventListener("click", () => { void loadPage(page + 1); });
void loadPage();
