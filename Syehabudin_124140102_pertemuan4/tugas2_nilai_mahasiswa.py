data_mahasiswa = [
    {"nama": "Syehab", "nim": "124140102", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Adit",  "nim": "124140078", "nilai_uts": 72, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Ridho", "nim": "124140090", "nilai_uts": 65, "nilai_uas": 60, "nilai_tugas": 70},
    {"nama": "Syahrul", "nim": "124140112", "nilai_uts": 55, "nilai_uas": 58, "nilai_tugas": 60},
    {"nama": "Rian", "nim": "124140105", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
    {"nama": "Eko",   "nim": "124140106", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 75},
]

def tentukan_grade(nilai: float) -> str:
    """Mengembalikan grade A-E sesuai kriteria nilai akhir."""
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"

for mhs in data_mahasiswa:
    mhs["nilai_akhir"] = (0.30 * mhs["nilai_uts"]) + (0.40 * mhs["nilai_uas"]) + (0.30 * mhs["nilai_tugas"])
    mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])

print("Nilai nilainya: ")
garis = "-" * 56
print(garis)
print(f"{'No':<4}{'Nama':<18}{'NIM':<12}{'Nilai Akhir':>12}{'Grade':>8}")
print(garis)
for urutan, mhs in enumerate(data_mahasiswa, start=1):
    print(f"{urutan:<4}{mhs['nama']:<18}{mhs['nim']:<12}{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>8}")
print(garis)

tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

print("\nNilai akhir tertinggi:")
print(f"Nama: {tertinggi['nama']}")
print(f"NIM: {tertinggi['nim']}")
print(f"Nilai Akhir: {tertinggi['nilai_akhir']:.2f}")
print(f"Grade: {tertinggi['grade']}")

print("\nNilai akhir terendah:")
print(f"Nama: {terendah['nama']}")
print(f"NIM: {terendah['nim']}")
print(f"Nilai Akhir: {terendah['nilai_akhir']:.2f}")
print(f"Grade: {terendah['grade']}")