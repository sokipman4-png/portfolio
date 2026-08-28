# Fix "Analytics belum diaktifkan"

Jika website menampilkan:

```text
Analytics belum diaktifkan.
Hubungkan D1 dengan binding PORTFOLIO_DB.
```

berarti endpoint `/api/traffic` tidak menerima binding database D1.

## 1. Cek tabel D1 sudah ada

Di:

```text
Cloudflare
→ Storage & databases
→ D1 SQLite Database
→ portfolio-analytics
→ Console
```

jalankan:

```text
/tables
```

Harus ada:

```text
traffic_presence
traffic_daily
```

Kalau belum, copy isi:

```text
migrations/0001_traffic.sql
```

ke Console lalu Execute.

---

## 2. Binding D1

Masuk:

```text
Cloudflare
→ Compute
→ Workers & Pages
→ portfolio
→ Bindings
```

Pada screenshot Anda, bagian `Connected Bindings` masih kosong.

Klik:

```text
+ Binding
```

atau:

```text
Add binding
```

Pilih:

```text
D1 database
```

Isi:

```text
Variable name:
PORTFOLIO_DB
```

Pilih database:

```text
portfolio-analytics
```

Kemudian Save / Add binding.

Setelah benar, di layar Bindings harus terlihat koneksi:

```text
portfolio
   |
PORTFOLIO_DB
   |
portfolio-analytics
```

Kalau kotak Connected Bindings masih kosong, binding belum tersimpan.

---

## 3. Secret TRAFFIC_HASH_SALT

Generate dari Lubuntu:

```bash
openssl rand -hex 32
```

Copy hasilnya.

Cloudflare:

```text
Workers & Pages
→ portfolio
→ Settings
→ Variables and Secrets
```

Tambahkan Secret:

```text
Name:
TRAFFIC_HASH_SALT
```

Value:

```text
HASIL_OPENSSL_TADI
```

Simpan sebagai Secret.

Jangan masukkan nilai tersebut ke source code atau GitHub.

---

## 4. Redeploy setelah binding/secret berubah

Binding dan secret server-side baru dipakai deployment berikutnya.

Cara mudah:

```bash
git commit --allow-empty -m "Redeploy Cloudflare bindings"
git push
```

Atau:

```text
Cloudflare
→ Workers & Pages
→ portfolio
→ Deployments
→ deployment terbaru
→ Redeploy
```

Pastikan status akhirnya:

```text
Success
```

---

## 5. Test endpoint

Buka:

```text
https://sihrizal.online/api/traffic
```

### Jika benar

Harus ada:

```json
{
  "configured": true,
  "current": 1,
  "today": 1,
  "week": 1,
  "month": 1,
  "year": 1,
  "series": []
}
```

### Jika:

```json
{
  "configured": false
}
```

binding D1 belum terbaca.

### Jika muncul:

```text
TRAFFIC_HASH_SALT belum dikonfigurasi
```

D1 sudah tersambung tetapi secret belum benar.

---

## 6. Pastikan Functions ikut terdeploy

Repository harus mempunyai:

```text
functions/api/traffic.js
functions/api/_middleware.js
```

Cek lokal:

```bash
ls -l functions/api/
```

Harus terlihat:

```text
traffic.js
stats.js
youtube.js
_middleware.js
```

Kemudian:

```bash
git status
git log -1 --oneline
```

Pastikan source v6/v6.1 benar-benar sudah di-push ke GitHub.

---

## 7. Cek response endpoint dari terminal

```bash
curl -i https://sihrizal.online/api/traffic
```

Cari:

```text
HTTP/2 200
```

dan body JSON.

Jika Anda hanya membuka website lokal:

```text
http://localhost:5173
```

D1 Cloudflare tidak berjalan melalui Vite lokal.

Analytics D1 diuji pada:

```text
https://sihrizal.online
```

bukan hanya `localhost:5173`.
