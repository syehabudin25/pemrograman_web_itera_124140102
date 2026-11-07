# ===================================================
# Berkas: 01_pengenalan.py
# Deskripsi: Mengenal sintaks dasar dan fungsi print()
# ===================================================
nama_praktikan = "Syehabudin"
nim_praktikan = 124140102
angkatan = 2024
minat_penelitian = "Pengembangan Aplikasi Web"

# 1. Mencetak data profil dengan print()
print("Nama:", nama_praktikan)
print("NIM:", nim_praktikan)
print("Angkatan:", angkatan)
print("Minat Penelitian:", minat_penelitian)

# 2. Eksperimen parameter sep
print("\nTanpa sep (default spasi):")
print(nama_praktikan, nim_praktikan, angkatan, minat_penelitian)

print("\nDengan sep=' | ':")
print(nama_praktikan, nim_praktikan, angkatan, minat_penelitian, sep=" | ")

# 3. Kartu identitas berbingkai # dengan escape character
garis = "-" * 49

print(f"\n{garis}\n#{'KARTU IDENTITAS'.center(48)}#\n{garis}")
print(f"# {'Nama':<17}: {nama_praktikan:<27} #")
print(f"# {'NIM':<17}: {nim_praktikan:<27} #")
print(f"# {'Angkatan':<17}: {angkatan:<27} #")
print(f"# {'Minat Penelitian':<17}: {minat_penelitian:<27} #")
print(garis)
print("Motto:\t\"Gerak aja dulu\"")