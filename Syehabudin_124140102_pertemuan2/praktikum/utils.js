export const byId = (id) => document.getElementById(id);

export const showJSON = (id, value) => {
  byId(id).textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
};

export const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[character]);

export const parseNumbers = (value) => {
  const parts = value.split(/[\s,;]+/).filter(Boolean);
  const numbers = parts.map(Number);
  if (!numbers.length || numbers.some((number) => !Number.isFinite(number))) {
    throw new Error("Masukkan angka valid, dipisahkan spasi atau koma.");
  }
  return numbers;
};

export const rupiah = (value) => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(value);
