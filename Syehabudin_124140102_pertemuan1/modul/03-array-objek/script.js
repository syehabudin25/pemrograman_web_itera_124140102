"use strict";
const kunciData = "latihan-mahasiswa-syehabudin-v1";
const dataContoh = [
  { nama: "Syehab", nim: "124140102", jurusan: "Teknik Informatika", nilai: 90 },
  { nama: "Bela", nim: "124140103", jurusan: "Teknik Informatika", nilai: 90 },
  { nama: "Citra", nim: "124140104", jurusan: "Sistem Informasi", nilai: 75 },
  { nama: "Doni", nim: "124140105", jurusan: "Teknik Informatika", nilai: 65 },
  { nama: "Eka", nim: "124140106", jurusan: "Sistem Informasi", nilai: 85 }
];
const form = document.getElementById("form-mahasiswa");
const pesanForm = document.getElementById("pesan-form");
let nimDiedit = null;
let mahasiswa = muatData();

function pesanPenyimpanan(teks) {
  const pesan = document.getElementById("pesan-storage");
  pesan.textContent = teks;
  pesan.hidden = false;
}

function muatData() {
  try {
    const tersimpan = localStorage.getItem(kunciData);
    if (tersimpan === null) return dataContoh.map(item => ({ ...item }));
    const data = JSON.parse(tersimpan);
    const nims = new Set();
    if (!Array.isArray(data)) throw new Error("Format salah");
    for (const item of data) {
      if (!item || typeof item.nama !== "string" || !item.nama.trim() ||
          typeof item.nim !== "string" || !/^\d+$/.test(item.nim) || nims.has(item.nim) ||
          typeof item.jurusan !== "string" || !item.jurusan.trim() ||
          !Number.isFinite(item.nilai) || item.nilai < 0 || item.nilai > 100) throw new Error("Data salah");
      nims.add(item.nim);
    }
    return data;
  } catch {
    pesanPenyimpanan("Penyimpanan tidak tersedia atau data lama tidak valid. Lima data contoh ditampilkan; coba izinkan penyimpanan browser.");
    return dataContoh.map(item => ({ ...item }));
  }
}

function simpanData() {
  try {
    localStorage.setItem(kunciData, JSON.stringify(mahasiswa));
    document.getElementById("pesan-storage").hidden = true;
  } catch {
    pesanPenyimpanan("Data belum dapat disimpan. Perubahan dapat hilang setelah refresh.");
  }
}

function rataRata() {
  return mahasiswa.length ? mahasiswa.reduce((total, item) => total + item.nilai, 0) / mahasiswa.length : 0;
}

function tampilkanData() {
  const rata = rataRata();
  const tertinggi = mahasiswa.reduce((hasil, item) => !hasil || item.nilai > hasil.nilai ? item : hasil, null);
  document.getElementById("ringkasan").textContent = `Jumlah data: ${mahasiswa.length}\nRata-rata: ${rata.toFixed(2)}\nNilai tertinggi: ${tertinggi ? `${tertinggi.nama} (${tertinggi.nilai})` : "Belum ada data"}`;
  let dataTampil = [...mahasiswa];
  if (document.getElementById("filter").value === "diatas") dataTampil = dataTampil.filter(item => item.nilai > rata);
  const arah = document.getElementById("urut").value === "asc" ? 1 : -1;
  dataTampil.sort((a, b) => arah * a.nama.localeCompare(b.nama, "id"));
  const tabel = document.getElementById("tabel-mahasiswa");
  tabel.replaceChildren();
  dataTampil.forEach((item, indeks) => {
    const baris = document.createElement("tr");
    [indeks + 1, item.nama, item.nim, item.jurusan, item.nilai].forEach(teks => {
      const sel = document.createElement("td");
      sel.textContent = teks;
      baris.append(sel);
    });
    const aksi = document.createElement("td");
    ["Edit", "Hapus"].forEach(label => {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.textContent = label;
      tombol.dataset.aksi = label;
      tombol.dataset.nim = item.nim;
      tombol.setAttribute("aria-label", `${label} ${item.nama}`);
      tombol.className = label === "Hapus" ? "danger" : "secondary";
      aksi.append(tombol);
    });
    baris.append(aksi);
    tabel.append(baris);
  });
  document.getElementById("jumlah-data").textContent = `${dataTampil.length} dari ${mahasiswa.length} data ditampilkan.`;
}

function batalkanEdit() {
  nimDiedit = null;
  form.reset();
  document.getElementById("judul-form").textContent = "Tambah mahasiswa";
  document.getElementById("simpan").textContent = "Tambah mahasiswa";
  document.getElementById("batal").hidden = true;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const data = {
    nama: document.getElementById("nama").value.trim(),
    nim: document.getElementById("nim").value.trim(),
    jurusan: document.getElementById("jurusan").value.trim(),
    nilai: document.getElementById("nilai").valueAsNumber
  };
  let error = "";
  if (!data.nama || !data.jurusan) error = "Nama dan jurusan wajib diisi.";
  else if (!/^\d+$/.test(data.nim)) error = "NIM wajib berisi angka.";
  else if (!Number.isFinite(data.nilai) || data.nilai < 0 || data.nilai > 100) error = "Nilai wajib berupa angka 0–100.";
  else if (mahasiswa.some(item => item.nim === data.nim && item.nim !== nimDiedit)) error = "NIM sudah digunakan oleh mahasiswa lain.";
  pesanForm.classList.toggle("error", Boolean(error));
  if (error) { pesanForm.textContent = error; return; }
  const modeEdit = nimDiedit !== null;
  if (modeEdit) mahasiswa = mahasiswa.map(item => item.nim === nimDiedit ? data : item);
  else mahasiswa.push(data);
  simpanData();
  tampilkanData();
  batalkanEdit();
  pesanForm.textContent = modeEdit ? "Data berhasil diperbarui." : "Mahasiswa berhasil ditambahkan.";
});

document.getElementById("tabel-mahasiswa").addEventListener("click", event => {
  const tombol = event.target.closest("button[data-nim]");
  if (!tombol) return;
  const item = mahasiswa.find(data => data.nim === tombol.dataset.nim);
  if (!item) return;
  if (tombol.dataset.aksi === "Hapus") {
    mahasiswa = mahasiswa.filter(data => data.nim !== item.nim);
    if (nimDiedit === item.nim) batalkanEdit();
    simpanData();
    tampilkanData();
    pesanForm.classList.remove("error");
    pesanForm.textContent = `${item.nama} berhasil dihapus.`;
  } else {
    nimDiedit = item.nim;
    ["nama", "nim", "jurusan", "nilai"].forEach(kunci => { document.getElementById(kunci).value = item[kunci]; });
    document.getElementById("judul-form").textContent = "Edit mahasiswa";
    document.getElementById("simpan").textContent = "Simpan perubahan";
    document.getElementById("batal").hidden = false;
    pesanForm.classList.remove("error");
    pesanForm.textContent = `Sedang mengedit ${item.nama}.`;
    document.getElementById("nama").focus();
  }
});
document.getElementById("batal").addEventListener("click", () => {
  batalkanEdit();
  pesanForm.classList.remove("error");
  pesanForm.textContent = "Edit dibatalkan.";
});
document.getElementById("urut").addEventListener("change", tampilkanData);
document.getElementById("filter").addEventListener("change", tampilkanData);
tampilkanData();
