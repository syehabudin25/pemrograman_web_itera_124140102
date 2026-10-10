"use strict";

const kunciKeranjang = "kasir-kampus-syehabudin-124140102-v1";
const batasNominal = Number.MAX_SAFE_INTEGER / 100;
const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 2
});
const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("nama-barang");
const inputHarga = document.getElementById("harga-barang");
const inputJumlah = document.getElementById("jumlah-barang");
const inputBayar = document.getElementById("uang-bayar");
const daftarBarang = document.getElementById("daftar-barang");
const tombolReset = document.getElementById("tombol-reset");
const pesanForm = document.getElementById("pesan-form");
let penyimpananAktif = true;
let keranjang = muatKeranjang();

function formatRupiah(angka) {
  return rupiah.format(angka);
}

function bulatkanUang(angka) {
  return Math.round((angka + Number.EPSILON) * 100) / 100;
}

function hitungBelanja(barang) {
  const total = bulatkanUang(barang.reduce((hasil, item) => hasil + bulatkanUang(item.harga * item.jumlah), 0));
  const diskon = total >= 50000 ? bulatkanUang(total * 0.1) : 0;
  return { total, diskon, totalAkhir: bulatkanUang(total - diskon) };
}

function tampilkanPesanPenyimpanan(teks) {
  const pesan = document.getElementById("pesan-penyimpanan");
  pesan.textContent = teks;
  pesan.hidden = false;
}

function muatKeranjang() {
  let dataMentah;
  try {
    dataMentah = localStorage.getItem(kunciKeranjang);
  } catch {
    penyimpananAktif = false;
    tampilkanPesanPenyimpanan("Browser menolak penyimpanan. Aplikasi tetap bisa dipakai, tetapi keranjang tidak tersimpan saat halaman ditutup. Coba gunakan Live Server atau izinkan penyimpanan browser.");
    return [];
  }
  if (!dataMentah) return [];
  try {
    const data = JSON.parse(dataMentah);
    const idUnik = new Set();
    if (!Array.isArray(data)) throw new Error("Format bukan array");
    for (const item of data) {
      if (!item || typeof item.id !== "string" || idUnik.has(item.id) ||
          typeof item.nama !== "string" || item.nama.trim().length < 3 ||
          typeof item.harga !== "number" || !Number.isFinite(item.harga) || item.harga <= 500 ||
          !Number.isSafeInteger(item.jumlah) || item.jumlah < 1 || item.harga * item.jumlah > batasNominal) {
        throw new Error("Data barang tidak valid");
      }
      idUnik.add(item.id);
    }
    if (hitungBelanja(data).total > batasNominal) throw new Error("Total terlalu besar");
    return data.map(item => ({ id: item.id, nama: item.nama.trim(), harga: item.harga, jumlah: item.jumlah }));
  } catch {
    tampilkanPesanPenyimpanan("Data keranjang yang tersimpan tidak dapat dibaca. Keranjang ditampilkan kosong; tambahkan barang kembali atau gunakan Transaksi baru untuk membersihkan data lama.");
    // Simpan data lama sampai pengguna menambahkan barang atau memilih reset.
    return [];
  }
}

function simpanKeranjang() {
  try {
    localStorage.setItem(kunciKeranjang, JSON.stringify(keranjang));
    penyimpananAktif = true;
    document.getElementById("pesan-penyimpanan").hidden = true;
  } catch {
    penyimpananAktif = false;
    tampilkanPesanPenyimpanan("Keranjang belum dapat disimpan di browser. Data saat ini tetap tampil, tetapi dapat hilang setelah halaman di-refresh.");
  }
}

function setError(input, idPesan, pesan) {
  const elemenPesan = document.getElementById(idPesan);
  elemenPesan.textContent = pesan;
  elemenPesan.hidden = !pesan;
  if (pesan) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
}

