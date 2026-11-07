berat = float(input("Masukkan berat badan (kg): "))    # input() menghasilkan str, di-casting ke float
tinggi = float(input("Masukkan tinggi badan (m): "))

bmi = berat / (tinggi * tinggi)

if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:           # 18.5 <= BMI < 25
    kategori = "Berat badan normal"
elif bmi < 30:           # 25 <= BMI < 30
    kategori = "Berat badan berlebih"
else:                    # BMI >= 30
    kategori = "Obesitas"

print("\nHasil Perhitungan BMI:")
print(f"Berat badan : {berat} kg")
print(f"Tinggi badan: {tinggi} m")
print(f"Nilai BMI   : {bmi:.2f}")
print(f"Kategori    : {kategori}")