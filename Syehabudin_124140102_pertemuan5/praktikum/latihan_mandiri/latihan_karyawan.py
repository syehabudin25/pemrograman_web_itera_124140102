class Karyawan:
    """Karyawan dengan gaji pokok private yang tidak boleh di bawah UMR."""

    UMR_MINIMAL = 3200000

    def __init__(self, nama: str, jabatan: str, gaji_pokok: float):
        self.nama = nama
        self.jabatan = jabatan
        self.__gaji_pokok = 0.0
        self.gaji_pokok = gaji_pokok

    @property
    def gaji_pokok(self) -> float:
        """Mengembalikan nilai gaji pokok."""
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, gaji_baru: float):
        if not isinstance(gaji_baru, (int, float)):
            raise TypeError("Gaji pokok harus berupa angka numerik!")
        if gaji_baru < Karyawan.UMR_MINIMAL:
            raise ValueError(
                f"Gaji pokok tidak boleh di bawah UMR (Rp {Karyawan.UMR_MINIMAL:,.2f})!"
            )
        self.__gaji_pokok = float(gaji_baru)

    def hitung_gaji_bersih(self, pajak_persen: float) -> float:
        """Mengembalikan gaji pokok setelah dipotong pajak (dalam persen)."""
        if not 0 <= pajak_persen <= 100:
            raise ValueError("Persentase pajak harus berada pada rentang 0 s.d 100!")
        potongan_pajak = self.__gaji_pokok * pajak_persen / 100
        return self.__gaji_pokok - potongan_pajak

    def __str__(self) -> str:
        return (
            f"Nama       : {self.nama}\n"
            f"Jabatan    : {self.jabatan}\n"
            f"Gaji Pokok : Rp {self.__gaji_pokok:,.2f}"
        )

if __name__ == "__main__":
    kry = Karyawan("Andi Pratama", "Software Engineer", 7000000)

    print("\nData Karyawan: ")
    print(kry)

    print("\nUji Gaji Bersih: ")
    print(f"Gaji bersih (pajak 5%)  : Rp {kry.hitung_gaji_bersih(5):,.2f}")
    print(f"Gaji bersih (pajak 10%) : Rp {kry.hitung_gaji_bersih(10):,.2f}")

    print("\nUji Setter (Gaji Valid):")
    kry.gaji_pokok = 9500000
    print(f"Gaji pokok diperbarui menjadi: Rp {kry.gaji_pokok:,.2f}")

    print("\nUji Setter (Gaji Di Bawah UMR): ")
    try:
        kry.gaji_pokok = 4500000 
    except ValueError as err:
        print(f"Validasi Tertangkap: {err}")

    print("\nUji Proteksi Private Attribute: ")
    try:
        print(kry.__gaji_pokok)  
    except AttributeError:
        print("Akses langsung kry.__gaji_pokok GAGAL karena terlindungi (AttributeError)!")