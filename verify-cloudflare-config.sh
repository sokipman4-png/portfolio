#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if grep -q 'REPLACE_WITH_YOUR_D1_DATABASE_ID' wrangler.jsonc; then
  echo "[GAGAL] Database ID D1 belum diisi."
  echo "Jalankan:"
  echo "  ./configure-cloudflare-d1.sh <DATABASE_ID>"
  exit 1
fi

if ! grep -q '"binding": "PORTFOLIO_DB"' wrangler.jsonc; then
  echo "[GAGAL] Binding PORTFOLIO_DB tidak ada."
  exit 1
fi

echo "[OK] wrangler.jsonc memiliki binding PORTFOLIO_DB."
echo "[OK] Database ID sudah diisi."
