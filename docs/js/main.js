/**
 * Jay AI Sinhala — අහන්න: Dilu pre-recorded audio first, Web Speech fallback
 */
(function () {
  "use strict";

  var LANG_PRIMARY = "si-LK";
  var LANG_FALLBACK = "si";
  var STORAGE_AUTO = "jay-ai-sinhala-auto-read";

  var synth = window.speechSynthesis || null;
  var currentUtterance = null;
  var currentBtn = null;
  var currentAudio = null;
  var toastEl = null;
  var voicesReady = false;
  var sinhalaVoice = null;
  var mode = null; // "audio" | "speech"

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function showToast(msg, ms) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "tts-toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toastEl.classList.remove("show");
    }, ms || 4500);
  }

  function pickSinhalaVoice() {
    if (!synth) return null;
    var voices = synth.getVoices() || [];
    var prefer = null;
    for (var i = 0; i < voices.length; i++) {
      var v = voices[i];
      var lang = (v.lang || "").toLowerCase();
      if (lang === "si-lk" || lang.indexOf("si-lk") === 0) {
        return v;
      }
      if (!prefer && (lang === "si" || lang.indexOf("si") === 0)) {
        prefer = v;
      }
    }
    return prefer;
  }

  function refreshVoices() {
    sinhalaVoice = pickSinhalaVoice();
    voicesReady = true;
  }

  function setPlayingUi(btn, playing) {
    if (!btn) return;
    if (playing) {
      btn.classList.add("is-playing");
      var labelOn = btn.querySelector(".listen-label");
      if (labelOn) labelOn.textContent = "නවත්වන්න";
      btn.setAttribute("aria-pressed", "true");
      currentBtn = btn;
    } else {
      btn.classList.remove("is-playing");
      var labelOff = btn.querySelector(".listen-label");
      if (labelOff) labelOff.textContent = "අහන්න";
      btn.setAttribute("aria-pressed", "false");
      if (currentBtn === btn) currentBtn = null;
    }
  }

  function stopSpeaking() {
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch (e) {}
      currentAudio = null;
    }
    if (synth) {
      try {
        synth.cancel();
      } catch (e) {}
    }
    if (currentBtn) setPlayingUi(currentBtn, false);
    currentUtterance = null;
    mode = null;
  }

  function pauseOrResume() {
    if (mode === "audio" && currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play().catch(function () {});
      } else {
        currentAudio.pause();
        showToast("නැවතුණා. නැවත අරඹන්නට ඔබන්න.");
      }
      return;
    }
    if (!synth) return;
    if (synth.speaking && !synth.paused) {
      synth.pause();
      showToast("නැවතුණා. නැවත අරඹන්නට ඔබන්න.");
    } else if (synth.paused) {
      synth.resume();
    }
  }

  function getTextFromTarget(target) {
    if (!target) return "";
    var speakAttr = target.getAttribute && target.getAttribute("data-speak");
    if (speakAttr && speakAttr.trim()) return speakAttr.trim();

    var clone = target.cloneNode(true);
    $all(".listen-bar, .btn, button, .nav-tools, script, style, .pron", clone).forEach(function (el) {
      el.parentNode && el.parentNode.removeChild(el);
    });
    $all("[data-speak]", clone).forEach(function (el) {
      var s = el.getAttribute("data-speak");
      if (s !== null) el.textContent = s;
    });
    return (clone.innerText || clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  function resolveAudioUrl(btn, target) {
    var fromBtn = btn && btn.getAttribute("data-audio");
    if (fromBtn) return fromBtn;
    if (target && target.getAttribute) {
      var fromRoot = target.getAttribute("data-audio");
      if (fromRoot) return fromRoot;
    }
    return null;
  }

  function speakText(text, btn) {
    if (!text) return;

    if (!synth || typeof SpeechSynthesisUtterance === "undefined") {
      showToast(
        "මෙම බ්‍රවුසරයේ හඬ කියවීම නැත. Chrome හෝ Edge භාවිතා කර බලන්න. කරුණාකර පෙළ කියවන්න."
      );
      return;
    }

    stopSpeaking();
    mode = "speech";

    var u = new SpeechSynthesisUtterance(text);
    u.lang = LANG_PRIMARY;
    u.rate = 0.9;
    u.pitch = 1;

    refreshVoices();
    if (sinhalaVoice) {
      u.voice = sinhalaVoice;
      u.lang = sinhalaVoice.lang || LANG_PRIMARY;
    } else {
      u.lang = LANG_FALLBACK;
    }

    u.onstart = function () {
      setPlayingUi(btn, true);
    };

    u.onend = function () {
      setPlayingUi(btn, false);
      currentUtterance = null;
      mode = null;
    };

    u.onerror = function () {
      stopSpeaking();
      showToast(
        "හඬ කියවීම අසාර්ථකයි. සිංහල හඬ (si-LK) සමහර උපාංගවල නැත — පෙළ කියවන්න හෝ Chrome උත්සාහ කරන්න."
      );
    };

    currentUtterance = u;
    try {
      synth.speak(u);
      if (!sinhalaVoice) {
        showToast(
          "සිංහල හඬ සොයා ගත්තේ නැත. පද්ධති හඬ භාවිතා වේ. Chrome/Android හි si-LK හොඳින් වැඩ කරයි.",
          5000
        );
      }
    } catch (err) {
      showToast("හඬ කියවීම ආරම්භ කළ නොහැක. කරුණාකර පෙළ කියවන්න.");
    }
  }

  function playAudio(url, btn, fallbackText) {
    stopSpeaking();
    mode = "audio";
    var audio = new Audio(url);
    audio.preload = "auto";
    currentAudio = audio;

    function failToSpeech() {
      currentAudio = null;
      mode = null;
      if (fallbackText) {
        speakText(fallbackText, btn);
      } else {
        setPlayingUi(btn, false);
        showToast("හඬ ගොනුව ලබාගත නොහැක. පෙළ කියවන්න.");
      }
    }

    audio.addEventListener("play", function () {
      setPlayingUi(btn, true);
    });
    audio.addEventListener("ended", function () {
      setPlayingUi(btn, false);
      currentAudio = null;
      mode = null;
    });
    audio.addEventListener("error", function () {
      failToSpeech();
    });

    var p = audio.play();
    if (p && typeof p.then === "function") {
      p.catch(function () {
        failToSpeech();
      });
    }
  }

  function onListenClick(btn) {
    if (btn.classList.contains("is-playing")) {
      stopSpeaking();
      return;
    }
    var sel = btn.getAttribute("data-read");
    var target = sel ? $(sel) : btn.closest("[data-listen-root]") || btn.closest(".section, .hero, .card, main");
    var text = btn.getAttribute("data-text") || getTextFromTarget(target);
    var audioUrl = resolveAudioUrl(btn, target);
    if (audioUrl) {
      playAudio(audioUrl, btn, text);
    } else {
      speakText(text, btn);
    }
  }

  function wireListenButtons() {
    $all("[data-listen]").forEach(function (btn) {
      if (btn._wired) return;
      btn._wired = true;
      btn.addEventListener("click", function () {
        onListenClick(btn);
      });
    });
  }

  function createListenButton(readSel) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-listen";
    btn.setAttribute("data-listen", "");
    if (readSel) btn.setAttribute("data-read", readSel);
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10v4h4l5 4V6L7 10H3z" fill="currentColor"/><path d="M16.5 12a4.5 4.5 0 00-1.5-3.3v6.6A4.5 4.5 0 0016.5 12z" fill="currentColor"/><path d="M15 4.2v2.1a6.8 6.8 0 010 11.4v2.1A8.9 8.9 0 0015 4.2z" fill="currentColor"/></svg>' +
      '<span class="listen-label">අහන්න</span>';
    return btn;
  }

  function ensureSectionListenBars() {
    $all("[data-listen-root]").forEach(function (root, idx) {
      if (root.querySelector(".listen-bar")) return;
      if (!root.id) root.id = "listen-block-" + (idx + 1);
      var bar = document.createElement("div");
      bar.className = "listen-bar";
      var listenBtn = createListenButton("#" + root.id);
      var stopBtn = document.createElement("button");
      stopBtn.type = "button";
      stopBtn.className = "btn btn-ghost";
      stopBtn.textContent = "නවත්වන්න";
      stopBtn.addEventListener("click", stopSpeaking);
      var pauseBtn = document.createElement("button");
      pauseBtn.type = "button";
      pauseBtn.className = "btn btn-ghost";
      pauseBtn.textContent = "විරාමය";
      pauseBtn.addEventListener("click", pauseOrResume);
      bar.appendChild(listenBtn);
      bar.appendChild(pauseBtn);
      bar.appendChild(stopBtn);
      root.insertBefore(bar, root.firstChild);
    });
  }

  function wireGlobalControls() {
    var stopAll = $("#stop-all-speech");
    if (stopAll) stopAll.addEventListener("click", stopSpeaking);

    var auto = $("#auto-read-toggle");
    if (auto) {
      try {
        auto.checked = localStorage.getItem(STORAGE_AUTO) === "1";
      } catch (e) {}
      auto.addEventListener("change", function () {
        try {
          localStorage.setItem(STORAGE_AUTO, auto.checked ? "1" : "0");
        } catch (e) {}
        if (auto.checked) {
          var first = $("[data-listen-root]");
          if (first) {
            var btn = first.querySelector("[data-listen]");
            if (btn) onListenClick(btn);
          }
        } else {
          stopSpeaking();
        }
      });
      if (auto.checked) {
        setTimeout(function () {
          var first = $("[data-listen-root]");
          if (first) {
            var btn = first.querySelector("[data-listen]");
            if (btn) onListenClick(btn);
          }
        }, 800);
      }
    }
  }

  function markCurrentNav() {
    var path = (location.pathname || "").split("/").pop() || "index.html";
    $all(".nav-links a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("/").pop();
      if (href === path || (path === "" && href === "index.html")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  function init() {
    if (synth) {
      refreshVoices();
      if (typeof synth.addEventListener === "function") {
        synth.addEventListener("voiceschanged", refreshVoices);
      } else {
        synth.onvoiceschanged = refreshVoices;
      }
    }
    ensureSectionListenBars();
    wireListenButtons();
    wireGlobalControls();
    markCurrentNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.JayTTS = {
    speak: speakText,
    play: playAudio,
    stop: stopSpeaking,
    pause: pauseOrResume
  };
})();
