# SIHRIZAL Portfolio v5 — Tab Interface

Versi ini mengubah website menjadi **aplikasi tab penuh**.

Tidak ada lagi halaman panjang yang mengharuskan visitor scroll dari atas sampai bawah.
Visitor memilih bagian langsung dari menu tengah:

```text
Beranda
Project pilihan
Semua project
Sedang dikerjakan
Kegiatan
Video
Tentang
Kontak
```

Dokumen/body website tidak melakukan scrolling. Beberapa tab yang punya data banyak
memiliki area scroll sendiri, misalnya daftar semua project.

---

# 1. Sumber data

Semua data manual tetap ada di:

```text
src/data/site-content.js
```

Website tidak memakai `portfolio_scan.json`.

---

# 2. Mengubah project

Cari:

```js
export const projects = [
```

Contoh:

```js
{
  id: "antam-bot",
  title: "Antam Bot",
  visible: true,
  featured: true,
  featuredRank: 1,
  category: "Automation",

  description: {
    id: "Deskripsi...",
    en: "Description..."
  },

  platforms: [
    "Windows",
    "Linux",
    "macOS"
  ],

  highlights: {
    id: [
      "Fitur pertama",
      "Fitur kedua"
    ],
    en: [
      "First feature",
      "Second feature"
    ]
  },

  business: {
    users: 120,
    accesses: 1500,

    priceValue: 99000,

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

`Teknologi` dan `Bahasa` sudah dihapus dari Detail Project.

---

# 3. Jumlah pengguna dan akses

## Pengguna

Isi manual:

```js
users: 120,
```

atau update melalui Cloudflare KV.

## Akses

Fallback manual:

```js
accesses: 1500,
```

Website juga memiliki counter akses live.

Saat visitor membuka Detail Project untuk pertama kali dalam satu browser session,
frontend mengirim:

```text
POST /api/stats
action = access
```

Cloudflare KV menambah:

```text
accesses
```

Satu project hanya dihitung sekali per browser session supaya reload/click berulang
tidak terlalu mudah menaikkan angka.

---

# 4. Mengaktifkan statistik live di Cloudflare

Buat KV Namespace, lalu binding di Pages:

```text
PORTFOLIO_STATS
```

Buat secret:

```text
ADMIN_STATS_TOKEN
```

Contoh set users + accesses:

```bash
curl -X POST https://sihrizal.online/api/stats \
  -H "Content-Type: application/json" \
  -H "x-admin-token: TOKEN_ANDA" \
  -d '{
    "action":"set",
    "project":"antam-bot",
    "users":125,
    "accesses":1820
  }'
```

---

# 5. Sorting harga

Untuk sorting harga yang benar, isi:

```js
priceValue: 99000,
```

Jangan pakai format Rp pada `priceValue`.

Yang ditampilkan ke visitor tetap:

```js
price: {
  id: "Rp99.000 / bulan",
  en: "IDR 99,000 / month"
}
```

Pilihan sorting:

```text
Pengguna terbanyak
Pengguna tersedikit
Akses terbanyak
Harga termurah
Harga termahal
Nama A–Z
Nama Z–A
```

---

# 6. Top Program tidak punya section terpisah lagi

Tidak ada lagi:

```text
Top Program
Program yang paling banyak dipakai / diminati.
```

Semua digabung di:

```text
Daftar project
```

Default sorting:

```text
Pengguna terbanyak
```

Project dengan ranking tertinggi mendapat badge:

```text
Top 1
Top 2
Top 3
```

---

# 7. Project pilihan

Tab `Project pilihan` langsung menampilkan card.

Tidak ada lagi heading:

```text
Project pilihan
Beberapa project...
```

Atur pilihan dari:

```js
featured: true,
featuredRank: 1,
```

---

# 8. Tab Tentang

Tab Tentang menggabungkan:

```text
Make it work. Then make it clear.

A Useful first
B Fast by default
C Think in systems
D Test, don't assume
```

dan:

```text
Skill & area yang saya kerjakan
```

Skill diedit di:

```js
export const skills = [
```

Tidak ada persen kemampuan yang dibuat-buat.

---

# 9. Beranda

Klik:

```text
Beranda
```

atau logo `SIHRIZAL`.

Beranda menampilkan:

```text
Hero
Statistik
Foto
Perkenalan
Area pekerjaan
Marquee skill/technology
```

Marquee sudah diperbaiki memakai dua track identik yang bergerak sebagai satu
loop CSS sehingga animasinya tidak berhenti di tengah.

---

# 10. Pemilih tampilan bisa digeser

Widget:

```text
Tampilan
01 Editorial
02 Terminal
03 Studio
```

sekarang bisa di-drag menggunakan ikon grip.

Cara:

```text
klik/tahan ikon grip
→ geser ke tempat yang diinginkan
→ lepas
```

Posisinya disimpan ke:

```text
localStorage
```

Double-click pada grip untuk reset ke posisi kanan bawah.

Setelah menentukan desain final:

```js
showDesignSwitcher: false,
```

---

# 11. Tiga desain

## Editorial

```text
src/styles/editorial.css
```

Warm, tegas, editorial, garis tipis.

## Terminal

```text
src/styles/terminal.css
```

Dark, hijau, developer/system feel.

## Studio

```text
src/styles/studio.css
```

Light, rounded, modern product/studio feel.

CSS umum:

```text
src/styles/base.css
```

---

# 12. Navigasi tab dan bubble effect

Menu tengah:

```text
src/components/TabNavigation.jsx
```

Klik tab memberi:

```text
bubble / pop animation
active pill
hover feedback
```

URL hash tetap berubah:

```text
#home
#work
#index
#current
#activities
#videos
#about
#contact
```

tetapi tidak digunakan untuk scroll halaman.

---

# 13. Test lokal

```bash
npm install
./run.sh
```

Buka:

```text
http://localhost:5173
```

Edit:

```text
src/data/site-content.js
```

Save.

Vite HMR akan memperbarui browser langsung.

---

# 14. Upload/update online

```bash
git add .
git commit -m "Update portfolio tabs v5"
git push
```

Cloudflare Pages otomatis melakukan build dan deploy.

---

# 15. File penting

```text
src/App.jsx
```

Logika tab, sorting, ranking, open project.

```text
src/components/TabNavigation.jsx
```

Menu tengah.

```text
src/components/DesignSwitcher.jsx
```

Pemilih desain draggable.

```text
src/components/views/HomeView.jsx
```

Beranda.

```text
src/components/views/FeaturedView.jsx
```

Project pilihan.

```text
src/components/views/ProjectIndexView.jsx
```

Daftar project + search + sorting + users + accesses.

```text
src/components/views/AboutView.jsx
```

About + skills.

```text
src/components/ProjectDialog.jsx
```

Detail project tanpa Teknologi/Bahasa.

```text
functions/api/stats.js
```

Cloudflare KV users/accesses/requests/interested.

```text
src/data/site-content.js
```

SEMUA DATA MANUAL.
