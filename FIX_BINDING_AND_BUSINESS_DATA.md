# v6.4 — Fix Binding D1 + Data Business Project

## 1. Kenapa dashboard menunjukkan binding, tetapi API bilang missing_database_binding?

Cloudflare Worker memakai **versioned bindings**.

Setiap deploy membuat Worker version baru yang berisi code + assets + bindings.
Jika `wrangler.jsonc` yang dipakai deploy tidak mempunyai `d1_databases`,
version baru dapat aktif tanpa `PORTFOLIO_DB`.

Karena itu v6.4 memasukkan D1 ke `wrangler.jsonc`.

## 2. Ambil Database ID

Cloudflare:

```text
Storage & databases
→ D1 SQLite Database
→ portfolio-analytics
→ Settings
```

Copy:

```text
Database ID
```

format:

```text
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Database ID bukan password/secret.

## 3. Isi config

Jalankan:

```bash
chmod +x configure-cloudflare-d1.sh
./configure-cloudflare-d1.sh DATABASE_ID_ANDA
```

Contoh format:

```bash
./configure-cloudflare-d1.sh \
  12345678-1234-1234-1234-123456789abc
```

Cek:

```bash
./verify-cloudflare-config.sh
```

## 4. TRAFFIC_HASH_SALT

v6.4 mendeklarasikan `TRAFFIC_HASH_SALT` sebagai required secret.

Pastikan Worker `portfolio` punya Secret:

```text
TRAFFIC_HASH_SALT
```

Kalau belum:

```bash
openssl rand -hex 32
```

lalu masukkan hasilnya dari Cloudflare Dashboard sebagai Secret.

Nilai rahasia jangan dimasukkan ke GitHub.

## 5. Cara mengisi business

Contoh lengkap:

```js
business: {
  users: 125,

  accesses: 1800,

  price: {
    id: "Rp99.000 / bulan",
    en: "IDR 99,000 / month"
  },

  priceValue: 99000,

  license: {
    id: "Lisensi bulanan",
    en: "Monthly license"
  },

  topRank: 1
}
```

### users

Ditampilkan sebagai "Pengguna saat ini".

```js
users: 125
```

Jika:

```js
users: null
```

tampil:

```text
Belum diisi
```

### accesses

Ini sekarang adalah **baseline manual**.

Misalnya:

```js
accesses: 1800
```

dan setelah analytics hidup D1 mencatat 24 pembukaan Detail Project:

```text
1800 + 24 = 1824
```

yang ditampilkan website.

Jadi D1 angka 0 tidak lagi menghapus `accesses` yang Anda isi manual.

### price

Teks yang dilihat visitor:

```js
price: {
  id: "Rp99.000 / bulan",
  en: "IDR 99,000 / month"
}
```

v6.4 juga menerima:

```js
price: "Rp99.000 / bulan"
```

### priceValue

Hanya untuk sorting:

```js
priceValue: 99000
```

Jangan:

```js
priceValue: "Rp99.000"
```

### license

Contoh:

```js
license: {
  id: "Lisensi bulanan",
  en: "Monthly license"
}
```

atau:

```js
license: "Beli hak milik (full code)"
```

### topRank

Contoh:

```js
topRank: 1
```

`topRank` bukan harga dan bukan jumlah user.

Ia dipakai sebagai **ranking manual cadangan** apabila jumlah pengguna sama
atau belum tersedia.

Urutan utama tetap jumlah pengguna.

## 6. Tombol Saya tertarik

Jalankan migration:

```text
migrations/0002_project_metrics.sql
```

Tabel D1:

```text
project_metrics
project_interest_votes
```

Counter interest akan ditambahkan ke `interestBase` manual.

## 7. Deploy

```bash
npm run build

./verify-cloudflare-config.sh

git add .
git commit -m "Fix D1 binding and business fields"
git push
```

Setelah deployment sukses:

```bash
./diagnose-production.sh
```

GET traffic harus menunjukkan:

```json
{
  "configured": true,
  "databaseConfigured": true,
  "hashSaltConfigured": true
}
```
