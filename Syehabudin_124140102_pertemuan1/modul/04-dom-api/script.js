"use strict";
const daftarDom = document.getElementById("daftar-dom");
let nomorItem = 0;
let warnaBerbeda = false;
let posts = [];
let halaman = 1;
const ukuranHalaman = 10;

document.getElementById("tambah-dom").addEventListener("click", () => {
  const item = document.createElement("li");
  item.textContent = `Item ${++nomorItem}`;
  daftarDom.append(item);
});
document.getElementById("hapus-dom").addEventListener("click", () => { daftarDom.lastElementChild?.remove(); });
document.getElementById("warna-dom").addEventListener("click", () => {
  warnaBerbeda = !warnaBerbeda;
  daftarDom.style.backgroundColor = warnaBerbeda ? "#dee9ff" : "";
  daftarDom.style.color = warnaBerbeda ? "#24416b" : "";
});
document.getElementById("tombol-tema").addEventListener("click", event => {
  const gelap = document.body.classList.toggle("dark");
  event.currentTarget.textContent = gelap ? "Light mode" : "Dark mode";
  event.currentTarget.setAttribute("aria-pressed", String(gelap));
});
function tampilkanPosts() {
  const kata = document.getElementById("cari-post").value.trim().toLowerCase();
  const hasil = posts.filter(post => post.title.toLowerCase().includes(kata));
  const jumlahHalaman = Math.max(1, Math.ceil(hasil.length / ukuranHalaman));
  halaman = Math.min(halaman, jumlahHalaman);
  const daftar = document.getElementById("daftar-post");
  daftar.replaceChildren();
  hasil.slice((halaman - 1) * ukuranHalaman, halaman * ukuranHalaman).forEach(post => {
    const item = document.createElement("li");
    const judul = document.createElement("strong");
    judul.textContent = `${post.id}. ${post.title}`;
    const isi = document.createElement("p");
    isi.textContent = post.body;
    item.append(judul, isi);
    daftar.append(item);
  });
  document.getElementById("info-halaman").textContent = hasil.length ? `Halaman ${halaman} / ${jumlahHalaman} · ${hasil.length} post` : "Tidak ada post yang cocok";
  document.getElementById("sebelumnya").disabled = halaman <= 1 || !hasil.length;
  document.getElementById("berikutnya").disabled = halaman >= jumlahHalaman || !hasil.length;
}

document.getElementById("muat-post").addEventListener("click", async event => {
  const tombol = event.currentTarget;
  const pesan = document.getElementById("pesan-api");
  tombol.disabled = true;
  pesan.classList.remove("error");
  pesan.textContent = "Memuat data...";
  const controller = new AbortController();
  const batasWaktu = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", { signal: controller.signal });
    if (!response.ok) throw new Error("Server gagal merespons");
    const data = await response.json();
    if (!Array.isArray(data) || data.some(post => !post || !Number.isFinite(post.id) || typeof post.title !== "string" || typeof post.body !== "string")) throw new Error("Format respons tidak valid");
    posts = data;
    halaman = 1;
    tampilkanPosts();
    pesan.textContent = `${posts.length} post berhasil dimuat.`;
  } catch {
    pesan.classList.add("error");
    pesan.textContent = "Gagal memuat post. Periksa koneksi internet lalu coba lagi.";
  } finally {
    clearTimeout(batasWaktu);
    tombol.disabled = false;
  }
});
document.getElementById("cari-post").addEventListener("input", () => { halaman = 1; tampilkanPosts(); });
document.getElementById("sebelumnya").addEventListener("click", () => { halaman--; tampilkanPosts(); });
document.getElementById("berikutnya").addEventListener("click", () => { halaman++; tampilkanPosts(); });
