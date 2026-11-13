class Library:
    def __init__(self):
        self.__koleksi = []

    def tambah_item(self, item):
        """Menambahkan item ke perpustakaan"""
        self.__koleksi.append(item)
        print(f"Item '{item.judul}' berhasil ditambahkan ke perpustakaan.")

    def tampilkan_katalog(self):
        """Menampilkan daftar item yang tersedia (tidak sedang dipinjam)"""
        print("Katalog Item Tersedia: ")
        for item in self.__koleksi:
            if not item.is_dipinjam:
                print(item.get_detail())

    def cari_item(self, kata_kunci: str) -> list:
        """Mencari item berdasarkan id (persis) atau judul (mengandung kata kunci)"""
        kunci = kata_kunci.lower()
        return [
            item for item in self.__koleksi
            if item.id_item.lower() == kunci or kunci in item.judul.lower()
        ]