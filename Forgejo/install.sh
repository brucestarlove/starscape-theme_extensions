#!/usr/bin/env sh
set -eu

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 /path/to/forgejo/custom" >&2
  echo "" >&2
  echo "Example for a Docker data volume mounted on the host:" >&2
  echo "  $0 /srv/forgejo/data/gitea" >&2
  exit 2
fi

custom_dir=$1
css_dir="$custom_dir/public/assets/css"
script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

mkdir -p "$css_dir"
cp "$script_dir/theme-starscape-dark.css" "$css_dir/theme-starscape-dark.css"
cp "$script_dir/theme-starscape-light.css" "$css_dir/theme-starscape-light.css"

cat <<EOF
Installed Starscape Forgejo themes to:
  $css_dir

Add this to app.ini:

[ui]
THEMES = forgejo-auto,forgejo-light,forgejo-dark,starscape-dark,starscape-light
DEFAULT_THEME = starscape-dark

Then restart Forgejo.
EOF

