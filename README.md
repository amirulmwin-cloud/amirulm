# PM & Imbas Petir Web Dashboard

Aplikasi web statis hasil konversi workbook Excel menjadi dashboard web dengan:
- Login frontend (demo)
- Dashboard rekap PIVOT
- Flow Process Imbas Petir
- Seluruh 19 sheet Excel tersedia sebagai data CSV dan dapat dicari
- Responsive untuk desktop dan Android
- Tanpa backend dan tanpa build step

## Upload ke GitHub Pages
1. Buat repository baru di GitHub.
2. Upload seluruh isi folder ini, termasuk folder `data` dan `assets`.
3. Buka **Settings → Pages**.
4. Pilih **Deploy from a branch**, branch `main`, folder `/ (root)`.
5. Simpan. Website akan mendapatkan alamat GitHub Pages.

## Login demo
Username: `admin`
Password: `admin123`

### Penting tentang keamanan
Login di versi ini adalah **frontend-only** agar langsung dapat berjalan di GitHub Pages. Username/password dapat ditemukan oleh orang yang memahami source code sehingga **bukan autentikasi keamanan produksi**.

Untuk login produksi, gunakan Firebase Authentication atau Supabase Auth dan pindahkan validasi pengguna ke layanan backend/auth tersebut. Struktur UI ini sudah siap dijadikan frontend untuk integrasi tersebut.
