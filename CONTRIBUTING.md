# Contributing

Want to help? Great — keep it short, keep the type large, keep it friendly.

## Clone + open

```bash
git clone https://github.com/primeodin/jay-ai-sinhala.git
cd jay-ai-sinhala
```

Open `docs/index.html` in a browser, or serve the folder:

```bash
cd docs && python3 -m http.server 8080
```

GitHub Pages publishes from `/docs` on `main`.

## Edit content

- **Sinhala is primary.** English tech terms stay in `"quotes"`, with a Sinhala pronunciation gloss on first mention (see the glossary on `help.html`).
- Prefer large type and high contrast — this site is for older parents and friends, not for a developer blog look.
- Use **relative links** so the pages still work offline-ish and on Pages forks.

## Add an example

1. Create a folder under `docs/examples/` (see `docs/examples/gampaha-news/`).
2. Link it from `docs/examples.html`.
3. Keep the same large-type, high-contrast style as the rest of the site.

## Listen / audio (optional)

- Pages with `data-speak` can use the **අහන්න** (Listen) button.
- Pre-recorded Dilu MP3s live in `docs/audio/`. Visitors never need Piper.
- To regenerate audio locally (maintainers only):

```bash
python3 scripts/generate_audio.py
```

That needs a local Piper + Dilu ONNX setup — skip it unless you are changing spoken lines.

## PR checklist

- [ ] Large type and contrast preserved
- [ ] No competitor app names
- [ ] Relative links still work from `docs/`
- [ ] Sinhala-first; English terms in quotes with gloss on first mention

Thank you — small, careful changes help more than big rewrites.
