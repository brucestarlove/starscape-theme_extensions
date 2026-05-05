# Starscape Things

A Starscape-palette fork of [@colineckert's Things theme](https://github.com/colineckert/obsidian-things) for Obsidian. All credit for the design, structure, checkbox styling, and Style Settings integration goes to the original Things theme — this fork just swaps the palette.

## Structure

```
upstream/theme.css         vendored verbatim from Things (never edited)
upstream/LICENSE           Things' MIT license
starscape-overrides.css    Starscape variable redefinitions only
build.sh                   cats upstream + overrides into theme.css
theme.css                  generated, distributable
manifest.json
```

## Updating from upstream

```bash
cp /path/to/obsidian-things/theme.css upstream/theme.css
./build.sh
```

Then visually diff against the previous build — if Things added new CSS variables that affect color, add overrides for them in `starscape-overrides.css`.

## Installing

```bash
./install.sh /path/to/your/vault
```

This copies `theme.css` and `manifest.json` into `<vault>/.obsidian/themes/Starscape Things/`. Then in Obsidian: Settings → Appearance → Theme → **Starscape Things**.

To install manually instead, copy those two files into that directory yourself.

The [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin is supported (inherited from Things). Default values shown there are Things' defaults — Starscape values are applied by the override block regardless.

## Light vs dark

- **Dark mode** is a pulsing starry night sky, using the full Starscape palette from `starscape_dark.json`.
- **Light mode** is grid paper, using a true white-background palette (Zed's "Starscape Light" is actually a lighter-dark variant, unsuitable for Obsidian's `theme-light`). The light palette here is an experiment that may later be propagated to the Cursor/Zed extensions.

## License

MIT — see `LICENSE` (Things' notice preserved).
