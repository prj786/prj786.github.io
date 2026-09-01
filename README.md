# prj786.github.io — the ewe website

The site for [ewe](https://github.com/prj786/ewe), a clean, dark, complete
desktop environment for Arch Linux. Live at
**[prj786.github.io](https://prj786.github.io)**.

## Stack

SvelteKit 2 + Svelte 5, prerendered to static HTML with
`@sveltejs/adapter-static`. Every route is server-rendered **at build time**, so
GitHub Pages serves finished markup — no client-side rendering, no framework
needed to read the site. GitHub Pages cannot run a Node server, which is why the
rendering happens in CI rather than per request.

No analytics, no cookies, no third-party requests: the Ubuntu typeface (the
desktop's own face) is self-hosted in `static/fonts/`.

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
  +page.svelte       home — what ewe is, install, the goal
  philosophy/        the one-file config, and why it's the better one
  features/          shell, look, apps, cast, phone, Google, system
  sync/              log in, get your machine back
  docs/              install, shortcuts, ewe-conf, Google setup, limits
  privacy/           privacy policy (Google OAuth verification)
src/app.css          the "blacksheep" palette, straight from Theme.qml
```

Colours, radii and type match ewe's own `blacksheep` theme so the site looks
like the desktop it describes.
