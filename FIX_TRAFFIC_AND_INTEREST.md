# v6.3 — Fix Trafik dan Tombol Saya Tertarik

## Trafik 0: tes bagian MENULIS

GET `/api/traffic` hanya membaca data. Untuk memastikan browser dapat menulis:

```bash
curl -i -X POST https://sihrizal.online/api/traffic \
  -H "Content-Type: application/json" \
  -d '{
    "visitorId":"test-browser-1234567890",
    "event":"pageview"
  }'
```

Versi v6.3 menampilkan dua status tambahan:

```json
{
  "databaseConfigured": true,
  "hashSaltConfigured": true
}
```

Kalau `hashSaltConfigured:false`, buat Secret `TRAFFIC_HASH_SALT`
di Worker `portfolio`, lalu redeploy.

## Cek D1

```sql
SELECT COUNT(*) AS total FROM traffic_daily;
```

```sql
SELECT * FROM traffic_daily
ORDER BY last_seen DESC
LIMIT 10;
```

```sql
SELECT * FROM traffic_presence
ORDER BY last_seen DESC
LIMIT 10;
```

## Tombol Saya tertarik

v6.3 menyimpan project metric di D1, tidak perlu KV terpisah.

Jalankan migration baru `migrations/0002_project_metrics.sql`
di D1 Console.

Tabel baru:

```text
project_metrics
project_interest_votes
```

Test:

```bash
curl -X POST https://sihrizal.online/api/stats \
  -H "Content-Type: application/json" \
  -d '{
    "action":"interest",
    "project":"contoh-project-aktif",
    "visitorId":"test-interest-123456789"
  }'
```

Jika sukses `interested` menjadi 1.

## Tombol Lihat project

Sekarang tombol Beranda membuka `Semua project` (`#index`).

## Diagnosa otomatis

```bash
./diagnose-production.sh
```
