# Pyramid Mahasiswa

## Identitas

- Nama: Syehabudin
- NIM: 124140102
- Kelas praktikum: RA
- Pertemuan: 6

## Deskripsi aplikasi

Aplikasi ini adalah REST API untuk mengelola data mahasiswa dan mata kuliah. Data disimpan di PostgreSQL dan skema tabelnya dikelola dengan migrasi Alembic. Proyek dibuat dengan template `pyramid-cookiecutter-alchemy`.

### Modul yang dibuat

- **Mahasiswa**: tabel `mahasiswa` dengan kolom `id`, `nim` (unik), `nama`, `jurusan`, `tanggal_lahir`, dan `alamat`.
- **Matakuliah**: tabel `matakuliah` dengan kolom `id`, `kode_mk` (unik), `nama_mk`, `sks`, dan `semester`. Nilai `sks` dan `semester` harus lebih dari 0.

### Endpoint

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/mahasiswa` | Daftar semua mahasiswa |
| GET | `/api/mahasiswa/{id}` | Detail mahasiswa (404 jika tidak ada) |
| POST | `/api/mahasiswa` | Tambah mahasiswa (400 jika field wajib kosong) |
| PUT | `/api/mahasiswa/{id}` | Update data mahasiswa |
| DELETE | `/api/mahasiswa/{id}` | Hapus mahasiswa |
| GET | `/api/matakuliah` | Daftar semua mata kuliah |
| GET | `/api/matakuliah/{id}` | Detail mata kuliah (404 jika tidak ada) |
| POST | `/api/matakuliah` | Tambah mata kuliah (400 jika field kosong atau sks/semester tidak valid) |
| PUT | `/api/matakuliah/{id}` | Update data mata kuliah |
| DELETE | `/api/matakuliah/{id}` | Hapus mata kuliah |

### Penerapan konsep

- **Model dan migrasi:** Setiap tabel didefinisikan sebagai class SQLAlchemy di folder `models/`, lalu dibuat tabelnya lewat revisi Alembic di `alembic/versions/`.
- **Routing:** Setiap route didaftarkan di `routes.py` dengan `request_method` yang sesuai. Nama route harus sama dengan `route_name` di `@view_config`.
- **Validasi:** Field wajib yang kosong menghasilkan status 400. Data yang tidak ditemukan menghasilkan status 404.
- **Seeding:** Script `scripts/initialize_db.py` mengisi data awal mahasiswa dan mata kuliah.

## Cara instalasi

Pastikan Python 3.10 atau lebih baru dan PostgreSQL sudah terpasang. Buat virtual environment, aktifkan, lalu pasang dependensi:

```bash
python -m venv venv
venv\Scripts\activate
pip install --upgrade pip setuptools
pip install cookiecutter
pip install pyramid pyramid_debugtoolbar waitress pyramid_jinja2
pip install -e ".[testing]"
pip install psycopg2-binary
```

Buat database dan user di PostgreSQL:

```sql
CREATE DATABASE pyramid_mahasiswa;
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;
\c pyramid_mahasiswa
GRANT ALL ON SCHEMA public TO pyramid_user;
```

Atur `sqlalchemy.url` di `development.ini`:

```ini
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa
```

## Migrasi dan seeding

```bash
alembic -c development.ini revision --autogenerate -m "create mahasiswa table"
alembic -c development.ini revision --autogenerate -m "create matakuliah table"
alembic -c development.ini upgrade head
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

## Cara menjalankan server

```bash
pserve development.ini --reload
```

Server berjalan di `http://localhost:6543`. Contoh pengujian:

```bash
curl -X GET http://localhost:6543/api/matakuliah
```

## Screenshot hasil pengujian

### Endpoint Mahasiswa

GET semua data dan GET berdasarkan id:
![GET mahasiswa](screenshot/mahasiswa_get.png)

POST berhasil (200) dan POST tanpa NIM (400):
![POST mahasiswa](screenshot/mahasiswa_post.png)

PUT dan DELETE, serta GET id yang sudah dihapus (404):
![PUT DELETE mahasiswa](screenshot/mahasiswa_put_delete.png)

### Endpoint Matakuliah

GET semua data, GET berdasarkan id, dan GET id 999 (404):
![GET matakuliah](screenshot/matakuliah_get.png)

POST berhasil (200), POST tanpa sks (400), dan POST dengan sks 0 (400):
![POST matakuliah](screenshot/matakuliah_post.png)

PUT dan DELETE:
![PUT DELETE matakuliah](screenshot/matakuliah_put_delete.png)