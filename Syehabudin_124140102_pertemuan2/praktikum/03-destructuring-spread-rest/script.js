import { byId, showJSON, parseNumbers } from "../utils.js";

export const demoDestructuring = () => {
  const student = {
    name: "Syehabudin", nim: "124140102",
    academic: { program: "Teknik Informatika", campus: { name: "ITERA", address: { city: "Lampung Selatan" } } }
  };
  // Ekstraksi properti hingga academic.campus.address.city, lebih dari 3 level.
  const { name, nim, academic: { program, campus: { name: campusName, address: { city } } } } = student;
  return { original: student, extracted: { name, nim, program, campusName, city } };
};

export const statistics = (...numbers) => {
  if (!numbers.length || numbers.some((number) => !Number.isFinite(number))) {
    throw new Error("Statistik membutuhkan minimal satu angka valid.");
  }
  const total = numbers.reduce((sum, number) => sum + number, 0);
  return { min: Math.min(...numbers), max: Math.max(...numbers), average: total / numbers.length, total, count: numbers.length };
};

export const mergeSettings = (theme = "cyan") => {
  const defaults = { theme: "terang", language: "id", notifications: true };
  const profile = { theme: "gelap", fontSize: 14, notifications: false };
  const overrides = { theme, fontSize: 16 };
  return { defaults, profile, overrides, result: { ...defaults, ...profile, ...overrides } };
};

export const destructuringLoop = (courses = [
  { course: "Pengembangan Aplikasi Web", score: 88 },
  { course: "Jaringan Komputer", score: 82 },
  { course: "Pengembangan Aplikasi Mobile", score: 90 }
]) => {
  const rows = [];
  for (const { course, score } of courses) rows.push(`${course}: ${score}`);
  return rows;
};

if (typeof document !== "undefined") {
  const run = () => {
    byId("hasil-statistik").classList.remove("error");
    try {
      const numbers = parseNumbers(byId("angka").value);
      showJSON("hasil-statistik", statistics(...numbers));
    } catch (error) {
      showJSON("hasil-statistik", error.message);
      byId("hasil-statistik").classList.add("error");
    }
    showJSON("hasil-merge", mergeSettings(byId("tema").value));
    showJSON("hasil-nested", demoDestructuring());
    showJSON("hasil-loop", destructuringLoop());
  };
  byId("form-operator").addEventListener("submit", (event) => { event.preventDefault(); run(); });
  run();
}
