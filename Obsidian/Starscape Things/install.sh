#!/usr/bin/env bash
# Installs Starscape Things into an Obsidian vault.
# Usage: ./install.sh <path-to-vault>
#   e.g. ./install.sh ~/Documents/MyVault
#        ./install.sh "/mnt/c/Users/bruce/Documents/MyVault"
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <path-to-vault>" >&2
  exit 1
fi

vault="$1"
if [[ ! -d "$vault" ]]; then
  echo "Vault directory not found: $vault" >&2
  exit 1
fi

cd "$(dirname "$0")"

if [[ ! -f theme.css ]]; then
  echo "theme.css missing — running build.sh first."
  ./build.sh
fi

dest="$vault/.obsidian/themes/Starscape Things"
mkdir -p "$dest"
cp theme.css manifest.json "$dest/"

echo "Installed to: $dest"
echo "In Obsidian: Settings → Appearance → Theme → Starscape Things"
