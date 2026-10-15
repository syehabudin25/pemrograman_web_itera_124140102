import { byId, showJSON, escapeHTML } from "../utils.js";

// Data nilai fiktif khusus latihan.
export const students = [
  { name: "Andi", course: "PAW", score: 88 },
  { name: "Bela", course: "PAM", score: 76 },
  { name: "Citra", course: "PAW", score: 92 },
  { name: "Doni", course: "Jaringan Komputer", score: 68 },
  { name: "Eka", course: "PAM", score: 85 },
  { name: "Farah", course: "Jaringan Komputer", score: 90 }
];

export const groupBy = (items, key) => items.reduce((groups, item) => {
  const group = String(typeof key === "function" ? key(item) : item[key]);
  (groups[group] ??= []).push(item);
  return groups;
}, Object.create(null));

export const averageFromObjects = (items, property = "score") => {
  if (!items.length) return 0;
  const values = items.map((item) => item[property]);
  if (values.some((value) => !Number.isFinite(value))) throw new Error("Nilai rata-rata harus berupa angka.");
  return values.reduce((total, value) => total + value, 0) / items.length;
};

export const flattenArray = (items) => items.flat(Infinity);

export const flattenSemesters = (semesters = [
  { semester: 1, courses: [{ name: "Algoritma", credits: 3 }, { name: "Matematika", credits: 3 }] },
  { semester: 2, courses: [{ name: "Struktur Data", credits: 4 }] }
]) => semesters.flatMap(({ semester, courses }) => courses.map((course) => ({ semester, ...course })));

export const analyzeGrades = (items, { course = "", minimumScore = 80 } = {}) => {
  const selected = items.filter((item) => (!course || item.course === course) && item.score >= minimumScore);
  const scores = selected.map(({ score }) => score);
  const total = scores.reduce((sum, score) => sum + score, 0);
  return { names: selected.map(({ name }) => name), count: scores.length, total, average: scores.length ? total / scores.length : 0 };
};

if (typeof document !== "undefined") {
  byId("data-mahasiswa").innerHTML = students.map(({ name, course, score }) => `<tr><td>${escapeHTML(name)}</td><td>${escapeHTML(course)}</td><td>${score}</td></tr>`).join("");
  const run = () => {
    showJSON("hasil-group", groupBy(students, "course"));
    showJSON("hasil-rata", { average: averageFromObjects(students), firstAbove90: students.find(({ score }) => score > 90), someBelow70: students.some(({ score }) => score < 70), everyPassed: students.every(({ score }) => score >= 60) });
    showJSON("hasil-flat", { nested: [[1, 2], [3, [4, 5]]], flat: flattenArray([[1, 2], [3, [4, 5]]]), courses: flattenSemesters() });
    showJSON("hasil-analisis", analyzeGrades(students, { course: byId("matkul").value, minimumScore: Number(byId("nilai-min").value) }));
  };
  byId("form-analisis").addEventListener("submit", (event) => { event.preventDefault(); run(); });
  run();
}
