#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 2 ]; then
  echo "Pemakaian: ./optimize-image.sh INPUT.jpg OUTPUT.webp [MAX_WIDTH]"
  exit 1
fi

INPUT="$1"
OUTPUT="$2"
MAX_WIDTH="${3:-1200}"
mkdir -p public/images

if command -v cwebp >/dev/null 2>&1; then
  cwebp -quiet -q 78 -resize "$MAX_WIDTH" 0 "$INPUT" -o "public/images/$OUTPUT"
elif command -v magick >/dev/null 2>&1; then
  magick "$INPUT" -auto-orient -strip -resize "${MAX_WIDTH}x>" -quality 78 "public/images/$OUTPUT"
else
  echo "Install: sudo apt install -y webp"
  exit 1
fi

ls -lh "public/images/$OUTPUT"
