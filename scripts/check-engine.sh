#!/usr/bin/env bash
# src/lib/theme-engine.js is a port of ewe/bin/ewe-theme. A port drifts, and a
# theming page that derives the WRONG colours is worse than one that shows a
# static picture — so prove it, across the cases that hurt: both built-in
# schemes, accents that push on-accent to ink, an accent whose hue collides
# with warning, an accent past neutral-0, every look preset, Glass, Increase
# contrast, every bar icon size, every Text size (the controls grow with the
# type), and the derived shadows and gradients.
#
#   scripts/check-engine.sh [path/to/ewe/bin/ewe-theme]
set -euo pipefail
cd "$(dirname "$0")/.."
THEME=${1:-../ewe/bin/ewe-theme}
[ -f "$THEME" ] || { echo "xx no $THEME — pass the path to ewe/bin/ewe-theme" >&2; exit 1; }
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
export XDG_CONFIG_HOME="$tmp/config"   # never read or write the real ewe.conf
export HOME="$tmp/home"                # nor anything else under the real home
mkdir -p "$XDG_CONFIG_HOME" "$HOME"
fail=0

while read -r scheme accent corner density stroke opacity contrast icons text; do
  [ -n "${scheme:-}" ] || continue
  case "$scheme" in \#*) continue ;; esac
  printf '[desktop.theme]\nscheme = "%s"\naccent = "%s"\ncorner = "%s"\ndensity = "%s"\nstroke = "%s"\nbar_opacity = %s\n[desktop.bar]\nicon_size = "%s"\n[desktop.accessibility]\nincrease_contrast = %s\ntext_scale = %s\n' \
    "$scheme" "$accent" "$corner" "$density" "$stroke" "$opacity" "$icons" "$contrast" "$text" > "$tmp/ewe.conf"
  python3 "$THEME" show --conf "$tmp/ewe.conf" > "$tmp/py.json"
  node --input-type=module -e "
    import('./src/lib/theme-engine.js').then((m) => {
      const t = m.derive({ scheme: '$scheme', accent: '$accent', corner: '$corner',
        density: '$density', stroke: '$stroke', barOpacity: $opacity,
        increaseContrast: $contrast, barIconSize: '$icons', textScale: $text });
      const css = {};
      for (const [k, v] of Object.entries(t.shadow)) css['--' + k] = m.shadowCss(v);
      for (const [k, v] of Object.entries(t.gradient)) css['--' + k] = m.gradientCss(v);
      console.log(JSON.stringify({ color: t.color, alpha: t.alpha, shape: t.shape, size: t.size,
        bar: { height: t.bar.height, module: t.bar.module, icon: t.bar.icon, icon_size: t.bar.iconSize }, css,
        presets: m.ACCENT_PRESETS.map((p) => ({ name: p.name, hex: p.hex, ink: m.onColor(p.hex) })),
        adjusted: t.adjusted.map((a) => a.role) }));
    });" > "$tmp/js.json"
  python3 - "$THEME" "$tmp/py.json" "$tmp/js.json" "$scheme $accent $corner/$density/$stroke op=$opacity ic=$contrast bar=$icons ts=$text" <<'PY' || fail=1
import json, sys

# the generator speaks Ewe names only, so every role must match both ways
py, js = json.load(open(sys.argv[2])), json.load(open(sys.argv[3]))
bad, n = [], 0
for k in sorted(set(py["color"]) | set(js["color"])):
    n += 1
    if js["color"].get(k) != py["color"].get(k):
        bad.append(("color", k, py["color"].get(k), js["color"].get(k)))
for k in sorted(set(py["alpha"]) | set(js["alpha"])):
    n += 1
    if abs(js["alpha"].get(k, -1) - py["alpha"].get(k, -2)) > 1e-9:
        bad.append(("alpha", k, py["alpha"].get(k), js["alpha"].get(k)))
for k in sorted(set(py["shape"]) | set(js["shape"])):
    n += 1
    if js["shape"].get(k) != py["shape"].get(k):
        bad.append(("shape", k, py["shape"].get(k), js["shape"].get(k)))
for k, v in js["size"].items():
    n += 1
    if py["size"].get(k) != v:
        bad.append(("size", k, py["size"].get(k), v))
# the derived shadows and gradients, as CSS
for k, v in js["css"].items():
    n += 1
    if py["css_vars"].get(k) != v:
        bad.append(("css", k, py["css_vars"].get(k), v))
# the bar: its content plus space-s
for k, v in js["bar"].items():
    n += 1
    if py["bar"].get(k) != v:
        bad.append(("bar", k, py["bar"].get(k), v))
# the Accent picker's presets, and the ink each one takes
n += 1
if py["accent_presets"] != js["presets"]:
    bad.append(("accent_presets", "list", py["accent_presets"], js["presets"]))
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
ewe-dark  #eeb407 medium  comfortable thin  100 false normal 100
ewe-light #eeb407 medium  comfortable thin  100 false normal 100
ewe-dark  #0a84ff large   roomy       thick 100 false large  100
ewe-light #30d158 small   compact     none  100 false small  100
ewe-dark  #ffcc00 none    comfortable thin  100 false normal 100
ewe-dark  #ff9f0a medium  comfortable thin   80 false normal 100
ewe-light #ff9f0a medium  comfortable thin   80 false large  100
ewe-dark  #bf5af2 medium  comfortable thin   60 false small  100
ewe-light #bf5af2 medium  comfortable thin  100 true  normal 100
ewe-dark  #ff453a large   compact     thick  80 true  large  100
ewe-light #ffffff medium  comfortable thin  100 false normal 100
ewe-dark  #000000 medium  comfortable thin   80 false normal 100
ewe-dark  #eeb407 medium  comfortable thin  100 false normal 115
ewe-light #0a84ff medium  roomy       thin  100 true  small  115
ewe-dark  #eeb407 medium  comfortable thin  100 true  normal 130
ewe-light #30d158 large   compact     thick  80 false large  130
ewe-dark  #bf5af2 small   roomy       none  100 false small  130
CASES

[ "$fail" = 0 ] && echo "ok theme-engine.js agrees with ewe-theme" || echo "xx theme-engine.js has drifted from ewe-theme" >&2
exit "$fail"
