#!/usr/bin/env bash
# Regenerate the design section's data and downloads from the desktop's own
# generator — never typed by hand:
#
#   static/schemes/ewe-dark.yaml       `ewe-theme scheme export ewe-dark`
#   static/schemes/ewe-light.yaml      `ewe-theme scheme export ewe-light`
#   static/schemes/scheme-template.yaml  hand-written starter, checked here:
#                                      it must import and export cleanly
#   static/design/tokens.css           a copy of src/tokens.css (sync-tokens.sh)
#   static/design/tokens.json          a copy of ewe/design/system/tokens.json
#   src/lib/design/token-data.json     every token for /design/tokens/: the
#                                      values `ewe-theme show` gives for Ewe
#                                      Dark and Ewe Light, the QML names read
#                                      out of Theme.qml, the usage notes out of
#                                      tokens.json, the type styles, the motion
#                                      table, the overridable roles and the
#                                      Tokyo Night worked example
#
# ewe-theme runs with a throwaway XDG_CONFIG_HOME and HOME, and with
# `scheme --no-hooks`, so it never reads or writes a real ewe.conf, never pokes
# a running shell, and never reaches systemd. The Tokyo Night palette is
# Tinted Theming's base24/tokyo-night-dark.yaml (MIT), vendored byte for byte
# in scripts/fixtures so the build needs no network.
#
#   npm run design [-- path/to/ewe/bin/ewe-theme]   (npm run tokens runs it too)
set -euo pipefail
cd "$(dirname "$0")/.."
THEME=${1:-../ewe/bin/ewe-theme}
[ -f "$THEME" ] || { echo "xx no $THEME — pass the path to ewe/bin/ewe-theme" >&2; exit 1; }
EWE=$(cd "$(dirname "$THEME")/.." && pwd)
QML="$EWE/dotfiles/quickshell/Theme.qml"
SPEC="$EWE/design/system/tokens.json"
README="$EWE/design/system/README.md"
COMPONENTS="$EWE/design/components.css"
for f in "$QML" "$SPEC" "$README" "$COMPONENTS" src/tokens.css; do
	[ -f "$f" ] || { echo "xx missing $f" >&2; exit 1; }
done

tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
export XDG_CONFIG_HOME="$tmp/config" HOME="$tmp/home"
unset HYPRLAND_INSTANCE_SIGNATURE WAYLAND_DISPLAY DBUS_SESSION_BUS_ADDRESS
mkdir -p "$XDG_CONFIG_HOME" "$HOME"
et() { python3 "$THEME" "$@"; }
ok() { case "$1" in *'"ok": true'*) ;; *) echo "xx $2: $1" >&2; exit 1 ;; esac; }

# ── the two built-in schemes, as the CLI exports them ────────────────────────
mkdir -p static/schemes static/design
et scheme export ewe-dark > static/schemes/ewe-dark.yaml
et scheme export ewe-light > static/schemes/ewe-light.yaml

# ── every download must come back in ─────────────────────────────────────────
# A built-in's slug is taken, so importing its file as it is must be refused;
# under another slug it must import with the same palette.
for s in ewe-dark ewe-light; do
	r=$(et scheme --no-hooks import "static/schemes/$s.yaml")
	case "$r" in *'"error": "builtin"'*) ;; *) echo "xx $s.yaml imported over the built-in: $r" >&2; exit 1 ;; esac
	ok "$(et scheme --no-hooks import "static/schemes/$s.yaml" --slug "my-$s")" "import $s.yaml --slug my-$s"
	et scheme export "my-$s" > "$tmp/my-$s.yaml"
	diff <(grep base "static/schemes/$s.yaml") <(grep base "$tmp/my-$s.yaml") >/dev/null \
		|| { echo "xx $s.yaml changed on the way in" >&2; exit 1; }
done
ok "$(et scheme --no-hooks import static/schemes/scheme-template.yaml)" "import scheme-template.yaml"
et scheme export my-scheme > "$tmp/my-scheme.yaml"
diff <(grep base "static/schemes/ewe-dark.yaml") <(grep base "$tmp/my-scheme.yaml") >/dev/null \
	|| { echo "xx scheme-template.yaml no longer carries Ewe Dark's palette" >&2; exit 1; }

# the roles `overrides` accepts, in the CLI's own words
et scheme --no-hooks set overrides.not-a-role "#000000" --slug my-scheme > "$tmp/roles.json"

