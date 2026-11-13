from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, id_item: str, judul: str):
        self._id_item = id_item
        self._judul = judul
        self.__dipinjam = False

    @property
    def id_item(self) -> str:
        """Mengembalikan id item"""
        return self._id_item

    @property
    def judul(self) -> str:
        """Mengembalikan judul item"""
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        """Mengembalikan status peminjaman item"""
        return self.__dipinjam

    def pinjam(self):
        if self.__dipinjam:
            print(f"Gagal: '{self._judul}' sedang dipinjam!")
        else:
            self.__dipinjam = True
            print(f"'{self._judul}' berhasil dipinjam.")

    def kembalikan(self):
        self.__dipinjam = False
        print(f"'{self._judul}' telah dikembalikan.")

    def _status(self) -> str:
        return "Dipinjam" if self.__dipinjam else "Tersedia"

    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan detail item"""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> int:
        """Menghitung denda keterlambatan"""
        pass

class Book(LibraryItem):
    def __init__(self, id_item: str, judul: str, penulis: str, jumlah_halaman: int):
        super().__init__(id_item, judul)
        self._penulis = penulis
        self._jumlah_halaman = jumlah_halaman

    def get_detail(self) -> str:
        return (
            f"Buku, {self._id_item} | {self._judul} | Penulis: {self._penulis} "
            f"| {self._jumlah_halaman} hlm | {self._status()}"
        )

    def hitung_denda(self, hari_terlambat: int) -> int:
        return hari_terlambat * 1000  

class Magazine(LibraryItem):
    def __init__(self, id_item: str, judul: str, edisi: str):
        super().__init__(id_item, judul)
        self._edisi = edisi

    def get_detail(self) -> str:
        return f"Majalah, {self._id_item} | {self._judul} | {self._edisi} | {self._status()}"

    def hitung_denda(self, hari_terlambat: int) -> int:
        return hari_terlambat * 500  