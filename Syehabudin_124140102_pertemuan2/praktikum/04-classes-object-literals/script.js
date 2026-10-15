import { byId, showJSON } from "../utils.js";

export class Product {
  constructor(name = "Produk", price = 0) {
    if (typeof name !== "string" || !name.trim()) throw new Error("Nama produk wajib diisi.");
    this.name = name.trim();
    this.price = price;
  }
  get price() { return this._price; }
  set price(value) {
    if (!Number.isFinite(value) || value < 0) throw new Error("Harga harus berupa angka minimal 0.");
    this._price = value;
  }
  getInfo() { return { name: this.name, price: this.price }; }
}

export class DigitalProduct extends Product {
  constructor(name = "E-book", price = 15000, fileSizeMB = 12) {
    super(name, price);
    if (!Number.isFinite(fileSizeMB) || fileSizeMB <= 0) throw new Error("Ukuran file harus lebih dari 0.");
    this.fileSizeMB = fileSizeMB;
  }
  getInfo() { return { ...super.getInfo(), type: "digital", fileSizeMB: this.fileSizeMB }; }
  delivery() { return `Tautan unduhan untuk ${this.name} (${this.fileSizeMB} MB).`; }
}

export class PhysicalProduct extends Product {
  constructor(name = "Buku catatan", price = 20000, weightGrams = 250) {
    super(name, price);
    if (!Number.isFinite(weightGrams) || weightGrams <= 0) throw new Error("Berat harus lebih dari 0.");
    this.weightGrams = weightGrams;
  }
  getInfo() { return { ...super.getInfo(), type: "physical", weightGrams: this.weightGrams }; }
  delivery() { return `${this.name} dikirim sebagai paket seberat ${this.weightGrams} gram.`; }
}

// Nama properti ditentukan saat fungsi dipanggil, bukan ditulis tetap.
export const dynamicRecord = (product, key = "harga") => {
  const name = product.name;
  return { name, [key]: product.price };
};

// Parameter berupa objek yang di-destructure, dengan nilai default.
export const calculateOrder = ({ price = 10000, quantity = 1, discount = 0 } = {}) => {
  if (!Number.isFinite(price) || price < 0 || !Number.isInteger(quantity) || quantity < 1
      || !Number.isFinite(discount) || discount < 0 || discount > 1) throw new Error("Parameter pesanan tidak valid.");
  return { price, quantity, discount, total: price * quantity * (1 - discount) };
};

if (typeof document !== "undefined") {
  const run = () => {
    byId("hasil-class").classList.remove("error");
    try {
      const name = byId("nama-produk").value.trim();
      const price = Number(byId("harga").value);
      const newPrice = Number(byId("harga-baru").value);
      const product = byId("jenis").value === "digital"
        ? new DigitalProduct(name, price) : new PhysicalProduct(name, price);
      const before = product.price;
      product.price = newPrice; // Menggunakan setter, kemudian getter.
      showJSON("hasil-class", {
        before, after: product.price, data: product.getInfo(),
        inheritedFromProduct: product instanceof Product, delivery: product.delivery()
      });
      showJSON("hasil-dynamic", dynamicRecord(product, byId("kunci").value.trim() || "harga"));
      showJSON("hasil-default", {
        noArgument: calculateOrder(),
        withArgument: calculateOrder({ price: product.price, quantity: Number(byId("jumlah").value), discount: 0.1 })
      });
      showJSON("hasil-inheritance", [new DigitalProduct().getInfo(), new PhysicalProduct().getInfo()]);
    } catch (error) {
      showJSON("hasil-class", error.message);
      byId("hasil-class").classList.add("error");
      ["hasil-dynamic", "hasil-default", "hasil-inheritance"].forEach((id) => { byId(id).textContent = ""; });
    }
  };
  byId("form-produk").addEventListener("submit", (event) => { event.preventDefault(); run(); });
  run();
}
