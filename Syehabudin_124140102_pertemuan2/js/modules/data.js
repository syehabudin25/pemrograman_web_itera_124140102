import { toLocalDate } from "./utils.js";

export const STORAGE_KEY = "paw-daftar-tugas-kuliah-v1";

// Data ini hanya contoh awal; tanggal dibuat relatif terhadap hari pertama dibuka.
export const createSampleTasks = (now = new Date()) => {
  const afterDays = (days) => {
    const date = new Date(now);
    date.setDate(date.getDate() + days);
    return toLocalDate(date);
  };
  return [
    { id: "contoh-paw", title: "Membuat personal dashboard", course: "Pengembangan Aplikasi Web", dueDate: afterDays(2), dueTime: "23:59", priority: "high", notes: "Buat daftar tugas kuliah, lengkapi README, lalu unggah ke GitHub.", completed: false },
    { id: "contoh-jarkom", title: "Laporan praktikum jaringan", course: "Jaringan Komputer", dueDate: afterDays(1), dueTime: "20:00", priority: "high", notes: "Periksa konfigurasi dan catat hasil pengujian pada laporan.", completed: false },
    { id: "contoh-pam", title: "Melengkapi aplikasi profil", course: "Pengembangan Aplikasi Mobile", dueDate: afterDays(4), dueTime: "23:59", priority: "normal", notes: "Uji perubahan profil dan rapikan dokumentasi aplikasi.", completed: false },
    { id: "contoh-ai", title: "Review materi planning agent", course: "Kecerdasan Buatan", dueDate: afterDays(-1), dueTime: "23:59", priority: "low", notes: "Baca materi dan kerjakan pertanyaan review.", completed: true }
  ];
};

