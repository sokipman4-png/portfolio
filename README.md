# SIHRIZAL Portfolio Tabs v6.2

Portfolio React + Vite untuk `sihrizal.online`.

Fitur:

- full tab navigation
- 34 project manual
- ID / EN
- 3 visual styles
- light / dark mode
- 4 page transition effects
- draggable appearance/effect switcher
- project users/access counters
- current project
- activities
- YouTube
- About + skills
- custom traffic analytics with Cloudflare D1
- daily / 7-day / 30-day / 365-day / current-online visitor counts
- 30-day traffic chart
- security headers + API middleware

## Run

```bash
chmod +x run.sh build.sh optimize-image.sh verify-standalone.sh
npm install
./run.sh
```

## Build

```bash
npm run build
```

## Data

```text
src/data/site-content.js
```

## Traffic setup

```text
TRAFFIC_SETUP.md
```

## Security

```text
SECURITY_GUIDE.md
```


## Troubleshooting D1

Baca `CLOUDFLARE_D1_FIX.md`.

## Update website

Baca `UPDATE_WEBSITE.md`.


## Worker API routing v6.2

`wrangler deploy` sekarang memakai `worker/index.js` sebagai Worker backend dan
`run_worker_first: ["/api/*"]` agar API tidak jatuh ke SPA fallback.

Baca:

```text
CLOUDFLARE_WORKER_API_FIX.md
```

Test production:

```bash
./check-production.sh
```
