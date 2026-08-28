#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "============================================"
echo "  SIHRIZAL Portfolio — local development"
echo "============================================"
echo

if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js belum terpasang."
  echo "Disarankan Node.js 20.19+."
  echo
  echo "Ubuntu/Lubuntu:"
  echo "  sudo apt update"
  echo "  sudo apt install -y nodejs npm"
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[ERROR] npm belum terpasang."
  exit 1
fi

NODE_MAJOR="$(node -p "Number(process.versions.node.split('.')[0])")"
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "[WARNING] Node $(node -v) terdeteksi. Vite modern membutuhkan Node 20+."
fi

if [ ! -d node_modules ]; then
  echo "[1/2] Dependency belum ada — menjalankan npm install..."
  npm install
else
  echo "[1/2] Dependency tersedia."
fi

echo "[2/2] Menjalankan Vite..."
echo
echo "Local : http://localhost:5173"
echo "LAN   : http://IP-LAPTOP:5173"
echo "Stop  : Ctrl+C"
echo

exec npm run dev
