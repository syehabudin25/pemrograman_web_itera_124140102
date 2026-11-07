# Praktikum PAW

Repository ini saya gunakan untuk menyimpan tugas dan latihan praktikum Pemrograman Aplikasi Web di Institut Teknologi Sumatera. Setiap tugas ditempatkan dalam folder sesuai pertemuan agar mudah dibuka dan diperiksa.

## Identitas

- Nama: Syehabudin
- NIM: 124140102
- Kelas praktikum: RA
- Program studi: Teknik Informatika
- Institut Teknologi Sumatera

## Daftar tugas

| Pertemuan | Materi | Tugas dan dokumentasi |
| --- | --- | --- |
| 1 | JavaScript Dasar | [Kasir & Keranjang Belanja Sederhana (Mini POS)](Syehabudin_124140102_pertemuan1/README.md) |
| 2 | JavaScript ES6+ | [Daftar Tugas Kuliah](Syehabudin_124140102_pertemuan2/README.md) |
| 3 | React | [Manajemen Buku Pribadi](Syehabudin_124140102_pertemuan3/README.md) |
| 4 | Python Dasar | [Penghitung BMI, Nilai Mahasiswa, dan Modul Matematika](Syehabudin_124140102_pertemuan4/README.md) |

## Pertemuan 1

Tugas pada pertemuan ini adalah aplikasi kasir sederhana untuk kantin atau toko kampus. Aplikasi menggunakan HTML, CSS, dan JavaScript untuk mengelola barang, menghitung subtotal dan total belanja, memberikan diskon, serta menghitung kembalian. Keranjang disimpan menggunakan `localStorage`.

- [Folder tugas](Syehabudin_124140102_pertemuan1/)
- [Dokumentasi lengkap dan screenshot aplikasi](Syehabudin_124140102_pertemuan1/README.md)
- [Latihan modul JavaScript](Syehabudin_124140102_pertemuan1/modul/)

## Pertemuan 2

Pada pertemuan ini, saya membuat aplikasi daftar tugas kuliah menggunakan HTML, CSS, dan JavaScript ES6+. Aplikasi ini bisa digunakan untuk menambah, mengedit, menghapus, dan menandai tugas yang sudah selesai. Setiap tugas memiliki mata kuliah, tenggat waktu, prioritas, dan catatan.

Saya juga menambahkan pencarian, filter, serta ringkasan progres penyelesaian tugas. Data disimpan menggunakan `localStorage` agar tetap tersedia saat halaman dibuka kembali. Latihan materi ES6+ ditempatkan di folder `praktikum`.

- [Folder tugas](Syehabudin_124140102_pertemuan2/)
- [Dokumentasi lengkap dan screenshot aplikasi](Syehabudin_124140102_pertemuan2/README.md)
- [Latihan praktikum JavaScript ES6+](Syehabudin_124140102_pertemuan2/praktikum/)


## Cara menjalankan pertemuan 1 dan 2

1. Download atau clone repository ini, lalu buka di VS Code.
2. Pilih folder pertemuan yang ingin dijalankan.
3. Klik kanan `index.html`, lalu pilih **Open with Live Server**.

Untuk pertemuan 2, gunakan Live Server karena aplikasi memakai JavaScript modules dan mengambil data JSON. Penjelasan fitur, latihan, dan screenshot tersedia di README masing-masing pertemuan.

## Pertemuan 3

Pada pertemuan ini, saya membuat aplikasi manajemen buku pribadi menggunakan React dan Vite. Aplikasi ini bisa digunakan untuk menambah, mengedit, dan menghapus buku. Setiap buku memiliki judul, penulis, dan status (milik, baca, atau beli), dengan validasi agar kolom wajib tidak boleh kosong.

Saya juga menambahkan pencarian berdasarkan judul atau penulis, filter berdasarkan status, serta halaman statistik. Aplikasi memakai React Router untuk beberapa halaman, Context API untuk data bersama, dan custom hooks `useLocalStorage` serta `useBookStats`. Data disimpan menggunakan `localStorage` agar tetap tersedia saat halaman dibuka kembali. Pengujian dilakukan dengan 7 unit test menggunakan Vitest dan React Testing Library.

- [Folder tugas](Syehabudin_124140102_pertemuan3/)
- [Dokumentasi lengkap dan screenshot aplikasi](Syehabudin_124140102_pertemuan3/README.md)

## Cara menjalankan pertemuan 3

1. Buka terminal, lalu masuk ke folder `Syehabudin_124140102_pertemuan3`.
2. Jalankan `npm install`, kemudian `npm run dev`.
3. Buka alamat yang muncul di terminal (biasanya `http://localhost:5173/`).


## Pertemuan 4

Pada pertemuan ini, saya mengerjakan tiga program Python dasar. Program pertama menghitung BMI dari berat dan tinggi badan, lalu menentukan kategorinya dengan percabangan `if-elif-else`. Program kedua mengolah data nilai mahasiswa dalam list berisi dictionary, menghitung nilai akhir berbobot, menentukan grade, dan mencari nilai tertinggi dan terendah.

Program ketiga adalah modul `math_operations` yang berisi konstanta, rumus luas dan keliling bangun datar, serta konversi suhu. Modul ini diuji lewat `main.py` dengan dua cara impor. Latihan materi Python ditempatkan di folder `Latihan`.

- [Folder tugas](Syehabudin_124140102_pertemuan4/)
- [Dokumentasi lengkap dan screenshot program](Syehabudin_124140102_pertemuan4/README.md)
- [Latihan Python](Syehabudin_124140102_pertemuan4/Latihan/)

## Cara menjalankan pertemuan 4

1. Pastikan Python 3.8 atau lebih baru sudah terpasang.
2. Buka terminal, lalu masuk ke folder `Syehabudin_124140102_pertemuan4`.
3. Jalankan `py tugas1_bmi.py`, `py tugas2_nilai_mahasiswa.py`, atau `py main.py`.