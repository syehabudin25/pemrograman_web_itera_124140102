# ===================================================
# Berkas: latihan4_validasi.py
# Deskripsi: Fungsi validator password dengan syarat panjang dan angka
# ===================================================

# 1. Fungsi validasi password dengan type hint dan docstring
def validasi_password(password: str) -> bool:
    """
    Mengembalikan True jika password memenuhi dua syarat:
    1. Panjang minimal 8 karakter.
    2. Mengandung setidaknya satu angka.
    """
    panjang_cukup = len(password) >= 8
    ada_angka = any(karakter.isdigit() for karakter in password)
    return panjang_cukup and ada_angka

# 2. Menguji fungsi dengan beberapa contoh password
daftar_uji = [
    "rahasia123", # valid: 10 karakter, ada angka
    "Informatika24", # valid: 13 karakter, ada angka
    "abc12345",  # valid: tepat 8 karakter, ada angka
    "abc123", # tidak valid: kurang dari 8 karakter
    "passwordsaya", # tidak valid: tidak ada angka
    "", # tidak valid: kosong
]

print("--- UJI VALIDATOR PASSWORD ---")
for urutan, pw in enumerate(daftar_uji, start=1):
    hasil = validasi_password(pw)
    status = "VALID" if hasil else "TIDAK VALID"
    print(f"{urutan}. '{pw}' -> {hasil} ({status})")