# Tutorial Edit & Update SIHRIZAL Portfolio Pro v3

Panduan ini menjelaskan **file mana yang diedit**, cara mengisi data project, project berjalan, top program, kegiatan, foto, YouTube, statistik live, optimasi gambar, test lokal, dan update Cloudflare Pages.

---

## 1. File utama untuk mengedit data

Mayoritas data yang sering Anda ubah ada di:

```text
src/data/site-content.js
```

Anda **tidak perlu mengedit `App.jsx`** hanya untuk mengganti data.

Di file itu terdapat:

```text
site
copy
projectNotes
projectBusiness
currentProjects
activities
youtube
```

---

# 2. Edit identitas, bio, email, GitHub, foto

Cari:

```js
export const site = {
```

Contoh:

```js
export const site = {
  brand: "SIHRIZAL",
  location: "Indonesia",
  email: "hello@sihrizal.online",
  github: "https://github.com/sokipman4-png",
  profileImage: "/images/profile.webp",
}
```

Untuk bio Bahasa Indonesia / English cari:

```js
copy.id.bio
copy.en.bio
```

---

# 3. Mengganti foto profil

Versi bawaan menggunakan:

```text
public/images/profile-placeholder.webp
```

Cara yang disarankan:

```bash
sudo apt update
sudo apt install -y webp

./optimize-image.sh ~/Pictures/foto-saya.jpg profile.webp 720
```

Lalu edit:

```js
profileImage: "/images/profile.webp",
```

Target yang bagus untuk portfolio:

- lebar sekitar 600–800 px
- format WebP
- kualitas sekitar 75–80
- idealnya file di bawah 150 KB

Script `optimize-image.sh` sudah melakukan kompresi WebP.

---

# 4. Edit deskripsi project

Cari:

```js
export const projectNotes = {
```

Contoh:

```js
"antam-bot": {
  title: "Antam Bot",
  id: "Deskripsi Bahasa Indonesia...",
  en: "English description...",
},
```

Nama key **harus sama** dengan nama project di `portfolio_scan.json`.

---

# 5. Harga, jenis lisensi, jumlah user, dan Top Program

Cari:

```js
export const projectBusiness = {
```

Contoh lisensi bulanan:

```js
"nama-project": {
  users: 120,
  price: {
    id: "Rp99.000 / bulan",
    en: "IDR 99,000 / month",
  },
  license: {
    id: "Lisensi bulanan",
    en: "Monthly license",
  },
  topRank: 1,
},
```

Contoh beli hak milik / full code:

```js
"nama-project": {
  users: 18,
  price: {
    id: "Rp4.500.000",
    en: "IDR 4,500,000",
  },
  license: {
    id: "Beli hak milik / full code",
    en: "Full-code ownership",
  },
  topRank: 2,
},
```

`topRank` digunakan sebagai urutan cadangan.

Jika statistik live aktif, Top Program akan lebih mengutamakan:

```text
users terbesar
```

daripada `topRank`.

Jika jumlah user belum ingin diumumkan:

```js
users: null,
```

---

# 6. Project yang sedang dikerjakan

Cari:

```js
export const currentProjects = [
```

Contoh:

```js
{
  id: "project-klien-a",
  demo: false,

  name: {
    id: "Sistem Absensi",
    en: "Attendance System",
  },

  purpose: {
    id: "Mencatat absensi pegawai dan membuat laporan otomatis.",
    en: "Track employee attendance and generate reports automatically.",
  },

  description: {
    id: "Aplikasi web + dashboard admin untuk perusahaan.",
    en: "Web application with an admin dashboard for a company.",
  },

  price: {
    id: "Rp3.500.000",
    en: "IDR 3,500,000",
  },

  orderedAt: "2026-08-28T14:30:00+07:00",

  estimatedDays: 14,

  requests: 3,
  interestBase: 12,
},
```

### `orderedAt`

Gunakan format ISO:

```text
YYYY-MM-DDTHH:MM:SS+07:00
```

Contoh WIB:

```text
2026-08-28T14:30:00+07:00
```

Website otomatis menghitung:

```text
Waktu order
Sudah berjalan
Estimasi
Perkiraan selesai
```

Jadi **durasi tidak perlu diubah manual setiap hari**.

JavaScript memperbarui tampilan waktu setiap 1 menit.

### Menambah project aktif kedua

Tambahkan objek baru setelah objek pertama:

