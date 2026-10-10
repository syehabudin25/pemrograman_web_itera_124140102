"use strict";

function hitungFaktorial(angka) {
  let hasil = 1;
  for (let i = 1; i <= angka; i++) hasil *= i;
  return hasil;
}

function apakahPrima(angka) {
  if (angka < 2) return false;
  for (let i = 2; i * i <= angka; i++) {
    if (angka % i === 0) return false;
  }
  return true;
}

function hitungBMI(berat, tinggiCm) {
  const tinggiMeter = tinggiCm / 100;
  return berat / (tinggiMeter * tinggiMeter);
}

document.getElementById("form-perkalian").addEventListener("submit", event => {
  event.preventDefault();
  const angka = Number(document.getElementById("angka-kali").value);
  const baris = [];
  for (let i = 1; i <= 10; i++) baris.push(`${angka} × ${i} = ${angka * i}`);
  document.getElementById("hasil-perkalian").textContent = baris.join("\n");
});

document.getElementById("form-faktorial").addEventListener("submit", event => {
  event.preventDefault();
  const angka = Number(document.getElementById("angka-faktorial").value);
  document.getElementById("hasil-faktorial").textContent = `${angka}! = ${hitungFaktorial(angka)}`;
});

document.getElementById("form-prima").addEventListener("submit", event => {
  event.preventDefault();
  const angka = Number(document.getElementById("angka-prima").value);
  document.getElementById("hasil-prima").textContent = `${angka} ${apakahPrima(angka) ? "adalah" : "bukan"} bilangan prima.`;
});

document.getElementById("form-bmi").addEventListener("submit", event => {
  event.preventDefault();
  const berat = Number(document.getElementById("berat").value);
  const tinggi = Number(document.getElementById("tinggi").value);
  document.getElementById("hasil-bmi").textContent = `BMI = ${hitungBMI(berat, tinggi).toFixed(2)}`;
});

document.getElementById("tombol-fizzbuzz").addEventListener("click", () => {
  const hasil = [];
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) hasil.push("FizzBuzz");
    else if (i % 3 === 0) hasil.push("Fizz");
    else if (i % 5 === 0) hasil.push("Buzz");
    else hasil.push(i);
  }
  document.getElementById("hasil-fizzbuzz").textContent = hasil.join(", ");
});
