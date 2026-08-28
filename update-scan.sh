#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

SOURCE="${1:-}"

if [ -z "$SOURCE" ]; then
  echo "Pemakaian:"
  echo "  ./update-scan.sh /path/ke/portfolio_scan.json"
  echo
  echo "Contoh:"
  echo "  ./update-scan.sh ../portfolio_source_scanner/portfolio_scan.json"
  exit 1
fi

if [ ! -f "$SOURCE" ]; then
  echo "[ERROR] File tidak ditemukan: $SOURCE"
  exit 1
fi

cp "$SOURCE" src/data/portfolio_scan.json
echo "[OK] Scanner snapshot diperbarui:"
echo "     src/data/portfolio_scan.json"
echo
echo "Test:"
echo "  ./run.sh"
echo
echo "Jika sudah benar:"
echo '  git add . && git commit -m "Update portfolio scan" && git push'
