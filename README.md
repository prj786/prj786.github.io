# prj786.github.io — the ewe website

The site for [ewe](https://github.com/prj786/ewe-os), a complete, Arch-based
operating system. Live at **[prj786.github.io](https://prj786.github.io)**.

## Stack

SvelteKit 2 + Svelte 5, prerendered to static HTML with
`@sveltejs/adapter-static`. Every route is server-rendered **at build time**, so
GitHub Pages serves finished markup — no client-side rendering, no framework
needed to read the site. GitHub Pages cannot run a Node server, which is why the
rendering happens in CI rather than per request.

No analytics, no cookies, no third-party requests: Inter (the desktop's own
face since the 2026-09 revamp) is self-hosted in `static/fonts/` as two
variable woff2 subsets, weight 400–700 plus the optical-size axis.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # → build/
npm run preview  # serve the built output
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. This needs **Settings → Pages → Source: GitHub
Actions** on the repository.

## Structure

```
src/routes/
  +layout.svelte     bar + footer, sitewide chrome
  +page.svelte       home — what ewe OS is
  download/          get the ISO, verify, write, boot, the six screens
  features/          the OS, shell, look, apps, cast, phone, system
  theming/           one accent in, a whole system out — with a LIVE derivation
  how/               the one file, sync, and why decisions are a feature
  docs/              install, shortcuts, updates, ewe-conf, limits, repos
  privacy/           privacy policy (Google OAuth verification)
  sitemap.xml/       generated from the docs nav, so it cannot drift
  philosophy/        308 → /how/   (merged; the URL is kept)
  sync/              308 → /how/
src/tokens.css       VENDORED from ewe/design/tokens.css — the desktop's own
src/app.css          the site's layer on top: rhythm, type scale, components
src/lib/
  theme-engine.js    a port of ewe-theme's colour maths, for /theming/
  icons.js           Lucide geometry, generated; Icon.svelte draws it
  release.js         the current ISO: version, size, download URL
```

## The design system

The site does not *imitate* the desktop — it wears the same file.
`src/tokens.css` is a byte-for-byte copy of `ewe/design/tokens.css`, which
`ewe-theme build` derives from the single accent in `ewe.conf`. Components ask
for Fluent 2 roles (`--bg-2`, `--stroke-2`, `--brand-bg`, `--fg-on-brand`),
never for a colour.

Sizes are deliberately *not* shared: `tokens.css` also carries `--pad`,
`--control` and `--row`, which are the shell's density — a 32px control on a
bar. A page of prose has its own rhythm, so spacing and the type ladder live in
`app.css` and are stated in rem. Colour and shape are the system; density is
the medium.

Icons are Lucide (ISC), drawn as inline SVG rather than the `Lucide.ttf` the
shell loads: a web page pays for a font in bytes and in a flash of missing
glyphs, and fifty icons of path data is 8 kB.

```sh
npm run tokens   # refresh src/tokens.css from ../ewe/design/tokens.css
npm run icons    # regenerate src/lib/icons.js from lucide-static
scripts/check-engine.sh   # prove theme-engine.js still agrees with ewe-theme
```

`check-engine.sh` matters more than it looks. `/theming/` derives its colours
in the browser from a port of `ewe-theme`, and a port drifts — a theming page
that shows the *wrong* derivation is worse than one that shows a picture. The
check runs both implementations across five accents chosen to hit the awkward
cases (an out-of-gamut yellow, a hue that pushes `fg-on-brand` to ink, zero
tint, and the maximum tint the config allows) and diffs all 92 values.