function validasiBarang() {
  const nama = inputNama.value.trim();
  const harga = inputHarga.valueAsNumber;
  const jumlah = inputJumlah.valueAsNumber;
  let errorNama = "";
  let errorHarga = "";
  let errorJumlah = "";

  if (nama.length < 3) errorNama = "Nama barang wajib diisi, minimal 3 karakter.";
  if (!Number.isFinite(harga) || harga <= 500) errorHarga = "Harga harus berupa angka positif, lebih dari Rp500.";
  else if (harga > batasNominal) errorHarga = "Nominal harga terlalu besar untuk dihitung dengan tepat.";
  if (!Number.isSafeInteger(jumlah) || jumlah < 1) errorJumlah = "Jumlah harus berupa bilangan bulat, minimal 1.";

  if (!errorHarga && !errorJumlah && hitungBelanja(keranjang).total + bulatkanUang(harga * jumlah) > batasNominal) {
    errorHarga = "Subtotal atau total belanja terlalu besar untuk dihitung dengan tepat.";
  }
  setError(inputNama, "error-nama", errorNama);
  setError(inputHarga, "error-harga", errorHarga);
  setError(inputJumlah, "error-jumlah", errorJumlah);
  const inputSalah = errorNama ? inputNama : errorHarga ? inputHarga : errorJumlah ? inputJumlah : null;
  if (inputSalah) {
    inputSalah.focus();
    return null;
  }
  return { nama, harga, jumlah };
}

function buatSel(teks, kelas = "") {
  const sel = document.createElement("td");
  sel.textContent = teks;
  if (kelas) sel.className = kelas;
  return sel;
}

function tampilkanKeranjang() {
  daftarBarang.replaceChildren();
  keranjang.forEach((item, indeks) => {
    const baris = document.createElement("tr");
    baris.append(buatSel(indeks + 1), buatSel(item.nama, "item-name"), buatSel(formatRupiah(item.harga), "text-right"));
    const selJumlah = buatSel("", "text-center");
    const badge = document.createElement("span");
    badge.className = "quantity";
    badge.textContent = item.jumlah;
    selJumlah.append(badge);
    baris.append(selJumlah, buatSel(formatRupiah(bulatkanUang(item.harga * item.jumlah)), "text-right"));
    const selAksi = buatSel("", "text-center");
    const tombolHapus = document.createElement("button");
    tombolHapus.type = "button";
    tombolHapus.className = "delete-button";
    tombolHapus.dataset.id = item.id;
    tombolHapus.setAttribute("aria-label", `Hapus ${item.nama}`);
    tombolHapus.title = `Hapus ${item.nama}`;
    // SVG tetap; nama barang selalu ditampilkan melalui textContent.
    tombolHapus.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5m4-5v5"/></svg><span>Hapus</span>';
    selAksi.append(tombolHapus);
    baris.append(selAksi);
    daftarBarang.append(baris);
  });
  const jumlahUnit = keranjang.reduce((total, item) => total + item.jumlah, 0);
  document.getElementById("jumlah-baris").textContent = keranjang.length;
  document.getElementById("info-keranjang").textContent = keranjang.length ? `${keranjang.length} jenis barang · ${jumlahUnit} unit di keranjang.` : "Belum ada barang di keranjang.";
  document.getElementById("keranjang-kosong").hidden = keranjang.length > 0;
  tombolReset.disabled = keranjang.length === 0 && document.getElementById("pesan-penyimpanan").hidden;
  document.getElementById("status-keranjang").textContent = keranjang.length ? (penyimpananAktif ? "Keranjang tersimpan otomatis." : "Keranjang belum tersimpan.") : "Siap untuk transaksi pertama.";
  tampilkanRingkasan();
}

function tampilkanRingkasan() {
  const { total, diskon, totalAkhir } = hitungBelanja(keranjang);
  document.getElementById("total-belanja").textContent = formatRupiah(total);
  document.getElementById("nilai-diskon").textContent = `− ${formatRupiah(diskon)}`;
  document.getElementById("label-diskon").textContent = total >= 50000 ? "(10%)" : "(0%)";
  document.getElementById("total-akhir").textContent = formatRupiah(totalAkhir);
  document.getElementById("pesan-diskon").textContent = total >= 50000 ? "Diskon 10% otomatis sudah diterapkan." : total > 0 ? `Tambah ${formatRupiah(bulatkanUang(50000 - total))} lagi untuk diskon 10%.` : "Diskon 10% mulai dari Rp50.000.";
  hitungPembayaran();
}

