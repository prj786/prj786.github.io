#!/usr/bin/env bash
# src/lib/theme-engine.js is a port of ewe/bin/ewe-theme. A port drifts, and a
# theming page that derives the WRONG colours is worse than one that shows a
# static picture — so prove it, across accents chosen to hit the awkward
# cases: an out-of-gamut yellow, a hue that pushes fg-on-brand to ink, zero
# tint, and the maximum tint the config allows.
#
#   scripts/check-engine.sh [path/to/ewe/bin/ewe-theme]
set -euo pipefail
cd "$(dirname "$0")/.."
THEME=${1:-../ewe/bin/ewe-theme}
[ -f "$THEME" ] || { echo "xx no $THEME — pass the path to ewe/bin/ewe-theme" >&2; exit 1; }
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
fail=0

while read -r accent corner density stroke tint; do
  [ -n "$accent" ] || continue
  printf '[desktop.theme]\naccent = "%s"\ncorner = "%s"\ndensity = "%s"\nstroke = "%s"\nneutral_tint = %s\n' \
    "$accent" "$corner" "$density" "$stroke" "$tint" > "$tmp/ewe.conf"
  python3 "$THEME" show --conf "$tmp/ewe.conf" > "$tmp/py.json"
  node --input-type=module -e "
    import('./src/lib/theme-engine.js').then((m) => {
      const d = m.derive('$accent', $tint);
      console.log(JSON.stringify({ color: d.color, brand: d.brand, shape: m.shape('$corner', '$stroke', '$density') }));
    });" > "$tmp/js.json"
  python3 - "$tmp/py.json" "$tmp/js.json" "$accent $corner $density $stroke $tint" <<'PY' || fail=1
import json, sys
py, js = json.load(open(sys.argv[1])), json.load(open(sys.argv[2]))
bad, n = [], 0
# the status hues are constants, not derived — the port does not carry them
STATUS = ("success", "warning", "danger", "info", "shadow")
for k, v in py["color"].items():
    if k.split("-")[0] in STATUS: continue
    n += 1
    if js["color"].get(k) != v: bad.append(("color", k, v, js["color"].get(k)))
for k, v in py["brand"].items():
    n += 1
    if js["brand"].get(k) != v: bad.append(("brand", k, v, js["brand"].get(k)))
for k, v in py["shape"].items():
    n += 1
    if js["shape"].get(k) != v: bad.append(("shape", k, v, js["shape"].get(k)))
for k in ("pad", "gap", "control", "row", "icon"):
    n += 1
    if py["size"][k] != js["shape"].get(k): bad.append(("size", k, py["size"][k], js["shape"].get(k)))
print(("ok   " if not bad else "FAIL ") + f"{sys.argv[3]:<38} {n - len(bad)}/{n}")
for b in bad[:10]: print("        py=%s js=%s  %s.%s" % (b[2], b[3], b[0], b[1]))
sys.exit(1 if bad else 0)
PY
done <<'CASES'
#0a84ff round comfortable none 8
#0a84ff medium comfortable thin 8
#ffcc00 large roomy thick 20
#30d158 none compact thin 0
#bf5af2 small comfortable thin 8
#ff453a medium roomy thick 40
CASES

[ "$fail" = 0 ] && echo "ok theme-engine.js agrees with ewe-theme" || echo "xx theme-engine.js has drifted from ewe-theme" >&2
exit "$fail"
