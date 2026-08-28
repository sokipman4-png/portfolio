# SIHRIZAL Portfolio Pro — v2

Versi ini memakai data `portfolio_scan.json`, tetapi tampilan publik sengaja tidak menampilkan statistik internal per-project seperti jumlah file, jumlah baris, ukuran source, path lokal, project markers, atau primary stack.

## Jalankan

```bash
chmod +x run.sh build.sh update-scan.sh
./run.sh
```

Buka:

```text
http://localhost:5173
```

## Bagian paling penting untuk diedit

### 1. Bio, kontak, bahasa, project tersembunyi, ticker teknologi

Edit:

```text
src/data/site-content.js
```

Di file itu Anda bisa mengganti:

- email
- GitHub
- bio Indonesia dan English
- headline hero
- teks navigasi
- daftar teknologi yang berjalan
- project yang tidak ingin dipublikasikan
- deskripsi khusus project

### 2. Deskripsi popup project

Masih di:

```text
src/data/site-content.js
```

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

Ini menggantikan teks lama seperti `Local project / scan record` dan paragraf generik scanner.

### 3. Data scanner

Data mentah tetap berada di:

```text
src/data/portfolio_scan.json
```

Update dengan:

```bash
./update-scan.sh /path/ke/portfolio_scan.json
```

## Bahasa

Saat pertama kali website dibuka, visitor memilih:

- ID — Bahasa Indonesia
- EN — English

Pilihan disimpan di `localStorage`. Bahasa bisa diganti lagi dari header atau tombol bahasa di footer.

Untuk memaksa dialog pilihan bahasa muncul lagi saat testing, buka DevTools → Application/Storage → Local Storage lalu hapus:

```text
portfolio-language
```

atau dari Console browser:

```js
localStorage.removeItem("portfolio-language")
location.reload()
```

## Apa yang tampil dari scanner?

Yang dipertahankan sebagai statistik global:

- jumlah project terdeteksi
- jumlah source lines
- jumlah source files
- jumlah teknologi terdeteksi

Pada detail project, website hanya menampilkan:

1. nama project
2. deskripsi project
3. teknologi yang sudah dinormalisasi / deduplikasi
4. bahasa source yang terdeteksi, tanpa jumlah file/baris

Kategori data/config seperti JSON, Markdown, YAML, TOML, INI, CMake dan Makefile tidak lagi ditampilkan sebagai `Languages` pada popup publik.

## Normalisasi teknologi

Ada beberapa label scanner yang sebenarnya duplikat atau build metadata. Website membersihkannya sebelum ditampilkan. Contoh:

```text
Go Modules          → Go
Node.js / NPM       → Node.js
NPM                 → dihilangkan
Python / pip        → Python
Dart / Flutter      → Flutter
BLE/flutter_blue_plus → Bluetooth LE
Kotlin Android      → Kotlin
Gradle Wrapper + Gradle/Kotlin DSL → Gradle
```

Logikanya berada di:

```text
src/lib/portfolio.js
```

## Project yang disembunyikan dari index publik

Default:

```text
(root)
EasyEDA-Pro
gps-kertas
Lightshot
```

Karena nama-nama tersebut lebih terlihat seperti root workspace/tool/empty folder daripada project portfolio. Ubah daftar ini di `src/data/site-content.js` jika ingin menampilkannya.

Statistik `31 projects detected` tetap membaca snapshot scanner asli.

## Cloudflare Pages

```text
Production branch: main
Build command: npm run build
Build output directory: dist
```

## Build production

```bash
./build.sh
```
