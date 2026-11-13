# ENTITAS 1: PRODUK
# Barang yang dijual di toko online.

# Atribut (data):
# 1. kode_produk -> identitas unik produk (contoh: "PRD-001")
# 2. nama        -> nama produk (contoh: "Keyboard Mechanical")
# 3. harga       -> harga satuan produk (contoh: 350000)

# Metode (perilaku):
# 1. kurangi_stok(jumlah) -> mengurangi stok ketika produk dibeli
# 2. tampilkan_info()     -> menampilkan kode, nama, dan harga produk

# ENTITAS 2: KERANJANG
# Tempat sementara menampung produk yang ingin dibeli pengguna.

# Atribut (data):
# 1. id_keranjang -> identitas unik keranjang
# 2. pemilik      -> pengguna pemilik keranjang
# 3. daftar_item  -> kumpulan produk beserta jumlahnya

# 1. tambah_item(produk, jumlah) -> memasukkan produk ke dalam keranjang
# 2. hitung_total()              -> menjumlahkan harga seluruh item di keranjang

# ENTITAS 3: PENGGUNA
# Orang yang berbelanja di toko online.

# Atribut (data):
# 1. id_pengguna -> identitas unik pengguna
# 2. nama        -> nama lengkap pengguna
# 3. email       -> alamat email untuk login dan notifikasi

# Metode (perilaku):
# 1. login(email, password) -> memverifikasi identitas pengguna
# 2. checkout(keranjang)    -> memproses pembelian isi keranjang