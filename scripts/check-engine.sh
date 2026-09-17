#!/usr/bin/env bash
# src/lib/theme-engine.js is a port of ewe/bin/ewe-theme. A port drifts, and a
# theming page that derives the WRONG colours is worse than one that shows a
# static picture — so prove it, across the cases that hurt: both built-in
# schemes, accents that push on-accent to ink, an accent whose hue collides
# with warning, every look preset, Glass, and Increase contrast.
#
#   scripts/check-engine.sh [path/to/ewe/bin/ewe-theme]
set -euo pipefail
cd "$(dirname "$0")/.."
THEME=${1:-../ewe/bin/ewe-theme}
[ -f "$THEME" ] || { echo "xx no $THEME — pass the path to ewe/bin/ewe-theme" >&2; exit 1; }
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
export XDG_CONFIG_HOME="$tmp/config"   # never read or write the real ewe.conf
mkdir -p "$XDG_CONFIG_HOME"
fail=0

while read -r scheme accent corner density stroke opacity contrast; do
  [ -n "${scheme:-}" ] || continue
  case "$scheme" in \#*) continue ;; esac
  printf '[desktop.theme]\nscheme = "%s"\naccent = "%s"\ncorner = "%s"\ndensity = "%s"\nstroke = "%s"\nbar_opacity = %s\n[desktop.accessibility]\nincrease_contrast = %s\n' \
    "$scheme" "$accent" "$corner" "$density" "$stroke" "$opacity" "$contrast" > "$tmp/ewe.conf"
  python3 "$THEME" show --conf "$tmp/ewe.conf" > "$tmp/py.json"
  node --input-type=module -e "
    import('./src/lib/theme-engine.js').then((m) => {
      const t = m.derive({ scheme: '$scheme', accent: '$accent', corner: '$corner',
        density: '$density', stroke: '$stroke', barOpacity: $opacity,
        increaseContrast: $contrast });
      console.log(JSON.stringify({ color: t.color, alpha: t.alpha, shape: t.shape, size: t.size,
        adjusted: t.adjusted.map((a) => a.role) }));
    });" > "$tmp/js.json"
  python3 - "$THEME" "$tmp/py.json" "$tmp/js.json" "$scheme $accent $corner/$density/$stroke op=$opacity ic=$contrast" <<'PY' || fail=1
import importlib.machinery, importlib.util, json, sys

# the alias layer is the desktop's, not the site's: compare Ewe tokens only
spec = importlib.util.spec_from_loader("ewe_theme", importlib.machinery.SourceFileLoader("ewe_theme", sys.argv[1]))
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
ALIASES = set(mod.ALIAS_COLOR) | set(mod.LEGACY_COLOR) | {"shadow-ambient", "shadow-key"}

py, js = json.load(open(sys.argv[2])), json.load(open(sys.argv[3]))
bad, n = [], 0
for k, v in py["color"].items():
    if k in ALIASES:
        continue
    n += 1
    if js["color"].get(k) != v:
        bad.append(("color", k, v, js["color"].get(k)))
for k, v in py["alpha"].items():
    if k in ALIASES:
        continue
    n += 1
    if abs(js["alpha"].get(k, -1) - v) > 1e-9:
        bad.append(("alpha", k, v, js["alpha"].get(k)))
for k, v in py["shape"].items():
    if k not in js["shape"]:
        continue            # the alias shape names (radius-card, pad …)
    n += 1
    if js["shape"][k] != v:
        bad.append(("shape", k, v, js["shape"][k]))
for k, v in js["size"].items():
    n += 1
    if py["size"].get(k) != v:
        bad.append(("size", k, py["size"].get(k), v))
# every role the generator had to move must be moved by the port too
n += 1
if sorted(a["role"] for a in py["adjusted"]) != sorted(js["adjusted"]):
    bad.append(("adjusted", "roles", [a["role"] for a in py["adjusted"]], js["adjusted"]))
print(("ok   " if not bad else "FAIL ") + f"{sys.argv[4]:<52} {n - len(bad)}/{n}")
for b in bad[:10]:
    print("        py=%s js=%s  %s.%s" % (b[2], b[3], b[0], b[1]))
sys.exit(1 if bad else 0)
PY
done <<'CASES'
ewe-dark  #eeb407 medium comfortable thin  100 false
ewe-light #eeb407 medium comfortable thin  100 false
ewe-dark  #0a84ff large   roomy       thick 100 false
ewe-light #30d158 small   compact     none  100 false
ewe-dark  #ffcc00 none    comfortable thin  100 false
ewe-dark  #ff9f0a medium  comfortable thin   80 false
ewe-light #ff9f0a medium  comfortable thin   80 false
ewe-dark  #bf5af2 medium  comfortable thin   60 false
ewe-light #bf5af2 medium  comfortable thin  100 true
ewe-dark  #ff453a large   compact     thick  80 true
CASES

[ "$fail" = 0 ] && echo "ok theme-engine.js agrees with ewe-theme" || echo "xx theme-engine.js has drifted from ewe-theme" >&2
exit "$fail"
