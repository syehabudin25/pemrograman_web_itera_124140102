# ===================================================
# Berkas: main.py
# Deskripsi: Menguji modul kustom password_gen
# ===================================================

import string
import password_gen as pg

# 1. Menguji dengan panjang default dan panjang kustom
print("--- 1. UJI PANJANG PASSWORD ---")
print(f"Default (8 karakter) : {pg.buat_password_acak()}")
print(f"Panjang 12 karakter  : {pg.buat_password_acak(12)}")
print(f"Panjang 16 (keyword) : {pg.buat_password_acak(panjang=16)}")

# 2. Membuat beberapa password sekaligus
print("\n--- 2. DAFTAR 5 PASSWORD ACAK ---")
for urutan in range(1, 6):
    print(f"{urutan}. {pg.buat_password_acak(10)}")

# 3. Memverifikasi hasil: panjang sesuai dan karakter hanya huruf/angka
print("\n--- 3. VERIFIKASI HASIL ---")
password_uji = pg.buat_password_acak(12)
karakter_valid = string.ascii_letters + string.digits

panjang_sesuai = len(password_uji) == 12
hanya_huruf_angka = all(k in karakter_valid for k in password_uji)

print(f"Password uji      : {password_uji}")
print(f"Panjang sesuai 12 : {panjang_sesuai}")
print(f"Hanya huruf/angka : {hanya_huruf_angka}")