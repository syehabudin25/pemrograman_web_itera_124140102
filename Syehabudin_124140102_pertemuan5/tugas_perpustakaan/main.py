from library_item import Book, Magazine
from library import Library
from member import Member

if __name__ == "__main__":
    perpus = Library()

    print("1. Menambahkan Item ke Perpustakaan: ")
    perpus.tambah_item(Book("B001", "PAW", "Syehabudin", 320))
    perpus.tambah_item(Book("B002", "PAM", "Adit", 450))
    perpus.tambah_item(Magazine("M001", "Majalah Teknologi", "Edisi 17"))

    print("\n2. Menampilkan Katalog: ")
    perpus.tampilkan_katalog()

    print("\n3. Mencari Item: ")
    print("Hasil pencarian 'PAW':")
    for item in perpus.cari_item("PAW"):
        print(item.get_detail())
    print("Hasil pencarian id 'M001':")
    for item in perpus.cari_item("M001"):
        print(item.get_detail())

    print("\n4. Status Ketersediaan Item (Peminjaman oleh Member): ")
    buku = perpus.cari_item("B001")[0]
    majalah = perpus.cari_item("M001")[0]
    andi = Member("A001", "Andi")
    siti = Member("A002", "Siti")

    andi.pinjam_item(buku)
    siti.pinjam_item(buku)  
    print("Status B001 dipinjam?", buku.is_dipinjam)
    perpus.tampilkan_katalog()
    andi.tampilkan_pinjaman()
    andi.kembalikan_item(buku)

    print("\n5. Polymorphism, Hitung Denda 4 Hari: ")
    for item in [buku, majalah]:
        print(f"{item.judul}: Rp {item.hitung_denda(4):,}")