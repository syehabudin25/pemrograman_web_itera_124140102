class Kendaraan:
    def __init__(self, merek: str, model: str, tahun: int):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0 

    def deskripsi(self) -> str:
        return f"{self.merek} {self.model} ({self.tahun})"

    def tambah_jarak(self, km: float):
        if km > 0:
            self.odometer += km
            print(f"[{self.merek}] Menempuh perjalanan +{km} km. Total Odo: {self.odometer} km")
        else:
            print("Nilai kilometer tambahan tidak valid!")

    def klakson(self) -> str:
        return "Tin tin!"

class Truk(Kendaraan):
    """Truk ekspedisi kargo dengan batas kapasitas muatan."""

    def __init__(self, merek: str, model: str, tahun: int, kapasitas_maksimal_ton: float):
        super().__init__(merek, model, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0.0

    def muat_barang(self, berat_ton: float) -> bool:
        """Menambah muatan jika tidak melampaui kapasitas maksimal truk."""
        if berat_ton <= 0:
            print("Gagal: Berat muatan harus lebih dari 0 ton!")
            return False

        if self.muatan_saat_ini + berat_ton > self.kapasitas_maksimal_ton:
            print(
                f"[{self.merek} {self.model}] Gagal: Muatan melebihi kapasitas maksimal! "
                f"(Muatan saat ini: {self.muatan_saat_ini} ton, Tambahan: {berat_ton} ton, "
                f"Kapasitas: {self.kapasitas_maksimal_ton} ton)"
            )
            return False

        self.muatan_saat_ini += berat_ton
        print(
            f"[{self.merek} {self.model}] Memuat {berat_ton} ton. "
            f"Muatan saat ini: {self.muatan_saat_ini}/{self.kapasitas_maksimal_ton} ton"
        )
        return True

    def deskripsi(self) -> str:
        deskripsi_dasar = super().deskripsi()
        return (
            f"{deskripsi_dasar} [Truk Tipper, Kapasitas: {self.kapasitas_maksimal_ton} ton, "
            f"Muatan: {self.muatan_saat_ini} ton]"
        )

if __name__ == "__main__":
    truk = Truk("Trinton ", "Truk Tipper", 2026, kapasitas_maksimal_ton=30.0)

    print("Deskripsi Awal:")
    print(truk.deskripsi())

    print("\nUji Muat Barang: ")
    truk.muat_barang(4.5)  
    truk.muat_barang(6.0) 
    truk.muat_barang(6.5) 

    print("\nDeskripsi Setelah Dimuat: ")
    print(truk.deskripsi())

    print("\nMethod Warisan dari Kendaraan:")
    truk.tambah_jarak(87.5)
    print("Klakson:", truk.klakson())