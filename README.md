# nl.firstlinesoftware.com — Dutch static mirror

A Dutch-language static version of [firstlinesoftware.com](https://firstlinesoftware.com),
hosted on GitHub Pages at [nl.firstlinesoftware.com](https://nl.firstlinesoftware.com).

---

## How this site was built

### 1. Fetch the current English site with all assets

```bash
wget --page-requisites \
     --span-hosts \
     --convert-links \
     --no-host-directories \
     --adjust-extension \
     -e robots=off \
     https://firstlinesoftware.com/
```

`--convert-links` rewrites absolute URLs to relative ones in `index.html`.
`--adjust-extension` appends `.css`/`.js` to files that have query strings
(e.g. `style.alt.css?ver=123` → saved as `style.alt.css?ver=123.css`).

**Important:** wget overwrites `index.html` with a fresh English copy. Apply
all Dutch translations *after* running wget, not before.

### 2. Dynamically loaded assets wget misses

Some assets are injected at runtime by JavaScript and are not reachable by
wget's static crawler. Download them manually:

```bash
# HubSpot form CSS (injected by forms/v2.js)
curl -o wp-content/themes/cleanslate/althubspot.css \
  "https://firstlinesoftware.com/wp-content/themes/cleanslate/althubspot.css?ver=..."
```

Check the browser Network tab for any remaining 404s after first deploy.

### 3. Files with `?ver=...` query strings

wget saves files with a literal `?` in the filename
(e.g. `theme.js?ver=1773578688`). The HTML references them with a
URL-encoded `%3F` (e.g. `src="theme.js%3Fver=1773578688"`).

Python's `http.server` decodes `%3F` back to `?` before the filesystem
lookup, so local serving works correctly without renaming files.

For files where the browser sends a real query string (e.g. `althubspot.css?ver=...`),
Python's `http.server` strips the query part and serves `althubspot.css` — so
save those without the `?ver=...` suffix.

### 4. Dutch translation

Translations were applied via Python `str.replace()` after fetching. Watch out for:

- HTML entities: the source HTML uses `&#038;` (not `&amp;`) and `&#8217;` (not `'`)
- Unicode characters that look like spaces/newlines: U+2028 (LINE SEPARATOR),
  U+00A0 (non-breaking space), U+2019 (right single quote)
- Always inspect raw bytes when a replacement fails: `open(f, 'rb').read()`

Key metadata changes for Dutch:
```html
<html lang="nl-NL">
<meta property="og:locale" content="nl_NL" />
<meta property="og:url" content="https://nl.firstlinesoftware.com/" />
<!-- JSON-LD -->
"inLanguage": "nl-NL"
```

### 5. Dutch text layout issues

Dutch words are longer than English on average. Check for overflow/wrapping
problems using Playwright + headless Chromium:

```python
# Accurate visual line count using Range.getClientRects()
# (scrollHeight/lineHeight gives false positives due to CSS margins)
def visual_lines(el):
    return el.evaluate('''e => {
        const range = document.createRange();
        range.selectNodeContents(e);
        const ys = new Set([...range.getClientRects()].map(r => Math.round(r.top)));
        return ys.size;
    }''')
```

Fix overflow with CSS hyphenation (added to `<head>`):
```html
<style>
body { hyphens: auto; -webkit-hyphens: auto; }
a.button, button, nav a, .footer-nav a { hyphens: none; -webkit-hyphens: none; }
</style>
```

Shorten translations for narrow containers (mode panes ~312px, SDLC section
~530px, leadership figcaptions, stats labels).

### 6. Cookiebot on a static site

The WordPress Cookiebot plugin uses `data-implementation="wp"`, which causes
`uc.js` to fetch `/{cbid}/cc.js` from your own domain — a dynamic WordPress
endpoint that doesn't exist on a static site.

**Use the standard (non-WordPress) Cookiebot embed instead:**
```html
<script id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="990e16bd-2861-4a00-a4ea-4dbe73a34971"
        data-blockingmode="auto">
</script>
```

- No `data-implementation="wp"` — everything loads from Cookiebot's CDN
- No `data-georegions` — that's also WordPress-plugin-specific
- The CBID `990e16bd...` is configured for `nl.firstlinesoftware.com` in the
  Cookiebot admin (different from the main site's CBID `066e3009...`)

### 7. Footer

```html
Copyright © 2026 First Line Software B.V. (KVK 58362126)
```

---

## Updating the site

When `firstlinesoftware.com` is updated:

1. Run the wget command above (saves fresh assets, overwrites `index.html`)
2. Re-apply Dutch translations to the new `index.html`
3. Check for new dynamically loaded assets in the browser Network tab
4. Run the Playwright layout checker for new overflow issues
5. Commit and push
