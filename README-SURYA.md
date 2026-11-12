# Website Surya Home Industry – Abon Surya

Website multi-page berbasis template Acuas (HTML, CSS, Bootstrap 5, JavaScript).

## Menjalankan website
1. Extract folder ZIP.
2. Buka folder ini di VS Code.
3. Jalankan `index.html` menggunakan Live Server.
4. Untuk uji HP, buka DevTools > Device Toolbar atau akses alamat Live Server dari HP yang satu jaringan.

## Halaman
- `index.html` – beranda
- `about.html` – profil, sejarah, visi dan misi
- `organization.html` – struktur dan pembagian tugas
- `products.html` – katalog 28 varian dan filter ayam/sapi
- `product.html` – detail produk berbasis parameter URL
- `production.html` – proses produksi dan mesin
- `legality.html` – sertifikat halal dan daftar 28 produk
- `contact.html` – kontak dan Google Maps

## Fitur transaksi
Pemesanan dilakukan langsung dari tombol **Pesan via WhatsApp** pada kartu produk atau halaman detail produk. Tombol akan membuka WhatsApp admin dengan pesan otomatis yang menyebutkan nama produk yang dipilih. Tidak ada keranjang, login, database, atau payment gateway. Admin mengonfirmasi stok, ukuran kemasan, harga, ongkir, dan pembayaran secara manual.

## Catatan data
- Company profile menyebut berdiri tahun 1996; laporan kerja praktik 2021 menyebut usaha mulai dirintis pada 1995 dan mulai mengurus P-IRT pada 1996. Website menjelaskan perbedaan sumber ini secara terbuka.
- Struktur organisasi dan jam kerja berasal dari laporan tahun 2021; wajib dikonfirmasi sebagai data terkini.
- 28 nama produk diambil dari lampiran Sertifikat Halal BPJPH No. ID34110056926940426 tanggal 16 April 2026.
- Harga yang diaktifkan hanya data toples 175 gram: abon ayam Rp38.000 dan abon sapi Rp48.000 untuk varian original/pedas/keju sesuai pesan yang diterima. Harga dan stok varian lain harus dikonfirmasi admin.
- Alamat, email, Instagram, dan WhatsApp diambil dari company profile. Peta memakai pencarian alamat, bukan koordinat terverifikasi.
- Foto produk, logo, foto lokasi, bagan organisasi, dan foto proses diekstrak dari company profile dan laporan kerja praktik yang diberikan.
- Informasi NIB, P-IRT, serta uji gizi disebut pada company profile, tetapi nomor/dokumen lengkap belum dimasukkan karena belum tersedia secara terbaca.

## Berkas penting
- `css/surya.css` – tema dan responsive override
- `js/products-data.js` – katalog produk
- `js/surya.js` – filter katalog dan tautan pemesanan langsung via WhatsApp
- `assets/` – logo, foto produk, proses, lokasi, dan sertifikat halal

## Catatan lisensi
Template dasar Acuas tetap disertai `LICENSE.txt`. Periksa ketentuan lisensi HTML Codex sebelum penggunaan publik/komersial.
