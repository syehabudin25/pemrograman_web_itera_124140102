PI = 3.14159

def luas_persegi(sisi: float) -> float:
    """Mengembalikan luas persegi (sisi * sisi)."""
    return sisi * sisi

def keliling_persegi(sisi: float) -> float:
    """Mengembalikan keliling persegi (4 * sisi)."""
    return 4 * sisi

def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Mengembalikan luas persegi panjang (panjang * lebar)."""
    return panjang * lebar

def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Mengembalikan keliling persegi panjang (2 * (panjang + lebar))."""
    return 2 * (panjang + lebar)

def luas_lingkaran(jari_jari: float) -> float:
    """Mengembalikan luas lingkaran (PI * r * r)."""
    return PI * jari_jari * jari_jari

def keliling_lingkaran(jari_jari: float) -> float:
    """Mengembalikan keliling lingkaran (2 * PI * r)."""
    return 2 * PI * jari_jari

def celsius_ke_fahrenheit(celsius: float) -> float:
    """Mengonversi Celsius ke Fahrenheit (F = C * 9/5 + 32)."""
    return celsius * 9 / 5 + 32

def celsius_ke_kelvin(celsius: float) -> float:
    """Mengonversi Celsius ke Kelvin (K = C + 273.15)."""
    return celsius + 273.15

if __name__ == "__main__":
    print("[TEST MODUL] Menjalankan uji coba internal math_operations:")
    print("Luas persegi sisi 4 =", luas_persegi(4))
    print("Keliling lingkaran r = 7 =", keliling_lingkaran(7))
    print("100 C ke Fahrenheit =", celsius_ke_fahrenheit(100))