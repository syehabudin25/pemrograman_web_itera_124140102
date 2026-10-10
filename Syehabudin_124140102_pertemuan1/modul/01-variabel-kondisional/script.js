"use strict";
const nama = "Syehabudin";
let umur = 0;
let kotaAsal = "";

document.getElementById("form-biodata").addEventListener("submit", event => {
  event.preventDefault();
  umur = Number(document.getElementById("umur").value);
  kotaAsal = document.getElementById("kota").value.trim();
  document.getElementById("hasil-biodata").textContent = kotaAsal ? `Nama: ${nama}\nUmur: ${umur} tahun\nKota asal: ${kotaAsal}` : "Kota asal wajib diisi.";
});

document.getElementById("form-nilai").addEventListener("submit", event => {
  event.preventDefault();
  const nilai = Number(document.getElementById("nilai").value);
  let kelulusan;
  if (nilai >= 70) kelulusan = "Lulus";
  else kelulusan = "Tidak lulus";
  const grade = nilai >= 85 ? "A" : nilai >= 70 ? "B" : nilai >= 60 ? "C" : nilai >= 50 ? "D" : "E";
  document.getElementById("hasil-nilai").textContent = `Status: ${kelulusan}\nGrade: ${grade}`;
});

document.getElementById("form-umur").addEventListener("submit", event => {
  event.preventDefault();
  const usia = Number(document.getElementById("usia").value);
  let kategori;
  if (usia < 12) kategori = "Anak";
  else if (usia < 18) kategori = "Remaja";
  else if (usia < 60) kategori = "Dewasa";
  else kategori = "Lansia";
  document.getElementById("hasil-umur").textContent = `Kategori umur: ${kategori}`;
});

document.getElementById("form-hari").addEventListener("submit", event => {
  event.preventDefault();
  const angkaHari = Number(document.getElementById("hari").value);
  let namaHari;
  switch (angkaHari) {
    case 1: namaHari = "Monday"; break;
    case 2: namaHari = "Tuesday"; break;
    case 3: namaHari = "Wednesday"; break;
    case 4: namaHari = "Thursday"; break;
    case 5: namaHari = "Friday"; break;
    case 6: namaHari = "Saturday"; break;
    case 7: namaHari = "Sunday"; break;
    default: namaHari = "Angka hari tidak valid";
  }
  document.getElementById("hasil-hari").textContent = namaHari;
});