```js
export const currentProjects = [
  { ...projectPertama },
  { ...projectKedua },
]
```

---

# 7. Jumlah permintaan dan peminat real-time

Website memiliki Cloudflare Pages Function:

```text
functions/api/stats.js
```

Tanpa konfigurasi tambahan, website tetap bekerja dengan angka fallback dari:

```js
requests
interestBase
users
```

Untuk benar-benar live, gunakan Cloudflare KV.

## A. Buat KV namespace

Cloudflare Dashboard:

```text
Storage & Databases
→ KV
→ Create namespace
```

Contoh nama:

```text
portfolio-stats
```

## B. Hubungkan KV ke Pages

Masuk:

```text
Workers & Pages
→ portfolio
→ Settings
→ Bindings
→ Add binding
→ KV namespace
```

Isi variable name **persis**:

```text
PORTFOLIO_STATS
```

Pilih namespace:

```text
portfolio-stats
```

Simpan dan redeploy.

## C. Buat admin token

Di project Pages:

```text
Settings
→ Variables and Secrets
```

Tambahkan Secret:

```text
ADMIN_STATS_TOKEN
```

Isi token panjang buatan Anda sendiri.

Contoh generate di Lubuntu:

```bash
openssl rand -hex 32
```

Simpan token tersebut secara privat.

---

# 8. Update user / jumlah permintaan live dari terminal

Setelah KV dan token aktif:

```bash
curl -X POST https://sihrizal.online/api/stats \
  -H "Content-Type: application/json" \
  -H "x-admin-token: TOKEN_ANDA" \
  -d '{
    "action":"set",
    "project":"antam-bot",
    "users":125,
    "requests":37
  }'
```

Contoh update jumlah user saja:

```bash
curl -X POST https://sihrizal.online/api/stats \
  -H "Content-Type: application/json" \
  -H "x-admin-token: TOKEN_ANDA" \
  -d '{
    "action":"set",
    "project":"antam-bot",
    "users":130
  }'
```

Untuk project yang sedang berjalan gunakan `id`, bukan nama tampilannya:

```bash
curl -X POST https://sihrizal.online/api/stats \
  -H "Content-Type: application/json" \
  -H "x-admin-token: TOKEN_ANDA" \
  -d '{
    "action":"set",
    "project":"project-klien-a",
    "requests":4,
    "interested":21
  }'
```

Website mengecek data live setiap sekitar 30 detik.

---

# 9. Bagaimana angka "Peminat" menjadi live?

Pada project aktif ada tombol:

```text
Saya tertarik
```

Jika Cloudflare KV aktif, klik visitor akan POST ke:

```text
/api/stats
```

Cloudflare menyimpan jumlah peminat.

Sistem juga membuat hash dari IP visitor agar satu IP tidak menaikkan angka berkali-kali untuk project yang sama.

IP asli tidak disimpan sebagai teks biasa.

---

# 10. Kegiatan / seminar / perjalanan seperti berita pribadi

Cari:

```js
export const activities = [
```

Contoh:

```js
{
  id: "seminar-surabaya-2026",
  demo: false,
  date: "2026-09-12",
  location: "Surabaya",
  image: "/images/seminar-surabaya.webp",

  title: {
    id: "Sharing Session: Membangun Sistem Realtime",
    en: "Sharing Session: Building Realtime Systems",
  },

  description: {
    id: "Mengisi sesi mengenai pengembangan sistem realtime dan pengalaman membangun produk.",
    en: "A session about realtime-system development and lessons from building products.",
  },
},
```

Foto kegiatan:

```bash
./optimize-image.sh ~/Pictures/seminar.jpg seminar-surabaya.webp 1200
```

Hasil:

```text
public/images/seminar-surabaya.webp
```

Untuk menambah berita/kegiatan kedua, tambahkan objek baru.

---

# 11. YouTube otomatis

Konfigurasi:

```js
export const youtube = {
  channelId: "",
  channelUrl: "",
  maxVideos: 6,
  manualVideos: [],
}
```

Isi Channel ID:

```js
channelId: "UCxxxxxxxxxxxxxxxxxxxxxx",
```

Channel ID **bukan** handle `@nama`.

Biasanya Channel ID dimulai:

```text
UC...
```

Pada Cloudflare Pages, endpoint:

```text
/functions/api/youtube.js
```

akan membaca RSS feed resmi upload channel dan mengembalikan video terbaru.

