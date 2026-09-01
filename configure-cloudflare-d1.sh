#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

DB_ID="${1:-}"
DB_NAME="${2:-portfolio-analytics}"

if [[ -z "$DB_ID" ]]; then
  echo "Usage:"
  echo "  ./configure-cloudflare-d1.sh <DATABASE_ID> [DATABASE_NAME]"
  echo
  echo "Contoh:"
  echo "  ./configure-cloudflare-d1.sh 12345678-1234-1234-1234-123456789abc portfolio-analytics"
  exit 1
fi

if [[ ! "$DB_ID" =~ ^[0-9a-fA-F-]{36}$ ]]; then
  echo "[ERROR] DATABASE_ID harus UUID 36 karakter."
  exit 1
fi

python3 - "$DB_ID" "$DB_NAME" <<'PY'
from pathlib import Path
import sys

db_id = sys.argv[1]
db_name = sys.argv[2]
path = Path("wrangler.jsonc")
text = path.read_text()

text = text.replace(
    '"database_id": "REPLACE_WITH_YOUR_D1_DATABASE_ID"',
    f'"database_id": "{db_id}"'
)

text = text.replace(
    '"database_name": "portfolio-analytics"',
    f'"database_name": "{db_name}"'
)

path.write_text(text)
PY

echo "[OK] wrangler.jsonc diperbarui."
echo
grep -A6 '"d1_databases"' wrangler.jsonc
echo
echo "Lanjutkan:"
echo "  npm run build"
echo "  git add ."
echo '  git commit -m "Bind D1 and fix project business data"'
echo "  git push"
