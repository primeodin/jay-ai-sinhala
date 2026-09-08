# Contributing to jay-ai-sinhala

Welcome. This is a plain HTML/CSS/JS site in Sinhala that helps friends 70+ learn GitHub + AI as tools — large type, high contrast, Listen buttons. Live on GitHub Pages from `/docs`. Content edits under `docs/` are the highest-leverage first PRs. Keep that bar in mind.

**Live:** https://primeodin.github.io/jay-ai-sinhala/

## Map (fork to PR)

1. **Fork** this repo on GitHub, then clone your fork:

```bash
git clone https://github.com/<you>/jay-ai-sinhala.git
cd jay-ai-sinhala
```

2. **Open locally** — no build step. Either:

```bash
# double-click or open in a browser
open docs/index.html
```

or serve the Pages root so relative links behave like production:

```bash
cd docs && python3 -m http.server 8080
# then visit http://localhost:8080/
```

GitHub Pages publishes from branch `main`, folder `/docs`.

3. Branch for one small change, then open a focused PR back to `primeodin/jay-ai-sinhala`.

## Edit content (Sinhala first)

- Primary language is **Sinhala**. Keep sentences short and concrete — shop notes for elders, not marketing.
- English tech terms stay in **"quotes"** with a Sinhala pronunciation gloss on first mention (e.g. `"GitHub"` (ගිට්-හබ්)). Full glossary: [`docs/help.html`](docs/help.html).
- Prefer relative links (`css/…`, `examples/…`) so the site still works opened as files or offline-ish.

| Path | Role |
| --- | --- |
| `docs/*.html` | Site pages (`index`, `what`, `steps`, `examples`, `teaching`, `help`) |
| `docs/css/style.css` | Large-type, high-contrast styles — preserve readability |
| `docs/js/main.js` | Listen button: Dilu MP3 → Web Speech (`si-LK` / `si`) fallback |
| `docs/examples/` | Local demo sites linked from `examples.html` |
| `docs/audio/` | Pre-recorded Dilu MP3s + `manifest.json` |
| `scripts/generate_audio.py` | Optional local audio regen (maintainers) |

## Add an example folder

1. Copy the pattern in `docs/examples/gampaha-news/` (own `index.html` + local CSS).
2. Use **placeholder** news/weather/camera text only — no real camera URLs or private data.
3. Link it from `docs/examples.html` (hero copy, iframe/`href`, and a short “what you learn” note).
4. Preview with the static server above before opening the PR.

## Listen / audio (optional)

Most first PRs never touch audio.

- Sections that can be read aloud use `data-listen-root`, optional `data-audio="audio/….mp3"`, and `data-speak="…"` (Sinhala spoken form — so English letters are not spelled out).
- Inline tech terms often set `data-speak` on `.term` spans.
- **Visitors never need Piper.** Prefers `docs/audio/*.mp3`; falls back to the browser Web Speech API.
- Regenerating Dilu MP3s (maintainers only): local Piper + Dilu ONNX, then `python3 scripts/generate_audio.py`. Skip this unless you changed spoken copy and can run the toolchain.

## Good first issues

- [#1](https://github.com/primeodin/jay-ai-sinhala/issues/1) second local example under `docs/examples/`
- [#2](https://github.com/primeodin/jay-ai-sinhala/issues/2) keyboard focus + Listen button affordance

Claim one with a comment, then open the PR. Docs and a11y polish count.

## Shop rules

- Keep type large and contrast high — do not shrink the elder-friendly UI for “modern” density.
- No competitor learning-app names on this public surface.
- No secrets, no real personal data, no live camera feeds in examples.
- One idea per PR — no drive-by refactors of every page.
- Match the voice: patient, concrete, literacy before hype.

## PR checklist

- [ ] Opened `docs/index.html` (or local static server) and clicked through changed pages
- [ ] Sinhala primary; quoted English terms + gloss where first shown
- [ ] Relative links still work; large type / contrast preserved
- [ ] Examples stay placeholder-only (no private URLs)
- [ ] Audio regen only if you changed `data-speak` *and* can run Piper (otherwise leave MP3s alone — Web Speech still works)
- [ ] One focused change

## What to skip

Please do not open PRs that rewrite the site into a SPA/framework, shrink fonts for desktop density, add accounts/analytics trackers, commit secrets or real family data, or rename every page in one PR.

Questions? Comment on the issue you are claiming — that thread is the right place.
