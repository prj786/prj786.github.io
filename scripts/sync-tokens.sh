#!/usr/bin/env bash
# Refresh src/tokens.css from the desktop's generated token file.
#
# There is no second source of truth: ewe/design/tokens.css is written by
# `ewe-theme build` from the one accent in ewe.conf, and this copies it here
# byte for byte. Run it after the desktop's tokens change; commit the result.
set -euo pipefail
cd "$(dirname "$0")/.."
src=${1:-../ewe/design/tokens.css}
[ -f "$src" ] || { echo "xx no $src — pass the path to ewe/design/tokens.css" >&2; exit 1; }
cp "$src" src/tokens.css
echo "ok src/tokens.css <- $src"
