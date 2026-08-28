# Setup Analytics Pengunjung — Cloudflare D1

Versi v6 menghitung pengunjung menggunakan Cloudflare D1.

Yang dihitung:

- unik hari ini
- unik 7 hari
- unik 30 hari
- unik 365 hari
- pengunjung aktif saat ini
- grafik pengunjung unik per hari selama 30 hari

> Catatan: "pengunjung unik" berarti browser/perangkat anonim yang memiliki ID lokal.
> Satu orang yang memakai beberapa browser/perangkat dapat dihitung lebih dari satu.
> Menghapus localStorage juga menghasilkan ID baru.

## 1. Buat database D1

Cloudflare Dashboard:

```text
Storage & Databases
→ D1 SQL Database
→ Create database
```

Nama yang disarankan:

```text
portfolio-analytics
```

Lokasi:

```text
Asia-Pacific / APAC
```

## 2. Buat tabel

Cara mudah: buka Console SQL pada database D1, lalu copy semua isi:

```text
migrations/0001_traffic.sql
```

dan Execute.

Alternatif Wrangler:

```bash
npx wrangler d1 execute portfolio-analytics \
  --remote \
  --file=migrations/0001_traffic.sql
```

## 3. Binding database ke Cloudflare Pages

Cloudflare:

```text
Workers & Pages
→ portfolio
→ Settings
→ Bindings
→ Add
→ D1 database
```

Variable name WAJIB:

```text
PORTFOLIO_DB
```

Database:

```text
portfolio-analytics
```

Simpan.

## 4. Buat secret hash

Generate di Lubuntu:

```bash
openssl rand -hex 32
```

Cloudflare:

```text
Workers & Pages
→ portfolio
→ Settings
→ Variables and Secrets
```

Tambahkan Secret:

```text
TRAFFIC_HASH_SALT
```

Isi dengan hasil `openssl rand -hex 32`.

JANGAN taruh nilai ini di:

```text
site-content.js
.env yang di-commit
GitHub
README
```

## 5. Redeploy

Setelah binding/secret berubah, lakukan redeploy.

Cara mudah:

```bash
git commit --allow-empty -m "Redeploy traffic analytics"
git push
```

atau Redeploy dari dashboard Pages.

## 6. Test

Buka:

```text
https://sihrizal.online/api/traffic
```

Kalau benar:

```json
{
  "configured": true,
  "current": 1,
  "today": 1,
  "week": 1,
  "month": 1,
  "year": 1,
  "series": [...]
}
```

Kemudian buka:

```text
Tentang
→ Trafik
```

## Cara kerja online real-time

Browser mengirim heartbeat sekitar setiap 25 detik saat tab terlihat.

Server menganggap visitor "online sekarang" jika heartbeat terakhir masih dalam
sekitar 90 detik.

Dashboard melakukan refresh sekitar setiap 15 detik.

Tidak ada websocket sehingga tetap sederhana dan ringan.
