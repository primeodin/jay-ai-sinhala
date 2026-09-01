# ජේ + AI සිංහල · Jay AI Sinhala

වැඩිහිටි දෙමාපියන්ට සහ මිතුරන්ට **GitHub** සහ **AI** (ChatGPT, Claude, Grok) භාවිතයෙන් තමන්ට අවශ්‍ය කුඩා වැඩසටහන් / වෙබ් අඩවි හදන්න උගන්වන සිංහල ස්ථිතික අඩවියකි.

**Live site:** https://primeodin.github.io/jay-ai-sinhala/

**Repo:** https://github.com/primeodin/jay-ai-sinhala

---

## English summary

Jay teaches 70+ year-old Sri Lankan parents/grandparents (and friends) to use GitHub as a “gateway to other computers on the web” and AI tools as a helpful friend. This is a plain HTML/CSS/JS multi-page site in Sinhala, with large type, high contrast, and **අහන්න** (Listen) buttons using the Web Speech API (`si-LK` / `si`). Hosted on GitHub Pages from the `/docs` folder.

---

## GitHub Pages සක්‍රිය කරන ආකාරය

1. මේ repo එක GitHub එකේ විවෘත කරන්න.
2. **Settings** → **Pages**
3. **Build and deployment** → Source: **Deploy from a branch**
4. Branch: **main** · Folder: **/docs** → **Save**
5. විනාඩි කිහිපයකින් අඩවිය:  
   `https://primeodin.github.io/jay-ai-sinhala/`

`gh` CLI එකෙන් (මේකත් වැඩ කරයි):

```bash
gh api repos/primeodin/jay-ai-sinhala/pages -X POST -f build_type=legacy -f source[branch]=main -f source[path]=/docs
```

හෝ දැනටමත් Pages තියෙනවා නම්:

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
  help.html        උදව් / FAQ
  css/style.css
  js/main.js       අහන්න (TTS) + nav
  examples/gampaha-news/   ගම්පහ ආදර්ශ පිටුව
```

---

## මිතුරන්ට පිටපත් කරන්නේ කොහොමද? (Fork / copy)

1. GitHub එකේ **Fork** ඔබන්න — ඔබේ ගිණුමේ පිටපතක් එනවා.  
   නැත්නම් **Code → Download ZIP**.
2. ඔබේ fork එකේ **Settings → Pages** → `main` + `/docs` සක්‍රිය කරන්න.
3. ඔබේ URL එක වෙනස් වේ: `https://<ඔබේ-username>.github.io/jay-ai-sinhala/`
4. අන්තර්ගතය වෙනස් කරන්න — සිංහලෙන්ම. MIT බලපත්‍රය තියාගන්න.

---

## සිංහල හඬ (TTS) සීමා

- බ්‍රවුසර **Web Speech API** (`speechSynthesis`) භාවිතා වේ · `lang = si-LK` (fallback `si`).
- **Chrome / Edge / බොහෝ Android** උපාංගවල සිංහල හඬ හොඳින් වැඩ කරයි.
- සමහර iOS / desktop හි `si-LK` හඬ නැත — බොත්තම මිත්‍රශීලී පණිවිඩයක් පෙන්වයි; පෙළ තවමත් කියවන්න පුළුවන්.
- අන්තර්ජාල සම්බන්ධතාවයක් අවශ්‍ය විය හැක (පද්ධති හඬ බාගත වන විට).

---

## License

MIT — බලන්න [`LICENSE`](LICENSE). නිදහසේ භාවිතා කරන්න, වෙනස් කරන්න, බෙදා හරින්න.
