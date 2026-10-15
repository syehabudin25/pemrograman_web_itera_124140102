import { DashboardApp } from "./app.js";
import { escapeHTML, formatDate, formatToday, getStatus, priorityLabel, toLocalDate } from "./modules/utils.js";

const app = new DashboardApp();
const byId = (id) => document.getElementById(id);
const filters = { query: "", status: "all", course: "" };
let courseSuggestions = [];
let deletionId = null;
let toastTimer;

const icons = {
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15l-1 6Z"></path></svg>',
  trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"></path></svg>'
};

const showToast = (message) => {
  clearTimeout(toastTimer);
  const toast = byId("toast");
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
};

const renderTask = (task, index) => {
  const { id, title, course, dueDate, dueTime, priority, notes, completed } = task;
  const status = getStatus(task);
  const safeId = escapeHTML(id);
  const accessibleTitle = escapeHTML(title);
  return `
    <article class="task-card ${completed ? "is-completed" : ""}" data-id="${safeId}">
      <span class="task-number" aria-label="Tugas nomor ${index + 1}">${String(index + 1).padStart(2, "0")}</span>
      <div class="task-meta-top"><p class="task-course">${escapeHTML(course)}</p><span class="status-badge ${status.key}">${status.label}</span></div>
      <h3>${accessibleTitle}</h3>
      <p class="task-notes ${notes ? "" : "is-empty"}">${escapeHTML(notes || "Belum ada catatan tambahan.")}</p>
      <div class="task-details"><div><span class="detail-label">Tenggat pengumpulan</span><time class="detail-value" datetime="${dueDate}T${dueTime}">${formatDate(dueDate)}<span class="deadline-time">Pukul ${dueTime.replace(":", ".")}</span></time></div><div><span class="detail-label">Prioritas</span><span class="priority-label priority-${priority}">${priorityLabel(priority)}</span></div></div>
      <div class="task-actions"><button type="button" class="complete-button" data-action="toggle" data-id="${safeId}" aria-pressed="${completed}" aria-label="${completed ? "Batalkan status selesai" : "Tandai selesai"}: ${accessibleTitle}">${icons.check} ${completed ? "Sudah selesai" : "Tandai selesai"}</button><button type="button" class="icon-button" data-action="edit" data-id="${safeId}" aria-label="Edit tugas: ${accessibleTitle}" title="Edit tugas">${icons.edit}</button><button type="button" class="icon-button" data-action="delete" data-id="${safeId}" aria-label="Hapus tugas: ${accessibleTitle}" title="Hapus tugas">${icons.trash}</button></div>
    </article>`;
};

const renderCourses = () => {
  const courses = app.getCourses();
  if (filters.course && !courses.includes(filters.course)) filters.course = "";
  byId("filter-matkul").innerHTML = `<option value="">Semua mata kuliah</option>${courses.map((course) => `<option value="${escapeHTML(course)}">${escapeHTML(course)}</option>`).join("")}`;
  byId("filter-matkul").value = filters.course;
  const suggestions = [...new Set([...courses, ...courseSuggestions])].sort((first, second) => first.localeCompare(second, "id"));
  byId("pilihan-matkul").innerHTML = suggestions.map((course) => `<option value="${escapeHTML(course)}"></option>`).join("");
};

