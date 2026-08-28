#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "Memeriksa sumber data website..."

if find src -type f -name 'portfolio_scan.json' | grep -q .; then
  echo "[GAGAL] Masih ada file scanner JSON di src/"
  exit 1
fi

if grep -R -E 'import .*portfolio_scan|from .*portfolio_scan' src >/dev/null 2>&1; then
  echo "[GAGAL] Masih ada import scanner di source website."
  exit 1
fi

echo "[OK] Tidak ada file scanner JSON di src/."
echo "[OK] Tidak ada import data scanner."
echo "[OK] Sumber data utama: src/data/site-content.js"
