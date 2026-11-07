# ===================================================
# Berkas: password_gen.py
# Deskripsi: Modul kustom penghasil password acak dengan random dan string
# ===================================================

import random
import string

def buat_password_acak(panjang: int = 8) -> str:
    """
    Menghasilkan password acak dari kombinasi huruf (besar/kecil) dan angka.
    Parameter panjang memiliki nilai default 8 jika tidak diisi.
    """
    karakter = string.ascii_letters + string.digits  # a-z, A-Z, 0-9
    password = "".join(random.choice(karakter) for _ in range(panjang))
    return password

# Blok idiom untuk testing mandiri modul
if __name__ == "__main__":
    print("[TEST MODUL] Menjalankan uji coba internal password_gen:")
    print("Password default (8 karakter):", buat_password_acak())