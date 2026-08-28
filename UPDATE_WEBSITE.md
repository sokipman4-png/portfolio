# Cara Update Website SIHRIZAL

Repository aktif contoh:

```text
~/coding/projek/portofolio/sihrizal-portfolio-pro
```

## 1. Masuk folder

```bash
cd ~/coding/projek/portofolio/sihrizal-portfolio-pro
```

## 2. Jalankan lokal

```bash
./run.sh
```

Buka:

```text
http://localhost:5173
```

Edit data utama:

```text
src/data/site-content.js
```

Save file.

Vite biasanya langsung memperbarui browser.

## 3. Test build sebelum upload

Matikan Vite dengan:

```text
Ctrl+C
```

Lalu:

```bash
npm run build
```

Harus berakhir sukses dan membuat:

```text
dist/
```

## 4. Cek perubahan

```bash
git status
```

## 5. Commit

```bash
git add .
git commit -m "Update portfolio"
```

## 6. Push

```bash
git push
```

## 7. Cloudflare

Cloudflare Pages otomatis:

```text
GitHub berubah
→ Cloudflare mengambil commit
→ npm run build
→ deployment baru
→ sihrizal.online diperbarui
```

Cek:

```text
Cloudflare
→ Workers & Pages
→ portfolio
→ Deployments
```

Tunggu:

```text
Success
```

## 8. Refresh website

Buka:

```text
https://sihrizal.online
```

Jika masih versi lama:

```text
Ctrl + Shift + R
```

## Update binding/secret saja

Kalau Anda hanya mengubah:

```text
PORTFOLIO_DB
TRAFFIC_HASH_SALT
ADMIN_STATS_TOKEN
```

di Cloudflare, source Git tidak berubah.

Tetapi lakukan redeploy:

```bash
git commit --allow-empty -m "Redeploy Cloudflare settings"
git push
```

atau klik Redeploy dari dashboard Cloudflare.

## Memasang versi ZIP baru tanpa menghapus .git

Misalnya ZIP baru sudah diextract menjadi:

```text
sihrizal-portfolio-tabs-v6.1/
```

Sedangkan repository aktif:

```text
sihrizal-portfolio-pro/
```

Backup:

```bash
cp -a sihrizal-portfolio-pro sihrizal-portfolio-backup
```

Salin sambil mempertahankan `.git`:

```bash
rsync -av --delete \
  --exclude='.git' \
  sihrizal-portfolio-tabs-v6.1/ \
  sihrizal-portfolio-pro/
```

Lalu:

```bash
cd sihrizal-portfolio-pro
npm install
npm run build
git add .
git commit -m "Upgrade portfolio to v6.1"
git push
```
