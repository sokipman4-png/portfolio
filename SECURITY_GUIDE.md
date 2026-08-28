# Panduan Keamanan SIHRIZAL Portfolio

Tidak ada website publik yang bisa dijamin "tidak mungkin dihack".
Target yang benar adalah memperkecil permukaan serangan, menjaga secret tetap
server-side, membatasi abuse, dan punya proses pemulihan.

Versi v6 sudah menambahkan:

- CSP untuk halaman statis
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Cross-Origin-Opener-Policy
- HSTS
- API middleware
- same-origin check untuk request browser yang mengubah data
- token admin tetap server-side
- traffic visitor ID di-hash server-side
- raw IP tidak disimpan oleh analytics custom

## 1. Jangan pernah simpan secret di frontend

SEMUA isi berikut bersifat publik ketika dimasukkan ke React/frontend:

```text
src/data/site-content.js
src/App.jsx
public/
VITE_*
```

Jangan pernah taruh:

```text
password
API key
token admin
private key
database credential
cookie secret
akses VPS
SSH key
```

Frontend yang "disembunyikan" tetap dapat dibaca dari browser bundle.

## 2. Secret Cloudflare

Gunakan:

```text
Workers & Pages
→ portfolio
→ Settings
→ Variables and Secrets
```

Secret yang dipakai project:

```text
ADMIN_STATS_TOKEN
TRAFFIC_HASH_SALT
```

Jangan prefix dengan:

```text
VITE_
```

karena variable Vite ditujukan ke frontend build.

## 3. GitHub

Jika repository Anda PUBLIC:

- semua source yang di-push dapat dibaca orang
- riwayat commit lama juga dapat mengandung secret yang pernah terhapus

Kalau source website/private logic tidak ingin dibuka:

```text
GitHub repository
→ Settings
→ Danger Zone
→ Change repository visibility
→ Private
```

Cloudflare Git integration tetap harus diberi akses ke repository tersebut.

PENTING:
Membuat repo private tidak membuat JavaScript frontend menjadi rahasia.
Browser tetap menerima bundle yang diperlukan untuk menjalankan website.

## 4. Kalau secret pernah terlanjur masuk Git

Menghapus file saja tidak cukup.

Lakukan:

1. REVOKE / ROTATE secret lama.
2. Buat secret baru.
3. Baru bersihkan repository/history bila perlu.

Anggap secret yang pernah masuk repository publik sudah bocor.

## 5. Cloudflare WAF

Masuk:

```text
Security
→ Security rules
```

Gunakan Custom Rules untuk Managed Challenge pada pola request mencurigakan.

Jangan langsung memblokir negara/ASN secara agresif karena dapat memblokir visitor normal.

## 6. Rate limiting API

Buat rate limiting khusus API.

Contoh awal:

```text
/api/traffic
60 requests / minute / IP
```

dan:

```text
/api/stats
30 requests / minute / IP
```

Action:

```text
Managed Challenge
```

atau Block untuk abuse yang jelas.

Sesuaikan setelah melihat trafik asli.

## 7. Contact form / login ke depan

Kalau nanti menambahkan:

- form kontak
- login admin
- upload
- komentar
- register
- endpoint yang memicu pekerjaan mahal

tambahkan Cloudflare Turnstile dan validasi server-side.

Jangan hanya memvalidasi di JavaScript browser.

## 8. Header keamanan

Static Pages:

```text
public/_headers
```

API:

```text
functions/api/_middleware.js
```

Jika menambah domain gambar/API eksternal, CSP mungkin perlu diperbarui.

Contoh:
kalau website tiba-tiba tidak bisa memuat resource eksternal, cek Console browser
sebelum menghapus CSP.

## 9. Jangan expose database

D1 hanya diakses dari Pages Functions melalui:

```text
env.PORTFOLIO_DB
```

Jangan kirim binding/database ID/credential ke frontend.

Endpoint publik hanya boleh mengembalikan agregat yang memang boleh dilihat visitor.

## 10. Data sensitif bukan sekadar "display:none"

Salah:

```js
const password = "rahasia"
return <div style={{display:"none"}}>{password}</div>
```

Tetap bocor.

Salah:

```js
const secretCustomerData = [...]
```

di `site-content.js`, walaupun tidak dirender.

Benar:

- data sensitif disimpan di D1/KV/R2/server-only
- Function mengecek authorization
- Function hanya mengirim field yang memang boleh dilihat client

## 11. Admin API

Endpoint update statistik memakai:

```text
x-admin-token
```

Token jangan pernah dimasukkan ke website/admin form publik.

Update dari terminal:

```bash
curl ...
```

atau buat admin panel terpisah yang benar-benar memiliki autentikasi server-side.

## 12. Dependency

Secara rutin:

```bash
npm audit
npm outdated
```

Update dependency secara terukur.

Jangan asal menjalankan:

```bash
npm audit fix --force
```

pada production tanpa test karena dapat membawa breaking change.

## 13. Backup

Simpan:

- repository Git
- backup source lokal
- export/backup data penting bila diperlukan

Cloudflare bukan pengganti backup source Anda.

## 14. SSH

Untuk VPS/server lain:

- gunakan SSH key
- matikan password login bila sudah siap
- jangan commit private key
- jangan expose port admin tanpa kebutuhan

## 15. Preview Cloudflare Pages

Preview deployments dapat memiliki URL sendiri.

Jangan gunakan preview URL sebagai tempat admin rahasia.

Jika preview berisi data yang tidak boleh publik, lindungi dengan Cloudflare Access
atau jangan deploy data tersebut.

## 16. Checklist sebelum publish

```text
[ ] npm run build sukses
[ ] tidak ada secret di site-content.js
[ ] tidak ada .env yang masuk git
[ ] ADMIN_STATS_TOKEN ada sebagai Cloudflare Secret
[ ] TRAFFIC_HASH_SALT ada sebagai Cloudflare Secret
[ ] D1 hanya diakses Functions
[ ] CSP aktif
[ ] HTTPS aktif
[ ] WAF/rate limit API disiapkan
[ ] backup tersedia
[ ] dependency dicek
```
