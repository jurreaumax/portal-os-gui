# Portal-OS GUI

Standalone Vite + React frontend for the Planetary Max Umbrella Worker.

## Development

```bash
npm install
npm run dev
```

The production build is emitted to `dist/`.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- `VITE_API_BASE_URL=https://planetary-max.jurreaumax.workers.dev`
- `API_BASE_URL=https://planetary-max.jurreaumax.workers.dev`

The identity viewer calls `/api/umbrella/identity` on the configured Worker base URL.
