# PANDUAN SIHRIZAL PORTFOLIO STANDALONE v4

## Perubahan paling penting

Versi ini **tidak terhubung ke `portfolio_scan.json` sama sekali**.

Satu-satunya file data website adalah:

```text
src/data/site-content.js
```

Cek sendiri:

```bash
./verify-standalone.sh
```

Kalau benar akan muncul:

```text
[OK] Tidak ada portfolio_scan di source website.
[OK] Sumber data utama: src/data/site-content.js
```

---

## Kenapa versi sebelumnya terasa seperti site-content.js tidak berubah?

Versi sebelumnya masih memiliki:

```js
import scan from "@/data/portfolio_scan.json"
```

di `App.jsx`.

Akibatnya beberapa hal seperti:

- daftar project
- statistik
- bahasa project
- teknologi project

masih mengambil data dari scanner.

`site-content.js` hanya mengatur sebagian teks/deskripsi/harga.

Versi v4 menghapus arsitektur itu.

---

# Edit data dan langsung melihat perubahan

Jalankan:

```bash
./run.sh
```

Buka:

```text
http://localhost:5173
```

Biarkan terminal tetap hidup.

Kemudian edit:

```text
src/data/site-content.js
```

Simpan file.

Vite HMR akan memperbarui halaman browser otomatis, biasanya tanpa perlu restart.

Jika tidak berubah:

```text
Ctrl + Shift + R
```

Pastikan Anda mengedit folder yang sedang dijalankan:

```bash
pwd
```

dan:

```bash
grep -n 'brand:' src/data/site-content.js
```

---

# 3 tampilan website

Ada tiga desain yang benar-benar berbeda:

## 1. Editorial

Nama internal:

```text
editorial
```

Gaya:

- warm paper
- grid editorial
- tipografi besar
- garis tipis
- foto menyatu dengan layout
- cocok untuk portfolio personal/profesional

CSS:

```text
src/styles/editorial.css
```

Layout React:

```text
src/layouts/EditorialLayout.jsx
```

---

## 2. Terminal

Nama internal:

```text
terminal
```

Gaya:

- dark / engineering
- sidebar kiri
- mono typography
- grid hijau
- nuansa developer/system
- cocok jika ingin terlihat teknikal

CSS:

```text
src/styles/terminal.css
```

Layout React:

```text
src/layouts/TerminalLayout.jsx
```

---

## 3. Studio

Nama internal:

```text
studio
```

Gaya:

- clean modern
- card/bento
- rounded
- light
- lebih ramah untuk calon klien/non-teknis

CSS:

```text
src/styles/studio.css
```

Layout React:

```text
src/layouts/StudioLayout.jsx
```

---

# Memilih tampilan

Saat website dibuka ada switcher mengambang di bawah:

```text
01 Editorial
02 Terminal
03 Studio
```

Pilihan disimpan ke browser dengan:

```text
localStorage
```

Untuk menentukan desain awal, edit:

```js
defaultDesign: "editorial",
```

pilihan:

```js
defaultDesign: "editorial",
defaultDesign: "terminal",
defaultDesign: "studio",
```

Setelah sudah memilih desain final dan tidak ingin visitor melihat tombol pemilih desain:

```js
showDesignSwitcher: false,
```

---

# Data Project

Semua project sekarang berada langsung di:

```js
export const projects = [
```

Contoh:

```js
{
  id: "aplikasi-saya",
  title: "Aplikasi Saya",

  visible: true,

  featured: true,
  featuredRank: 1,

  description: {
    id: "Deskripsi Bahasa Indonesia.",
    en: "English description."
  },

  technologies: [
    "Go",
    "Redis",
    "WebSocket"
  ],

  languages: [
    "Go",
    "JavaScript"
  ],

  business: {
    users: 120,

    price: {
      id: "Rp99.000 / bulan",
      en: "IDR 99,000 / month"
    },

    license: {
      id: "Lisensi bulanan",
      en: "Monthly license"
    },

    topRank: 1
  }
}
```

Tidak ada scanner yang akan menimpa data ini.

---

# Menyembunyikan project

```js
visible: false,
```

Menampilkan:

```js
visible: true,
```

---

# Menjadikan Project Pilihan

```js
featured: true,
featuredRank: 1,
```

Bukan project pilihan:

```js
featured: false,
featuredRank: null,
```

---

# Top Program

Top Program memakai:

```js
business.users
```

dan:

```js
business.topRank
```

Jika Cloudflare KV sudah aktif, `users` live dari KV mengalahkan angka statis.

Contoh:

```js
business: {
  users: 250,
  topRank: 1,
  ...
}
```

---

# Statistik Hero

Tidak lagi dihitung scanner.

Edit sendiri:

```js
stats: {
  projects: 31,
  sourceLines: 5056831,
  sourceFiles: 7572,
  technologies: 40
},
```

Kalau ingin mengganti angka, edit di situ.

---

# Foto profil

```js
profileImage: "/images/profile-placeholder.webp",
```

Kompres foto asli:

```bash
sudo apt install -y webp
./optimize-image.sh ~/Pictures/foto-saya.jpg profile.webp 720
```

Kemudian:

```js
profileImage: "/images/profile.webp",
```

---

# Project Sedang Dikerjakan

Cari:

```js
export const currentProjects = [
```

Waktu order:

```js
orderedAt: "2026-08-28T14:30:00+07:00",
```

Estimasi:

```js
estimatedDays: 14,
```

Website menghitung otomatis:

- waktu sejak order
- estimasi
- perkiraan selesai

---

# Kegiatan

Cari:

```js
export const activities = [
```

Tambah:

```js
{
  id: "seminar-surabaya",
  demo: false,
  date: "2026-09-10",
  location: "Surabaya",
  image: "/images/seminar.webp",

  title: {
    id: "Seminar Teknologi",
    en: "Technology Seminar"
  },

  description: {
    id: "Deskripsi kegiatan...",
    en: "Activity description..."
  }
}
```

Kompres gambar:

```bash
./optimize-image.sh ~/Pictures/seminar.jpg seminar.webp 1200
```

---

# YouTube

Cari:

```js
export const youtube = {
```

Isi:

```js
channelId: "UCxxxxxxxxxxxxxxxx",
```

Cloudflare Function:

```text
functions/api/youtube.js
```

akan mengambil upload terbaru dari RSS YouTube.

---

# Update website online

Setelah edit:

```bash
git status
git add .
git commit -m "Update portfolio"
git push
```

Cloudflare Pages otomatis build dan deploy.

Untuk development lokal, edit akan langsung terlihat saat:

```bash
./run.sh
```

masih berjalan.

---

# Mengganti project lama dengan v4 tanpa kehilangan .git

Kalau folder GitHub Anda sekarang adalah:

```text
~/coding/projek/portofolio/sihrizal-portfolio-pro
```

Extract v4 di sebelahnya.

Lalu backup:

```bash
cp -a ~/coding/projek/portofolio/sihrizal-portfolio-pro \
      ~/coding/projek/portofolio/sihrizal-portfolio-backup
```

Salin v4 ke repository lama sambil mempertahankan `.git`:

```bash
rsync -av --delete \
  --exclude='.git' \
  ~/coding/projek/portofolio/sihrizal-portfolio-standalone-v4/ \
  ~/coding/projek/portofolio/sihrizal-portfolio-pro/
```

Lalu:

```bash
cd ~/coding/projek/portofolio/sihrizal-portfolio-pro
npm install
./run.sh
```

Kalau sudah bagus:

```bash
git add .
git commit -m "Switch portfolio to standalone v4"
git push
```
