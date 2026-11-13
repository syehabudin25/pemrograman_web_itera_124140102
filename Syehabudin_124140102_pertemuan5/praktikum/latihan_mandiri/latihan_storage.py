from abc import ABC, abstractmethod

class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file, data_bytes):
        pass

    @abstractmethod
    def download_file(self, nama_file):
        pass

class LocalDiskStorage(FileStorage):
    def __init__(self):
        self.folder_lokal = {}  

    def upload_file(self, nama_file, data_bytes):
        self.folder_lokal[nama_file] = data_bytes
        print(f"Local Disk, File '{nama_file}' disimpan di folder lokal ({len(data_bytes)} bytes)")

    def download_file(self, nama_file):
        print(f"Local Disk, Mengambil file '{nama_file}' dari folder lokal")
        return self.folder_lokal.get(nama_file)

class CloudStorage(FileStorage):
    def __init__(self):
        self.server_cloud = {} 

    def upload_file(self, nama_file, data_bytes):
        self.server_cloud[nama_file] = data_bytes
        print(f"Cloud, File '{nama_file}' diunggah ke server cloud ({len(data_bytes)} bytes)")

    def download_file(self, nama_file):
        print(f"Cloud, Mengunduh file '{nama_file}' dari server cloud")
        return self.server_cloud.get(nama_file)

if __name__ == "__main__":
    data = b"Halo ITERA"

    for storage in [LocalDiskStorage(), CloudStorage()]:
        storage.upload_file("catatan.txt", data)
        print("Isi file:", storage.download_file("catatan.txt"))