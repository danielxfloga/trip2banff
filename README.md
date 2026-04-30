# Canada 2026 Interactive Itinerary

Static travel-details page for the Canada 2026 trip. The `public` folder is ready to publish on GitHub Pages.

## Run Locally

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## GitHub Pages

This repo includes a Pages workflow at `.github/workflows/pages.yml`. Push to `main`, then set GitHub Pages to deploy from GitHub Actions in the repository settings.

The site does not need a Node server in production. GitHub Pages serves the files in `public` directly.

## Files

- `public/index.html`: Main page and access gate.
- `public/styles.css`: Waterfalls/mountains theme, cards, animations, timeline, and responsive layout.
- `public/app.js`: Static rendering, access validation, search, image assignment, and timeline behavior.
- `public/itinerary.json`: Travel details used by the page.
- `server.js`: Small local static server for previewing the GitHub Pages build.