# ── the worked example: Tokyo Night, imported, then two overrides ────────────
ok "$(et scheme --no-hooks import scripts/fixtures/tokyo-night-dark.yaml)" "import tokyo-night-dark.yaml"
et scheme show tokyo-night-dark > "$tmp/tokyo-before.json"
ok "$(et scheme --no-hooks set overrides.danger '#f7768e' --slug tokyo-night-dark)" "set overrides.danger"
ok "$(et scheme --no-hooks set overrides.warning '#ff9e64' --slug tokyo-night-dark)" "set overrides.warning"
et scheme show tokyo-night-dark > "$tmp/tokyo-after.json"
et scheme export tokyo-night-dark > "$tmp/tokyo.yaml"

# ── every token, for both built-in schemes at the design defaults ────────────
cfg() { mkdir -p "$tmp/$1"; printf '[desktop.theme]\nscheme = "%s"\n' "$1" > "$tmp/$1/ewe.conf"; }
cfg ewe-dark; cfg ewe-light
et show --conf "$tmp/ewe-dark/ewe.conf" > "$tmp/dark.json"
et show --conf "$tmp/ewe-light/ewe.conf" > "$tmp/light.json"

python3 - "$tmp" "$QML" "$SPEC" "$README" "$COMPONENTS" "$EWE" > src/lib/design/token-data.json <<'PY'
import json, re, subprocess, sys
tmp, qml_path, spec_path, readme_path, comp_path, ewe = sys.argv[1:]
load = lambda n: json.load(open(f"{tmp}/{n}.json"))
dark, light = load("dark"), load("light")
assert dark["ok"] and light["ok"]
assert dark["input"]["scheme_slug"] == "ewe-dark" and light["input"]["scheme_slug"] == "ewe-light"
spec = json.load(open(spec_path))

# ── QML names, straight out of Theme.qml ──
qml = open(qml_path).read()
props = set(re.findall(r"^\s*(?:readonly\s+)?property\s+\w+\s+(\w+)\s*:", qml, re.M))
props |= set(re.findall(r"^\s*property\s+\w+\s+(\w+)\s*$", qml, re.M))   # `property color onAccent`
by_token = dict((t, p) for p, t in re.findall(
    r"^\s*readonly\s+property\s+\w+\s+(\w+)\s*:\s*_[a-z]+\(\"([a-z0-9-]+)\"", qml, re.M))
def camel(name):
    return re.sub(r"-([a-z0-9])", lambda m: m.group(1).upper(), name)
def qml_name(tok):
    if tok in by_token:
        return by_token[tok]
    c = camel(tok)
    return c if c in props else None

# ── the values, as CSS reads them ──
cv_d, cv_l = dark["css_vars"], light["css_vars"]

def value(tok, cv):
    return cv.get("--" + tok)

GROUPS = [("color", "Color"), ("fontSize", "Font size"), ("lineHeight", "Line height"),
          ("fontWeight", "Font weight"), ("letterSpacing", "Letter spacing"), ("spacing", "Spacing"),
          ("radius", "Radius"), ("shadow", "Shadow"), ("gradient", "Gradient"),
          ("borderWidth", "Border width"), ("size", "Size"), ("opacity", "Opacity")]
# tokens the generator emits that tokens.json does not list yet (ewe additions)
EXTRA = {"borderWidth": [{"name": "field-border-width",
                          "usage": "Fields, checkboxes and switches: their outline, which stays at 1px when the stroke preset is none, follows thick up, and is 2px under Increase contrast. An ewe addition, not in tokens.json yet."}]}

def resolve(v, scheme):
    """tokens.json writes some values as {other-token}; follow them."""
    if isinstance(v, dict):
        v = v[scheme]
    seen = 0
    while isinstance(v, str) and v.startswith("{") and seen < 5:
        ref = v[1:-1]
        v = next(t for t in spec["color"]["tokens"] if t["name"] == ref)["value"][scheme]
        seen += 1
    return v

def norm(v):
    s = str(v).strip().lower().replace(" ", "")
    s = re.sub(r"(\d)\.0+(?=\D|$)", r"\1", s)
    s = re.sub(r"\.(\d*?)0+(?=\D|$)", lambda m: "." + m.group(1) if m.group(1) else "", s)
    return s.replace(".)", ")").replace("0px", "0") if s not in ("0px",) else "0"

groups, missing = [], []
for gid, title in GROUPS:
    g = spec[gid]
    rows = []
    for t in g["tokens"] + EXTRA.get(gid, []):
        name = t["name"]
        d, l = value(name, cv_d), value(name, cv_l)
        if d is None:
            missing.append(name)
            continue
        row = {"name": name, "css": "--" + name, "qml": qml_name(name), "dark": d, "light": l,
               "usage": t.get("usage", "")}
        if "value" in t:
            sd, sl = resolve(t["value"], "dark"), resolve(t["value"], "light")
            # where the shipped generator and the design file disagree, say so
            if norm(sd) != norm(d) or norm(sl) != norm(l):
                row["spec"] = sd if sd == sl else f"{sd} / {sl}"
        else:
            row["spec"] = None
            row["extra"] = True
        rows.append(row)
    groups.append({"id": gid, "title": title, "note": g.get("note", ""), "tokens": rows})
