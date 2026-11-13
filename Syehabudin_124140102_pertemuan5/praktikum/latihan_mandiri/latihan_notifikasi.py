class NotifikasiEmail:
    def kirim(self, pesan, penerima):
        print(f"Email, Mengirim ke {penerima}: {pesan}")

class NotifikasiSMS:
    def kirim(self, pesan, penerima):
        print(f"SMS, Mengirim ke {penerima}: {pesan}")

class NotifikasiWhatsApp:
    def kirim(self, pesan, penerima):
        print(f"WhatsApp, Mengirim ke {penerima}: {pesan}")

def broadcast_pengumuman(daftar_channel, pesan):
    """Mengirim pesan siaran darurat ke seluruh kanal sekaligus."""
    for channel in daftar_channel:
        channel.kirim(pesan, "Seluruh Pengguna")

if __name__ == "__main__":
    daftar_channel = [NotifikasiEmail(), NotifikasiSMS(), NotifikasiWhatsApp()]
    broadcast_pengumuman(daftar_channel, "Peringatan darurat: Harap segera evakuasi gedung!")