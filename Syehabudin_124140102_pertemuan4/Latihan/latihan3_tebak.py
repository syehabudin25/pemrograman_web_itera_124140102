# ===================================================
# Berkas: latihan3_tebak.py
# Deskripsi: Game tebak angka rahasia dengan while-loop, if-elif-else, dan break
# ===================================================

# 1. Menentukan angka rahasia
angka_rahasia = 7

print("--- GAME TEBAK ANGKA RAHASIA ---")

# 2. While loop berulang sampai tebakan benar
while True:
    tebakan = int(input("Masukkan tebakan angka: "))  # input() menghasilkan str, di-casting ke int

    if tebakan < angka_rahasia:
        print("Terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break  # Hentikan loop saat tebakan tepat