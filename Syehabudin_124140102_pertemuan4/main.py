import math_operations 
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin

def main():
    """Memanggil semua fungsi modul dengan beberapa nilai uji."""
    print(f"Konstanta PI dari modul: {math_operations.PI}")

    print("\nPersegi: ")
    for sisi in [8, 8.5]:
        luas = math_operations.luas_persegi(sisi)
        keliling = math_operations.keliling_persegi(sisi)
        print(f"Sisi {sisi:<5} -> Luas: {luas:>8.2f} | Keliling: {keliling:>8.2f}")

    print("\nPersegi Panjang: ")
    for panjang, lebar in [(12, 6), (14.5, 6)]:
        luas = math_operations.luas_persegi_panjang(panjang, lebar)
        keliling = math_operations.keliling_persegi_panjang(panjang, lebar)
        print(f"{panjang} x {lebar:<4} -> Luas: {luas:>8.2f} | Keliling: {keliling:>8.2f}")

    print("\nLingkaran: ")
    for r in [9, 12]:
        luas = math_operations.luas_lingkaran(r)
        keliling = math_operations.keliling_lingkaran(r)
        print(f"Jari-jari {r:<3} -> Luas: {luas:>8.2f} | Keliling: {keliling:>8.2f}")

    print("\nKonversi Suhu: ")
    print(f"{'Celsius':>8} | {'Fahrenheit':>10} | {'Kelvin':>8}")
    print("-" * 34)
    for c in [-30, 0, 46.6, 110]:
        f = celsius_ke_fahrenheit(c)
        k = celsius_ke_kelvin(c)
        print(f"{c:>8} | {f:>10.2f} | {k:>8.2f}")

if __name__ == "__main__":
    main()