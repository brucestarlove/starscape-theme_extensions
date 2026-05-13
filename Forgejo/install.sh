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
js_dir="$custom_dir/public/assets/js"
template_dir="$custom_dir/templates/custom"
script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

mkdir -p "$css_dir"
mkdir -p "$js_dir"
mkdir -p "$template_dir"
cp "$script_dir/theme-starscape-dark.css" "$css_dir/theme-starscape-dark.css"
cp "$script_dir/theme-starscape-light.css" "$css_dir/theme-starscape-light.css"
cp "$script_dir/starscape-forgejo.js" "$js_dir/starscape-forgejo.js"
cp "$script_dir/footer.tmpl" "$template_dir/footer.tmpl"

cat <<EOF
Installed Starscape Forgejo theme assets to:
  $css_dir
  $js_dir
  $template_dir/footer.tmpl

Note: footer.tmpl was overwritten with the Starscape script hook.

Add this to app.ini:

[ui]
THEMES = forgejo-auto,forgejo-light,forgejo-dark,starscape-dark,starscape-light
DEFAULT_THEME = starscape-dark

Then restart Forgejo.
EOF
