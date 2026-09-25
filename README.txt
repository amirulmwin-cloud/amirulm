SPEEDTEST PRO — ONLINE STATIC WEBSITE

File:
- index.html
- style.css
- script.js

TIDAK MEMBUTUHKAN LOCALHOST
Upload ketiga file ke GitHub Pages, Cloudflare Pages, Netlify, atau hosting static lainnya.

GitHub Pages:
1. Buat repository.
2. Upload semua file.
3. Settings > Pages.
4. Deploy dari branch main / root.
5. Buka URL GitHub Pages.

Fitur:
- Gauge/speedometer
- Download & upload Mbps
- Ping & jitter
- IP address
- Connection info
- Server selector UI
- Riwayat hasil menggunakan localStorage
- Responsive HP/PC
- Tidak membutuhkan PHP/database/XAMPP

CATATAN SERVER:
Pilihan server pada UI adalah label pilihan. Endpoint pengujian saat ini menggunakan Cloudflare Speed Test publik. Jika ingin server Indonesia yang benar-benar dedicated dan dapat dipilih berdasarkan lokasi, deploy backend LibreSpeed di server/VPS Indonesia lalu ubah endpoint pada script.js.

UPDATE: Gauge sekarang menggunakan animasi jarum smooth/easing dan efek glow bergerak saat nilai speed berubah.
