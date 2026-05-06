# Starscape Theme Extensions

Earth-palette and starry-night color themes for Cursor, Zed, and Obsidian.

- **Starscape Light** — parchment cream background, sepia text, forest/terracotta/honey accents
- **Starscape Dark** — deep navy background, soft blue-white text, cyan/purple/gold accents

---

## Obsidian

The Obsidian theme lives in `Obsidian/Starscape Things/` and includes its own [README](Obsidian/Starscape%20Things/README.md).

### Install with the helper script

Run the installer with the path to your Obsidian vault:

```bash
cd "Obsidian/Starscape Things"
./install.sh /path/to/your/vault
```

This copies `theme.css` and `manifest.json` into `<vault>/.obsidian/themes/Starscape Things/`.

### Install manually

Create this folder in your vault:

```text
<vault>/.obsidian/themes/Starscape Things/
```

Then copy these files into it:

```text
Obsidian/Starscape Things/theme.css
Obsidian/Starscape Things/manifest.json
```

Open Obsidian and select **Settings** → **Appearance** → **Theme** → **Starscape Things**.

---

## Zed

Copy the single JSON file into Zed's themes folder, then select it in the theme picker (`cmd/ctrl+K` → `cmd/ctrl+T`).

**macOS / Linux**
```bash
cp Zed/starscape_light.json ~/.config/zed/themes/
cp Zed/starscape_dark.json  ~/.config/zed/themes/
```

**Windows** (PowerShell or Command Prompt)
```powershell
copy Zed\starscape_light.json "%APPDATA%\Zed\themes\"
copy Zed\starscape_dark.json  "%APPDATA%\Zed\themes\"
```

Zed hot-reloads themes — no restart needed.

---

## Cursor

Cursor requires two steps: copy the extension folder, then register it in `extensions.json`.

### Step 1 — copy the folder

**macOS / Linux**
```bash
cp -r Cursor/tinte.starscape-light-0.0.1  ~/.cursor/extensions/
cp -r Cursor/tinte.starscape-dark.0.0.1   ~/.cursor/extensions/
```

**Windows** (PowerShell)
```powershell
Copy-Item -Recurse Cursor\tinte.starscape-light-0.0.1 "$env:USERPROFILE\.cursor\extensions\"
Copy-Item -Recurse Cursor\tinte.starscape-dark.0.0.1  "$env:USERPROFILE\.cursor\extensions\"
```

### Step 2 — register in extensions.json

Open `~/.cursor/extensions/extensions.json` (Windows: `%USERPROFILE%\.cursor\extensions\extensions.json`) in any text editor.

It contains a JSON array `[...]`. Add the following two entries anywhere inside that array (e.g. at the end, before the final `]`), separated from the previous entry by a comma:

```json
{
  "identifier": { "id": "tinte.starscape-light" },
  "version": "0.0.1",
  "location": {
    "$mid": 1,
    "path": "/Users/YOUR_USERNAME/.cursor/extensions/tinte.starscape-light-0.0.1",
    "scheme": "file"
  },
  "relativeLocation": "tinte.starscape-light-0.0.1",
  "metadata": { "isApplicationScoped": false, "isBuiltin": false, "installedTimestamp": 0 }
},
{
  "identifier": { "id": "tinte.starscape-dark" },
  "version": "0.0.1",
  "location": {
    "$mid": 1,
    "path": "/Users/YOUR_USERNAME/.cursor/extensions/tinte.starscape-dark.0.0.1",
    "scheme": "file"
  },
  "relativeLocation": "tinte.starscape-dark.0.0.1",
  "metadata": { "isApplicationScoped": false, "isBuiltin": false, "installedTimestamp": 0 }
}
```

Replace `YOUR_USERNAME` with your actual username. On Windows use the Windows-style path:
```
"path": "/c:/Users/YOUR_USERNAME/.cursor/extensions/tinte.starscape-light-0.0.1"
```

### Step 3 — restart Cursor

Fully quit and reopen Cursor. Open the theme picker (`Ctrl+K Ctrl+T`) and select **Starscape Light** or **Starscape Dark (Dark)**.
