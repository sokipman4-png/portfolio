#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "=============================================="
echo " SIHRIZAL Portfolio Tabs v6.2"
echo " Data: src/data/site-content.js"
echo "=============================================="
echo

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "[ERROR] Node.js/npm belum ada."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "[1/2] npm install..."
  npm install
else
  echo "[1/2] dependency tersedia."
fi

echo "[2/2] Vite dev server"
echo "Buka: http://localhost:5173"
echo
echo "Catatan:"
echo "- UI/data lokal: langsung update via Vite HMR."
echo "- Traffic D1/API paling akurat dites setelah deploy Cloudflare Pages."
echo

exec npm run dev
