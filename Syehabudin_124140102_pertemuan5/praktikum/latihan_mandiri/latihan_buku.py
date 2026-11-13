class Buku:
    """Representasi sebuah buku beserta harga dan jumlah halamannya."""

    def __init__(self, judul: str, penulis: str, harga_asli: float, jumlah_halaman: int):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen: float) -> float:
        """Mengembalikan harga setelah dipotong diskon (dalam persen)."""
        if 0 <= persen <= 100:
            potongan = self.harga_asli * persen / 100
            return self.harga_asli - potongan
        print("Peringatan: Persentase diskon harus berada pada rentang 0 s.d 100!")
        return self.harga_asli

    def __str__(self) -> str:
        """Representasi string berupa kartu buku saat print(objek)."""
        return (
            "Kartu Buku: \n"
            f"Judul: {self.judul}\n"
            f"Penulis: {self.penulis}\n"
            f"Harga Asli: Rp {self.harga_asli:,.2f}\n"
            f"Jumlah Halaman: {self.jumlah_halaman}"
        )

    def __len__(self) -> int:
        """Dipanggil saat len(buku); mengembalikan jumlah halaman."""
        return self.jumlah_halaman

if __name__ == "__main__":
    buku1 = Buku("Pemrograman Python Dasar", "Budi Santoso", 250000, 460)
    buku2 = Buku("Algoritma dan Struktur Data", "Siti Rahma", 300000, 670)

    print(buku1)
    print()
    print(buku2)

    print("\nUji Diskon:")
    print(f"Harga {buku1.judul} setelah diskon 25%: Rp {buku1.hitung_harga_diskon(25):,.2f}")
    print(f"Harga {buku2.judul} setelah diskon 15%: Rp {buku2.hitung_harga_diskon(15):,.2f}")

    print("\nUji len(): ")
    print(f"len(buku1) = {len(buku1)} halaman")
    print(f"len(buku2) = {len(buku2)} halaman")