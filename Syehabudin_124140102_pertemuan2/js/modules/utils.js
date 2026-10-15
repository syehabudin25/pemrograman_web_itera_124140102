// Fungsi pembantu ditulis sebagai arrow functions dan diekspor sebagai ES module.
export const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[character]);

export const toLocalDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isValidDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime()) && toLocalDate(date) === value;
};

export const formatDate = (value) => new Intl.DateTimeFormat("id-ID", {
  day: "numeric", month: "short", year: "numeric"
}).format(new Date(`${value}T00:00:00`));

export const formatToday = (date = new Date()) => new Intl.DateTimeFormat("id-ID", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
}).format(date);

export const createId = () => globalThis.crypto?.randomUUID?.()
  ?? `tugas-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const getDeadline = ({ dueDate, dueTime = "23:59" }) => new Date(`${dueDate}T${dueTime}:00`);

export const isOverdue = (task, now = new Date()) => !task.completed && getDeadline(task) < now;

export const getStatus = (task, now = new Date()) => task.completed
  ? { key: "completed", label: "Selesai" }
  : isOverdue(task, now)
    ? { key: "overdue", label: "Terlambat" }
    : { key: "pending", label: "Belum selesai" };

export const priorityLabel = (priority) => ({ high: "Tinggi", normal: "Biasa", low: "Rendah" })[priority] ?? "Biasa";

export const getCourseList = (tasks) => [...new Set(tasks.map(({ course }) => course))]
  .sort((first, second) => first.localeCompare(second, "id"));