assert not missing, f"tokens.json lists tokens the generator does not emit: {missing}"

# ── type styles: the generator's numbers, tokens.json's words ──
styles = []
for grp in spec["type"]["groups"]:
    for s in grp["styles"]:
        st = dark["type"]["styles"][s["name"]]
        styles.append({"name": s["name"], "group": grp["name"], "class": "." + s["name"],
                       "qml": "Theme.type." + camel(s["name"]) if "-" in s["name"] else "Theme.type." + s["name"],
                       "size": st["size"], "lineHeight": st["lineHeight"], "weight": st["weight"],
                       "tracking": st["tracking"], "italic": st["italic"], "family": st["family"],
                       "sample": s.get("sample", ""), "usage": s.get("usage", "")})
assert len(styles) == len(dark["type"]["styles"]), "type styles differ between tokens.json and ewe-theme"

# ── motion: durations and easings from the generator, the words from the README ──
readme = open(readme_path).read()
mrows = re.findall(r"^\| (fast|base|slow|dim) \| (\d+)ms \| ([^|]+) \| ([^|]+) \|$", readme, re.M)
comp = open(comp_path).read()
curves = dict(re.findall(r"(--ease-[a-z-]+): (cubic-bezier\([^)]*\))", comp))
mo = dark["motion"]
CSS_EASE = {"OutCubic": "--ease-out", "InOutCubic": "--ease-in-out", "Linear": None}
motion = []
for name, ms, ease, use in mrows:
    key = "dur" + name.capitalize()
    easing = mo["easing"][name]
    css_ease = CSS_EASE[easing]
    assert int(ms) == mo[key], f"motion {name}: README {ms} vs ewe-theme {mo[key]}"
    motion.append({"name": name, "ms": mo[key], "qml": "Theme." + key, "css": "--dur-" + name,
                   "easing": easing, "qmlEasing": {"fast": "Theme.easeFast", "base": "Theme.ease",
                                                    "slow": "Theme.easeSlow", "dim": "Theme.easeDim"}[name],
                   "cssEasing": (f"var({css_ease})" if css_ease else "linear"),
                   "curve": curves.get(css_ease, "linear") if css_ease else "linear",
                   "usage": use.strip()[0].upper() + use.strip()[1:]})
assert len(motion) == 4

# ── the roles `overrides` takes, as the CLI lists them ──
msg = load("roles")["message"]
roles = [r.strip() for r in msg.split("one of", 1)[1].split(",")]

# ── the worked example ──
before, after = load("tokyo-before"), load("tokyo-after")
def moves(d):
    return [{"role": a["role"], "from": a["from"], "to": a["to"], "why": a["why"]} for a in d["adjusted"]]
tokyo = {"name": before["scheme"]["name"], "slug": before["scheme"]["slug"], "accent": before["accent"],
         "palette": before["scheme"]["palette"], "before": {"roles": before["roles"], "adjusted": moves(before)},
         "after": {"roles": after["roles"], "adjusted": moves(after), "overrides": after["scheme"].get("overrides", {})},
         "yaml": open(f"{tmp}/tokyo.yaml").read()}

rev = subprocess.run(["git", "-C", ewe, "describe", "--tags", "--always"], capture_output=True, text=True).stdout.strip()
out = {"_": "AUTO-GENERATED by scripts/sync-design.sh from ewe-theme. Do not edit; run `npm run design`.",
       "version": spec["version"], "ewe": rev,
       "schemes": {"ewe-dark": {"accent": dark["input"]["accent"], "palette": dark["scheme"]["palette"]},
                   "ewe-light": {"accent": light["input"]["accent"], "palette": light["scheme"]["palette"]}},
       "adjusted": {"ewe-dark": dark["adjusted"], "ewe-light": light["adjusted"]},
       "groups": groups, "styles": styles, "motion": motion, "overrideRoles": roles, "tokyo": tokyo}
print(json.dumps(out, indent="\t", ensure_ascii=False))
PY

# ── the two token files, for download ────────────────────────────────────────
cp src/tokens.css static/design/tokens.css
cp "$SPEC" static/design/tokens.json

echo "ok static/schemes/{ewe-dark,ewe-light}.yaml, static/design/tokens.{css,json}, src/lib/design/token-data.json <- $THEME ($(git -C "$EWE" describe --tags --always))"
