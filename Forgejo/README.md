# Starscape for Forgejo

Starscape themes for Forgejo 12, adapted from the Starscape editor themes and
`starscape-ui-system-v3`.

This package includes:

- `theme-starscape-dark.css` - dark navy/cyan/violet Starscape theme
- `theme-starscape-light.css` - light parchment/earth Starscape theme
- `starscape-forgejo.js` - animated dark-theme starfield
- `footer.tmpl` - Forgejo custom template hook that loads the starfield script
- `app.ini.snippet` - Forgejo `[ui]` configuration
- `install.sh` - helper installer for a Forgejo custom directory

The starfield only mounts when the active theme is `starscape-dark`. It removes
itself when users switch to `starscape-light` and respects
`prefers-reduced-motion`.

## Install

Find your Forgejo custom directory. Common paths are:

- Docker with `/data` volume: `/data/gitea`
- Linux package installs: `/var/lib/forgejo/custom`
- Source/manual installs: `$FORGEJO_CUSTOM`

Then copy the theme CSS files, JavaScript, and template hook under that custom
directory:

```sh
mkdir -p /path/to/custom/public/assets/css
mkdir -p /path/to/custom/public/assets/js
mkdir -p /path/to/custom/templates/custom
cp theme-starscape-dark.css theme-starscape-light.css /path/to/custom/public/assets/css/
cp starscape-forgejo.js /path/to/custom/public/assets/js/
cp footer.tmpl /path/to/custom/templates/custom/
```

For this repository you can use the helper:

```sh
./install.sh /path/to/custom
```

For a Docker Forgejo container named `forgejo` with `/data` mounted:

```sh
./install.sh /path/to/host/data/gitea
docker compose restart forgejo
```

## Configure

Edit `app.ini` and add the themes to `[ui]`:

```ini
[ui]
THEMES = forgejo-auto,forgejo-light,forgejo-dark,starscape-dark,starscape-light
DEFAULT_THEME = starscape-dark
```

The same config is available in `app.ini.snippet`.

Restart Forgejo after changing `app.ini`.

Users can then select either theme from their Forgejo appearance settings.

## Verify

After restart, these URLs should return CSS:

```text
https://your-forgejo.example/assets/css/theme-starscape-dark.css
https://your-forgejo.example/assets/css/theme-starscape-light.css
https://your-forgejo.example/assets/js/starscape-forgejo.js
```

The rendered page should also contain:

```html
<script src="/assets/js/starscape-forgejo.js"></script>
```