Jadi ketika Anda upload video baru ke YouTube, website tidak perlu diedit untuk menambah thumbnail satu per satu.

Cache feed sekitar 10 menit agar cepat dan tidak meminta YouTube pada setiap page view.

Thumbnail yang dipakai:

```text
mqdefault.jpg
```

bukan resolusi sangat besar, supaya halaman lebih ringan.

### Test endpoint setelah deploy

```text
https://sihrizal.online/api/youtube?channelId=CHANNEL_ID_ANDA&limit=6
```

Jika berhasil akan muncul JSON berisi video.

### Saat test dengan `./run.sh`

Vite lokal tidak menjalankan Cloudflare Pages Functions.

Jadi video otomatis paling akurat dites setelah deploy ke Cloudflare.

Anda tetap bisa mengisi `manualVideos` untuk fallback lokal.

---

# 12. Menambah video manual

```js
manualVideos: [
  {
    id: "VIDEO_ID",
    title: "Judul tutorial saya",
    url: "https://www.youtube.com/watch?v=VIDEO_ID",
    publishedAt: "2026-08-28T10:00:00Z",
  },
],
```

Thumbnail otomatis dibentuk dari `VIDEO_ID`.

---

# 13. Menu / tab baru

Navigasi sekarang memiliki:

```text
Project pilihan
Semua project
Sedang dikerjakan
Kegiatan
Video
Tentang
Kontak
```

Versi English otomatis mengikuti pilihan bahasa.

---

# 14. Test website lokal

```bash
cd ~/coding/projek/portofolio/sihrizal-portfolio-pro-v3
chmod +x run.sh build.sh update-scan.sh optimize-image.sh
./run.sh
```

Buka:

```text
http://localhost:5173
```

---

# 15. Build production

```bash
./build.sh
```

atau:

```bash
npm run build
```

Output:

```text
dist/
```

---

# 16. Upload / update website online

Setelah edit dan test:

```bash
git status
git add .
git commit -m "Update portfolio"
git push
```

Karena GitHub sudah terhubung ke Cloudflare Pages:

```text
git push
→ GitHub
→ Cloudflare Pages build
→ sihrizal.online otomatis diperbarui
```

Cek:

```text
Cloudflare
→ Workers & Pages
→ portfolio
→ Deployments
```

Tunggu status:

```text
Success
```

Lalu buka:

```text
https://sihrizal.online
```

Jika browser masih menampilkan versi lama:

```text
Ctrl + Shift + R
```

---

# 17. File penting

```text
src/data/site-content.js
```

Isi bio, project, harga, lisensi, project aktif, kegiatan, YouTube.

```text
src/data/portfolio_scan.json
```

Data hasil scanner project.

```text
src/components/ProjectDialog.jsx
```

Layout popup Detail Project.

```text
src/components/CurrentProjectCard.jsx
```

Layout project yang sedang dikerjakan.

```text
src/components/TopPrograms.jsx
```

Layout Top Program.

```text
src/components/ActivitiesSection.jsx
```

Layout kegiatan/blog.

```text
src/components/YouTubeSection.jsx
```

Layout video YouTube.

```text
functions/api/stats.js
```

API statistik live menggunakan Cloudflare KV.

```text
functions/api/youtube.js
```

API feed YouTube otomatis.

```text
public/images/
```

Foto profil dan foto kegiatan.

---

# 18. Rekomendasi ukuran gambar

## Foto profil

```text
WebP
600–800 px lebar
< 150 KB
```

## Foto seminar/kegiatan

```text
WebP
1000–1200 px lebar
< 250 KB
```

## Thumbnail YouTube

Website memakai thumbnail YouTube ukuran medium secara otomatis.

Tidak perlu mengupload ulang thumbnail YouTube ke website.

---

# 19. Catatan tentang "real-time"

Ada dua jenis data:

### Otomatis tanpa backend

```text
waktu sejak order
perkiraan selesai
tanggal order
```

Semua dihitung dari `orderedAt`.

### Membutuhkan penyimpanan server

```text
jumlah pengguna
jumlah permintaan
jumlah peminat
```

Versi v3 sudah menyediakan backend Cloudflare KV untuk ini.

Tanpa KV, angka tetap menggunakan nilai yang Anda isi di `site-content.js`.

Dengan KV, angka dapat berubah tanpa mengedit/redeploy source website.
