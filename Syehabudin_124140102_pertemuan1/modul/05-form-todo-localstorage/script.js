"use strict";
const kunciTodo = "latihan-todo-syehabudin-v1";
const pesanTodo = document.getElementById("pesan-todo");
let todos = muatTodo();

function muatTodo() {
  try {
    const data = JSON.parse(localStorage.getItem(kunciTodo) || "[]");
    if (!Array.isArray(data) || data.some(item => !item || typeof item.teks !== "string" || !item.teks.trim() || typeof item.selesai !== "boolean")) throw new Error("Data tidak valid");
    return data;
  } catch {
    pesanTodo.textContent = "Penyimpanan tidak tersedia atau data lama tidak valid. Daftar kegiatan ditampilkan kosong.";
    pesanTodo.classList.add("error");
    return [];
  }
}

function simpanTodo() {
  try {
    localStorage.setItem(kunciTodo, JSON.stringify(todos));
    pesanTodo.textContent = "Daftar kegiatan tersimpan.";
    pesanTodo.classList.remove("error");
  } catch {
    pesanTodo.textContent = "Kegiatan belum dapat disimpan. Perubahan dapat hilang setelah refresh.";
    pesanTodo.classList.add("error");
  }
}

function tampilkanTodo() {
  const daftar = document.getElementById("daftar-todo");
  daftar.replaceChildren();
  todos.forEach((todo, indeks) => {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const centang = document.createElement("input");
    centang.type = "checkbox";
    centang.checked = todo.selesai;
    const teks = document.createElement("span");
    teks.textContent = todo.teks;
    teks.classList.toggle("done", todo.selesai);
    label.append(centang, teks);
    centang.addEventListener("change", () => {
      todos[indeks].selesai = centang.checked;
      teks.classList.toggle("done", centang.checked);
      simpanTodo();
    });
    const hapus = document.createElement("button");
    hapus.type = "button";
    hapus.className = "danger";
    hapus.textContent = "Hapus";
    hapus.setAttribute("aria-label", `Hapus kegiatan ${todo.teks}`);
    hapus.addEventListener("click", () => { todos.splice(indeks, 1); simpanTodo(); tampilkanTodo(); });
    item.append(label, hapus);
    daftar.append(item);
  });
}

document.getElementById("form-todo").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("isi-todo");
  const teks = input.value.trim();
  if (!teks) {
    pesanTodo.textContent = "Kegiatan wajib diisi.";
    pesanTodo.classList.add("error");
    return;
  }
  todos.push({ teks, selesai: false });
  simpanTodo();
  tampilkanTodo();
  event.currentTarget.reset();
  input.focus();
});

tampilkanTodo();
