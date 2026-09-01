#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-https://sihrizal.online}"

echo "Checking: $BASE/api/traffic"
echo

HEADERS="$(mktemp)"
BODY="$(mktemp)"
trap 'rm -f "$HEADERS" "$BODY"' EXIT

curl -sS -D "$HEADERS" "$BASE/api/traffic" -o "$BODY"

STATUS="$(awk 'toupper($1) ~ /^HTTP/ {code=$2} END {print code}' "$HEADERS")"
TYPE="$(awk -F': ' 'tolower($1)=="content-type" {gsub("\r","",$2); print $2}' "$HEADERS" | tail -1)"

echo "HTTP status : ${STATUS:-unknown}"
echo "Content-Type: ${TYPE:-unknown}"
echo
echo "Body:"
cat "$BODY"
echo
echo

if printf '%s' "$TYPE" | grep -qi 'application/json'; then
  echo "[OK] /api/traffic sekarang dijalankan oleh Worker API."
else
  echo "[GAGAL] Endpoint masih bukan JSON."
  echo "Jika isinya <!doctype html>, static SPA fallback masih mengambil /api/traffic."
  exit 1
fi
