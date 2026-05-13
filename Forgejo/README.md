# Starscape for Forgejo

CSS-only Starscape themes for Forgejo 12, adapted from the Starscape editor
themes and `starscape-ui-system-v3`.

This package includes:

- `theme-starscape-dark.css` - dark navy/cyan/violet Starscape theme
- `theme-starscape-light.css` - light parchment/earth Starscape theme
- `app.ini.snippet` - Forgejo `[ui]` configuration
- `install.sh` - helper installer for a Forgejo custom directory

The animated JavaScript starfield is not included in this package. These files
use Forgejo's normal theme system and should work anywhere custom CSS themes
are supported.

## Install

Find your Forgejo custom directory. Common paths are:

- Docker with `/data` volume: `/data/gitea`
- Linux package installs: `/var/lib/forgejo/custom`
- Source/manual installs: `$FORGEJO_CUSTOM`

Then copy the theme CSS files into `public/assets/css` under that custom
directory:

```sh
mkdir -p /path/to/custom/public/assets/css
cp theme-starscape-dark.css theme-starscape-light.css /path/to/custom/public/assets/css/
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
```
