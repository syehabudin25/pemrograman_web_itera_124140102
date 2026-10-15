import { createId, getCourseList, getDeadline, isOverdue, isValidDate } from "./modules/utils.js";
import { createSampleTasks, STORAGE_KEY } from "./modules/data.js";

// Class untuk struktur satu tugas, sesuai panduan arsitektur pada modul.
export class TaskItem {
  constructor({ id = createId(), title, course, dueDate, dueTime = "23:59", priority = "normal", notes = "", completed = false, createdAt = new Date().toISOString() } = {}) {
    if (typeof title !== "string" || !title.trim() || title.trim().length > 100) throw new Error("Judul tugas wajib diisi, maksimal 100 karakter.");
    if (typeof course !== "string" || !course.trim() || course.trim().length > 80) throw new Error("Mata kuliah wajib diisi, maksimal 80 karakter.");
    if (typeof dueDate !== "string" || !isValidDate(dueDate)) throw new Error("Tanggal tenggat belum valid.");
    if (typeof dueTime !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(dueTime)) throw new Error("Jam tenggat belum valid.");
    if (!["low", "normal", "high"].includes(priority)) throw new Error("Prioritas tugas belum valid.");
    if (typeof notes !== "string" || notes.length > 500) throw new Error("Catatan maksimal 500 karakter.");
    if (typeof id !== "string" || !id || id.length > 100 || typeof completed !== "boolean") throw new Error("Data tugas belum valid.");
    this.id = id;
    this.title = title.trim();
    this.course = course.trim();
    this.dueDate = dueDate;
    this.dueTime = dueTime;
    this.priority = priority;
    this.notes = notes.trim();
    this.completed = completed;
    this.createdAt = typeof createdAt === "string" ? createdAt : new Date().toISOString();
  }
}

// Class ini mengelola state, CRUD, localStorage, filter, dan data mata kuliah.
export class DashboardApp {
  constructor({ storage, fetcher = globalThis.fetch?.bind(globalThis), now = () => new Date() } = {}) {
    this.fetcher = fetcher;
    this.now = now;
    this.tasks = [];
    this.loadWarning = "";
    this.storageBlocked = false;
    try {
      this.storage = storage ?? globalThis.localStorage;
      if (!this.storage) throw new Error("Penyimpanan tidak tersedia.");
      this.load();
    } catch (error) {
      this.loadWarning = error.message;
      this.storageBlocked = true;
    }
  }

  load() {
    const raw = this.storage.getItem(STORAGE_KEY);
    if (raw === null) {
      this.commit(createSampleTasks(this.now()).map((task) => new TaskItem(task)));
      return;
    }
    let saved;
    try {
      saved = JSON.parse(raw);
      if (saved.version !== 1 || !Array.isArray(saved.tasks)) throw new Error();
      const tasks = saved.tasks.map((task) => new TaskItem(task));
      if (new Set(tasks.map(({ id }) => id)).size !== tasks.length) throw new Error();
      this.tasks = tasks;
    } catch {
      throw new Error("Data tersimpan belum bisa dibaca. Jangan hapus data browser; periksa kembali sebelum menambah tugas baru.");
    }
  }

  commit(nextTasks) {
    if (this.storageBlocked) throw new Error("Perubahan belum dapat disimpan. Periksa penyimpanan browser, lalu muat ulang halaman.");
    // Simpan terlebih dahulu. State lama dipertahankan bila penyimpanan gagal.
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, tasks: nextTasks }));
    } catch {
      throw new Error("Tugas belum tersimpan. Pastikan penyimpanan browser diizinkan dan masih memiliki ruang.");
    }
    this.tasks = nextTasks;
  }

  addTask(data) {
    const task = new TaskItem(data);
    this.commit([...this.tasks, task]);
    return task;
  }

  updateTask(id, changes) {
    const existing = this.findTask(id);
    const updated = new TaskItem({ ...existing, ...changes, id: existing.id, createdAt: existing.createdAt });
    this.commit(this.tasks.map((task) => task.id === id ? updated : task));
    return updated;
  }

  deleteTask(id) {
    this.findTask(id);
    this.commit(this.tasks.filter((task) => task.id !== id));
  }

  toggleTask(id) {
    const { completed } = this.findTask(id);
    return this.updateTask(id, { completed: !completed });
  }

  findTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) throw new Error("Tugas tidak ditemukan. Muat ulang halaman dan coba lagi.");
    return task;
  }

  getFilteredTasks({ query = "", status = "all", course = "" } = {}) {
    const keyword = query.trim().toLocaleLowerCase("id-ID");
    const currentTime = this.now();
    const rank = { high: 0, normal: 1, low: 2 };
    return this.tasks.filter((task) => {
      const { title, notes, completed } = task;
      const matchesQuery = `${title} ${task.course} ${notes}`.toLocaleLowerCase("id-ID").includes(keyword);
      const matchesStatus = status === "all" || (status === "completed" && completed)
        || (status === "pending" && !completed) || (status === "overdue" && isOverdue(task, currentTime));
      return matchesQuery && matchesStatus && (!course || task.course === course);
    }).sort((first, second) => Number(first.completed) - Number(second.completed)
      || getDeadline(first) - getDeadline(second) || rank[first.priority] - rank[second.priority]
      || first.title.localeCompare(second.title, "id"));
  }

  getSummary() {
    const summary = this.tasks.reduce((result, task) => ({
      ...result,
      total: result.total + 1,
      completed: result.completed + Number(task.completed),
      pending: result.pending + Number(!task.completed),
      overdue: result.overdue + Number(isOverdue(task, this.now()))
    }), { total: 0, completed: 0, pending: 0, overdue: 0 });
    return { ...summary, progress: summary.total ? Math.round(summary.completed / summary.total * 100) : 0 };
  }

  getCourses() {
    return getCourseList(this.tasks);
  }

  async fetchJSON(url, timeout = 4000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      if (!this.fetcher) throw new Error("Pengambilan data tidak tersedia.");
      const response = await this.fetcher(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`Permintaan gagal (${response.status}).`);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async loadCourseSuggestions() {
    // Data formulir dibaca secara asinkron dari JSON lokal, tanpa layanan luar.
    try {
      const courses = await this.fetchJSON(new URL("./modules/mata-kuliah.json", import.meta.url).href);
      if (!Array.isArray(courses)) throw new Error("Daftar mata kuliah tidak valid.");
      const validCourses = courses.filter((course) => typeof course === "string" && course.trim() && course.trim().length <= 80);
      return [...new Set([...this.getCourses(), ...validCourses.map((course) => course.trim())])];
    } catch {
      // Tugas tetap bisa dikelola; saran memakai mata kuliah yang sudah tersimpan.
      return this.getCourses();
    }
  }
}
