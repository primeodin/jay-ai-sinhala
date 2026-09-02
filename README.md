# ජේ + "AI" සිංහල · Jay AI Sinhala

වැඩිහිටි දෙමාපියන්ට සහ මිතුරන්ට **"GitHub"** (ගිට්-හබ්) සහ **"AI"** (ඒ-අයි) — **"ChatGPT"** (චැට්-ජී-පී-ටී), **"Claude"** (ක්ලෝඩ්), **"Grok"** (ග්‍රොක්) — භාවිතයෙන් තමන්ට අවශ්‍ය කුඩා වැඩසටහන් / වෙබ් අඩවි හදන්න උගන්වන සිංහල ස්ථිතික අඩවියකි.

ඉංග්‍රීසි තාක්ෂණ වචන **"quotes"** තුළ දක්වා ඇත; පළමු සඳහනේදී සිංහල උච්චාරණය ද එකතු කර ඇත. සම්පූර්ණ ලැයිස්තුව: [help.html · ශබ්දකෝෂය](https://primeodin.github.io/jay-ai-sinhala/help.html).

**Live site:** https://primeodin.github.io/jay-ai-sinhala/

**Repo:** https://github.com/primeodin/jay-ai-sinhala

---

## English summary

Jay teaches 70+ year-old Sri Lankan parents/grandparents (and friends) to use "GitHub" as a “gateway to other computers on the web” and "AI" tools as a helpful friend. This is a plain HTML/CSS/JS multi-page site in Sinhala, with large type, high contrast, and **අහන්න** (Listen) buttons. English tech terms are shown in quotes with Sinhala pronunciation glosses. Listen prefers pre-recorded **Dilu** Sinhala audio; falls back to the Web Speech API (`si-LK` / `si`). Hosted on "GitHub Pages" from the `/docs` folder.

---

## "GitHub Pages" සක්‍රිය කරන ආකාරය

1. මේ repo එක "GitHub" එකේ විවෘත කරන්න.
2. **Settings** → **"Pages"**
3. **Build and deployment** → Source: **Deploy from a branch**
4. Branch: **main** · Folder: **/docs** → **Save**
5. විනාඩි කිහිපයකින් අඩවිය:  
   `https://primeodin.github.io/jay-ai-sinhala/`

`gh` CLI එකෙන් (මේකත් වැඩ කරයි):

```bash
gh api repos/primeodin/jay-ai-sinhala/pages -X POST -f build_type=legacy -f source[branch]=main -f source[path]=/docs
```

හෝ දැනටමත් "Pages" තියෙනවා නම්:

```bash
gh api repos/primeodin/jay-ai-sinhala/pages -X PUT -f build_type=legacy -f source[branch]=main -f source[path]=/docs
```

---

## අඩවි ව්‍යුහය

```
docs/
  index.html       මුල් පිටුව
  what.html        මෙය කුමක්ද?
  steps.html       පියවරෙන් පියවර
  examples.html    උදාහරණ
  teaching.html    ජේගේ ඉගැන්වීමේ සටහන්
  help.html        උදව් / "FAQ" + ශබ්දකෝෂය
  css/style.css
  js/main.js       අහන්න (Dilu audio → Web Speech fallback)
  audio/           දිලූ (Dilu) සිංහල MP3 ගොනු
  examples/gampaha-news/   ගම්පහ ආදර්ශ පිටුව
```

---

## සිංහල හඬ (අහන්න) — Dilu + fallback

1. **ප්‍රධාන:** `docs/audio/*.mp3` — [Dilu TTS](https://huggingface.co/chaturadilan/dilu-tts) (`si_LK-dilu-medium`, **"MIT"** license) සමග Piper මගින් සංශ්ලේෂණය කළ සිංහල හඬ.
2. **Fallback:** බ්‍රවුසර **Web Speech API** (`speechSynthesis`) · `lang = si-LK` (fallback `si`).
3. අහන්න කියවන විට ඉංග්‍රීසි අකුරු අකුරෙන් අකුර නොකියයි — සිංහල උච්චාරණය (`data-speak`) භාවිතා වේ (උදා: ගිට්හබ්, ඒ අයි).

හඬ නැවත ජනනය:

```bash
python3 scripts/generate_audio.py
```

(Requires local Piper + Dilu ONNX model; not needed for site visitors.)

---

## මිතුරන්ට පිටපත් කරන්නේ කොහොමද? (Fork / copy)

1. "GitHub" එකේ **Fork** ඔබන්න — ඔබේ ගිණුමේ පිටපතක් එනවා.  
   නැත්නම් **Code → Download ZIP**.
2. ඔබේ fork එකේ **Settings → "Pages"** → `main` + `/docs` සක්‍රිය කරන්න.
3. ඔබේ **"URL"** එක වෙනස් වේ: `https://<ඔබේ-username>.github.io/jay-ai-sinhala/`
4. අන්තර්ගතය වෙනස් කරන්න — සිංහලෙන්ම. **"MIT"** බලපත්‍රය තියාගන්න. **"README"** සහ **"LICENSE"** බලන්න.

---

## Daily builds series · දෛනික ඉගැන්වීම්

Tiny, tested teaching repos — starter → mid. Ship one, read it, then climb:

| Lane | Repo | Why open it |
| --- | --- | --- |
| Literacy (Sinhala) (this) | [jay-ai-sinhala](https://github.com/primeodin/jay-ai-sinhala) | Friends 70+ learning GitHub + AI — [live](https://primeodin.github.io/jay-ai-sinhala/) |
| Starter | [first-commit-ai](https://github.com/primeodin/first-commit-ai) | Mock-first chat CLI + pytest |
| Attention mid | [attention-warrior](https://github.com/primeodin/attention-warrior) | Transformer attention you can hold in one hand |
| Shop skills | [mister-jay](https://github.com/primeodin/mister-jay) | Interactive DIY drills — [live](https://primeodin.github.io/mister-jay/) |
| Systems DIY | [camera-selector](https://github.com/primeodin/camera-selector) | NVR/Frigate camera planning — [live](https://primeodin.github.io/camera-selector/) |

Coming next on the weekday cadence: RAG starter → tool agent → prompt lab → embeddings → vision → memory → shop-skill explainer.

Good first issues: [#1](https://github.com/primeodin/jay-ai-sinhala/issues/1) second local example, [#2](https://github.com/primeodin/jay-ai-sinhala/issues/2) keyboard + Listen, [#3](https://github.com/primeodin/jay-ai-sinhala/issues/3) CONTRIBUTING.md. Profile forge: [github.com/primeodin](https://github.com/primeodin)

## "License"

- Site content & code: **"MIT"** — බලන්න [`LICENSE`](LICENSE).
- Dilu voice model: **"MIT"** — [chaturadilan/dilu-tts](https://huggingface.co/chaturadilan/dilu-tts).
