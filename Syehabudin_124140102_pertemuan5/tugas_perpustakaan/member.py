class Member:
    def __init__(self, id_member: str, nama: str):
        self.id_member = id_member
        self.nama = nama
        self.__daftar_pinjam = []

    def pinjam_item(self, item):
        """Meminjam item jika item belum dipinjam anggota lain"""
        if item.is_dipinjam:
            print(f"Gagal: '{item.judul}' sedang dipinjam!")
            return
        item.pinjam()
        self.__daftar_pinjam.append(item)

    def kembalikan_item(self, item):
        """Mengembalikan item yang sedang dipinjam anggota ini"""
        if item in self.__daftar_pinjam:
            item.kembalikan()
            self.__daftar_pinjam.remove(item)
        else:
            print(f"Gagal: {self.nama} tidak sedang meminjam '{item.judul}'!")

    def tampilkan_pinjaman(self):
        """Menampilkan daftar item yang sedang dipinjam anggota"""
        print(f"Daftar Pinjaman {self.nama} ({self.id_member}): ")
        for item in self.__daftar_pinjam:
            print(f" - {item.judul}")