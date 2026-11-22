#!/usr/bin/env bash
# Refresh the Apps page (/apps/) from an eep release.
#
# `eep-build cards --release <R>` writes, next to that release's index,
# catalog.json (the apps, with their icon and card paths), cards/<Name>.eep
# (one small file per app: the thing people download) and icons/. This copies
# exactly what catalog.json names into the site, and nothing else:
#
#   catalog.json   -> src/lib/apps/catalog.json   read at build time
#   cards/*.eep    -> static/apps/cards/          served as /apps/cards/Firefox.eep
#   icons/*        -> static/apps/icons/          served as /apps/icons/firefox.png
#
# Only gui and cli apps are kept (the catalog already leaves tools out). The
# old cards and icons are removed first, so an app that left the catalog
# leaves the site too. Every card is checked against its catalog entry (the
# same id, name and version) before anything in the site is replaced.
#
#   npm run apps                              # the release eep's channel names
#   npm run apps -- ../eep/dist/<release>     # a release folder of your choice
set -euo pipefail
cd "$(dirname "$0")/.."

EEP_DIST=${EEP_DIST:-../eep/dist}
if [ $# -ge 1 ]; then
	SRC=$1
else
	channel="$EEP_DIST/channels/nixos-unstable.json"
	[ -f "$channel" ] || { echo "xx no $channel — pass the path to an eep dist/<release> folder" >&2; exit 1; }
	release=$(python3 -I -c 'import json,sys; print(json.load(open(sys.argv[1]))["release"])' "$channel")
	SRC="$EEP_DIST/$release"
fi
[ -f "$SRC/catalog.json" ] || { echo "xx no catalog.json in $SRC — run eep-build cards --release <R> first" >&2; exit 1; }

tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT

# Check and stage everything first; the site is only touched once it all holds.
python3 -I - "$SRC" "$tmp" <<'PY'
import json, os, shutil, sys, tomllib

src, out = sys.argv[1], sys.argv[2]
cat = json.load(open(os.path.join(src, "catalog.json")))
if cat.get("eep_catalog") != 0:
    sys.exit(f"xx unknown catalog format {cat.get('eep_catalog')!r}")

def inside(rel, folder):
    # a path from the catalog, kept inside its own folder of the release
    if not isinstance(rel, str) or rel.startswith("/") or ".." in rel.split("/"):
        sys.exit(f"xx bad path in catalog: {rel!r}")
    if os.path.dirname(rel) != folder:
        sys.exit(f"xx {rel!r} is not in {folder}/")
    path = os.path.join(src, rel)
    if not os.path.isfile(path):
        sys.exit(f"xx missing {path}")
    return path

os.makedirs(os.path.join(out, "cards"))
os.makedirs(os.path.join(out, "icons"))
apps = []
for a in cat["apps"]:
    if a.get("kind") not in ("gui", "cli"):
        continue
    for key in ("id", "name", "kind", "version", "download", "card"):
        if a.get(key) in (None, ""):
            sys.exit(f"xx {a.get('id')!r} has no {key}")
    card = inside(a["card"], "cards")
    with open(card, "rb") as f:
        c = tomllib.load(f)
    for key in ("id", "name", "version"):
        if c.get(key) != a[key]:
            sys.exit(f"xx {a['card']}: {key} is {c.get(key)!r}, the catalog says {a[key]!r}")
    shutil.copyfile(card, os.path.join(out, a["card"]))
    if a.get("icon"):
        shutil.copyfile(inside(a["icon"], "icons"), os.path.join(out, a["icon"]))
    apps.append(a)

if not apps:
    sys.exit("xx the catalog has no gui or cli apps")
cat["apps"] = apps
with open(os.path.join(out, "catalog.json"), "w") as f:
    json.dump(cat, f, indent="\t", ensure_ascii=False)
    f.write("\n")
PY

mkdir -p src/lib/apps static/apps
rm -rf static/apps/cards static/apps/icons
mv "$tmp/cards" "$tmp/icons" static/apps/
mv "$tmp/catalog.json" src/lib/apps/catalog.json

read -r release count < <(python3 -I -c 'import json; c=json.load(open("src/lib/apps/catalog.json")); print(c["release"], len(c["apps"]))')
echo "ok $count apps from $release -> src/lib/apps/catalog.json, static/apps/{cards,icons}"
