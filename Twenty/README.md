# Starscape for Twenty CRM

Starscape themes for Twenty CRM, adapted from the Starscape editor themes and
`starscape-ui-system-v3`.

This is a CSS override — it injects a single stylesheet that redeclares
Twenty's `--t-*` CSS custom properties with Starscape colours. No rebuild or
source change required.

- **Dark** — deep navy background (`#0a1121`), cyan accent (`#06b6d4`)
- **Light** — parchment cream background (`#f5ecd6`), forest green accent (`#4f7048`)

## How it works

Twenty applies a `.dark` or `.light` class to `<html>` and declares all colour
tokens as CSS custom properties inside those selectors. A single override
stylesheet loaded after the main bundle redeclares those same variables with
Starscape values, overriding the defaults via cascade order.

Inline code in the BlockNote editor and markdown renderer is also recoloured
using higher-specificity selectors (no file patching needed).

## Install

Find your Twenty front-end dist directory. For a default Docker install it is
inside the container at `/app/packages/twenty-server/dist/front`.

### Docker (running container)

```sh
./install.sh docker:twenty-server-1
```

Replace `twenty-server-1` with your container name (`docker ps` to find it).

### Local / self-hosted

```sh
./install.sh /path/to/twenty-server/dist/front
```

Hard-refresh the browser (`Cmd/Ctrl+Shift+R`) after installing.

## Uninstall

Remove `/assets/starscape.css` from the dist directory and revert the
`</head>` patch in `index.html` (delete the `<link … starscape.css>` tag).

## Updating

Re-run `./install.sh` after any Twenty update — the dist directory is replaced
on upgrade and the patch will need to be reapplied.

## Theme preference

The dark/light choice is per-user in **Settings → Appearance**.
