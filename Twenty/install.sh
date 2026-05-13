#!/usr/bin/env sh
set -eu

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 /path/to/twenty-server/dist/front" >&2
  echo "       $0 docker:container-name" >&2
  echo "" >&2
  echo "Examples:" >&2
  echo "  $0 /srv/twenty/packages/twenty-server/dist/front" >&2
  echo "  $0 docker:twenty-server-1" >&2
  exit 2
fi

TARGET="$1"
DOCKER=""
DIST_DIR="$TARGET"

case "$TARGET" in
  docker:*)
    DOCKER="${TARGET#docker:}"
    DIST_DIR="/app/packages/twenty-server/dist/front"
    ;;
esac

run()  {
  if [ -n "$DOCKER" ]; then
    docker exec "$DOCKER" sh -c "$1"
  else
    sh -c "$1"
  fi
}

copy() {
  if [ -n "$DOCKER" ]; then
    docker cp "$1" "$DOCKER:$2"
  else
    cp "$1" "$2"
  fi
}

ASSETS_DIR="$DIST_DIR/assets"
INDEX_HTML="$DIST_DIR/index.html"
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

echo "Copying starscape-twenty.css -> $ASSETS_DIR/starscape.css"
copy "$SCRIPT_DIR/starscape-twenty.css" "$ASSETS_DIR/starscape.css"

echo "Patching index.html..."
run "grep -q 'starscape.css' '$INDEX_HTML' \
  && echo '  already patched, skipping.' \
  || { sed -i 's|</head>|<link rel=\"stylesheet\" href=\"/assets/starscape.css\"></head>|' '$INDEX_HTML' && echo '  done.'; }"

cat <<EOF

Starscape theme installed. Hard-refresh the browser (Cmd/Ctrl+Shift+R) to apply.

Dark mode:  navy/cyan   (Starscape Dark)
Light mode: parchment/green  (Starscape Light)

The theme preference is set per-user in Twenty's appearance settings.
EOF