const render = () => {
  renderCourses();
  const tasks = app.getFilteredTasks(filters);
  const { total, completed, pending, progress } = app.getSummary();
  byId("total-tugas").textContent = String(total).padStart(2, "0");
  byId("belum-selesai").textContent = String(pending).padStart(2, "0");
  byId("sudah-selesai").textContent = String(completed).padStart(2, "0");
  byId("progress-percent").innerHTML = `${progress}<span>%</span>`;
  byId("progress-ring").style.setProperty("--progress", progress);
  byId("progress-ring").setAttribute("aria-valuenow", String(progress));
  byId("progress-message").textContent = `${completed} dari ${total} tugas selesai`;
  byId("jumlah-hasil").textContent = `${tasks.length} dari ${total} tugas · tenggat terdekat di atas`;
  document.querySelectorAll("[data-status]").forEach((button) => {
    const selected = button.dataset.status === filters.status;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  byId("daftar-tugas").innerHTML = tasks.length ? tasks.map(renderTask).join("") : `
    <div class="empty-state"><h3>${total ? "Tugasnya belum ditemukan." : "Mulai dari satu tugas dulu."}</h3><p>${total ? "Coba kata kunci atau filter lain untuk melihat tugasmu." : "Catat tugas pertamamu agar tidak ada yang terlewat."}</p><button class="button button-primary" type="button" id="empty-action">${total ? "Reset pencarian & filter" : "+ Tambah tugas pertama"}</button></div>`;
};

const openTaskForm = (task = null) => {
  byId("form-tugas").reset();
  byId("form-error").textContent = "";
  byId("task-id").value = task?.id ?? "";
  byId("dialog-title").innerHTML = `${task ? "Edit tugas kuliah" : "Tambah tugas baru"}<span class="accent-text">.</span>`;
  byId("simpan-tugas").textContent = task ? "Simpan perubahan" : "Simpan tugas";
  const values = task ?? { title: "", course: "", dueDate: toLocalDate(), dueTime: "23:59", priority: "normal", notes: "" };
  const fields = { "judul-tugas": "title", "mata-kuliah": "course", "tenggat-tugas": "dueDate", "jam-tugas": "dueTime", "prioritas-tugas": "priority", "catatan-tugas": "notes" };
  Object.entries(fields).forEach(([id, property]) => { byId(id).value = values[property]; });
  byId("dialog-tugas").showModal();
};

byId("tambah-tugas").addEventListener("click", () => openTaskForm());
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => byId(button.dataset.close).close());
});

byId("form-tugas").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const formData = new FormData(event.currentTarget);
  const { id, ...data } = Object.fromEntries(formData.entries());
  try {
    if (id) app.updateTask(id, data);
    else app.addTask(data);
    byId("dialog-tugas").close();
    render();
    showToast(id ? "Perubahan tugas sudah disimpan." : "Tugas baru berhasil ditambahkan.");
  } catch (error) {
    byId("form-error").textContent = error.message;
  }
});

byId("daftar-tugas").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.id === "empty-action") {
    if (!app.tasks.length) openTaskForm();
    else {
      Object.assign(filters, { query: "", status: "all", course: "" });
      byId("cari-tugas").value = "";
      render();
      byId("cari-tugas").focus();
    }
    return;
  }
  const { action, id } = button.dataset;
  try {
    if (action === "edit") openTaskForm(app.findTask(id));
    if (action === "delete") {
      const { title } = app.findTask(id);
      deletionId = id;
      byId("nama-tugas-hapus").textContent = title;
      byId("dialog-hapus").showModal();
    }
    if (action === "toggle") {
      const { completed } = app.toggleTask(id);
      render();
      const replacement = [...byId("daftar-tugas").querySelectorAll('[data-action="toggle"]')].find((element) => element.dataset.id === id);
      (replacement ?? byId("daftar-tugas")).focus();
      showToast(completed ? "Satu tugas selesai. Kerja bagus!" : "Tugas kembali ke daftar belum selesai.");
    }
  } catch (error) {
    showToast(error.message);
  }
});

byId("konfirmasi-hapus").addEventListener("click", () => {
  if (!deletionId) return;
  try {
    app.deleteTask(deletionId);
    byId("dialog-hapus").close();
    deletionId = null;
    render();
    byId("tambah-tugas").focus();
    showToast("Tugas sudah dihapus dari daftar.");
  } catch (error) {
    showToast(error.message);
  }
});

byId("cari-tugas").addEventListener("input", (event) => { filters.query = event.target.value; render(); });
document.querySelectorAll("[data-status]").forEach((button) => {
  button.addEventListener("click", () => { filters.status = button.dataset.status; render(); });
});
byId("filter-matkul").addEventListener("change", (event) => { filters.course = event.target.value; render(); });

const loadCourseSuggestions = async () => {
  courseSuggestions = await app.loadCourseSuggestions();
  renderCourses();
};

byId("tanggal-hari-ini").textContent = formatToday();
byId("tanggal-hari-ini").dateTime = toLocalDate();
render();
loadCourseSuggestions();
if (app.loadWarning) {
  byId("storage-warning").textContent = app.loadWarning;
  byId("storage-warning").hidden = false;
  byId("save-status").textContent = "Periksa penyimpanan";
}

// Perbarui label tenggat selama halaman terbuka, tanpa mengubah data tugas.
setInterval(() => {
  byId("tanggal-hari-ini").textContent = formatToday();
  byId("tanggal-hari-ini").dateTime = toLocalDate();
  if (!document.querySelector("dialog[open]")) render();
}, 60000);
