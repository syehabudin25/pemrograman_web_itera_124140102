# ===================================================
# Berkas: latihan5_kontak.py
# Deskripsi: Katalog kontak sederhana dengan dictionary (tambah, cari, tampilkan)
# ===================================================

# 1. Dictionary awal berisi daftar kontak (nama: nomor telepon)
daftar_kontak = {
    "Syehab": "081234567890",
    "Sigi": "082345678901",
    "Adit": "083456789012",
}

# 2. Fungsi fitur katalog kontak
def tambah_kontak(kontak: dict, nama: str, nomor: str) -> None:
    """Menambahkan kontak baru, atau memperbarui nomor jika nama sudah ada."""
    kontak[nama] = nomor
    print(f"Kontak '{nama}' berhasil disimpan.")

def cari_kontak(kontak: dict, nama: str) -> None:
    """Mencari nomor telepon berdasarkan nama menggunakan .get()."""
    nomor = kontak.get(nama, "Kontak tidak ditemukan")
    print(f"Nomor {nama}: {nomor}")

def tampilkan_semua(kontak: dict) -> None:
    """Menampilkan seluruh kontak yang tersimpan."""
    print("\nDaftar Kontak Tersimpan:")
    if not kontak:
        print("  (belum ada kontak)")
        return
    for urutan, (nama, nomor) in enumerate(kontak.items(), start=1):
        print(f"  {urutan}. {nama:<10}: {nomor}")

# 3. Menjalankan fitur-fitur katalog
print("--- 1. TAMBAH KONTAK BARU ---")
tambah_kontak(daftar_kontak, "Dewi", "084567890123")

print("\n--- 2. CARI KONTAK DENGAN .get() ---")
cari_kontak(daftar_kontak, "Siti") # ada di katalog
cari_kontak(daftar_kontak, "Rian") # tidak ada di katalog

print("\n--- 3. TAMPILKAN SEMUA KONTAK ---")
tampilkan_semua(daftar_kontak)