function hitungPembayaran() {
  const status = document.getElementById("status-bayar");
  const kembalian = document.getElementById("kembalian");
  const { totalAkhir } = hitungBelanja(keranjang);
  const uangBayar = inputBayar.valueAsNumber;
  status.className = "payment-status";
  inputBayar.removeAttribute("aria-invalid");
  kembalian.textContent = "—";
  if (!keranjang.length) {
    status.textContent = "Tambahkan barang terlebih dahulu.";
  } else if (inputBayar.value === "" && !inputBayar.validity.badInput) {
    status.textContent = "Isi uang bayar untuk menghitung kembalian.";
  } else if (!Number.isFinite(uangBayar) || uangBayar < 0 || uangBayar > batasNominal) {
    status.classList.add("is-error");
    inputBayar.setAttribute("aria-invalid", "true");
    status.textContent = "Masukkan nominal uang bayar yang valid dan tidak negatif.";
  } else if (uangBayar < totalAkhir) {
    status.classList.add("is-error");
    status.textContent = `Uang belum mencukupi. Kurang ${formatRupiah(bulatkanUang(totalAkhir - uangBayar))}.`;
  } else {
    status.classList.add("is-success");
    status.textContent = "Uang bayar mencukupi.";
    kembalian.textContent = formatRupiah(bulatkanUang(uangBayar - totalAkhir));
  }
}

formBarang.addEventListener("submit", event => {
  event.preventDefault();
  pesanForm.textContent = "";
  pesanForm.classList.remove("is-error");
  const barang = validasiBarang();
  if (!barang) {
    pesanForm.textContent = "Periksa kembali kolom yang ditandai merah.";
    pesanForm.classList.add("is-error");
    return;
  }
  barang.id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  keranjang.push(barang);
  simpanKeranjang();
  tampilkanKeranjang();
  formBarang.reset();
  pesanForm.textContent = `${barang.nama} berhasil ditambahkan.`;
  inputNama.focus();
});

[[inputNama, "error-nama"], [inputHarga, "error-harga"], [inputJumlah, "error-jumlah"]].forEach(([input, idPesan]) => {
  input.addEventListener("input", () => {
    setError(input, idPesan, "");
    pesanForm.textContent = "";
  });
});

daftarBarang.addEventListener("click", event => {
  const tombol = event.target.closest("button[data-id]");
  if (!tombol) return;
  const indeks = keranjang.findIndex(item => item.id === tombol.dataset.id);
  if (indeks < 0) return;
  const [barang] = keranjang.splice(indeks, 1);
  simpanKeranjang();
  tampilkanKeranjang();
  pesanForm.classList.remove("is-error");
  pesanForm.textContent = `${barang.nama} dihapus dari keranjang.`;
  const tombolBerikutnya = daftarBarang.querySelectorAll("button");
  if (tombolBerikutnya.length) tombolBerikutnya[Math.min(indeks, tombolBerikutnya.length - 1)].focus();
  else inputNama.focus();
});

tombolReset.addEventListener("click", () => {
  keranjang = [];
  try {
    // Hanya hapus data aplikasi ini, bukan seluruh localStorage browser.
    localStorage.removeItem(kunciKeranjang);
    penyimpananAktif = true;
    document.getElementById("pesan-penyimpanan").hidden = true;
  } catch {
    penyimpananAktif = false;
    tampilkanPesanPenyimpanan("Keranjang sudah dikosongkan di halaman ini, tetapi data penyimpanan browser belum dapat dihapus.");
  }
  formBarang.reset();
  inputBayar.value = "";
  [[inputNama, "error-nama"], [inputHarga, "error-harga"], [inputJumlah, "error-jumlah"]].forEach(([input, id]) => setError(input, id, ""));
  pesanForm.classList.remove("is-error");
  pesanForm.textContent = "Transaksi baru siap. Keranjang sudah dikosongkan.";
  tampilkanKeranjang();
  inputNama.focus();
});

inputBayar.addEventListener("input", hitungPembayaran);
tampilkanKeranjang();
