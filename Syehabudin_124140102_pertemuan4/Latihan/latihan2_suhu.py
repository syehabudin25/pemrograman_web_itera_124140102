# ===================================================
# Berkas: 02_variabel.py
# Deskripsi: Eksplorasi tipe data, f-string, casting, dan operator
# ===================================================

# 1. Menerima input suhu dalam Celcius
print("--- KALKULATOR KONVERSI SUHU ---")
celcius = float(input("Masukkan suhu dalam Celcius (°C): "))  # input() menghasilkan str, di-casting ke float

# 2. Menghitung konversi
fahrenheit = celcius * 9 / 5 + 32   # F = C * 9/5 + 32
kelvin = celcius + 273.15           # K = C + 273.15

# 3. Menampilkan hasil dengan f-string (2 angka di belakang koma)
print("\n--- HASIL KONVERSI ---")
print(f"Celcius    : {celcius:.2f} °C")
print(f"Fahrenheit : {fahrenheit:.2f} °F")
print(f"Kelvin     : {kelvin:.2f} K")