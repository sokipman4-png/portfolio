# Fix `/api/traffic` Mengembalikan `index.html`

## Penyebab yang sebenarnya

Deployment sekarang menggunakan:

```text
npx wrangler deploy
```

Ini berarti project Anda sedang dideploy sebagai **Cloudflare Worker + Static Assets**,
bukan model Pages Functions lama.

Pada deployment sebelumnya, Wrangler membuat konfigurasi assets-only:

```json
{
  "assets": {
    "not_found_handling": "single-page-application"
  }
}
```

tetapi tidak ada:

```text
main
```

yang menunjuk ke kode Worker API.

Akibatnya file:

```text
functions/api/traffic.js
functions/api/stats.js
functions/api/youtube.js
```

tidak otomatis menjadi route API pada deployment Worker ini.

Karena `single-page-application` aktif, request:

```text
/api/traffic
```

dianggap route React yang tidak ditemukan dan akhirnya diberikan:

```text
index.html
```

Itulah sebabnya `curl` menampilkan:

```text
Content-Type: text/html
<!doctype html>
```

---

# Perbaikan v6.2

Versi v6.2 menambahkan:

```text
worker/index.js
```

sebagai Worker backend.

Dan:

```text
wrangler.jsonc
```

dengan:

```json
{
  "main": "worker/index.js",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application",
    "run_worker_first": ["/api/*"]
  }
}
```

Artinya:

```text
/api/*
→ Worker lebih dulu

/assets/*
index.html
favicon
dll
→ static assets
```

Jadi sekarang `/api/traffic` tidak jatuh ke React SPA fallback.

---

# Setelah Memasang v6.2

Jalankan:

```bash
npm install
npm run build
```

Pastikan file berikut ada:

```bash
ls -l worker/index.js wrangler.jsonc
```

Kemudian:

```bash
git add .
git commit -m "Fix Worker API routing"
git push
```

Tunggu deployment Cloudflare sukses.

---

# Binding D1

Di Cloudflare Worker `portfolio`, pastikan Connected Bindings memiliki:

```text
PORTFOLIO_DB
→ database D1 Anda
```

Secret:

```text
TRAFFIC_HASH_SALT
```

juga harus berada pada Worker `portfolio`.

Kalau Anda memakai KV statistik project, binding-nya:

```text
PORTFOLIO_STATS
```

dan secret admin:

```text
ADMIN_STATS_TOKEN
```

---

# Test

Setelah deploy:

```bash
./check-production.sh
```

atau:

```bash
curl -i https://sihrizal.online/api/traffic
```

Yang benar:

```text
content-type: application/json
```

Bukan:

```text
content-type: text/html
```

Respons pertama bisa:

```json
{
  "configured": false
}
```

jika binding belum benar.

Itu justru berarti route API SUDAH bekerja.

Setelah D1 + secret benar:

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

---

# Beranda

v6.2 juga mengubah hanya halaman Beranda agar memiliki scroll sendiri.

Tab lain tetap model fokus satu halaman.

Jadi:

```text
Beranda
→ boleh scroll

Semua Project
→ scroll hanya daftar project

Tentang
→ scroll panel yang perlu

tab lain
→ tetap fokus per halaman
```
