# SIHRIZAL Portfolio v6

Perubahan v6:

- hero dirapikan agar deskripsi tidak tertutup marquee
- mode Light / Dark kembali
- empat efek perpindahan tab:
  1. Book Flip
  2. Soft Fade
  3. Slide
  4. Curtain / Wipe
- efek dapat dipilih dari widget Tampilan
- widget Tampilan tetap draggable
- analytics pengunjung custom:
  - hari ini
  - 7 hari
  - 30 hari
  - 365 hari
  - online sekarang
  - grafik 30 hari
- About memiliki sub-tab Skill / Trafik
- Cloudflare D1 untuk traffic analytics
- security headers
- API same-origin middleware
- panduan keamanan lengkap

Data project tetap:

```text
src/data/site-content.js
```

Setup traffic:

```text
TRAFFIC_SETUP.md
```

Keamanan:

```text
SECURITY_GUIDE.md
```

Deploy:

```bash
npm install
./run.sh
npm run build
git add .
git commit -m "Portfolio v6 traffic theme transitions security"
git push
```
