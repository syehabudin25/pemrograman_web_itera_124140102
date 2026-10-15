import { byId, showJSON, escapeHTML } from "../utils.js";

export const compareStrings = (name, course, credits = 3) => {
  const oldWay = "Halo, " + name + "! Kamu mengambil " + course + ".";
  const newWay = `Halo, ${name}! Kamu mengambil ${course}.`;
  const expression = `Beban belajar ${credits} SKS × 50 menit = ${credits * 50} menit tatap muka.`;
  const multiLine = `Nama: ${name}
Mata kuliah: ${course}
Jumlah SKS: ${credits}`;
  return { oldWay, newWay, expression, multiLine };
};

export const createProfileHTML = ({ name, nim, course, credits = 3 }) => `
  <article class="profile-card">
    <h3>${escapeHTML(name)}</h3>
    <p>NIM: <strong>${escapeHTML(nim)}</strong></p>
    <p>Mata kuliah: ${escapeHTML(course)}</p>
    <p>${credits} SKS · ${credits * 50} menit tatap muka</p>
  </article>`;

if (typeof document !== "undefined") {
  const render = () => {
    const data = {
      name: byId("nama").value.trim(), nim: byId("nim").value.trim(),
      course: byId("matkul").value.trim(), credits: Number(byId("sks").value)
    };
    showJSON("hasil-string", compareStrings(data.name, data.course, data.credits));
    const markup = createProfileHTML(data);
    byId("preview-profil").innerHTML = markup;
    byId("kode-html").textContent = markup.trim();
  };
  byId("form-profil").addEventListener("submit", (event) => { event.preventDefault(); render(); });
  render();
}
