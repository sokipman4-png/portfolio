#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-https://sihrizal.online}"
TEST_VISITOR="diagnostic-browser-$(date +%s)"

echo "[1] GET traffic"
curl -sS "$BASE/api/traffic"
echo; echo

echo "[2] POST traffic"
curl -sS -X POST "$BASE/api/traffic" \
  -H "Content-Type: application/json" \
  -d "{\"visitorId\":\"$TEST_VISITOR\",\"event\":\"pageview\"}"
echo; echo

echo "[3] GET traffic again"
curl -sS "$BASE/api/traffic"
echo; echo

echo "[4] GET stats"
curl -sS "$BASE/api/stats?projects=contoh-project-aktif"
echo; echo

echo "[5] POST interest"
curl -sS -X POST "$BASE/api/stats" \
  -H "Content-Type: application/json" \
  -d "{\"action\":\"interest\",\"project\":\"contoh-project-aktif\",\"visitorId\":\"$TEST_VISITOR\"}"
echo; echo
