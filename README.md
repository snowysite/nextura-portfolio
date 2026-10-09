# NEXTURA — Interactive Portfolio

An original, responsive, game-inspired portfolio with a black and orange-red visual system, animated interface details, project showcases, and an interactive 3D geometric avatar.

## Preview locally

This is a static site. You can open `index.html` directly for most of the layout, but a local server is recommended so browser module imports work reliably.

### Quick local server
If Python is installed:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new repository on GitHub, for example `nextura-portfolio`.
2. Upload the contents of this folder to the repository root (make sure `index.html` is at the root).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. Wait for the Pages deployment and open the URL GitHub provides.

You can also import the repository into Vercel and deploy it as a static site. No build command is required.

## Personalize before publishing

Search `index.html` and `script.js` for these placeholders:
- `hello@nextura.dev` — replace with your real contact email.
- Add your real GitHub, LinkedIn, and other profile URLs when you are ready.
- Confirm project descriptions and mark which projects are live, in progress, or concept work.
- Replace the sample project visuals with screenshots of your real work when available.

## 3D avatar

The scene uses Three.js loaded as an ES module from jsDelivr. An abstract, original geometric android is built in code; no external 3D model file is needed. The site retains a CSS fallback if Three.js cannot load. Internet access is needed for the CDN module and Google Fonts. For fully offline operation, download and vendor those dependencies locally.

## Features

- Responsive mobile-first layout
- Animated boot screen, status clock, reveal transitions, hover interactions
- Interactive Three.js geometric avatar with pointer tracking and floating orbit rings
- Project portfolio: NexRide, Nexora, Jabico Consultancy, digital experiences
- Skills/capabilities section and contact CTA
- Optional sound toggle (off by default)
- Reduced-motion preference support
- No backend or API keys required

## Notes

Project descriptions are based on the supplied portfolio context and include concepts/ongoing builds. Review and update all details before presenting them as completed client work. The example email is a placeholder and must be replaced before launch.
